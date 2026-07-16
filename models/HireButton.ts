// models/HireButton.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IHireButton extends Document {
  logo: string;
  logoPublicId?: string;
  text: string;
  link: string;
}

const HireButtonSchema = new Schema<IHireButton>(
  {
    logo: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    text: { type: String, default: "Hire on Upwork" },
    link: { type: String, default: "#" },
  },
  { timestamps: true },
);

// Singleton — only one document of this type should ever exist.
export default models.HireButton ||
  mongoose.model<IHireButton>("HireButton", HireButtonSchema);
