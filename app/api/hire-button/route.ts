// app/api/hire-button/route.ts (public/frontend api)

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import HireButton from "@/models/HireButton";

export async function GET() {
  try {
    await connectDB();
    let doc = await HireButton.findOne().lean();
    if (!doc) {
      // First-ever load — create the singleton with sensible defaults.
      doc = await HireButton.create({
        logo: "",
        text: "Hire on Upwork",
        link: "#",
      });
    }
    return NextResponse.json(doc);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
