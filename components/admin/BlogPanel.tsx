// components/admin/BlogPanel.tsx

"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";

type ContentBlock = {
  type: "paragraph" | "code";
  value: string;
};

type BlogSection = {
  heading?: string;
  paragraph?: string;
  blocks?: ContentBlock[];
};

type BlogItem = {
  _id?: string;
  title: string;
  slug?: string;
  category: string;
  coverImage: string;
  coverImagePublicId?: string;
  excerpt: string;
  authorName: string;
  authorRole: string;
  authorImage: string;
  sections: BlogSection[];
  createdAt?: string;
};

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
  category: "Web Application",
  coverImage: "",
  coverImagePublicId: "",
  excerpt: "",
  authorName: "Shaikh Arif",
  authorRole: "Full-Stack Developer",
  authorImage: "/author.jpg",
  sections: [
    {
      heading: "",
      blocks: [{ type: "paragraph", value: "" }],
    },
  ],
});

const inputClasses = [
  "w-full bg-slate-50 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100",
  "border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-sm",
  "placeholder-slate-400 dark:placeholder-slate-500",
  "focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600",
  "transition-all duration-200",
].join(" ");

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-[0_20px_50px_rgba(124,58,237,0.15)] max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 sticky top-0 bg-white/95 dark:bg-[#0b1329]/95 backdrop-blur-md z-10">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function ParagraphEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const replacement = prefix + (selectedText || "text") + suffix;
    const newValue = value.substring(0, start) + replacement + value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 4)
      );
    }, 0);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900/80">
      {/* Top Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => applyFormat("# ")}
          className="px-2 py-1 font-bold rounded bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-slate-200 dark:border-slate-700"
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => applyFormat("## ")}
          className="px-2 py-1 font-bold rounded bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-slate-200 dark:border-slate-700"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => applyFormat("### ")}
          className="px-2 py-1 font-bold rounded bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-slate-200 dark:border-slate-700"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => applyFormat("#### ")}
          className="px-2 py-1 font-bold rounded bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/50 border border-slate-200 dark:border-slate-700"
          title="Heading 4"
        >
          H4
        </button>

        <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => applyFormat("**", "**")}
          className="px-2.5 py-1 font-extrabold rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          title="Bold Format"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => applyFormat("`", "`")}
          className="px-2 py-1 font-mono text-[11px] rounded bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700"
          title="Inline Code Pill Tag"
        >
          `code`
        </button>

        <button
          type="button"
          onClick={() => applyFormat("[clip: ", "]")}
          className="px-2 py-1 font-mono text-[11px] font-bold rounded bg-violet-600 hover:bg-violet-700 text-white shadow-xs"
          title="Insert Copyable Clip Text"
        >
          📋 Clip Text
        </button>
      </div>

      {/* Editor Textarea */}
      <textarea
        ref={textareaRef}
        className="w-full bg-transparent text-slate-800 dark:text-slate-100 p-3 text-sm focus:outline-none resize-y"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write content... Highlight text and click icons above to format headers (#), bold (**), or clip text ([clip: ...])."
      />
    </div>
  );
}

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
    const normalizedSections = (b.sections || []).map((sec) => {
      const blocks = sec.blocks
        ? sec.blocks.filter((blk) => blk.type === "paragraph" || blk.type === "code")
        : [];

      if (sec.paragraph && blocks.length === 0) {
        blocks.push({ type: "paragraph", value: sec.paragraph });
      }

      return {
        ...sec,
        blocks,
      };
    });

    setEditing({
      ...b,
      sections: normalizedSections,
    });
    setIsNew(false);
    setModal(true);
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    setUploading(true);
    try {
      const base64 = await fileToBase64(file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base64,
          folder: "portfolio/blogs",
          oldPublicId: editing.coverImagePublicId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Image upload failed");

      setEditing({
        ...editing,
        coverImage: data.url,
        coverImagePublicId: data.publicId,
      });

      toast.success("Cover image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  function addSection() {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: [
        ...(editing.sections || []),
        { heading: "", blocks: [{ type: "paragraph", value: "" }] },
      ],
    });
  }

  function removeSection(secIdx: number) {
    if (!editing) return;
    setEditing({
      ...editing,
      sections: editing.sections.filter((_, i) => i !== secIdx),
    });
  }

  function addBlock(secIdx: number, type: "paragraph" | "code") {
    if (!editing) return;
    const updated = [...editing.sections];
    const currentBlocks = updated[secIdx].blocks || [];

    updated[secIdx] = {
      ...updated[secIdx],
      blocks: [...currentBlocks, { type, value: "" }],
    };

    setEditing({ ...editing, sections: updated });
  }

  function removeBlock(secIdx: number, blockIdx: number) {
    if (!editing) return;
    const updated = [...editing.sections];
    const currentBlocks = updated[secIdx].blocks || [];

    updated[secIdx] = {
      ...updated[secIdx],
      blocks: currentBlocks.filter((_, i) => i !== blockIdx),
    };

    setEditing({ ...editing, sections: updated });
  }

  function updateBlockValue(secIdx: number, blockIdx: number, value: string) {
    if (!editing) return;
    const updated = [...editing.sections];
    const currentBlocks = [...(updated[secIdx].blocks || [])];

    if (currentBlocks[blockIdx]) {
      currentBlocks[blockIdx] = { ...currentBlocks[blockIdx], value };
    }

    updated[secIdx] = {
      ...updated[secIdx],
      blocks: currentBlocks,
    };

    setEditing({ ...editing, sections: updated });
  }

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
      const url = "/api/admin/blogs";
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
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
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
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-violet-600/10 dark:bg-violet-600/15 blur-[100px] rounded-full" />

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-80 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Confirm Deletion</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {modal && editing && (
        <Modal title={isNew ? "Create New Blog Post" : "Edit Blog Post"} onClose={() => setModal(false)}>
          <div className="space-y-4">
            <Field label="Blog Title">
              <input
                className={inputClasses}
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Write Blog Title..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category Tag">
                <input
                  className={inputClasses}
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  placeholder="Web Application"
                />
              </Field>

              <Field label="Cover Image Upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-xs text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-violet-700 file:text-white hover:file:bg-violet-600 cursor-pointer border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/80 p-1 transition-colors"
                />
              </Field>
            </div>

            {editing.coverImage && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mt-2">
                <img src={editing.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}

            <Field label="Excerpt / Card Summary">
              <textarea
                className={inputClasses + " resize-y"}
                rows={2}
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                placeholder="Write card Summary..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Author Name">
                <input
                  className={inputClasses}
                  value={editing.authorName}
                  onChange={(e) => setEditing({ ...editing, authorName: e.target.value })}
                  placeholder="Shaikh Arif"
                />
              </Field>
              <Field label="Author Role">
                <input
                  className={inputClasses}
                  value={editing.authorRole}
                  onChange={(e) => setEditing({ ...editing, authorRole: e.target.value })}
                  placeholder="Full-Stack Developer"
                />
              </Field>
            </div>

            {/* Sections & Blocks */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                  Article Content Blocks
                </span>
                <button
                  type="button"
                  onClick={addSection}
                  className="px-3 py-1.5 text-xs font-bold bg-violet-600/10 text-violet-700 dark:text-violet-300 rounded-xl hover:bg-violet-600/20 transition-colors cursor-pointer"
                >
                  + Add New Section Block
                </button>
              </div>

              {editing.sections?.map((sec, secIdx) => (
                <div
                  key={secIdx}
                  className="p-4 bg-slate-50/80 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                      Section #{secIdx + 1}
                    </span>
                    {editing.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(secIdx)}
                        className="text-xs font-semibold text-red-500 hover:text-red-600 dark:text-red-400 cursor-pointer"
                      >
                        Remove Section
                      </button>
                    )}
                  </div>

                  {/* Content Blocks */}
                  <div className="space-y-3 pt-1">
                    {(sec.blocks || []).map((block, blockIdx) => (
                      <div
                        key={blockIdx}
                        className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {block.type === "paragraph" ? "Rich Paragraph Block" : "Code Snippet Block"}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeBlock(secIdx, blockIdx)}
                            className="text-[11px] font-semibold text-red-500 hover:underline cursor-pointer"
                          >
                            Delete Block
                          </button>
                        </div>

                        {/* Rich Toolbar Paragraph Editor */}
                        {block.type === "paragraph" && (
                          <ParagraphEditor
                            value={block.value}
                            onChange={(val) => updateBlockValue(secIdx, blockIdx, val)}
                          />
                        )}

                        {/* Code Snippet Input */}
                        {block.type === "code" && (
                          <textarea
                            className="w-full bg-slate-950 text-cyan-300 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 resize-y"
                            rows={6}
                            value={block.value}
                            onChange={(e) => updateBlockValue(secIdx, blockIdx, e.target.value)}
                            placeholder="Paste your code snippet here..."
                          />
                        )}
                      </div>
                    ))}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => addBlock(secIdx, "paragraph")}
                        className="px-2.5 py-1 text-[11px] font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        + Add Paragraph
                      </button>
                      <button
                        type="button"
                        onClick={() => addBlock(secIdx, "code")}
                        className="px-2.5 py-1 text-[11px] font-bold bg-cyan-950/60 border border-cyan-800/50 hover:bg-cyan-900/60 text-cyan-300 rounded-lg transition-colors cursor-pointer"
                      >
                        + Add Code Snippet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 py-3 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                {saving ? "Saving Post..." : isNew ? "Publish Blog Post" : "Save Changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-5 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl">
          No blog posts found.
        </div>
      ) : (
        <div className="relative space-y-3">
          {items.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between p-4 bg-white dark:bg-[#0b1329] border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-violet-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={b.coverImage}
                  alt={b.title}
                  className="w-16 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-800"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-violet-700 dark:group-hover:text-violet-400 transition-colors truncate">
                    {b.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border border-violet-200/80 dark:border-violet-800/50 px-2 py-0.5 rounded-md uppercase">
                      {b.category || "Web Application"}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{b.excerpt}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(b)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-violet-700 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-600/10 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmDelete(b._id!)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600/10 cursor-pointer"
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

