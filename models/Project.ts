// models/Project.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IDescriptionBlock {
  header?: string;
  text: string;
}

export type ProjectDescription = string | IDescriptionBlock[];

export interface IProject extends Document {
  title: string;
  type: string;
  description: ProjectDescription;
  image: string;
  imagePublicId?: string;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  outcome: string;
  order: number;
  images: string[];
}

const DescriptionBlockSchema = new Schema<IDescriptionBlock>(
  {
    header: { type: String, default: "" },
    text: { type: String, required: true },
  },
  { _id: false },
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: Schema.Types.Mixed, required: true },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    techStack: [{ type: String }],
    demoUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    outcome: { type: String, default: "" },
    order: { type: Number, default: 0 },
    images: [{ type: String }],
  },
  { timestamps: true },
);

export default models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
