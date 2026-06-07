// components/admin/AdminDashboard.tsx

"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

// ─── Types ───────────────────────────────────────
type Project = {
  _id?: string; title: string; description: string;
  image: string; techStack: string[]; demoUrl: string;
  githubUrl: string; order: number;
};
type ContactItem = {
  _id?: string; label: string; value: string;
  href: string; iconName: string;
};
type SocialItem = {
  _id?: string; name: string; href: string;
  iconName: string; order: number;
};
type Tab = "projects" | "contact" | "socials";

const blankProject = (): Project => ({
  title: "", description: "", image: "", techStack: [],
  demoUrl: "", githubUrl: "", order: 0,
});
const blankContact = (): ContactItem => ({
  label: "", value: "", href: "#", iconName: "Mail",
});
const blankSocial = (): SocialItem => ({
  name: "", href: "", iconName: "github", order: 0,
});

// ─── Shared UI atoms ──────────────────────────────────────────────────────────
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
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
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
        <div key={i} className="h-[76px] rounded-2xl bg-slate-100 dark:bg-slate-800" />
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

// ─── Icon components ──────────────────────────────────────────────────────────
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

// ─── Projects Panel ────────────────────────────────────────────────────────────
function ProjectsPanel() {
  const [items, setItems] = useState<Project[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [techInput, setTechInput] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

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
    setSaving(true);
    const payload = { ...editing, techStack: techInput.split(",").map(s => s.trim()).filter(Boolean) };
    const res = isNew
      ? await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch(`/api/admin/projects/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      toast.success(isNew ? "Project created!" : "Project updated!");
      setModal(false);
      load();
    } else toast.error("Failed to save.");
    setSaving(false);
  }

  async function del(id: string) {
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted."); load(); }
    else toast.error("Failed to delete.");
    setConfirm(null);
  }

  return (
    <>
      {confirm && <ConfirmModal msg="This will permanently delete the project." onConfirm={() => del(confirm)} onCancel={() => setConfirm(null)} />}
      {modal && editing && (
        <Modal title={isNew ? "Add project" : "Edit project"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title">
                <input className={inp} value={editing.title} onChange={e => setEditing(p => p && ({ ...p, title: e.target.value }))} placeholder="Project title" />
              </Field>
              <Field label="Order">
                <input className={inp} type="number" value={editing.order} onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))} />
              </Field>
            </div>
            <Field label="Description">
              <textarea className={inp + " resize-none"} rows={3} value={editing.description} onChange={e => setEditing(p => p && ({ ...p, description: e.target.value }))} placeholder="Short description..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Demo URL">
                <input className={inp} value={editing.demoUrl} onChange={e => setEditing(p => p && ({ ...p, demoUrl: e.target.value }))} placeholder="https://..." />
              </Field>
              <Field label="GitHub URL">
                <input className={inp} value={editing.githubUrl} onChange={e => setEditing(p => p && ({ ...p, githubUrl: e.target.value }))} placeholder="https://github.com/..." />
              </Field>
            </div>
            <Field label="Image URL">
              <input className={inp} value={editing.image} onChange={e => setEditing(p => p && ({ ...p, image: e.target.value }))} placeholder="/images/p1.jpg" />
            </Field>
            <Field label="Tech Stack (comma-separated)">
              <input className={inp} value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="Next.js, TypeScript, MongoDB" />
            </Field>
            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors">
                {saving ? "Saving…" : isNew ? "Create project" : "Save changes"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
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

      {loading ? <Skeleton /> : items.length === 0 ? <EmptyState label="projects" onAdd={openNew} /> : (
        <div className="space-y-2.5">
          {items.map(p => (
            <div key={p._id} className="group flex items-start gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
              {p.image ? (
                <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-700 shrink-0" onError={e => (e.currentTarget.style.opacity = "0")} />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" stroke="#378ADD" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">{p.title}</p>
                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(p)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 dark:hover:border-blue-500 transition-colors bg-white dark:bg-slate-800">
                      <EditIcon />
                    </button>
                    <button onClick={() => setConfirm(p._id!)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-500 transition-colors bg-white dark:bg-slate-800">
                      <TrashIcon />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{p.description}</p>
                {p.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.techStack.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">{t}</span>
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

// ─── Contact Panel ─────────────────────────────────────────────────────────────
function ContactPanel() {
  const [items, setItems] = useState<ContactItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<ContactItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/contact");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const res = isNew
      ? await fetch("/api/admin/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
      : await fetch(`/api/admin/contact/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { toast.success(isNew ? "Created!" : "Updated!"); setModal(false); load(); }
    else toast.error("Failed.");
    setSaving(false);
  }

  async function del(id: string) {
    const res = await fetch(`/api/admin/contact/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted."); load(); }
    else toast.error("Failed.");
    setConfirm(null);
  }

  const iconOpts = ["Mail", "Phone", "MapPin", "Globe", "Twitter", "Linkedin"];
  const iconColors: Record<string, string> = {
    Mail: "from-violet-50 to-violet-100 dark:from-violet-900/30 dark:to-violet-800/20",
    Phone: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20",
    MapPin: "from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20",
    Globe: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
    default: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700",
  };

  return (
    <>
      {confirm && <ConfirmModal msg="This will permanently delete this contact entry." onConfirm={() => del(confirm)} onCancel={() => setConfirm(null)} />}
      {modal && editing && (
        <Modal title={isNew ? "Add contact entry" : "Edit contact entry"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Label">
                <input className={inp} value={editing.label} onChange={e => setEditing(p => p && ({ ...p, label: e.target.value }))} placeholder="Email" />
              </Field>
              <Field label="Icon">
                <select className={sel} value={editing.iconName} onChange={e => setEditing(p => p && ({ ...p, iconName: e.target.value }))}>
                  {iconOpts.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Display Value">
              <input className={inp} value={editing.value} onChange={e => setEditing(p => p && ({ ...p, value: e.target.value }))} placeholder="hello@you.dev" />
            </Field>
            <Field label="Link (href)">
              <input className={inp} value={editing.href} onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))} placeholder="mailto:hello@you.dev" />
            </Field>
            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors">
                {saving ? "Saving…" : isNew ? "Create entry" : "Save changes"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[{ v: items.length, l: "Total entries" }, { v: items.filter(c => c.href !== "#").length, l: "With links" }].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? <Skeleton /> : items.length === 0 ? <EmptyState label="contact entries" onAdd={() => { setEditing(blankContact()); setIsNew(true); setModal(true); }} /> : (
        <div className="space-y-2.5">
          {items.map(c => (
            <div key={c._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconColors[c.iconName] ?? iconColors.default} flex items-center justify-center shrink-0`}>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{c.iconName.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{c.label}</p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate mt-0.5">{c.value}</p>
                <p className="text-[11px] text-slate-400 truncate">{c.href}</p>
              </div>
              <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing({ ...c }); setIsNew(false); setModal(true); }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800">
                  <EditIcon />
                </button>
                <button onClick={() => setConfirm(c._id!)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Socials Panel ─────────────────────────────────────────────────────────────
function SocialsPanel() {
  const [items, setItems] = useState<SocialItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<SocialItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/socials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const res = isNew
      ? await fetch("/api/admin/socials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) })
      : await fetch(`/api/admin/socials/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
    if (res.ok) { toast.success(isNew ? "Created!" : "Updated!"); setModal(false); load(); }
    else toast.error("Failed.");
    setSaving(false);
  }

  async function del(id: string) {
    const res = await fetch(`/api/admin/socials/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Deleted."); load(); }
    else toast.error("Failed.");
    setConfirm(null);
  }

  const iconOpts = ["github", "linkedin", "twitter", "instagram", "youtube", "tiktok", "dribbble", "behance"];
  const platformColors: Record<string, string> = {
    github: "from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700",
    linkedin: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
    twitter: "from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-800/20",
    instagram: "from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20",
    default: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700",
  };

  return (
    <>
      {confirm && <ConfirmModal msg="This will permanently delete this social link." onConfirm={() => del(confirm)} onCancel={() => setConfirm(null)} />}
      {modal && editing && (
        <Modal title={isNew ? "Add social link" : "Edit social link"} onClose={() => setModal(false)}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Platform Name">
                <input className={inp} value={editing.name} onChange={e => setEditing(p => p && ({ ...p, name: e.target.value }))} placeholder="GitHub" />
              </Field>
              <Field label="Icon">
                <select className={sel} value={editing.iconName} onChange={e => setEditing(p => p && ({ ...p, iconName: e.target.value }))}>
                  {iconOpts.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Profile URL">
              <input className={inp} value={editing.href} onChange={e => setEditing(p => p && ({ ...p, href: e.target.value }))} placeholder="https://github.com/..." />
            </Field>
            <Field label="Display Order">
              <input className={inp} type="number" value={editing.order} onChange={e => setEditing(p => p && ({ ...p, order: Number(e.target.value) }))} />
            </Field>
            <div className="flex gap-2 pt-2">
              <button onClick={save} disabled={saving} className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors">
                {saving ? "Saving…" : isNew ? "Create link" : "Save changes"}
              </button>
              <button onClick={() => setModal(false)} className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[{ v: items.length, l: "Total links" }, { v: items.filter(s => s.href).length, l: "Active" }].map(s => (
          <div key={s.l} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
            <div className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{s.v}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>

      {loading ? <Skeleton /> : items.length === 0 ? <EmptyState label="social links" onAdd={() => { setEditing(blankSocial()); setIsNew(true); setModal(true); }} /> : (
        <div className="space-y-2.5">
          {items.map(s => (
            <div key={s._id} className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/60 rounded-2xl hover:border-slate-200 dark:hover:border-slate-600 transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platformColors[s.iconName] ?? platformColors.default} flex items-center justify-center shrink-0`}>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{s.iconName.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{s.name}</p>
                <p className="text-xs text-slate-400 truncate">{s.href}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0">
                #{s.order}
              </span>
              <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing({ ...s }); setIsNew(false); setModal(true); }} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-blue-500 hover:border-blue-300 transition-colors bg-white dark:bg-slate-800">
                  <EditIcon />
                </button>
                <button onClick={() => setConfirm(s._id!)} className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors bg-white dark:bg-slate-800">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── Sidebar nav items ────────────────────────────────────────────────────────
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
];

const panelMeta: Record<Tab, { title: string; sub: string }> = {
  projects: { title: "Projects", sub: "Add, edit, and remove your portfolio projects" },
  contact: { title: "Contact Info", sub: "Manage how visitors can reach you" },
  socials: { title: "Social Links", sub: "Control your social media presence" },
};

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("projects");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex mt-20">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--tw-bg-opacity)",
            fontSize: "13px",
            borderRadius: "12px",
          },
        }}
      />

      {/* ── Sidebar ── */}
      <aside className="w-60 shrink-0 text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col sticky top-0 h-screen">
        {/* Logo area */}
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

        {/* Nav */}
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
              {tab === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
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
        {/* Top bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {panelMeta[tab].title}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">{panelMeta[tab].sub}</p>
          </div>
          <button
            onClick={() => {
              // Dispatch a custom event that each panel listens for
              window.dispatchEvent(new CustomEvent("admin:add", { detail: tab }));
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
          >
            <PlusIcon />
            Add {tab === "projects" ? "project" : tab === "contact" ? "entry" : "link"}
          </button>
        </header>

        {/* Panel content */}
        <main className="flex-1 px-8 py-6 max-w-3xl">
          {tab === "projects" && <ProjectsPanelWithEvent />}
          {tab === "contact" && <ContactPanelWithEvent />}
          {tab === "socials" && <SocialsPanelWithEvent />}
        </main>
      </div>
    </div>
  );
}

// ─── Event-bridged wrappers (header "Add" button → open modal inside panel) ───
function ProjectsPanelWithEvent() {
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const h = (e: Event) => { if ((e as CustomEvent).detail === "projects") setTrigger(t => t + 1); };
    window.addEventListener("admin:add", h);
    return () => window.removeEventListener("admin:add", h);
  }, []);
  return <ProjectsPanel key={`proj-${trigger}`} />;
}

function ContactPanelWithEvent() {
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const h = (e: Event) => { if ((e as CustomEvent).detail === "contact") setTrigger(t => t + 1); };
    window.addEventListener("admin:add", h);
    return () => window.removeEventListener("admin:add", h);
  }, []);
  return <ContactPanel key={`contact-${trigger}`} />;
}

function SocialsPanelWithEvent() {
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const h = (e: Event) => { if ((e as CustomEvent).detail === "socials") setTrigger(t => t + 1); };
    window.addEventListener("admin:add", h);
    return () => window.removeEventListener("admin:add", h);
  }, []);
  return <SocialsPanel key={`socials-${trigger}`} />;
}