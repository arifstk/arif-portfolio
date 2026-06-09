// // components/AdminDashboard.tsx

// "use client";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import Link from "next/link";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   FaGithubSquare, FaLinkedin, FaInstagramSquare, FaYoutube, FaDribbble,
// } from "react-icons/fa";
// import { FaXTwitter, FaTiktok, FaBehance } from "react-icons/fa6";
// import { Mail, Phone, MapPin, Globe } from "lucide-react";

// // ─── Types ───────────────────────────────────────
// type Project = {
//   _id?: string; title: string; description: string;
//   image: string; imagePublicId?: string; techStack: string[];
//   demoUrl: string; githubUrl: string; order: number;
// };
// type ContactItem = {
//   _id?: string; label: string; value: string;
//   href: string; iconName: string;
// };
// type SocialItem = {
//   _id?: string; name: string; href: string;
//   iconName: string; order: number;
// };
// type Message = {
//   _id: string; name: string; email: string;
//   subject: string; message: string;
//   read: boolean; createdAt: string;
// };
// type Tab = "projects" | "contact" | "socials" | "messages";

// const blankProject = (): Project => ({
//   title: "", description: "", image: "", imagePublicId: "",
//   techStack: [], demoUrl: "", githubUrl: "", order: 0,
// });
// const blankContact = (): ContactItem => ({
//   label: "", value: "", href: "#", iconName: "Mail",
// });
// const blankSocial = (): SocialItem => ({
//   name: "", href: "", iconName: "github", order: 0,
// });

// // ─── Icon maps ────────────────────────────────────
// const SOCIAL_ICONS: { key: string; label: string; Icon: React.ElementType; color: string; bg: string }[] = [
//   { key: "github", label: "GitHub", Icon: FaGithubSquare, color: "text-gray-800 dark:text-gray-200", bg: "bg-gray-100 dark:bg-gray-800" },
//   { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
//   { key: "twitter", label: "Twitter/X", Icon: FaXTwitter, color: "text-sky-500 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/30" },
//   { key: "instagram", label: "Instagram", Icon: FaInstagramSquare, color: "text-pink-500 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-900/30" },
//   { key: "youtube", label: "YouTube", Icon: FaYoutube, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
//   { key: "tiktok", label: "TikTok", Icon: FaTiktok, color: "text-slate-900 dark:text-slate-100", bg: "bg-slate-100 dark:bg-slate-800" },
//   { key: "dribbble", label: "Dribbble", Icon: FaDribbble, color: "text-pink-400 dark:text-pink-300", bg: "bg-pink-50 dark:bg-pink-900/20" },
//   { key: "behance", label: "Behance", Icon: FaBehance, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
// ];

// const SOCIAL_ICON_MAP: Record<string, typeof SOCIAL_ICONS[0]> = Object.fromEntries(
//   SOCIAL_ICONS.map(s => [s.key, s])
// );

// const CONTACT_ICONS: { key: string; label: string; Icon: React.ElementType; color: string; bg: string }[] = [
//   { key: "Mail", label: "Mail", Icon: Mail, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/30" },
//   { key: "Phone", label: "Phone", Icon: Phone, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
//   { key: "MapPin", label: "MapPin", Icon: MapPin, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
//   { key: "Globe", label: "Globe", Icon: Globe, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
//   { key: "Twitter", label: "Twitter", Icon: FaXTwitter, color: "text-sky-500 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/30" },
//   { key: "Linkedin", label: "LinkedIn", Icon: FaLinkedin, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
// ];

// const CONTACT_ICON_MAP: Record<string, typeof CONTACT_ICONS[0]> = Object.fromEntries(
//   CONTACT_ICONS.map(c => [c.key, c])
// );

// // ─── Shared UI atoms ──────────────────────────────
// const inp = [
//   "w-full bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100",
//   "border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm",
//   "placeholder-slate-400 dark:placeholder-slate-500",
//   "focus:outline-none focus:border-blue-400 dark:focus:border-blue-500",
//   "transition-colors",
// ].join(" ");

// const sel = inp + " cursor-pointer";

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

// function Modal({ title, onClose, children }: {
//   title: string; onClose: () => void; children: React.ReactNode;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
//           <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
//           <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
//             <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
//           </button>
//         </div>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

// function ConfirmModal({ msg, onConfirm, onCancel }: {
//   msg: string; onConfirm: () => void; onCancel: () => void;
// }) {
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
//           <button onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
//             Cancel
//           </button>
//           <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Skeleton() {
//   return (
//     <div className="space-y-3 animate-pulse">
//       {[...Array(3)].map((_, i) => (
//         <div key={i} className="h-19 rounded-2xl bg-slate-100 dark:bg-slate-800" />
//       ))}
//     </div>
//   );
// }

// function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
//   return (
//     <div className="flex flex-col items-center justify-center py-16 text-center">
//       <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
//         <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
//           <rect x="3" y="3" width="18" height="18" rx="3" />
//           <path d="M12 8v8M8 12h8" />
//         </svg>
//       </div>
//       <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No {label} yet</p>
//       <button onClick={onAdd} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
//         Add your first →
//       </button>
//     </div>
//   );
// }

// // ─── Image Upload Component ────────────────────────────────────────────────────
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
//       {/* Drop zone */}
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
//             ? "border-blue-400 bg-blue-50 dark:bg-blue-900/10"
//             : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 bg-slate-50 dark:bg-slate-800/40"
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
//                 <svg className="animate-spin w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24">
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

//       {/* Manual URL fallback */}
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

// // ─── Icon components ──────────────────────────────
// const EditIcon = () => (
//   <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
//     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
//   </svg>
// );
// const TrashIcon = () => (
//   <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//     <polyline points="3 6 5 6 21 6" />
//     <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
//     <path d="M10 11v6M14 11v6M9 6V4h6v2" />
//   </svg>
// );
// const PlusIcon = () => (
//   <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//     <path d="M12 5v14M5 12h14" />
//   </svg>
// );

// // ─── Projects Panel ───────────────────────────────
// function ProjectsPanel({ autoOpen }: { autoOpen?: boolean }) {
//   const [items, setItems] = useState<Project[]>([]);
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState<Project | null>(null);
//   const [isNew, setIsNew] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [confirm, setConfirm] = useState<string | null>(null);
//   const [techInput, setTechInput] = useState("");
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoOpen]);

//   function openNew() {
//     setEditing(blankProject());
//     setIsNew(true);
//     setTechInput("");
//     setModal(true);
//   }

//   function openEdit(p: Project) {
//     setEditing({ ...p });
//     setIsNew(false);
//     setTechInput(p.techStack.join(", "));
//     setModal(true);
//   }

//   async function save() {
//     if (!editing) return;
//     if (!editing.title.trim()) { toast.error("Title is required."); return; }
//     if (!editing.description.trim()) { toast.error("Description is required."); return; }
//     setSaving(true);
//     try {
//       const payload = {
//         ...editing,
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
//           msg="This will permanently delete the project and its image."
//           onConfirm={() => del(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}
//       {modal && editing && (
//         <Modal title={isNew ? "Add project" : "Edit project"} onClose={() => setModal(false)}>
//           <div className="space-y-3">
//             <div className="grid grid-cols-2 gap-3">
//               <Field label="Title">
//                 <input
//                   className={inp}
//                   value={editing.title}
//                   onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))}
//                   placeholder="Project title"
//                 />
//               </Field>
//               <Field label="Order">
//                 <input
//                   className={inp}
//                   type="number"
//                   value={editing.order}
//                   onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
//                 />
//               </Field>
//             </div>
//             <Field label="Description">
//               <textarea
//                 className={inp + " resize-none"}
//                 rows={3}
//                 value={editing.description}
//                 onChange={e => setEditing(p => p && ({ ...p, description: e.target.value }))}
//                 placeholder="Short description…"
//               />
//             </Field>
//             <div className="grid grid-cols-2 gap-3">
//               <Field label="Demo URL">
//                 <input
//                   className={inp}
//                   value={editing.demoUrl}
//                   onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))}
//                   placeholder="https://…"
//                 />
//               </Field>
//               <Field label="GitHub URL">
//                 <input
//                   className={inp}
//                   value={editing.githubUrl}
//                   onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))}
//                   placeholder="https://github.com/…"
//                 />
//               </Field>
//             </div>
//             <Field label="Project Image">
//               <ImageUploader
//                 currentImage={editing.image}
//                 uploading={uploading}
//                 setUploading={setUploading}
//                 onUploaded={(url, publicId) =>
//                   setEditing(p => p && ({ ...p, image: url, imagePublicId: publicId || p.imagePublicId }))
//                 }
//               />
//             </Field>
//             <Field label="Tech Stack (comma-separated)">
//               <input
//                 className={inp}
//                 value={techInput}
//                 onChange={e => setTechInput(e.target.value)}
//                 placeholder="Next.js, TypeScript, MongoDB"
//               />
//             </Field>
//             <div className="flex gap-2 pt-2">
//               <button
//                 onClick={save}
//                 disabled={saving || uploading}
//                 className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
//               >
//                 {saving ? "Saving…" : uploading ? "Uploading image…" : isNew ? "Create project" : "Save changes"}
//               </button>
//               <button
//                 onClick={() => setModal(false)}
//                 className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-3 mb-6">
//         {[
//           { v: items.length, l: "Total" },
//           { v: items.filter(p => p.demoUrl).length, l: "Live demos" },
//           { v: items.filter(p => p.githubUrl).length, l: "On GitHub" },
//         ].map(s => (
//           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
//             <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
//             <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
//           </div>
//         ))}
//       </div>

//       {loading ? <Skeleton /> : items.length === 0 ? (
//         <EmptyState label="projects" onAdd={openNew} />
//       ) : (
//         <div className="space-y-2.5">
//           {items.map(p => (
//             <div key={p._id} className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
//               {p.image ? (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={p.image}
//                   alt={p.title}
//                   className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-700 shrink-0"
//                   onError={e => (e.currentTarget.style.opacity = "0")}
//                 />
//               ) : (
//                 <div className="w-12 h-12 rounded-xl bg-liner-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center shrink-0">
//                   <svg width="18" height="18" fill="none" stroke="#378ADD" strokeWidth="1.5" viewBox="0 0 24 24">
//                     <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" />
//                   </svg>
//                 </div>
//               )}
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-start justify-between gap-2">
//                   <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</p>
//                   <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button
//                       onClick={() => openEdit(p)}
//                       className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 dark:hover:border-blue-500 transition-colors bg-white dark:bg-slate-800"
//                     >
//                       <EditIcon />
//                     </button>
//                     <button
//                       onClick={() => setConfirm(p._id!)}
//                       className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500 transition-colors bg-white dark:bg-slate-800"
//                     >
//                       <TrashIcon />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{p.description}</p>
//                 {p.techStack.length > 0 && (
//                   <div className="flex flex-wrap gap-1 mt-2">
//                     {p.techStack.map((t, i) => (
//                       <span key={`${t}-${i}`} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
//                         {t}</span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// // ─── Contact Panel ────────────────────────────────
// function ContactPanel({ autoOpen }: { autoOpen?: boolean }) {
//   const [items, setItems] = useState<ContactItem[]>([]);
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState<ContactItem | null>(null);
//   const [isNew, setIsNew] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState<string | null>(null);
//   const didAutoOpen = useRef(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/contact");
//       if (!res.ok) throw new Error("Failed to load");
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load contact entries.");
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoOpen]);

//   function openNew() {
//     setEditing(blankContact());
//     setIsNew(true);
//     setModal(true);
//   }

//   async function save() {
//     if (!editing) return;
//     if (!editing.label.trim()) { toast.error("Label is required."); return; }
//     if (!editing.value.trim()) { toast.error("Value is required."); return; }
//     setSaving(true);
//     try {
//       const url = isNew ? "/api/admin/contact" : `/api/admin/contact/${editing._id}`;
//       const method = isNew ? "POST" : "PUT";
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editing),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Save failed");
//       }
//       toast.success(isNew ? "Contact entry created!" : "Contact entry updated!");
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
//       const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("Deleted.");
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
//           msg="This will permanently delete this contact entry."
//           onConfirm={() => del(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}
//       {modal && editing && (
//         <Modal title={isNew ? "Add contact entry" : "Edit contact entry"} onClose={() => setModal(false)}>
//           <div className="space-y-3">
//             <Field label="Label">
//               <input
//                 className={inp}
//                 value={editing.label}
//                 onChange={e => setEditing(p => p && ({ ...p, label: e.target.value }))}
//                 placeholder="Email"
//               />
//             </Field>
//             <Field label="Icon">
//               <div className="grid grid-cols-6 gap-1.5">
//                 {CONTACT_ICONS.map(({ key, label, Icon, color, bg }) => (
//                   <button
//                     key={key}
//                     type="button"
//                     title={label}
//                     onClick={() => setEditing(p => p && ({ ...p, iconName: key }))}
//                     className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 transition-all ${editing.iconName === key
//                       ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                       : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 " + bg
//                       }`}
//                   >
//                     <Icon size={18} className={color} />
//                     <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-none">{label}</span>
//                   </button>
//                 ))}
//               </div>
//             </Field>
//             <div className="grid grid-cols-1 gap-3">
//               <Field label="Display Value">
//                 <input
//                   className={inp}
//                   value={editing.value}
//                   onChange={e => setEditing(p => p && ({ ...p, value: e.target.value }))}
//                   placeholder="hello@you.dev"
//                 />
//               </Field>
//               <Field label="Link (href)">
//                 <input
//                   className={inp}
//                   value={editing.href}
//                   onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))}
//                   placeholder="mailto:hello@you.dev"
//                 />
//               </Field>
//             </div>
//             <div className="flex gap-2 pt-2">
//               <button
//                 onClick={save}
//                 disabled={saving}
//                 className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
//               >
//                 {saving ? "Saving…" : isNew ? "Create entry" : "Save changes"}
//               </button>
//               <button
//                 onClick={() => setModal(false)}
//                 className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       <div className="grid grid-cols-2 gap-3 mb-6">
//         {[
//           { v: items.length, l: "Total entries" },
//           { v: items.filter(c => c.href !== "#").length, l: "With links" },
//         ].map(s => (
//           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
//             <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
//             <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
//           </div>
//         ))}
//       </div>

//       {loading ? <Skeleton /> : items.length === 0 ? (
//         <EmptyState label="contact entries" onAdd={openNew} />
//       ) : (
//         <div className="space-y-2.5">
//           {items.map(c => {
//             const meta = CONTACT_ICON_MAP[c.iconName];
//             const ContactIcon = meta?.Icon;
//             return (
//               <div key={c._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta?.bg ?? "bg-slate-100 dark:bg-slate-700"}`}>
//                   {ContactIcon
//                     ? <ContactIcon size={18} className={meta?.color ?? "text-slate-500"} />
//                     : <span className="text-xs font-bold text-slate-500">{c.iconName.slice(0, 2)}</span>
//                   }
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{c.label}</p>
//                   <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate mt-0.5">{c.value}</p>
//                   <p className="text-[11px] text-slate-400 truncate">{c.href}</p>
//                 </div>
//                 <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => { setEditing({ ...c }); setIsNew(false); setModal(true); }}
//                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800"
//                   >
//                     <EditIcon />
//                   </button>
//                   <button
//                     onClick={() => setConfirm(c._id!)}
//                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// }
// function SocialsPanel({ autoOpen }: { autoOpen?: boolean }) {
//   const [items, setItems] = useState<SocialItem[]>([]);
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState<SocialItem | null>(null);
//   const [isNew, setIsNew] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [confirm, setConfirm] = useState<string | null>(null);
//   const didAutoOpen = useRef(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/socials");
//       if (!res.ok) throw new Error("Failed to load");
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load social links.");
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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [autoOpen]);

//   function openNew() {
//     setEditing(blankSocial());
//     setIsNew(true);
//     setModal(true);
//   }

//   async function save() {
//     if (!editing) return;
//     if (!editing.name.trim()) { toast.error("Platform name is required."); return; }
//     if (!editing.href.trim()) { toast.error("Profile URL is required."); return; }
//     setSaving(true);
//     try {
//       const url = isNew ? "/api/admin/socials" : `/api/admin/socials/${editing._id}`;
//       const method = isNew ? "POST" : "PUT";
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editing),
//       });
//       if (!res.ok) {
//         const err = await res.json();
//         throw new Error(err.error || "Save failed");
//       }
//       toast.success(isNew ? "Social link created!" : "Social link updated!");
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
//       const res = await fetch(`/api/admin/socials/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("Deleted.");
//       load();
//     } catch (e: any) {
//       toast.error(e.message);
//     } finally {
//       setConfirm(null);
//     }
//   }

//   const iconOpts = SOCIAL_ICONS;

//   return (
//     <>
//       {confirm && (
//         <ConfirmModal
//           msg="This will permanently delete this social link."
//           onConfirm={() => del(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}
//       {modal && editing && (
//         <Modal title={isNew ? "Add social link" : "Edit social link"} onClose={() => setModal(false)}>
//           <div className="space-y-3">
//             <Field label="Platform Name">
//               <input
//                 className={inp}
//                 value={editing.name}
//                 onChange={e => setEditing(p => p && ({ ...p, name: e.target.value }))}
//                 placeholder="GitHub"
//               />
//             </Field>
//             <Field label="Icon">
//               <div className="grid grid-cols-4 gap-1.5">
//                 {iconOpts.map(({ key, label, Icon, color, bg }) => (
//                   <button
//                     key={key}
//                     type="button"
//                     onClick={() => setEditing(p => p && ({ ...p, iconName: key }))}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${editing.iconName === key
//                       ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                       : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 " + bg
//                       }`}
//                   >
//                     <Icon size={16} className={color} />
//                     <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{label}</span>
//                   </button>
//                 ))}
//               </div>
//             </Field>
//             <Field label="Profile URL">
//               <input
//                 className={inp}
//                 value={editing.href}
//                 onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))}
//                 placeholder="https://github.com/…"
//               />
//             </Field>
//             <Field label="Display Order">
//               <input
//                 className={inp}
//                 type="number"
//                 value={editing.order}
//                 onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
//               />
//             </Field>
//             <div className="flex gap-2 pt-2">
//               <button
//                 onClick={save}
//                 disabled={saving}
//                 className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
//               >
//                 {saving ? "Saving…" : isNew ? "Create link" : "Save changes"}
//               </button>
//               <button
//                 onClick={() => setModal(false)}
//                 className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       <div className="grid grid-cols-2 gap-3 mb-6">
//         {[
//           { v: items.length, l: "Total links" },
//           { v: items.filter(s => s.href).length, l: "Active" },
//         ].map(s => (
//           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
//             <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
//             <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
//           </div>
//         ))}
//       </div>

//       {loading ? <Skeleton /> : items.length === 0 ? (
//         <EmptyState label="social links" onAdd={openNew} />
//       ) : (
//         <div className="space-y-2.5">
//           {items.map(s => {
//             const meta = SOCIAL_ICON_MAP[s.iconName];
//             const SocialIcon = meta?.Icon;
//             return (
//               <div key={s._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta?.bg ?? "bg-slate-100 dark:bg-slate-700"}`}>
//                   {SocialIcon
//                     ? <SocialIcon size={20} className={meta?.color ?? "text-slate-500"} />
//                     : <span className="text-xs font-bold text-slate-500">{s.iconName.slice(0, 2).toUpperCase()}</span>
//                   }
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{s.name}</p>
//                   <p className="text-xs text-slate-400 truncate">{s.href}</p>
//                 </div>
//                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0">
//                   #{s.order}
//                 </span>
//                 <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => { setEditing({ ...s }); setIsNew(false); setModal(true); }}
//                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800"
//                   >
//                     <EditIcon />
//                   </button>
//                   <button
//                     onClick={() => setConfirm(s._id!)}
//                     className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// }

// // ─── Messages Panel ───────────────────────────────

// function MessagesPanel() {
//   const [items, setItems] = useState<Messages[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selected, setSelected] = useState<Message | null>(null);
//   const [confirm, setConfirm] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/messages");
//       if (!res.ok) throw new Error("Failed to load");
//       const data = await res.json();
//       setItems(Array.isArray(data) ? data : []);
//     } catch {
//       toast.error("Failed to load messages.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { load(); }, [load]);

//   async function markRead(id: string) {
//     await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
//     setItems(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
//     setSelected(prev => prev?._id === id ? { ...prev, read: true } : prev);
//   }

//   async function del(id: string) {
//     try {
//       const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       toast.success("Message deleted.");
//       setSelected(null);
//       load();
//     } catch (e: any) {
//       toast.error(e.message);
//     } finally {
//       setConfirm(null);
//     }
//   }

//   const unread = items.filter(m => !m.read).length;

//   return (
//     <>
//       {confirm && (
//         <ConfirmModal
//           msg="This will permanently delete this message."
//           onConfirm={() => del(confirm)}
//           onCancel={() => setConfirm(null)}
//         />
//       )}

//       {/* Detail modal */}
//       {selected && (
//         <Modal title={selected.subject} onClose={() => setSelected(null)}>
//           <div className="space-y-4">
//             <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
//               <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm shrink-0">
//                 {selected.name[0].toUpperCase()}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selected.name}</p>
//                 <a href={`mailto:${selected.email}`} className="text-xs text-blue-500 hover:underline truncate block">{selected.email}</a>
//               </div>
//               <span className="ml-auto text-[10px] text-slate-400 shrink-0">
//                 {new Date(selected.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
//               <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
//             </div>
//             <div className="flex gap-2">

//               <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
//                 className="flex-1 py-2.5 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors"
//               >
//                 Reply via Email
//               </a>
//               {!selected.read && (
//                 <button
//                   onClick={() => markRead(selected._id)}
//                   className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
//                 >
//                   Mark read
//                 </button>
//               )}
//               <button
//                 onClick={() => setConfirm(selected._id)}
//                 className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-red-200 dark:border-red-800"
//               >
//                 <TrashIcon />
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-3 mb-6">
//         {[
//           { v: items.length, l: "Total" },
//           { v: unread, l: "Unread" },
//           { v: items.length - unread, l: "Read" },
//         ].map(s => (
//           <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
//             <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
//             <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
//           </div>
//         ))}
//       </div>

//       {loading ? <Skeleton /> : items.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-16 text-center">
//           <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
//             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
//               <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//             </svg>
//           </div>
//           <p className="text-sm text-slate-500 dark:text-slate-400">No messages yet</p>
//         </div>
//       ) : (
//         <div className="space-y-2.5">
//           {items.map(m => (
//             <div
//               key={m._id}
//               onClick={() => { setSelected(m); if (!m.read) markRead(m._id); }}
//               className={`group flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all
//                 ${m.read
//                   ? "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/60 hover:border-slate-200 dark:hover:border-slate-600"
//                   : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50 hover:border-blue-300"
//                 }`}
//             >
//               <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-transparent" : "bg-blue-500"}`} />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between gap-2">
//                   <p className={`text-sm font-semibold truncate ${m.read ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-slate-100"}`}>
//                     {m.name}
//                   </p>
//                   <span className="text-[10px] text-slate-400 shrink-0">
//                     {new Date(m.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <p className="text-xs text-slate-500 truncate">{m.email}</p>
//                 <p className={`text-xs mt-1 truncate ${m.read ? "text-slate-400" : "text-slate-600 dark:text-slate-300 font-medium"}`}>
//                   {m.subject} — {m.message}
//                 </p>
//               </div>
//               <button
//                 onClick={e => { e.stopPropagation(); setConfirm(m._id); }}
//                 className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100 shrink-0"
//               >
//                 <TrashIcon />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }


// {/* Stats */ }
// <div className="grid grid-cols-3 gap-3 mb-6">
//   {[
//     { v: items.length, l: "Total" },
//     { v: unread, l: "Unread" },
//     { v: items.length - unread, l: "Read" },
//   ].map(s => (
//     <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
//       <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
//       <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
//     </div>
//   ))}
// </div>

// {
//   loading ? <Skeleton /> : items.length === 0 ? (
//     <div className="flex flex-col items-center justify-center py-16 text-center">
//       <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
//         <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//         </svg>
//       </div>
//       <p className="text-sm text-slate-500 dark:text-slate-400">No messages yet</p>
//     </div>
//   ) : (
//     <div className="space-y-2.5">
//       {items.map(m => (
//         <div
//           key={m._id}
//           onClick={() => { setSelected(m); if (!m.read) markRead(m._id); }}
//           className={`group flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all
//                 ${m.read
//               ? "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/60 hover:border-slate-200 dark:hover:border-slate-600"
//               : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50 hover:border-blue-300"
//             }`}
//         >
//           <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-transparent" : "bg-blue-500"}`} />
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center justify-between gap-2">
//               <p className={`text-sm font-semibold truncate ${m.read ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-slate-100"}`}>
//                 {m.name}
//               </p>
//               <span className="text-[10px] text-slate-400 shrink-0">
//                 {new Date(m.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//             <p className="text-xs text-slate-500 truncate">{m.email}</p>
//             <p className={`text-xs mt-1 truncate ${m.read ? "text-slate-400" : "text-slate-600 dark:text-slate-300 font-medium"}`}>
//               {m.subject} — {m.message}
//             </p>
//           </div>
//           <button
//             onClick={e => { e.stopPropagation(); setConfirm(m._id); }}
//             className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100 shrink-0"
//           >
//             <TrashIcon />
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }


// // ─── Sidebar nav items ─────────────────────────────
// const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
//   {
//     id: "projects", label: "Projects",
//     icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>,
//   },
//   {
//     id: "contact", label: "Contact Info",
//     icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>,
//   },
//   {
//     id: "socials", label: "Social Links",
//     icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>,
//   },
//   {
//     id: "messages", label: "Messages",
//     icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
//       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//     </svg>,
//   },
// ];

// const panelMeta: Record<Tab, { title: string; sub: string }> = {
//   projects: { title: "Projects", sub: "Add, edit, and remove your portfolio projects" },
//   contact: { title: "Contact Info", sub: "Manage how visitors can reach you" },
//   socials: { title: "Social Links", sub: "Control your social media presence" },
//   messages: { title: "Messages", sub: "Contact form submissions from visitors" },
// };

// // ─── Root ──────────────────────────────────────────
// export default function AdminDashboard() {
//   const [tab, setTab] = useState<Tab>("projects");
//   // addTrigger increments each time the header "Add" button is clicked
//   const [addTrigger, setAddTrigger] = useState<Record<Tab, number>>({
//     projects: 0, contact: 0, socials: 0, messages: 0
//   });

//   function handleAdd() {
//     setAddTrigger(prev => ({ ...prev, [tab]: prev[tab] + 1 }));
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex mt-20">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: { fontSize: "13px", borderRadius: "12px" },
//         }}
//       />

//       {/* ── Sidebar ── */}
//       <aside className="w-60 shrink-0 text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
//         <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
//           <div className="flex items-center gap-2.5">
//             <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
//               <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Portfolio CMS</p>
//               <p className="text-[10px] text-slate-400 mt-0.5">Admin panel</p>
//             </div>
//           </div>
//         </div>

//         <nav className="flex-1 px-3 py-4 space-y-0.5">
//           <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">Content</p>
//           {navItems.map(item => (
//             <button
//               key={item.id}
//               onClick={() => setTab(item.id)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${tab === item.id
//                 ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
//                 : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
//                 }`}
//             >
//               <span className={tab === item.id ? "text-blue-500" : "text-slate-400"}>{item.icon}</span>
//               {item.label}
//               {tab === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
//             </button>
//           ))}
//         </nav>

//         <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
//           <Link
//             href="/"
//             className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
//           >
//             <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M3 12l9-9 9 9M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
//             </svg>
//             Back to site
//           </Link>
//         </div>
//       </aside>

//       {/* ── Main ── */}
//       <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
//         <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
//           <div>
//             <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
//               {panelMeta[tab].title}
//             </h1>
//             <p className="text-xs text-slate-400 mt-0.5">{panelMeta[tab].sub}</p>
//           </div>
//           <button
//             onClick={handleAdd}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
//           >
//             <PlusIcon />
//             Add {tab === "projects" ? "project" : tab === "contact" ? "entry" : "link"}
//           </button>
//         </header>

//         <main className="flex-1 px-8 py-6 max-w-3xl">
//           {tab === "projects" && (
//             <ProjectsPanel
//               key={`proj-${addTrigger.projects}`}
//               autoOpen={addTrigger.projects > 0}
//             />
//           )}
//           {tab === "contact" && (
//             <ContactPanel
//               key={`contact-${addTrigger.contact}`}
//               autoOpen={addTrigger.contact > 0}
//             />
//           )}
//           {tab === "socials" && (
//             <SocialsPanel
//               key={`socials-${addTrigger.socials}`}
//               autoOpen={addTrigger.socials > 0}
//             />
//           )}
//           {tab === "messages" && <MessagesPanel />}
//         </main>
//       </div>
//     </div>
//   );
// }





// components/AdminDashboard.tsx

"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import {
  FaGithubSquare, FaLinkedin, FaInstagramSquare, FaYoutube, FaDribbble,
} from "react-icons/fa";
import { FaXTwitter, FaTiktok, FaBehance } from "react-icons/fa6";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

// ─── Types ───────────────────────────────────────
type Project = {
  _id?: string; title: string; description: string;
  image: string; imagePublicId?: string; techStack: string[];
  demoUrl: string; githubUrl: string; order: number;
};
type ContactItem = {
  _id?: string; label: string; value: string;
  href: string; iconName: string;
};
type SocialItem = {
  _id?: string; name: string; href: string;
  iconName: string; order: number;
};
type Message = {
  _id: string; name: string; email: string;
  subject: string; message: string;
  read: boolean; createdAt: string;
};
type Tab = "projects" | "contact" | "socials" | "messages";

const blankProject = (): Project => ({
  title: "", description: "", image: "", imagePublicId: "",
  techStack: [], demoUrl: "", githubUrl: "", order: 0,
});
const blankContact = (): ContactItem => ({
  label: "", value: "", href: "#", iconName: "Mail",
});
const blankSocial = (): SocialItem => ({
  name: "", href: "", iconName: "github", order: 0,
});

// ─── Icon maps ────────────────────────────────────
const SOCIAL_ICONS: { key: string; label: string; Icon: React.ElementType; color: string; bg: string }[] = [
  { key: "github", label: "GitHub", Icon: FaGithubSquare, color: "text-gray-800 dark:text-gray-200", bg: "bg-gray-100 dark:bg-gray-800" },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
  { key: "twitter", label: "Twitter/X", Icon: FaXTwitter, color: "text-sky-500 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/30" },
  { key: "instagram", label: "Instagram", Icon: FaInstagramSquare, color: "text-pink-500 dark:text-pink-400", bg: "bg-pink-50 dark:bg-pink-900/30" },
  { key: "youtube", label: "YouTube", Icon: FaYoutube, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
  { key: "tiktok", label: "TikTok", Icon: FaTiktok, color: "text-slate-900 dark:text-slate-100", bg: "bg-slate-100 dark:bg-slate-800" },
  { key: "dribbble", label: "Dribbble", Icon: FaDribbble, color: "text-pink-400 dark:text-pink-300", bg: "bg-pink-50 dark:bg-pink-900/20" },
  { key: "behance", label: "Behance", Icon: FaBehance, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
];

const SOCIAL_ICON_MAP: Record<string, typeof SOCIAL_ICONS[0]> = Object.fromEntries(
  SOCIAL_ICONS.map(s => [s.key, s])
);

const CONTACT_ICONS: { key: string; label: string; Icon: React.ElementType; color: string; bg: string }[] = [
  { key: "Mail", label: "Mail", Icon: Mail, color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/30" },
  { key: "Phone", label: "Phone", Icon: Phone, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/30" },
  { key: "MapPin", label: "MapPin", Icon: MapPin, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
  { key: "Globe", label: "Globe", Icon: Globe, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
  { key: "Twitter", label: "Twitter", Icon: FaXTwitter, color: "text-sky-500 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-900/30" },
  { key: "Linkedin", label: "LinkedIn", Icon: FaLinkedin, color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
];

const CONTACT_ICON_MAP: Record<string, typeof CONTACT_ICONS[0]> = Object.fromEntries(
  CONTACT_ICONS.map(c => [c.key, c])
);

// ─── Shared UI atoms ──────────────────────────────
const inp = [
  "w-full bg-white dark:bg-slate-800/60 text-slate-900 dark:text-slate-100",
  "border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm",
  "placeholder-slate-400 dark:placeholder-slate-500",
  "focus:outline-none focus:border-blue-400 dark:focus:border-blue-500",
  "transition-colors",
].join(" ");

const sel = inp + " cursor-pointer";

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

function Modal({ title, onClose, children }: {
  title: string; onClose: () => void; children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ConfirmModal({ msg, onConfirm, onCancel }: {
  msg: string; onConfirm: () => void; onCancel: () => void;
}) {
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
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500 hover:bg-red-600 text-white transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-19 rounded-2xl bg-slate-100 dark:bg-slate-800" />
      ))}
    </div>
  );
}

function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">No {label} yet</p>
      <button onClick={onAdd} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
        Add your first →
      </button>
    </div>
  );
}

// ─── Image Upload Component ────────────────────────────────────────────────────
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
      {/* Drop zone */}
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
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/10"
            : "border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 bg-slate-50 dark:bg-slate-800/40"
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
                <svg className="animate-spin w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24">
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

      {/* Manual URL fallback */}
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

// ─── Icon components ──────────────────────────────
const EditIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);
const PlusIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// ─── Projects Panel ───────────────────────────────
function ProjectsPanel({ autoOpen }: { autoOpen?: boolean }) {
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  function openNew() {
    setEditing(blankProject());
    setIsNew(true);
    setTechInput("");
    setModal(true);
  }

  function openEdit(p: Project) {
    setEditing({ ...p });
    setIsNew(false);
    setTechInput(p.techStack.join(", "));
    setModal(true);
  }

  async function save() {
    if (!editing) return;
    if (!editing.title.trim()) { toast.error("Title is required."); return; }
    if (!editing.description.trim()) { toast.error("Description is required."); return; }
    setSaving(true);
    try {
      const payload = {
        ...editing,
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
          msg="This will permanently delete the project and its image."
          onConfirm={() => del(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {modal && editing && (
        <Modal title={isNew ? "Add project" : "Edit project"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <input
                  className={inp}
                  value={editing.title}
                  onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))}
                  placeholder="Project title"
                />
              </Field>
              <Field label="Order">
                <input
                  className={inp}
                  type="number"
                  value={editing.order}
                  onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))}
                />
              </Field>
            </div>
            <Field label="Description">
              <textarea
                className={inp + " resize-none"}
                rows={3}
                value={editing.description}
                onChange={e => setEditing(p => p && ({ ...p, description: e.target.value }))}
                placeholder="Short description…"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Demo URL">
                <input
                  className={inp}
                  value={editing.demoUrl}
                  onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))}
                  placeholder="https://…"
                />
              </Field>
              <Field label="GitHub URL">
                <input
                  className={inp}
                  value={editing.githubUrl}
                  onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))}
                  placeholder="https://github.com/…"
                />
              </Field>
            </div>
            <Field label="Project Image">
              <ImageUploader
                currentImage={editing.image}
                uploading={uploading}
                setUploading={setUploading}
                onUploaded={(url, publicId) =>
                  setEditing(p => p && ({ ...p, image: url, imagePublicId: publicId || p.imagePublicId }))
                }
              />
            </Field>
            <Field label="Tech Stack (comma-separated)">
              <input
                className={inp}
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="Next.js, TypeScript, MongoDB"
              />
            </Field>
            <div className="flex gap-2 pt-2">
              <button
                onClick={save}
                disabled={saving || uploading}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {saving ? "Saving…" : uploading ? "Uploading image…" : isNew ? "Create project" : "Save changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { v: items.length, l: "Total" },
          { v: items.filter(p => p.demoUrl).length, l: "Live demos" },
          { v: items.filter(p => p.githubUrl).length, l: "On GitHub" },
        ].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? <Skeleton /> : items.length === 0 ? (
        <EmptyState label="projects" onAdd={openNew} />
      ) : (
        <div className="space-y-2.5">
          {items.map(p => (
            <div key={p._id} className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-700 shrink-0"
                  onError={e => (e.currentTarget.style.opacity = "0")}
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-liner-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="#378ADD" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</p>
                  <div className="flex gap-1 shrink-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEdit(p)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 dark:hover:border-blue-500 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => setConfirm(p._id!)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{p.description}</p>
                {p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.techStack.map((t, i) => (
                      <span key={`${t}-${i}`} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                        {t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Contact Panel ────────────────────────────────
function ContactPanel({ autoOpen }: { autoOpen?: boolean }) {
  const [items, setItems] = useState<ContactItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ContactItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const didAutoOpen = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/contact");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load contact entries.");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  function openNew() {
    setEditing(blankContact());
    setIsNew(true);
    setModal(true);
  }

  async function save() {
    if (!editing) return;
    if (!editing.label.trim()) { toast.error("Label is required."); return; }
    if (!editing.value.trim()) { toast.error("Value is required."); return; }
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/contact" : `/api/admin/contact/${editing._id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast.success(isNew ? "Contact entry created!" : "Contact entry updated!");
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
      const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted.");
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
          msg="This will permanently delete this contact entry."
          onConfirm={() => del(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {modal && editing && (
        <Modal title={isNew ? "Add contact entry" : "Edit contact entry"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <Field label="Label">
              <input
                className={inp}
                value={editing.label}
                onChange={e => setEditing(p => p && ({ ...p, label: e.target.value }))}
                placeholder="Email"
              />
            </Field>
            <Field label="Icon">
              <div className="grid grid-cols-6 gap-1.5">
                {CONTACT_ICONS.map(({ key, label, Icon, color, bg }) => (
                  <button
                    key={key}
                    type="button"
                    title={label}
                    onClick={() => setEditing(p => p && ({ ...p, iconName: key }))}
                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl border-2 transition-all ${editing.iconName === key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 " + bg
                      }`}
                  >
                    <Icon size={18} className={color} />
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 leading-none">{label}</span>
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid grid-cols-1 gap-3">
              <Field label="Display Value">
                <input
                  className={inp}
                  value={editing.value}
                  onChange={e => setEditing(p => p && ({ ...p, value: e.target.value }))}
                  placeholder="hello@you.dev"
                />
              </Field>
              <Field label="Link (href)">
                <input
                  className={inp}
                  value={editing.href}
                  onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))}
                  placeholder="mailto:hello@you.dev"
                />
              </Field>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {saving ? "Saving…" : isNew ? "Create entry" : "Save changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { v: items.length, l: "Total entries" },
          { v: items.filter(c => c.href !== "#").length, l: "With links" },
        ].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? <Skeleton /> : items.length === 0 ? (
        <EmptyState label="contact entries" onAdd={openNew} />
      ) : (
        <div className="space-y-2.5">
          {items.map(c => {
            const meta = CONTACT_ICON_MAP[c.iconName];
            const ContactIcon = meta?.Icon;
            return (
              <div key={c._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta?.bg ?? "bg-slate-100 dark:bg-slate-700"}`}>
                  {ContactIcon
                    ? <ContactIcon size={18} className={meta?.color ?? "text-slate-500"} />
                    : <span className="text-xs font-bold text-slate-500">{c.iconName.slice(0, 2)}</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{c.label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate mt-0.5">{c.value}</p>
                  <p className="text-[11px] text-slate-400 truncate">{c.href}</p>
                </div>
                <div className="flex gap-1 shrink-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing({ ...c }); setIsNew(false); setModal(true); }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setConfirm(c._id!)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function SocialsPanel({ autoOpen }: { autoOpen?: boolean }) {
  const [items, setItems] = useState<SocialItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<SocialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const didAutoOpen = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/socials");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load social links.");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpen]);

  function openNew() {
    setEditing(blankSocial());
    setIsNew(true);
    setModal(true);
  }

  async function save() {
    if (!editing) return;
    if (!editing.name.trim()) { toast.error("Platform name is required."); return; }
    if (!editing.href.trim()) { toast.error("Profile URL is required."); return; }
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/socials" : `/api/admin/socials/${editing._id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Save failed");
      }
      toast.success(isNew ? "Social link created!" : "Social link updated!");
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
      const res = await fetch(`/api/admin/socials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted.");
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setConfirm(null);
    }
  }

  const iconOpts = SOCIAL_ICONS;

  return (
    <>
      {confirm && (
        <ConfirmModal
          msg="This will permanently delete this social link."
          onConfirm={() => del(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
      {modal && editing && (
        <Modal title={isNew ? "Add social link" : "Edit social link"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <Field label="Platform Name">
              <input
                className={inp}
                value={editing.name}
                onChange={e => setEditing(p => p && ({ ...p, name: e.target.value }))}
                placeholder="GitHub"
              />
            </Field>
            <Field label="Icon">
              <div className="grid grid-cols-4 gap-1.5">
                {iconOpts.map(({ key, label, Icon, color, bg }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEditing(p => p && ({ ...p, iconName: key }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all ${editing.iconName === key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-transparent hover:border-slate-200 dark:hover:border-slate-600 " + bg
                      }`}
                  >
                    <Icon size={16} className={color} />
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Profile URL">
              <input
                className={inp}
                value={editing.href}
                onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))}
                placeholder="https://github.com/…"
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
            <div className="flex gap-2 pt-2">
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors"
              >
                {saving ? "Saving…" : isNew ? "Create link" : "Save changes"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { v: items.length, l: "Total links" },
          { v: items.filter(s => s.href).length, l: "Active" },
        ].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? <Skeleton /> : items.length === 0 ? (
        <EmptyState label="social links" onAdd={openNew} />
      ) : (
        <div className="space-y-2.5">
          {items.map(s => {
            const meta = SOCIAL_ICON_MAP[s.iconName];
            const SocialIcon = meta?.Icon;
            return (
              <div key={s._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta?.bg ?? "bg-slate-100 dark:bg-slate-700"}`}>
                  {SocialIcon
                    ? <SocialIcon size={20} className={meta?.color ?? "text-slate-500"} />
                    : <span className="text-xs font-bold text-slate-500">{s.iconName.slice(0, 2).toUpperCase()}</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{s.name}</p>
                  <p className="text-xs text-slate-400 truncate">{s.href}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0">
                  #{s.order}
                </span>
                <div className="flex gap-1 shrink-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing({ ...s }); setIsNew(false); setModal(true); }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-20000 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setConfirm(s._id!)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// ─── Messages Panel ───────────────────────────────
function MessagesPanel() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function markRead(id: string) {
    await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
    setItems(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    setSelected(prev => prev?._id === id ? { ...prev, read: true } : prev);
  }

  async function del(id: string) {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Message deleted.");
      setSelected(null);
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setConfirm(null);
    }
  }

  const unread = items.filter(m => !m.read).length;

  return (
    <>
      {confirm && (
        <ConfirmModal
          msg="This will permanently delete this message."
          onConfirm={() => del(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {selected && (
        <Modal title={selected.subject} onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm shrink-0">
                {selected.name[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selected.name}</p>
                <a href={`mailto:${selected.email}`} className="text-xs text-blue-500 hover:underline truncate block">{selected.email}</a>
              </div>
              <span className="ml-auto text-[10px] text-slate-400 shrink-0">
                {new Date(selected.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="flex-1 py-2.5 text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Reply via Email
              </a>
              {!selected.read && (
                <button
                  onClick={() => markRead(selected._id)}
                  className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700"
                >
                  Mark read
                </button>
              )}
              <button
                onClick={() => setConfirm(selected._id)}
                className="px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border border-red-200 dark:border-red-800 cursor-pointer"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { v: items.length, l: "Total" },
          { v: unread, l: "Unread" },
          { v: items.length - unread, l: "Read" },
        ].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <Skeleton />
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-400" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map(m => (
            <div
              key={m._id}
              onClick={() => { setSelected(m); if (!m.read) markRead(m._id); }}
              className={`group flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all
                ${m.read
                  ? "bg-white dark:bg-slate-800/40 border-slate-100 dark:border-slate-700/60 hover:border-slate-200 dark:hover:border-slate-600"
                  : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/50 hover:border-blue-300"
                }`}
            >
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? "bg-transparent" : "bg-blue-500"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-semibold truncate ${m.read ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-slate-100"}`}>
                    {m.name}
                  </p>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate">{m.email}</p>
                <p className={`text-xs mt-1 truncate ${m.read ? "text-slate-400" : "text-slate-600 dark:text-slate-300 font-medium"}`}>
                  {m.subject} — {m.message}
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setConfirm(m._id); }}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800 opacity-0 group-hover:opacity-100 shrink-0"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Sidebar nav items ─────────────────────────────
const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "projects", label: "Projects",
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>,
  },
  {
    id: "contact", label: "Contact Info",
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>,
  },
  {
    id: "socials", label: "Social Links",
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>,
  },
  {
    id: "messages", label: "Messages",
    icon: <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>,
  },
];

const panelMeta: Record<Tab, { title: string; sub: string }> = {
  projects: { title: "Projects", sub: "Add, edit, and remove your portfolio projects" },
  contact: { title: "Contact Info", sub: "Manage how visitors can reach you" },
  socials: { title: "Social Links", sub: "Control your social media presence" },
  messages: { title: "Messages", sub: "Contact form submissions from visitors" },
};

// ─── Root ──────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("projects");
  const [addTrigger, setAddTrigger] = useState<Record<Tab, number>>({
    projects: 0, contact: 0, socials: 0, messages: 0
  });

  function handleAdd() {
    setAddTrigger(prev => ({ ...prev, [tab]: prev[tab] + 1 }));
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex mt-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontSize: "13px", borderRadius: "12px" },
        }}
      />

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
              <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none">Portfolio CMS</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Admin panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-2">Content</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${tab === item.id
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              <span className={tab === item.id ? "text-blue-500" : "text-slate-400"}>{item.icon}</span>
              {item.label}
              {tab === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 12l9-9 9 9M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
            </svg>
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {panelMeta[tab].title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{panelMeta[tab].sub}</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
          >
            <PlusIcon />
            Add {tab === "projects" ? "project" : tab === "contact" ? "entry" : "link"}
          </button>
        </header>

        <main className="flex-1 px-8 py-6 max-w-3xl">
          {tab === "projects" && (
            <ProjectsPanel
              key={`proj-${addTrigger.projects}`}
              autoOpen={addTrigger.projects > 0}
            />
          )}
          {tab === "contact" && (
            <ContactPanel
              key={`contact-${addTrigger.contact}`}
              autoOpen={addTrigger.contact > 0}
            />
          )}
          {tab === "socials" && (
            <SocialsPanel
              key={`socials-${addTrigger.socials}`}
              autoOpen={addTrigger.socials > 0}
            />
          )}
          {tab === "messages" && <MessagesPanel />}
        </main>
      </div>
    </div>
  );
}

