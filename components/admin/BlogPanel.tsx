// components/BlogsPanel.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

type BlogSection = {
  heading: string;
  paragraph: string;
};

type BlogItem = {
  _id?: string;
  title: string;
  slug?: string;
  category: string;
  coverImage: string;
  coverImagePublicId?: string; // CHANGELOG: Added to track Cloudinary public ID for deletion
  excerpt: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  sections: BlogSection[];
  createdAt?: string;
};

/* ==========================================================================
   Helper Functions & Constants
   ========================================================================== */

// CHANGELOG: Helper function to convert uploaded File object to Base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const blankBlog = (): BlogItem => ({
  title: "",
  category: "SAAS",
  coverImage: "",
  coverImagePublicId: "",
  excerpt: "",
  authorName: "Alamin Shaikh",
  authorRole: "Full-Stack & AI Developer",
  authorImage: "/author.jpg",
  sections: [{ heading: "", paragraph: "" }],
});

const inputClasses = [
  "w-full bg-slate-800/80 text-slate-100",
  "border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm",
  "placeholder-slate-500",
  "focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600",
  "transition-all",
].join(" ");

/* ==========================================================================
   UI Sub-components
   ========================================================================== */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
          <h3 className="text-base font-bold text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main BlogsPanel Component
   ========================================================================== */

export default function BlogsPanel({ autoOpen }: { autoOpen?: boolean }) {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<BlogItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const didAutoOpen = useRef(false);

  // Fetch all blogs
  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  useEffect(() => {
    if (autoOpen && !didAutoOpen.current) {
      didAutoOpen.current = true;
      openNew();
    }
  }, [autoOpen]);

  function openNew() {
    setEditing(blankBlog());
    setIsNew(true);
    setModal(true);
  }

  function openEdit(b: BlogItem) {
    setEditing({ ...b });
    setIsNew(false);
    setModal(true);
  }

  /* ==========================================================================
     Image Upload Handler (UPDATED to match /api/admin/upload)
     ========================================================================== */

  // CHANGELOG: Refactored image upload to handle Base64 payload and custom route parameters
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    setUploading(true);
    try {
      // 1. Convert file to base64 format
      const base64 = await fileToBase64(file);

      // 2. Call admin upload endpoint
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64,
          folder: "portfolio/blogs", // Places image under blogs subfolder in Cloudinary
          oldPublicId: editing.coverImagePublicId || undefined, // Cleans up previous image if editing
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Image upload failed");
      }

      // 3. Save resulting image URL and publicId into state
      setEditing({
        ...editing,
        coverImage: data.url,
        coverImagePublicId: data.publicId,
      });

      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  /* ==========================================================================
     Dynamic Section Handling
     ========================================================================== */

  function addSection() {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: [...editing.sections, { heading: "", paragraph: "" }],
    });
  }

  function removeSection(index: number) {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections.filter((_, i) => i !== index),
    });
  }

  function updateSection(index: number, field: "heading" | "paragraph", value: string) {
    if (!editing) return;
    const updated = [...editing.sections];
    updated[index][field] = value;
    setEditing({ ...editing, sections: updated });
  }

  /* ==========================================================================
     Save & Delete Actions
     ========================================================================== */

  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim()) {
      toast.error("Blog title is required.");
      return;
    }
    if (!editing.coverImage) {
      toast.error("Cover image is required.");
      return;
    }

    setSaving(true);
    try {
      const url = isNew ? "/api/admin/blogs" : `/api/admin/blogs/${editing._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (!res.ok) throw new Error("Failed to save post");

      toast.success(isNew ? "Blog post published!" : "Blog post updated!");
      setModal(false);
      loadBlogs();
    } catch (e: any) {
      toast.error(e.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Blog deleted.");
      loadBlogs();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setConfirmDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Blog Posts</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your articles, headings, paragraphs, and cover photos
          </p>
        </div>
        <button
          onClick={openNew}
          className="px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-lg shadow-violet-950/40"
        >
          + Add New Article
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-80 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-slate-100">Confirm Deletion</h4>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Modal */}
      {modal && editing && (
        <Modal
          title={isNew ? "Create New Blog Post" : "Edit Blog Post"}
          onClose={() => setModal(false)}
        >
          <div className="space-y-4">
            {/* Title */}
            <Field label="Blog Title">
              <input
                className={inputClasses}
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Turn Google Drive Into an AI Knowledge Base..."
              />
            </Field>

            {/* Category & Cover Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category Tag">
                <input
                  className={inputClasses}
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  placeholder="SAAS"
                />
              </Field>

              {/* CHANGELOG: Upload input triggers fileToBase64 and hits /api/admin/upload */}
              <Field label="Cover Image Upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-700 file:text-white hover:file:bg-violet-600 cursor-pointer border border-slate-700/80 rounded-xl bg-slate-800/80 p-1"
                />
                {uploading && (
                  <p className="text-[11px] text-violet-400 mt-1 font-medium">
                    Uploading image to Cloudinary...
                  </p>
                )}
              </Field>
            </div>

            {/* Cover Image Preview */}
            {editing.coverImage && (
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editing.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            <Field label="Excerpt / Card Summary">
              <textarea
                className={inputClasses + " resize-y"}
                rows={2}
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                placeholder="DriveIntel transforms Google Drive into a searchable AI-powered knowledge base..."
              />
            </Field>

            {/* Author Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Author Name">
                <input
                  className={inputClasses}
                  value={editing.authorName}
                  onChange={(e) => setEditing({ ...editing, authorName: e.target.value })}
                  placeholder="Alamin Shaikh"
                />
              </Field>
              <Field label="Author Role">
                <input
                  className={inputClasses}
                  value={editing.authorRole}
                  onChange={(e) => setEditing({ ...editing, authorRole: e.target.value })}
                  placeholder="Full-Stack & AI Developer"
                />
              </Field>
            </div>

            {/* Content Sections Block */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">
                  Article Body Sections
                </span>
                <button
                  type="button"
                  onClick={addSection}
                  className="text-xs font-semibold text-violet-400 hover:text-violet-300 hover:underline cursor-pointer"
                >
                  + Add Heading & Paragraph
                </button>
              </div>

              {editing.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3 relative"
                >
                  {editing.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="absolute top-3 right-3 text-xs font-semibold text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                  <Field label={`Section ${idx + 1} Heading (H2)`}>
                    <input
                      className={inputClasses}
                      value={sec.heading}
                      onChange={(e) => updateSection(idx, "heading", e.target.value)}
                      placeholder="e.g. Turn any drive folder into a searchable knowledge base"
                    />
                  </Field>
                  <Field label={`Section ${idx + 1} Paragraph Text`}>
                    <textarea
                      className={inputClasses + " resize-y"}
                      rows={3}
                      value={sec.paragraph}
                      onChange={(e) => updateSection(idx, "paragraph", e.target.value)}
                      placeholder="Write your detailed article paragraph here..."
                    />
                  </Field>
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 py-3 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-lg shadow-violet-950/50"
              >
                {saving ? "Saving Post..." : isNew ? "Publish Blog Post" : "Save Changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-5 py-3 text-xs font-semibold text-slate-400 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Blog List Items */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-900 border border-slate-800" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-900/50 border border-slate-800 rounded-2xl">
          No blog posts found. Click "+ Add New Article" to write one!
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.coverImage}
                  alt={b.title}
                  className="w-16 h-12 rounded-xl object-cover bg-slate-800 shrink-0 border border-slate-800"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-100 truncate">{b.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-violet-400 bg-violet-950/60 border border-violet-800/50 px-2 py-0.5 rounded-full uppercase">
                      {b.category || "SAAS"}
                    </span>
                    <span className="text-xs text-slate-500 truncate">{b.excerpt}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(b)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-violet-400 hover:bg-violet-600/10 hover:border-violet-600 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(b._id!)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-red-400 hover:bg-red-600/10 hover:border-red-600 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

