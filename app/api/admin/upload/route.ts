// app/api/admin/upload/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function POST(req: Request) {
  try {
    await guardAdmin();
    const { base64, folder, oldPublicId } = await req.json();

    if (!base64) {
      return NextResponse.json(
        { error: "No image data provided" },
        { status: 400 },
      );
    }

    // Delete old image if replacing
    if (oldPublicId) {
      await deleteImage(oldPublicId).catch(() => {});
    }

    const { url, publicId } = await uploadImage(
      base64,
      folder ?? "portfolio/projects",
    );
    return NextResponse.json({ url, publicId });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await guardAdmin();
    const { publicId } = await req.json();
    if (!publicId)
      return NextResponse.json({ error: "No publicId" }, { status: 400 });
    await deleteImage(publicId);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
