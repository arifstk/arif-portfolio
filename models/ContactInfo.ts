// models/ContactInfo.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IContactInfo extends Document {
  label: string;
  value: string;
  href: string;
  iconName: string; // "Mail" | "Phone" | "MapPin"
}

const ContactInfoSchema = new Schema<IContactInfo>(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    href: { type: String, default: "#" },
    iconName: { type: String, required: true },
  },
  { timestamps: true },
);

export default models.ContactInfo ||
  mongoose.model<IContactInfo>("ContactInfo", ContactInfoSchema);

  