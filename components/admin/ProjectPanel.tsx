// // "use client";

// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import toast from "react-hot-toast";

// // // ─── Types ───────────────────────────────────────
// // export type Project = {
// //   _id?: string;
// //   type?: string;
// //   title: string;
// //   description: any;
// //   image: string;
// //   imagePublicId?: string;
// //   images: string[];
// //   techStack: string[];
// //   demoUrl: string;
// //   githubUrl: string;
// //   order: number;
// //   outcome: string;
// // };

// // type DescriptionBlock = {
// //   type: "paragraph" | "header" | "list" | "code" | "quote";
// //   header?: string;
// //   text: string;
// // };

// // const blankProject = (): Project => ({
// //   title: "",
// //   type: "Web App",
// //   description: "",
// //   image: "",
// //   imagePublicId: "",
// //   images: [],
// //   techStack: [],
// //   demoUrl: "",
// //   githubUrl: "",
// //   order: 0,
// //   outcome: "",
// // });

// // // ─── Description Normalizers (Blog Post Style) ───
// // function normalizeDescription(desc: any): DescriptionBlock[] {
// //   if (Array.isArray(desc) && desc.length > 0) {
// //     return desc.map((b: any) => ({
// //       type: b.type || (b.header ? "header" : "paragraph"),
// //       header: b.header || "",
// //       text: b.text || "",
// //     }));
// //   }
// //   if (typeof desc === "string" && desc.trim()) {
// //     return [{ type: "paragraph", header: "", text: desc }];
// //   }
// //   return [{ type: "paragraph", header: "", text: "" }];
// // }

// // function denormalizeDescription(blocks: DescriptionBlock[]): any {
// //   const cleaned = blocks
// //     .map((b) => ({
// //       type: b.type,
// //       header: b.header?.trim() || "",
// //       text: b.text.trim(),
// //     }))
// //     .filter((b) => b.text || b.header);

// //   if (cleaned.length === 0) return "";
// //   if (cleaned.length === 1 && cleaned[0].type === "paragraph" && !cleaned[0].header) {
// //     return cleaned[0].text;
// //   }
// //   return cleaned;
// // }

// // function previewDescription(desc: any): string {
// //   if (typeof desc === "string") return desc;
// //   if (Array.isArray(desc) && desc.length > 0) return desc[0].text || desc[0].header || "";
// //   return "";
// // }

// // // ─── Shared UI Styles ───
// // const inp = [
// //   "w-full bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100",
// //   "border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm",
// //   "placeholder-slate-400 dark:placeholder-slate-500",
// //   "focus:outline-none focus:border-violet-400 dark:focus:border-violet-500",
// //   "transition-colors",
// // ].join(" ");

// // function Field({ label, children }: { label: string; children: React.ReactNode }) {
// //   return (
// //     <div>
// //       <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
// //         {label}
// //       </label>
// //       {children}
// //     </div>
// //   );
// // }

// // function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
// //       <div className="mt-7 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
// //         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
// //           <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
// //           <button
// //             onClick={onClose}
// //             className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
// //           >
// //             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
// //               <path d="M18 6 6 18M6 6l12 12" />
// //             </svg>
// //           </button>
// //         </div>
// //         <div className="p-5">{children}</div>
// //       </div>
// //     </div>
// //   );
// // }

// // function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
// //       <div className="w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5">
// //         <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
// //           <svg width="18" height="18" fill="none" stroke="#E24B4A" strokeWidth="2" viewBox="0 0 24 24">
// //             <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
// //             <path d="M10 11v6M14 11v6" />
// //           </svg>
// //         </div>
// //         <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Confirm delete</p>
// //         <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{msg}</p>
// //         <div className="flex gap-2 justify-end">
// //           <button
// //             onClick={onCancel}
// //             className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={onConfirm}
// //             className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function Skeleton() {
// //   return (
// //     <div className="space-y-3 animate-pulse">
// //       {[...Array(3)].map((_, i) => (
// //         <div key={i} className="h-19 rounded-2xl bg-slate-100 dark:bg-slate-800" />
// //       ))}
// //     </div>
// //   );
// // }

// // function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
// //   return (
// //     <div className="flex flex-col items-center justify-center py-16 text-center">
// //       <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
// //         <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
// //           <rect x="3" y="3" width="18" height="18" rx="3" />
// //           <path d="M12 8v8M8 12h8" />
// //         </svg>
// //       </div>
// //       <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No {label} yet</p>
// //       <button onClick={onAdd} className="text-xs font-medium text-violet-700 hover:text-violet-600 transition-colors">
// //         Add your first →
// //       </button>
// //     </div>
// //   );
// // }

// // // ─── Upload Components ───
// // function ImageUploader({
// //   currentImage,
// //   onUploaded,
// //   uploading,
// //   setUploading,
// // }: {
// //   currentImage: string;
// //   onUploaded: (url: string, publicId: string) => void;
// //   uploading: boolean;
// //   setUploading: (v: boolean) => void;
// // }) {
// //   const fileRef = useRef<HTMLInputElement>(null);
// //   const [preview, setPreview] = useState(currentImage);
// //   const [dragOver, setDragOver] = useState(false);

// //   useEffect(() => { setPreview(currentImage); }, [currentImage]);

// //   async function handleFile(file: File) {
// //     if (!file.type.startsWith("image/")) {
// //       toast.error("Please select an image file.");
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("Image must be under 5MB.");
// //       return;
// //     }
// //     setUploading(true);
// //     try {
// //       const reader = new FileReader();
// //       reader.onloadend = async () => {
// //         const base64 = reader.result as string;
// //         setPreview(base64);
// //         const res = await fetch("/api/admin/upload", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ base64, folder: "portfolio/projects" }),
// //         });
// //         const data = await res.json();
// //         if (!res.ok) throw new Error(data.error || "Upload failed");
// //         onUploaded(data.url, data.publicId);
// //         toast.success("Image uploaded!");
// //       };
// //       reader.readAsDataURL(file);
// //     } catch (e: any) {
// //       toast.error(e.message);
// //       setPreview(currentImage);
// //     } finally {
// //       setUploading(false);
// //     }
// //   }

// //   return (
// //     <div className="space-y-2">
// //       <div
// //         onDragOver={e => { e.preventDefault(); setDragOver(true); }}
// //         onDragLeave={() => setDragOver(false)}
// //         onDrop={e => {
// //           e.preventDefault();
// //           setDragOver(false);
// //           const file = e.dataTransfer.files[0];
// //           if (file) handleFile(file);
// //         }}
// //         onClick={() => fileRef.current?.click()}
// //         className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
// //           ${dragOver
// //             ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
// //             : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
// //           }`}
// //       >
// //         {preview ? (
// //           <div className="relative h-40 w-full">
// //             {/* eslint-disable-next-line @next/next/no-img-element */}
// //             <img src={preview} alt="preview" className="w-full h-full object-cover" />
// //             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
// //               <span className="text-white text-xs font-medium">Click or drop to replace</span>
// //             </div>
// //             {uploading && (
// //               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
// //                 <div className="flex flex-col items-center gap-2">
// //                   <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
// //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
// //                   </svg>
// //                   <span className="text-white text-xs">Uploading…</span>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           <div className="flex flex-col items-center justify-center py-8 gap-2">
// //             {uploading ? (
// //               <>
// //                 <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
// //                 </svg>
// //                 <span className="text-xs text-slate-400">Uploading…</span>
// //               </>
// //             ) : (
// //               <>
// //                 <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
// //                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //                   <polyline points="17 8 12 3 7 8" />
// //                   <line x1="12" y1="3" x2="12" y2="15" />
// //                 </svg>
// //                 <p className="text-xs text-slate-500 dark:text-slate-400">Drop image here or click to browse</p>
// //                 <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
// //               </>
// //             )}
// //           </div>
// //         )}
// //         <input
// //           ref={fileRef}
// //           type="file"
// //           accept="image/*"
// //           className="hidden"
// //           onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
// //         />
// //       </div>

// //       <div className="flex items-center gap-2">
// //         <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
// //         <span className="text-[10px] text-slate-400 uppercase tracking-wider">or paste URL</span>
// //         <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
// //       </div>
// //       <input
// //         className={inp}
// //         value={preview.startsWith("data:") ? "" : preview}
// //         onChange={e => {
// //           setPreview(e.target.value);
// //           onUploaded(e.target.value, "");
// //         }}
// //         placeholder="https://example.com/image.jpg"
// //       />
// //     </div>
// //   );
// // }

// // function MultiImageUploader({
// //   currentImages,
// //   onChange,
// // }: {
// //   currentImages: string[];
// //   onChange: (images: string[]) => void;
// // }) {
// //   const fileRef = useRef<HTMLInputElement>(null);
// //   const [dragOver, setDragOver] = useState(false);
// //   const [pending, setPending] = useState(0);

// //   async function uploadOne(file: File): Promise<string | null> {
// //     if (!file.type.startsWith("image/")) {
// //       toast.error(`${file.name} is not an image.`);
// //       return null;
// //     }
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error(`${file.name} is over 5MB.`);
// //       return null;
// //     }
// //     const base64: string = await new Promise((resolve, reject) => {
// //       const reader = new FileReader();
// //       reader.onloadend = () => resolve(reader.result as string);
// //       reader.onerror = reject;
// //       reader.readAsDataURL(file);
// //     });
// //     const res = await fetch("/api/admin/upload", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ base64, folder: "portfolio/projects/gallery" }),
// //     });
// //     const data = await res.json();
// //     if (!res.ok) throw new Error(data.error || `Failed to upload ${file.name}`);
// //     return data.url as string;
// //   }

// //   async function handleFiles(fileList: FileList | File[]) {
// //     const files = Array.from(fileList);
// //     if (files.length === 0) return;
// //     setPending(files.length);
// //     const uploaded: string[] = [];
// //     try {
// //       for (const file of files) {
// //         try {
// //           const url = await uploadOne(file);
// //           if (url) uploaded.push(url);
// //         } catch (e: any) {
// //           toast.error(e.message);
// //         } finally {
// //           setPending(p => Math.max(0, p - 1));
// //         }
// //       }
// //       if (uploaded.length > 0) {
// //         onChange([...currentImages, ...uploaded]);
// //         toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} added!`);
// //       }
// //     } finally {
// //       setPending(0);
// //     }
// //   }

// //   function removeAt(index: number) {
// //     onChange(currentImages.filter((_, i) => i !== index));
// //   }

// //   function move(index: number, dir: -1 | 1) {
// //     const target = index + dir;
// //     if (target < 0 || target >= currentImages.length) return;
// //     const next = [...currentImages];
// //     [next[index], next[target]] = [next[target], next[index]];
// //     onChange(next);
// //   }

// //   return (
// //     <div className="space-y-3">
// //       <div
// //         onDragOver={e => { e.preventDefault(); setDragOver(true); }}
// //         onDragLeave={() => setDragOver(false)}
// //         onDrop={e => {
// //           e.preventDefault();
// //           setDragOver(false);
// //           if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
// //         }}
// //         onClick={() => fileRef.current?.click()}
// //         className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 py-6 flex flex-col items-center justify-center gap-2
// //           ${dragOver
// //             ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
// //             : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
// //           }`}
// //       >
// //         {pending > 0 ? (
// //           <>
// //             <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
// //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
// //             </svg>
// //             <span className="text-xs text-slate-400">Uploading {pending} image{pending > 1 ? "s" : ""}…</span>
// //           </>
// //         ) : (
// //           <>
// //             <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
// //               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
// //               <polyline points="17 8 12 3 7 8" />
// //               <line x1="12" y1="3" x2="12" y2="15" />
// //             </svg>
// //             <p className="text-xs text-slate-500 dark:text-slate-400">Drop gallery images here or click to browse</p>
// //           </>
// //         )}
// //         <input
// //           ref={fileRef}
// //           type="file"
// //           accept="image/*"
// //           multiple
// //           className="hidden"
// //           onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
// //         />
// //       </div>

// //       {currentImages.length > 0 && (
// //         <div className="grid grid-cols-3 gap-2">
// //           {currentImages.map((src, i) => (
// //             <div key={`${src}-${i}`} className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
// //               {/* eslint-disable-next-line @next/next/no-img-element */}
// //               <img src={src} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
// //               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
// //                 <button
// //                   type="button"
// //                   onClick={() => move(i, -1)}
// //                   disabled={i === 0}
// //                   className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
// //                 >
// //                   ←
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeAt(i)}
// //                   className="w-6 h-6 flex items-center justify-center rounded-md bg-red-500/90 text-white hover:bg-red-500 transition-colors cursor-pointer"
// //                 >
// //                   ✕
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => move(i, 1)}
// //                   disabled={i === currentImages.length - 1}
// //                   className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
// //                 >
// //                   →
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ─── Main Projects Panel Component ───
// // export default function ProjectsPanel({ autoOpen }: { autoOpen?: boolean }) {
// //   const [items, setItems] = useState<Project[]>([]);
// //   const [modal, setModal] = useState(false);
// //   const [editing, setEditing] = useState<Project | null>(null);
// //   const [isNew, setIsNew] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [uploading, setUploading] = useState(false);
// //   const [confirm, setConfirm] = useState<string | null>(null);
// //   const [techInput, setTechInput] = useState("");
// //   const [descBlocks, setDescBlocks] = useState<DescriptionBlock[]>([{ type: "paragraph", header: "", text: "" }]);
// //   const didAutoOpen = useRef(false);

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("/api/admin/projects");
// //       if (!res.ok) throw new Error("Failed to load");
// //       const data = await res.json();
// //       setItems(Array.isArray(data) ? data : []);
// //     } catch {
// //       toast.error("Failed to load projects.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => { load(); }, [load]);

// //   useEffect(() => {
// //     if (autoOpen && !didAutoOpen.current) {
// //       didAutoOpen.current = true;
// //       openNew();
// //     }
// //   }, [autoOpen]);

// //   function openNew() {
// //     setEditing(blankProject());
// //     setIsNew(true);
// //     setTechInput("");
// //     setDescBlocks([{ type: "paragraph", header: "", text: "" }]);
// //     setModal(true);
// //   }

// //   function openEdit(p: Project) {
// //     setEditing({ ...p });
// //     setIsNew(false);
// //     setTechInput(p.techStack ? p.techStack.join(", ") : "");
// //     setDescBlocks(normalizeDescription(p.description));
// //     setModal(true);
// //   }

// //   async function save() {
// //     if (!editing) return;
// //     if (!editing.title.trim()) { toast.error("Title is required."); return; }

// //     const description = denormalizeDescription(descBlocks);
// //     const isEmpty = typeof description === "string" ? !description : description.length === 0;
// //     if (isEmpty) { toast.error("Description is required."); return; }

// //     setSaving(true);
// //     try {
// //       const payload = {
// //         ...editing,
// //         description,
// //         techStack: techInput.split(",").map(s => s.trim()).filter(Boolean),
// //       };
// //       const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${editing._id}`;
// //       const method = isNew ? "POST" : "PUT";
// //       const res = await fetch(url, {
// //         method,
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });
// //       if (!res.ok) {
// //         const err = await res.json();
// //         throw new Error(err.error || "Save failed");
// //       }
// //       toast.success(isNew ? "Project created!" : "Project updated!");
// //       setModal(false);
// //       load();
// //     } catch (e: any) {
// //       toast.error(e.message);
// //     } finally {
// //       setSaving(false);
// //     }
// //   }

// //   async function del(id: string) {
// //     try {
// //       const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
// //       if (!res.ok) throw new Error("Delete failed");
// //       toast.success("Project deleted.");
// //       load();
// //     } catch (e: any) {
// //       toast.error(e.message);
// //     } finally {
// //       setConfirm(null);
// //     }
// //   }

// //   return (
// //     <>
// //       {confirm && (
// //         <ConfirmModal
// //           msg="This will permanently delete the project and its media."
// //           onConfirm={() => del(confirm)}
// //           onCancel={() => setConfirm(null)}
// //         />
// //       )}

// //       {modal && editing && (
// //         <Modal title={isNew ? "Add New Project" : "Edit Project"} onClose={() => setModal(false)}>
// //           <div className="space-y-4">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //               <Field label="Title">
// //                 <input
// //                   className={inp}
// //                   value={editing.title}
// //                   onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))}
// //                   placeholder="e.g. E-Commerce Platform"
// //                 />
// //               </Field>
// //               <Field label="Project Type">
// //                 <input
// //                   className={inp}
// //                   value={editing.type || ""}
// //                   onChange={e => setEditing(p => p && ({ ...p, type: e.target.value }))}
// //                   placeholder="e.g. Web App, SaaS, Mobile App"
// //                 />
// //               </Field>
// //             </div>

// //             {/* ── Blog-style Content Editor Section ── */}
// //             <Field label="Project Story / Content (Blog Style Input)">
// //               <div className="space-y-3">
// //                 {descBlocks.map((block, i) => (
// //                   <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700/80 p-3.5 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5">
// //                     <div className="flex items-center justify-between">
// //                       <select
// //                         className="text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
// //                         value={block.type}
// //                         onChange={e =>
// //                           setDescBlocks(blocks =>
// //                             blocks.map((b, idx) => (idx === i ? { ...b, type: e.target.value as any } : b))
// //                           )
// //                         }
// //                       >
// //                         <option value="paragraph">Paragraph Block</option>
// //                         <option value="header">Subheading Block</option>
// //                         <option value="quote">Quote / Highlight</option>
// //                         <option value="code">Code Snippet</option>
// //                       </select>

// //                       {descBlocks.length > 1 && (
// //                         <button
// //                           type="button"
// //                           onClick={() => setDescBlocks(blocks => blocks.filter((_, idx) => idx !== i))}
// //                           className="text-xs text-red-500 hover:text-red-600 transition-colors"
// //                         >
// //                           Remove Block
// //                         </button>
// //                       )}
// //                     </div>

// //                     <input
// //                       className={inp}
// //                       value={block.header}
// //                       onChange={e =>
// //                         setDescBlocks(blocks =>
// //                           blocks.map((b, idx) => (idx === i ? { ...b, header: e.target.value } : b))
// //                         )
// //                       }
// //                       placeholder="Block Header / Section Title (optional)"
// //                     />

// //                     <textarea
// //                       className={inp + (block.type === "code" ? " font-mono text-xs" : "") + " resize-y"}
// //                       rows={block.type === "header" ? 2 : 4}
// //                       value={block.text}
// //                       onChange={e =>
// //                         setDescBlocks(blocks =>
// //                           blocks.map((b, idx) => (idx === i ? { ...b, text: e.target.value } : b))
// //                         )
// //                       }
// //                       placeholder={
// //                         block.type === "code"
// //                           ? "Write code here..."
// //                           : block.type === "quote"
// //                           ? "Enter callout quote..."
// //                           : "Write main content or body section text..."
// //                       }
// //                     />
// //                   </div>
// //                 ))}

// //                 <button
// //                   type="button"
// //                   onClick={() => setDescBlocks(blocks => [...blocks, { type: "paragraph", header: "", text: "" }])}
// //                   className="w-full py-2 border border-dashed border-violet-300 dark:border-violet-800/60 rounded-xl text-xs font-semibold text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-colors"
// //                 >
// //                   + Add Content Block
// //                 </button>
// //               </div>
// //             </Field>

// //             <Field label="Key Outcome / Impact">
// //               <textarea
// //                 value={editing.outcome || ""}
// //                 onChange={e => setEditing(p => p && ({ ...p, outcome: e.target.value }))}
// //                 className={inp + " resize-y"}
// //                 rows={2}
// //                 placeholder="e.g. Increased conversion rates by 40%..."
// //               />
// //             </Field>

// //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //               <Field label="Demo URL">
// //                 <input
// //                   className={inp}
// //                   value={editing.demoUrl}
// //                   onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))}
// //                   placeholder="https://example.com"
// //                 />
// //               </Field>
// //               <Field label="GitHub URL">
// //                 <input
// //                   className={inp}
// //                   value={editing.githubUrl}
// //                   onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))}
// //                   placeholder="https://github.com/..."
// //                 />
// //               </Field>
// //               <Field label="Display Order">
// //                 <input
// //                   className={inp}
// //                   type="number"
// //                   value={editing.order}
// //                   onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
// //                 />
// //               </Field>
// //             </div>

// //             <Field label="Cover Image">
// //               <ImageUploader
// //                 currentImage={editing.image}
// //                 uploading={uploading}
// //                 setUploading={setUploading}
// //                 onUploaded={(url, publicId) =>
// //                   setEditing(p => p && ({ ...p, image: url, imagePublicId: publicId || p.imagePublicId }))
// //                 }
// //               />
// //             </Field>

// //             <Field label="Gallery Screenshots">
// //               <MultiImageUploader
// //                 currentImages={editing.images || []}
// //                 onChange={imgs => setEditing(p => p && ({ ...p, images: imgs }))}
// //               />
// //             </Field>

// //             <Field label="Tech Stack (comma-separated)">
// //               <input
// //                 className={inp}
// //                 value={techInput}
// //                 onChange={e => setTechInput(e.target.value)}
// //                 placeholder="Next.js, TypeScript, MongoDB, Tailwind CSS"
// //               />
// //             </Field>

// //             <div className="flex gap-2 pt-3">
// //               <button
// //                 onClick={save}
// //                 disabled={saving || uploading}
// //                 className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
// //               >
// //                 {saving ? "Saving…" : uploading ? "Uploading..." : isNew ? "Create Project" : "Save Changes"}
// //               </button>
// //               <button
// //                 onClick={() => setModal(false)}
// //                 className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </Modal>
// //       )}

// //       {/* Stats Header */}
// //       <div className="grid grid-cols-3 gap-3 mb-6">
// //         {[
// //           { v: items.length, l: "Total Projects" },
// //           { v: items.filter(p => p.demoUrl).length, l: "Live Demos" },
// //           { v: items.filter(p => p.githubUrl).length, l: "GitHub Repos" },
// //         ].map(s => (
// //           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
// //             <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
// //             <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
// //           </div>
// //         ))}
// //       </div>

// //       {loading ? (
// //         <Skeleton />
// //       ) : items.length === 0 ? (
// //         <EmptyState label="projects" onAdd={openNew} />
// //       ) : (
// //         <div className="space-y-2.5">
// //           {items.map(p => (
// //             <div
// //               key={p._id}
// //               className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all"
// //             >
// //               {p.image ? (
// //                 /* eslint-disable-next-line @next/next/no-img-element */
// //                 <img
// //                   src={p.image}
// //                   alt={p.title}
// //                   className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-700 shrink-0"
// //                 />
// //               ) : (
// //                 <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
// //                   <span className="text-violet-600 font-bold text-sm">{p.title.slice(0, 2)}</span>
// //                 </div>
// //               )}
// //               <div className="flex-1 min-w-0">
// //                 <div className="flex items-start justify-between gap-2">
// //                   <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</p>
// //                   <div className="flex gap-1 shrink-0">
// //                     <button
// //                       onClick={() => openEdit(p)}
// //                       className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-violet-500 bg-white dark:bg-slate-800 cursor-pointer transition-colors"
// //                     >
// //                       ✎
// //                     </button>
// //                     <button
// //                       onClick={() => setConfirm(p._id!)}
// //                       className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 bg-white dark:bg-slate-800 cursor-pointer transition-colors"
// //                     >
// //                       ✕
// //                     </button>
// //                   </div>
// //                 </div>
// //                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
// //                   {previewDescription(p.description)}
// //                 </p>
// //                 {p.techStack && p.techStack.length > 0 && (
// //                   <div className="flex flex-wrap gap-1 mt-2">
// //                     {p.techStack.map((t, i) => (
// //                       <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
// //                         {t}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </>
// //   );
// // }












// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import toast from "react-hot-toast";

// // ─── Types ───────────────────────────────────────
// export type Project = {
//   _id?: string;
//   type?: string;
//   title: string;
//   description: any;
//   image: string;
//   imagePublicId?: string;
//   images: string[];
//   techStack: string[];
//   demoUrl: string;
//   githubUrl: string;
//   order: number;
//   outcome: string;
// };

// type DescriptionBlock = {
//   type: "paragraph" | "header" | "list" | "code" | "quote";
//   header?: string;
//   text: string;
// };

// const blankProject = (): Project => ({
//   title: "",
//   type: "Web App",
//   description: "",
//   image: "",
//   imagePublicId: "",
//   images: [],
//   techStack: [],
//   demoUrl: "",
//   githubUrl: "",
//   order: 0,
//   outcome: "",
// });

// // ─── Description Normalizers (Blog Post Style) ───
// function normalizeDescription(desc: any): DescriptionBlock[] {
//   if (Array.isArray(desc) && desc.length > 0) {
//     return desc.map((b: any) => ({
//       type: b.type || (b.header ? "header" : "paragraph"),
//       header: b.header || "",
//       text: b.text || "",
//     }));
//   }
//   if (typeof desc === "string" && desc.trim()) {
//     return [{ type: "paragraph", header: "", text: desc }];
//   }
//   return [{ type: "paragraph", header: "", text: "" }];
// }

// function denormalizeDescription(blocks: DescriptionBlock[]): any {
//   const cleaned = blocks
//     .map((b) => ({
//       type: b.type,
//       header: b.header?.trim() || "",
//       text: b.text.trim(),
//     }))
//     .filter((b) => b.text || b.header);

//   if (cleaned.length === 0) return "";
//   if (cleaned.length === 1 && cleaned[0].type === "paragraph" && !cleaned[0].header) {
//     return cleaned[0].text;
//   }
//   return cleaned;
// }

// // ─── Shared UI Styles ───
// const inp = [
//   "w-full bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100",
//   "border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm",
//   "placeholder-slate-400 dark:placeholder-slate-500",
//   "focus:outline-none focus:border-violet-400 dark:focus:border-violet-500",
//   "transition-colors",
// ].join(" ");

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="mt-7 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
//           <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
//           >
//             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//               <path d="M18 6 6 18M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

// function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5">
//         <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
//           <svg width="18" height="18" fill="none" stroke="#E24B4A" strokeWidth="2" viewBox="0 0 24 24">
//             <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//             <path d="M10 11v6M14 11v6" />
//           </svg>
//         </div>
//         <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Confirm delete</p>
//         <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{msg}</p>
//         <div className="flex gap-2 justify-end">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Rich Paragraph Block Component (from screenshot) ───
// function RichParagraphEditor({
//   blocks,
//   setBlocks,
// }: {
//   blocks: DescriptionBlock[];
//   setBlocks: React.Dispatch<React.SetStateAction<DescriptionBlock[]>>;
// }) {
//   const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

//   const applyFormatting = (index: number, prefix: string, suffix: string = "") => {
//     const el = textareaRefs.current[index];
//     if (!el) return;

//     const start = el.selectionStart;
//     const end = el.selectionEnd;
//     const currentText = blocks[index].text;
//     const selectedText = currentText.substring(start, end);

//     const newText =
//       currentText.substring(0, start) +
//       prefix +
//       (selectedText || "") +
//       suffix +
//       currentText.substring(end);

//     setBlocks((prev) =>
//       prev.map((b, idx) => (idx === index ? { ...b, text: newText } : b))
//     );

//     setTimeout(() => {
//       el.focus();
//       el.setSelectionRange(
//         start + prefix.length,
//         end + prefix.length
//       );
//     }, 0);
//   };

//   return (
//     <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
//       {blocks.map((block, index) => (
//         <div
//           key={index}
//           className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
//         >
//           <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
//             Section #{index + 1}
//           </div>

//           <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/30 dark:bg-slate-900/20 space-y-3">
//             {/* Block Badge and Delete Action */}
//             <div className="flex items-center justify-between">
//               <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-md uppercase">
//                 {block.type === "code" ? "CODE BLOCK" : "RICH PARAGRAPH BLOCK"}
//               </span>

//               {blocks.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setBlocks((prev) => prev.filter((_, i) => i !== index))
//                   }
//                   className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
//                 >
//                   Delete Block
//                 </button>
//               )}
//             </div>

//             {/* Toolbar Buttons */}
//             <div className="flex items-center gap-1.5 flex-wrap p-1.5 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "# ")}
//                 className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 H1
//               </button>
//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "## ")}
//                 className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 H2
//               </button>
//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "### ")}
//                 className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 H3
//               </button>
//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "#### ")}
//                 className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 H4
//               </button>

//               <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "**", "**")}
//                 className="px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 B
//               </button>

//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "`", "`")}
//                 className="px-2.5 py-1 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
//               >
//                 `code`
//               </button>

//               <button
//                 type="button"
//                 onClick={() => applyFormatting(index, "([clip: ", "])")}
//                 className="px-3 py-1 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-sm transition-colors flex items-center gap-1"
//               >
//                 📋 Clip Text
//               </button>
//             </div>

//             {/* Rich Text Editor Input Area */}
//             <textarea
//               ref={(el) => {
//                 textareaRefs.current[index] = el;
//               }}
//               rows={4}
//               className={inp + " resize-y font-normal text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80"}
//               value={block.text}
//               onChange={(e) =>
//                 setBlocks((prev) =>
//                   prev.map((b, i) => (i === index ? { ...b, text: e.target.value } : b))
//                 )
//               }
//               placeholder="Write content... Highlight text and click icons above to format headers (#), bold (**), or clip text ([clip: ...])."
//             />
//           </div>
//         </div>
//       ))}

//       {/* Action Buttons to Add New Blocks */}
//       <div className="flex gap-2 pt-1">
//         <button
//           type="button"
//           onClick={() =>
//             setBlocks((prev) => [...prev, { type: "paragraph", header: "", text: "" }])
//           }
//           className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors"
//         >
//           + Add Paragraph
//         </button>

//         <button
//           type="button"
//           onClick={() =>
//             setBlocks((prev) => [...prev, { type: "code", header: "", text: "" }])
//           }
//           className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors"
//         >
//           + Add Code Snippet
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── Upload Components ───
// function ImageUploader({
//   currentImage,
//   onUploaded,
//   uploading,
//   setUploading,
// }: {
//   currentImage: string;
//   onUploaded: (url: string, publicId: string) => void;
//   uploading: boolean;
//   setUploading: (v: boolean) => void;
// }) {
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState(currentImage);
//   const [dragOver, setDragOver] = useState(false);

//   useEffect(() => { setPreview(currentImage); }, [currentImage]);

//   async function handleFile(file: File) {
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file.");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be under 5MB.");
//       return;
//     }
//     setUploading(true);
//     try {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         const base64 = reader.result as string;
//         setPreview(base64);
//         const res = await fetch("/api/admin/upload", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ base64, folder: "portfolio/projects" }),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data.error || "Upload failed");
//         onUploaded(data.url, data.publicId);
//         toast.success("Image uploaded!");
//       };
//       reader.readAsDataURL(file);
//     } catch (e: any) {
//       toast.error(e.message);
//       setPreview(currentImage);
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <div className="space-y-2">
//       <div
//         onDragOver={e => { e.preventDefault(); setDragOver(true); }}
//         onDragLeave={() => setDragOver(false)}
//         onDrop={e => {
//           e.preventDefault();
//           setDragOver(false);
//           const file = e.dataTransfer.files[0];
//           if (file) handleFile(file);
//         }}
//         onClick={() => fileRef.current?.click()}
//         className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
//           ${dragOver
//             ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
//             : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
//           }`}
//       >
//         {preview ? (
//           <div className="relative h-40 w-full">
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img src={preview} alt="preview" className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//               <span className="text-white text-xs font-medium">Click or drop to replace</span>
//             </div>
//             {uploading && (
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                 <div className="flex flex-col items-center gap-2">
//                   <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
//                   <span className="text-white text-xs">Uploading…</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-8 gap-2">
//             {uploading ? (
//               <>
//                 <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                 </svg>
//                 <span className="text-xs text-slate-400">Uploading…</span>
//               </>
//             ) : (
//               <>
//                 <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
//                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                   <polyline points="17 8 12 3 7 8" />
//                   <line x1="12" y1="3" x2="12" y2="15" />
//                 </svg>
//                 <p className="text-xs text-slate-500 dark:text-slate-400">Drop image here or click to browse</p>
//                 <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
//               </>
//             )}
//           </div>
//         )}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
//         />
//       </div>

//       <div className="flex items-center gap-2">
//         <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
//         <span className="text-[10px] text-slate-400 uppercase tracking-wider">or paste URL</span>
//         <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
//       </div>
//       <input
//         className={inp}
//         value={preview.startsWith("data:") ? "" : preview}
//         onChange={e => {
//           setPreview(e.target.value);
//           onUploaded(e.target.value, "");
//         }}
//         placeholder="https://example.com/image.jpg"
//       />
//     </div>
//   );
// }

// function MultiImageUploader({
//   currentImages,
//   onChange,
// }: {
//   currentImages: string[];
//   onChange: (images: string[]) => void;
// }) {
//   const fileRef = useRef<HTMLInputElement>(null);
//   const [dragOver, setDragOver] = useState(false);
//   const [pending, setPending] = useState(0);

//   async function uploadOne(file: File): Promise<string | null> {
//     if (!file.type.startsWith("image/")) {
//       toast.error(`${file.name} is not an image.`);
//       return null;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error(`${file.name} is over 5MB.`);
//       return null;
//     }
//     const base64: string = await new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//     const res = await fetch("/api/admin/upload", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ base64, folder: "portfolio/projects/gallery" }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || `Failed to upload ${file.name}`);
//     return data.url as string;
//   }

//   async function handleFiles(fileList: FileList | File[]) {
//     const files = Array.from(fileList);
//     if (files.length === 0) return;
//     setPending(files.length);
//     const uploaded: string[] = [];
//     try {
//       for (const file of files) {
//         try {
//           const url = await uploadOne(file);
//           if (url) uploaded.push(url);
//         } catch (e: any) {
//           toast.error(e.message);
//         } finally {
//           setPending(p => Math.max(0, p - 1));
//         }
//       }
//       if (uploaded.length > 0) {
//         onChange([...currentImages, ...uploaded]);
//         toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} added!`);
//       }
//     } finally {
//       setPending(0);
//     }
//   }

//   function removeAt(index: number) {
//     onChange(currentImages.filter((_, i) => i !== index));
//   }

//   function move(index: number, dir: -1 | 1) {
//     const target = index + dir;
//     if (target < 0 || target >= currentImages.length) return;
//     const next = [...currentImages];
//     [next[index], next[target]] = [next[target], next[index]];
//     onChange(next);
//   }

//   return (
//     <div className="space-y-3">
//       <div
//         onDragOver={e => { e.preventDefault(); setDragOver(true); }}
//         onDragLeave={() => setDragOver(false)}
//         onDrop={e => {
//           e.preventDefault();
//           setDragOver(false);
//           if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
//         }}
//         onClick={() => fileRef.current?.click()}
//         className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 py-6 flex flex-col items-center justify-center gap-2
//           ${dragOver
//             ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
//             : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
//           }`}
//       >
//         {pending > 0 ? (
//           <>
//             <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//             </svg>
//             <span className="text-xs text-slate-400">Uploading {pending} image{pending > 1 ? "s" : ""}…</span>
//           </>
//         ) : (
//           <>
//             <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//               <polyline points="17 8 12 3 7 8" />
//               <line x1="12" y1="3" x2="12" y2="15" />
//             </svg>
//             <p className="text-xs text-slate-500 dark:text-slate-400">Drop gallery images here or click to browse</p>
//           </>
//         )}
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           multiple
//           className="hidden"
//           onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
//         />
//       </div>

//       {currentImages.length > 0 && (
//         <div className="grid grid-cols-3 gap-2">
//           {currentImages.map((src, i) => (
//             <div key={`${src}-${i}`} className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
//               {/* eslint-disable-next-line @next/next/no-img-element */}
//               <img src={src} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
//                 <button
//                   type="button"
//                   onClick={() => move(i, -1)}
//                   disabled={i === 0}
//                   className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
//                 >
//                   ←
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => removeAt(i)}
//                   className="w-6 h-6 flex items-center justify-center rounded-md bg-red-500/90 text-white hover:bg-red-500 transition-colors cursor-pointer"
//                 >
//                   ✕
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => move(i, 1)}
//                   disabled={i === currentImages.length - 1}
//                   className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
//                 >
//                   →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main Projects Panel Component ───
// export default function ProjectsPanel({ autoOpen }: { autoOpen?: boolean }) {
//   const [items, setItems] = useState<Project[]>([]);
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState<Project | null>(null);
//   const [isNew, setIsNew] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [confirm, setConfirm] = useState<string | null>(null);
//   const [techInput, setTechInput] = useState("");
//   const [descBlocks, setDescBlocks] = useState<DescriptionBlock[]>([{ type: "paragraph", header: "", text: "" }]);
//   const didAutoOpen = useRef(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/projects");
//       if (!res.ok) throw new Error("Failed to load");
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load projects.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   useEffect(() => {
//     if (autoOpen && !didAutoOpen.current) {
//       didAutoOpen.current = true;
//       openNew();
//     }
//   }, [autoOpen]);

//   function openNew() {
//     setEditing(blankProject());
//     setIsNew(true);
//     setTechInput("");
//     setDescBlocks([{ type: "paragraph", header: "", text: "" }]);
//     setModal(true);
//   }

//   function openEdit(p: Project) {
//     setEditing({ ...p });
//     setIsNew(false);
//     setTechInput(p.techStack ? p.techStack.join(", ") : "");
//     setDescBlocks(normalizeDescription(p.description));
//     setModal(true);
//   }

//   async function save() {
//     if (!editing) return;
//     if (!editing.title.trim()) { toast.error("Title is required."); return; }

//     const description = denormalizeDescription(descBlocks);
//     const isEmpty = typeof description === "string" ? !description : description.length === 0;
//     if (isEmpty) { toast.error("Description is required."); return; }

//     setSaving(true);
//     try {
//       const payload = {
//         ...editing,
//         description,
//         techStack: techInput.split(",").map(s => s.trim()).filter(Boolean),
//       };
//       const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${editing._id}`;
//       const method = isNew ? "POST" : "PUT";
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Save failed");
//       }
//       toast.success(isNew ? "Project created!" : "Project updated!");
//       setModal(false);
//       load();
//     } catch (e: any) {
//       toast.error(e.message);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function del(id: string) {
//     try {
//       const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("Project deleted.");
//       load();
//     } catch (e: any) {
//       toast.error(e.message);
//     } finally {
//       setConfirm(null);
//     }
//   }

//   return (
//     <>
//       {confirm && (
//         <ConfirmModal
//           msg="This will permanently delete the project and its media."
//           onConfirm={() => del(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}

//       {modal && editing && (
//         <Modal title={isNew ? "Add New Project" : "Edit Project"} onClose={() => setModal(false)}>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <Field label="Title">
//                 <input
//                   className={inp}
//                   value={editing.title}
//                   onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))}
//                   placeholder="e.g. E-Commerce Platform"
//                 />
//               </Field>
//               <Field label="Project Type">
//                 <input
//                   className={inp}
//                   value={editing.type || ""}
//                   onChange={e => setEditing(p => p && ({ ...p, type: e.target.value }))}
//                   placeholder="e.g. Web App, SaaS, Mobile App"
//                 />
//               </Field>
//             </div>

//             {/* ── Rich Paragraph Editor Section (Screenshot Implementation) ── */}
//             <Field label="Project Story / Content Editor">
//               <RichParagraphEditor blocks={descBlocks} setBlocks={setDescBlocks} />
//             </Field>

//             <Field label="Key Outcome / Impact">
//               <textarea
//                 value={editing.outcome || ""}
//                 onChange={e => setEditing(p => p && ({ ...p, outcome: e.target.value }))}
//                 className={inp + " resize-y"}
//                 rows={2}
//                 placeholder="e.g. Increased conversion rates by 40%..."
//               />
//             </Field>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <Field label="Demo URL">
//                 <input
//                   className={inp}
//                   value={editing.demoUrl}
//                   onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))}
//                   placeholder="https://example.com"
//                 />
//               </Field>
//               <Field label="GitHub URL">
//                 <input
//                   className={inp}
//                   value={editing.githubUrl}
//                   onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))}
//                   placeholder="https://github.com/..."
//                 />
//               </Field>
//               <Field label="Display Order">
//                 <input
//                   className={inp}
//                   type="number"
//                   value={editing.order}
//                   onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
//                 />
//               </Field>
//             </div>

//             <Field label="Cover Image">
//               <ImageUploader
//                 currentImage={editing.image}
//                 uploading={uploading}
//                 setUploading={setUploading}
//                 onUploaded={(url, publicId) =>
//                   setEditing(p => p && ({ ...p, image: url, imagePublicId: publicId || p.imagePublicId }))
//                 }
//               />
//             </Field>

//             <Field label="Gallery Screenshots">
//               <MultiImageUploader
//                 currentImages={editing.images || []}
//                 onChange={imgs => setEditing(p => p && ({ ...p, images: imgs }))}
//               />
//             </Field>

//             <Field label="Tech Stack (comma-separated)">
//               <input
//                 className={inp}
//                 value={techInput}
//                 onChange={e => setTechInput(e.target.value)}
//                 placeholder="Next.js, TypeScript, MongoDB, Tailwind CSS"
//               />
//             </Field>

//             <div className="flex gap-2 pt-3">
//               <button
//                 onClick={save}
//                 disabled={saving || uploading}
//                 className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
//               >
//                 {saving ? "Saving…" : uploading ? "Uploading..." : isNew ? "Create Project" : "Save Changes"}
//               </button>
//               <button
//                 onClick={() => setModal(false)}
//                 className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Stats Header */}
//       <div className="grid grid-cols-3 gap-3 mb-6">
//         {[
//           { v: items.length, l: "Total Projects" },
//           { v: items.filter(p => p.demoUrl).length, l: "Live Demos" },
//           { v: items.filter(p => p.githubUrl).length, l: "GitHub Repos" },
//         ].map(s => (
//           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700/50">
//             <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{s.v}</p>
//             <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</p>
//           </div>
//         ))}
//       </div>

//       {/* Projects List Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
//           Projects List
//         </h2>
//         <button
//           onClick={openNew}
//           className="px-3.5 py-2 bg-violet-700 hover:bg-violet-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
//         >
//           + Add Project
//         </button>
//       </div>

//       {/* Projects List */}
//       {loading ? (
//         <div className="space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
//           ))}
//         </div>
//       ) : items.length === 0 ? (
//         <div className="text-center py-12 text-slate-400 text-xs">No projects found. Create one!</div>
//       ) : (
//         <div className="space-y-3">
//           {items.map(p => (
//             <div
//               key={p._id}
//               className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
//             >
//               <div className="flex items-center gap-3">
//                 {p.image ? (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
//                 ) : (
//                   <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-400">
//                     No img
//                   </div>
//                 )}
//                 <div>
//                   <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</h4>
//                   <p className="text-xs text-slate-500 dark:text-slate-400">{p.type || "Web App"}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => openEdit(p)}
//                   className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => p._id && setConfirm(p._id)}
//                   className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }




"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";

// ─── Types ───────────────────────────────────────
export type Project = {
  _id?: string;
  type?: string;
  title: string;
  description: any;
  image: string;
  imagePublicId?: string;
  images: string[];
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  order: number;
  outcome: string;
};

type DescriptionBlock = {
  type: "paragraph" | "header" | "list" | "code" | "quote";
  header?: string;
  text: string;
};

const blankProject = (): Project => ({
  title: "",
  type: "Web App",
  description: "",
  image: "",
  imagePublicId: "",
  images: [],
  techStack: [],
  demoUrl: "",
  githubUrl: "",
  order: 0,
  outcome: "",
});

// ─── Description Normalizers (Blog Post Style) ───
function normalizeDescription(desc: any): DescriptionBlock[] {
  if (Array.isArray(desc) && desc.length > 0) {
    return desc.map((b: any) => ({
      type: b.type || (b.header ? "header" : "paragraph"),
      header: b.header || "",
      text: b.text || "",
    }));
  }
  if (typeof desc === "string" && desc.trim()) {
    return [{ type: "paragraph", header: "", text: desc }];
  }
  return [{ type: "paragraph", header: "", text: "" }];
}

function denormalizeDescription(blocks: DescriptionBlock[]): any {
  const cleaned = blocks
    .map((b) => ({
      type: b.type,
      header: b.header?.trim() || "",
      text: b.text.trim(),
    }))
    .filter((b) => b.text || b.header);

  if (cleaned.length === 0) return "";
  if (cleaned.length === 1 && cleaned[0].type === "paragraph" && !cleaned[0].header) {
    return cleaned[0].text;
  }
  return cleaned;
}

// ─── Shared UI Styles ───
const inp = [
  "w-full bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100",
  "border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm",
  "placeholder-slate-400 dark:placeholder-slate-500",
  "focus:outline-none focus:border-violet-400 dark:focus:border-violet-500",
  "transition-colors",
].join(" ");

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="mt-7 w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ msg, onConfirm, onCancel }: { msg: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-5">
        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
          <svg width="18" height="18" fill="none" stroke="#E24B4A" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Confirm delete</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{msg}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Rich Paragraph & Code Block Editor Component ───
function RichParagraphEditor({
  blocks,
  setBlocks,
}: {
  blocks: DescriptionBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<DescriptionBlock[]>>;
}) {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  const applyFormatting = (index: number, prefix: string, suffix: string = "") => {
    const el = textareaRefs.current[index];
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const currentText = blocks[index].text;
    const selectedText = currentText.substring(start, end);

    const newText =
      currentText.substring(0, start) +
      prefix +
      (selectedText || "") +
      suffix +
      currentText.substring(end);

    setBlocks((prev) =>
      prev.map((b, idx) => (idx === index ? { ...b, text: newText } : b))
    );

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3"
        >
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Section #{index + 1}
          </div>

          <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/30 dark:bg-slate-900/20 space-y-3">
            {/* Block Badge and Delete Action */}
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded-md uppercase ${
                  block.type === "code"
                    ? "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {block.type === "code" ? "CODE BLOCK" : "RICH PARAGRAPH BLOCK"}
              </span>

              {blocks.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setBlocks((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Delete Block
                </button>
              )}
            </div>

            {/* Toolbar Buttons (Only for rich text paragraphs) */}
            {block.type !== "code" && (
              <div className="flex items-center gap-1.5 flex-wrap p-1.5 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={() => applyFormatting(index, "# ")}
                  className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting(index, "## ")}
                  className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting(index, "### ")}
                  className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => applyFormatting(index, "#### ")}
                  className="px-2.5 py-1 text-xs font-bold text-violet-600 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  H4
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />

                <button
                  type="button"
                  onClick={() => applyFormatting(index, "**", "**")}
                  className="px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  B
                </button>

                <button
                  type="button"
                  onClick={() => applyFormatting(index, "`", "`")}
                  className="px-2.5 py-1 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  `code`
                </button>

                <button
                  type="button"
                  onClick={() => applyFormatting(index, "([clip: ", "])")}
                  className="px-3 py-1 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                >
                  📋 Clip Text
                </button>
              </div>
            )}

            {/* Input Area */}
            <textarea
              ref={(el) => {
                textareaRefs.current[index] = el;
              }}
              rows={block.type === "code" ? 6 : 4}
              className={`${inp} resize-y ${
                block.type === "code"
                  ? "font-mono text-xs text-slate-700 dark:text-teal-300 bg-slate-900 dark:bg-slate-950"
                  : "font-normal text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/80"
              }`}
              value={block.text}
              onChange={(e) =>
                setBlocks((prev) =>
                  prev.map((b, i) => (i === index ? { ...b, text: e.target.value } : b))
                )
              }
              placeholder={
                block.type === "code"
                  ? "// Paste or write source code here..."
                  : "Write content... Highlight text and click icons above to format headers (#), bold (**), or clip text ([clip: ...])."
              }
            />
          </div>
        </div>
      ))}

      {/* Action Buttons to Add New Blocks */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={() =>
            setBlocks((prev) => [...prev, { type: "paragraph", header: "", text: "" }])
          }
          className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          + Add Paragraph
        </button>

        <button
          type="button"
          onClick={() =>
            setBlocks((prev) => [...prev, { type: "code", header: "", text: "" }])
          }
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
        >
          + Add Code Snippet
        </button>
      </div>
    </div>
  );
}

// ─── Image Upload Components ───
function ImageUploader({
  currentImage,
  onUploaded,
  uploading,
  setUploading,
}: {
  currentImage: string;
  onUploaded: (url: string, publicId: string) => void;
  uploading: boolean;
  setUploading: (v: boolean) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(currentImage);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => { setPreview(currentImage); }, [currentImage]);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setPreview(base64);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64, folder: "portfolio/projects" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onUploaded(data.url, data.publicId);
        toast.success("Image uploaded!");
      };
      reader.readAsDataURL(file);
    } catch (e: any) {
      toast.error(e.message);
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => fileRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
          ${dragOver
            ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
            : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
          }`}
      >
        {preview ? (
          <div className="relative h-40 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium">Click or drop to replace</span>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <svg className="animate-spin w-6 h-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span className="text-white text-xs">Uploading…</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            {uploading ? (
              <>
                <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-xs text-slate-400">Uploading…</span>
              </>
            ) : (
              <>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-xs text-slate-500 dark:text-slate-400">Drop image here or click to browse</p>
                <p className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</p>
              </>
            )}
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">or paste URL</span>
        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-700" />
      </div>
      <input
        className={inp}
        value={preview.startsWith("data:") ? "" : preview}
        onChange={e => {
          setPreview(e.target.value);
          onUploaded(e.target.value, "");
        }}
        placeholder="https://example.com/image.jpg"
      />
    </div>
  );
}

function MultiImageUploader({
  currentImages,
  onChange,
}: {
  currentImages: string[];
  onChange: (images: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [pending, setPending] = useState(0);

  async function uploadOne(file: File): Promise<string | null> {
    if (!file.type.startsWith("image/")) {
      toast.error(`${file.name} is not an image.`);
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name} is over 5MB.`);
      return null;
    }
    const base64: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64, folder: "portfolio/projects/gallery" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Failed to upload ${file.name}`);
    return data.url as string;
  }

  async function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList);
    if (files.length === 0) return;
    setPending(files.length);
    const uploaded: string[] = [];
    try {
      for (const file of files) {
        try {
          const url = await uploadOne(file);
          if (url) uploaded.push(url);
        } catch (e: any) {
          toast.error(e.message);
        } finally {
          setPending(p => Math.max(0, p - 1));
        }
      }
      if (uploaded.length > 0) {
        onChange([...currentImages, ...uploaded]);
        toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} added!`);
      }
    } finally {
      setPending(0);
    }
  }

  function removeAt(index: number) {
    onChange(currentImages.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= currentImages.length) return;
    const next = [...currentImages];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 py-6 flex flex-col items-center justify-center gap-2
          ${dragOver
            ? "border-violet-400 bg-violet-50 dark:bg-violet-900/10"
            : "border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/40"
          }`}
      >
        {pending > 0 ? (
          <>
            <svg className="animate-spin w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-xs text-slate-400">Uploading {pending} image{pending > 1 ? "s" : ""}…</span>
          </>
        ) : (
          <>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-xs text-slate-500 dark:text-slate-400">Drop gallery images here or click to browse</p>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {currentImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {currentImages.map((src, i) => (
            <div key={`${src}-${i}`} className="group relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="w-6 h-6 flex items-center justify-center rounded-md bg-red-500/90 text-white hover:bg-red-500 transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === currentImages.length - 1}
                  className="w-6 h-6 flex items-center justify-center rounded-md bg-white/90 text-slate-700 disabled:opacity-30 hover:bg-white transition-colors cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Projects Panel Component ───
export default function ProjectsPanel({ autoOpen }: { autoOpen?: boolean }) {
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
  const [descBlocks, setDescBlocks] = useState<DescriptionBlock[]>([{ type: "paragraph", header: "", text: "" }]);
  const didAutoOpen = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (autoOpen && !didAutoOpen.current) {
      didAutoOpen.current = true;
      openNew();
    }
  }, [autoOpen]);

  function openNew() {
    setEditing(blankProject());
    setIsNew(true);
    setTechInput("");
    setDescBlocks([{ type: "paragraph", header: "", text: "" }]);
    setModal(true);
  }

  function openEdit(p: Project) {
    setEditing({ ...p });
    setIsNew(false);
    setTechInput(p.techStack ? p.techStack.join(", ") : "");
    setDescBlocks(normalizeDescription(p.description));
    setModal(true);
  }

  async function save() {
    if (!editing) return;
    if (!editing.title.trim()) { toast.error("Title is required."); return; }

    const description = denormalizeDescription(descBlocks);
    const isEmpty = typeof description === "string" ? !description : description.length === 0;
    if (isEmpty) { toast.error("Description is required."); return; }

    setSaving(true);
    try {
      const payload = {
        ...editing,
        description,
        techStack: techInput.split(",").map(s => s.trim()).filter(Boolean),
      };
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${editing._id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast.success(isNew ? "Project created!" : "Project updated!");
      setModal(false);
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function del(id: string) {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Project deleted.");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setConfirm(null);
    }
  }

  return (
    <>
      {confirm && (
        <ConfirmModal
          msg="This will permanently delete the project and its media."
          onConfirm={() => del(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {modal && editing && (
        <Modal title={isNew ? "Add New Project" : "Edit Project"} onClose={() => setModal(false)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Title">
                <input
                  className={inp}
                  value={editing.title}
                  onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))}
                  placeholder="e.g. E-Commerce Platform"
                />
              </Field>
              <Field label="Project Type">
                <input
                  className={inp}
                  value={editing.type || ""}
                  onChange={e => setEditing(p => p && ({ ...p, type: e.target.value }))}
                  placeholder="e.g. Web App, SaaS, Mobile App"
                />
              </Field>
            </div>

            <Field label="Project Story / Content Editor">
              <RichParagraphEditor blocks={descBlocks} setBlocks={setDescBlocks} />
            </Field>

            <Field label="Key Outcome / Impact">
              <textarea
                value={editing.outcome || ""}
                onChange={e => setEditing(p => p && ({ ...p, outcome: e.target.value }))}
                className={inp + " resize-y"}
                rows={2}
                placeholder="e.g. Increased conversion rates by 40%..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Demo URL">
                <input
                  className={inp}
                  value={editing.demoUrl}
                  onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))}
                  placeholder="https://example.com"
                />
              </Field>
              <Field label="GitHub URL">
                <input
                  className={inp}
                  value={editing.githubUrl}
                  onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </Field>
              <Field label="Display Order">
                <input
                  className={inp}
                  type="number"
                  value={editing.order}
                  onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
                />
              </Field>
            </div>

            <Field label="Cover Image">
              <ImageUploader
                currentImage={editing.image}
                uploading={uploading}
                setUploading={setUploading}
                onUploaded={(url, publicId) =>
                  setEditing(p => p && ({ ...p, image: url, imagePublicId: publicId || p.imagePublicId }))
                }
              />
            </Field>

            <Field label="Gallery Screenshots">
              <MultiImageUploader
                currentImages={editing.images || []}
                onChange={imgs => setEditing(p => p && ({ ...p, images: imgs }))}
              />
            </Field>

            <Field label="Tech Stack (comma-separated)">
              <input
                className={inp}
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="Next.js, TypeScript, MongoDB, Tailwind CSS"
              />
            </Field>

            <div className="flex gap-2 pt-3">
              <button
                onClick={save}
                disabled={saving || uploading}
                className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
              >
                {saving ? "Saving…" : uploading ? "Uploading..." : isNew ? "Create Project" : "Save Changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { v: items.length, l: "Total Projects" },
          { v: items.filter(p => p.demoUrl).length, l: "Live Demos" },
          { v: items.filter(p => p.githubUrl).length, l: "GitHub Repos" },
        ].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700/50">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{s.v}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Projects List Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Projects List
        </h2>
        <button
          onClick={openNew}
          className="px-3.5 py-2 bg-violet-700 hover:bg-violet-600 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          + Add Project
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs">No projects found. Create one!</div>
      ) : (
        <div className="space-y-3">
          {items.map(p => (
            <div
              key={p._id}
              className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 hover:border-violet-300 dark:hover:border-violet-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                    No img
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{p.type || "Web App"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => p._id && setConfirm(p._id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

