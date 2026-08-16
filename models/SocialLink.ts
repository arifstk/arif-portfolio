// models/SocialLink.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface ISocialLink extends Document {
  name: string;
  href: string;
  iconName: string; // "github" | "linkedin" | "twitter" | "instagram"
  order: number;
}

const SocialLinkSchema = new Schema<ISocialLink>(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
    iconName: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default models.SocialLink ||
  mongoose.model<ISocialLink>("SocialLink", SocialLinkSchema);

