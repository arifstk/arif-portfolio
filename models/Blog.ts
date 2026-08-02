// models/Blog.ts

import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IContentBlock {
  type: "paragraph" | "code" | "cliptext" | "clip" | "image";
  value: string;
}

export interface IBlogSection {
  heading?: string;
  paragraph?: string;
  blocks?: IContentBlock[];
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImage: string;
  coverImagePublicId?: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  sections: IBlogSection[];
  createdAt: Date;
  updatedAt: Date;
}

const ContentBlockSchema = new Schema<IContentBlock>({
  type: {
    type: String,
    enum: ["paragraph", "code", "cliptext", "clip", "image"],
    required: true,
  },
  value: { type: String, required: true },
});

const BlogSectionSchema = new Schema<IBlogSection>({
  heading: { type: String, default: "" },
  paragraph: { type: String, default: "" },
  blocks: [ContentBlockSchema],
});

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Web Application" },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    coverImagePublicId: { type: String, default: "" },
    authorName: { type: String, default: "Shaikh Arif" },
    authorRole: { type: String, default: "Full-Stack Developer" },
    authorImage: { type: String, default: "/author.jpg" },
    sections: [BlogSectionSchema],
  },
  { timestamps: true },
);

export default models.Blog || model<IBlog>("Blog", BlogSchema);
