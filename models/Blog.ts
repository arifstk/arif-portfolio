// models/Blog.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IBlogSection {
  heading?: string;
  paragraph?: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  sections: IBlogSection[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Web Application" },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    authorName: { type: String, default: "Shaikh Arif" },
    authorRole: { type: String, default: "Full-Stack Developer" },
    authorImage: { type: String, default: "/author.jpg" },
    sections: [
      {
        heading: { type: String, default: "" },
        paragraph: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true },
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
