// components/Contact.tsx

"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub } from "react-icons/fa"
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { ContactItem } from "@/types";

// Map icon names → components (mirrors your admin setup)
const ICON_MAP: Record<string, React.ElementType> = {
  Mail, Phone, MapPin,
  Github: FaGithub,
  Twitter: FaXTwitter,
  Linkedin: FaLinkedin,

  // Lowercase fallback for legacy data
  mail: Mail,
  phone: Phone,
  mappin: MapPin,
  github: FaGithub,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
};

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [contactLinks, setContactLinks] = useState<ContactItem[]>([]);

  // Fetch contact info from DB
  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setContactLinks(data); })
      .catch(() => { });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="w-full px-1 sm:px-2 pt-20 md:pt-25 flex justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: none; }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.25s; }
      `}</style>

      {/* Main */}
      <div className="font-outfit w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 fade-up fade-up-1">
          <span className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </span>
          <h2 className="font-syne text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-2 text-violet-700 ">
            Let&apos;s work <span className="bg-clip-text">together.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-md leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Layout Grid: Removed space-y-3 from the inputs, added direct layout alignment */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start w-full">
          {/* ── Left — Dynamic contact links ── */}
          <div className="fade-up fade-up-2 space-y-4 w-full">
            {contactLinks.length === 0 && (
              <p className="text-xs text-slate-500">No contact info added yet.</p>
            )}
            {contactLinks.map((item) => {
              const Icon = ICON_MAP[item.iconName] ?? Mail;
              const resolvedHref = item.iconName === "Mail" && !item.href.startsWith("mailto:") ? `mailto:${item.href}` : item.href;
              return (
                <Link
                  key={item._id}
                  href={resolvedHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 text-gray-400 rounded-2xl border border-gray-300 dark:border-gray-500 dark:bg-gray-900 hover:border-gray-400 hover:bg-white/5 transition-all duration-300 w-full"
                >
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-400 group-hover:border-violet-500/40 transition-colors duration-300">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-200 truncate">
                      {item.value}
                    </p>
                  </div>
                  <svg
                    className="ml-auto shrink-0 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200"
                    width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </Link>
              );
            })}
          </div>

          {/* ── Right — Form ── */}
          <div className="fade-up fade-up-3 w-full">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-violet-500/5   rounded-2xl  bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 shadow-[0_10px_50px_rgba(139,92,246,0.15)] dark:shadow-[0_10px_50px_rgba(139,92,246,0.1)] border border-violet-200 dark:border-slate-800 ">
                <div className="w-16 h-16 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-4 mt-5">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-violet-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-syne text-2xl font-bold mb-2">Message sent Successfully!</h3>
                <p className="text-sm mb-4">Thanks for reaching out. I&apos;ll be in touch within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="text-xs font-semibold tracking-widest uppercase mb-4 text-violet-700 hover:text-violet-600 transition-colors cursor-pointer">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["name", "email"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-1.5 w-full">
                      <label htmlFor={field} className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                        {field === "name" ? "Your Name" : "Email Address"}
                      </label>
                      <input
                        id={field} name={field}
                        type={field === "email" ? "email" : "text"}
                        required
                        placeholder={field === "name" ? "Full Name" : "yourname@example.com"}
                        value={form[field]}
                        onChange={handleChange}
                        onFocus={() => setFocused(field)}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-white/3 text-slate-500 dark:text-slate-100 placeholder-slate-400 text-sm outline-none py-3 px-3 rounded-xl border transition-all duration-300 ${focused === field ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]" : "border-gray-300 dark:border-gray-500"}`}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="subject" className="text-xs font-semibold tracking-widest text-slate-400 uppercase pt-2">Subject</label>
                  <input
                    id="subject" name="subject" type="text" required
                    placeholder="Project Inquiry / Freelance / Collaboration"
                    value={form.subject} onChange={handleChange}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    className={`w-full bg-white/3 text-slate-500 dark:text-slate-100 placeholder-slate-400 text-sm outline-none py-3 px-3 rounded-xl border transition-all duration-300 ${focused === "subject" ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]" : "border-gray-300 dark:border-gray-500 "}`}
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="message" className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Message</label>
                  <div className="relative w-full">
                    <textarea
                      id="message" name="message" required rows={6}
                      placeholder="Tell me about your project..."
                      value={form.message} onChange={handleChange}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      className={`w-full bg-white/3 text-slate-500 dark:text-slate-100 placeholder-slate-400 text-sm outline-none py-3 px-4 rounded-xl border transition-all duration-300 resize-none ${focused === "message" ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]" : "border-gray-300 dark:border-gray-500 "}`}
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] text-slate-600 font-mono">{form.message.length}</span>
                  </div>
                </div>
                {status === "error" && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm w-full">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}
                <button
                  type="submit" disabled={status === "sending"}
                  className="w-full relative flex items-center justify-center gap-3 py-2 px-6 rounded-xl font-syne font-semibold text-sm tracking-wide transition-all duration-300 bg-violet-700 text-white hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 border border-gray-400 dark:border-white/50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "sending" ? (
                    <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending…</>
                  ) : (
                    <>Send Message<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

