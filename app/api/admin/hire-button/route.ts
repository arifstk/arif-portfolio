// app/api/admin/hire-button/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import HireButton from "@/models/HireButton";

async function guardAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any)?.role !== "admin")
    throw new Error("Unauthorized");
}

export async function GET() {
  try {
    await guardAdmin();
    await connectDB();
    let doc = await HireButton.findOne();
    if (!doc) {
      doc = await HireButton.create({
        logo: "",
        text: "Hire on Upwork",
        link: "#",
      });
    }
    return NextResponse.json(doc);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await guardAdmin();
    await connectDB();
    const body = await req.json();
    const doc = await HireButton.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return NextResponse.json(doc);
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message },
      { status: e.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
