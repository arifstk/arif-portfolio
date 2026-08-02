// lib/data/projects.ts

import { connectDB } from "@/lib/db";
import ProjectModel from "@/models/Project";
import type { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  try {
    await connectDB();
    const projects = await ProjectModel.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return projects.map((p: any) => ({
      _id: String(p._id),
      type: p.type,
      title: p.title,
      description: p.description,
      image: p.image,
      imagePublicId: p.imagePublicId ?? "",
      images: p.images ?? [],
      techStack: p.techStack ?? [],
      demoUrl: p.demoUrl,
      githubUrl: p.githubUrl,
      order: p.order ?? 0,
      outcome: p.outcome || "",
    }));
  } catch {
    return [];
  }
}
