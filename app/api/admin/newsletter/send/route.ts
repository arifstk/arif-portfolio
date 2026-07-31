import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { getOfferEmailTemplate } from "@/lib/emailTemplate";

// Create Nodemailer Transporter using .env variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { subject, title, message, ctaUrl, ctaText } = await req.json();

    if (!subject || !title || !message) {
      return NextResponse.json(
        { error: "Subject, title, and message are required." },
        { status: 400 },
      );
    }

    await connectDB();
    const subscribers = await Subscriber.find({}, "email");

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "No subscribers found." },
        { status: 400 },
      );
    }

    const emailList = subscribers.map((sub) => sub.email);
    const htmlContent = getOfferEmailTemplate(title, message, ctaUrl, ctaText);

    // Send emails via Nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: emailList.join(", "),
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({
      message: `Successfully sent offer email to ${emailList.length} subscriber(s)!`,
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send emails via Nodemailer." },
      { status: 500 },
    );
  }
}
