// components/Contact.tsx

"use client";
import Link from "next/link";
import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Demo simulation:
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const links = [
    {
      label: "Email Me",
      value: "hello@yourname.dev",
      href: "mailto:hello@yourname.dev",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 7 10-7" />
        </svg>
      ),
    },
  ];

  const inputBase =
    "w-full bg-transparent text-slate-100 placeholder-slate-600 text-sm outline-none pt-7 pb-3 px-4 transition-colors duration-200";

  const fieldWrapper = (name: string) =>
    `relative border rounded-xl transition-all duration-300 ${focused === name
      ? "border-violet-500 bg-white/[0.04] shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
      : "border-white/10 bg-white/[0.02] hover:border-white/20"
    }`;

  const floatingLabel = (name: string, text: string) => (
    <label
      htmlFor={name}
      className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium tracking-wide ${focused === name || form[name as keyof FormState]
        ? "top-2.5 text-[10px] text-violet-400"
        : "top-1/2 -translate-y-1/2 text-xs text-slate-500"
        }`}
    >
      {text}
    </label>
  );

  return (
    <section className="py-10 md:py-20">
      {/* ── Google Fonts ── */}
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
        .fade-up-4 { animation-delay: 0.35s; }
      `}</style>

      <div className="max-w-6xl mx-auto font-outfit">

        {/* ── Section header ── */}
        <div className="mb-16 fade-up fade-up-1">
          <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Contact
          </span>
          <h2 className="font-syne text-2xl md:text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2">
            Let&apos;s work{" "}
            <span className="bg-clip-text ">
              together.
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-md leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Drop me a message
            and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

          {/* ── Left — Contact links ── */}
          <div className="fade-up fade-up-2 space-y-4">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-violet-500/40 dark:border-gray-200  dark:bg-gray-900 hover:border-violet-500/40 hover:bg-white/5 transition-all duration-300"
              >
                <span className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-violet-400 group-hover:border-violet-500/40 transition-colors duration-300">
                  {link.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mb-0.5">
                    {link.label}
                  </p>
                  <p className="text-sm text-slate-300 group-hover:text-white truncate transition-colors duration-200">
                    {link.value}
                  </p>
                </div>
                <svg
                  className="ml-auto shrink-0 text-slate-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200"
                  width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                >
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </Link>
            ))}
          </div>

          {/* ── Right — Form ── */}
          <div className="fade-up fade-up-3">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 mt-5">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-emerald-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-syne text-2xl font-bold mb-2">Message sent!</h3>
                <p className=" text-sm mb-4">Thanks for reaching out. I&apos;ll be in touch within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-semibold tracking-widest uppercase mb-4 hover:text-violet-300 transition-colors cursor-pointer"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-4 space-y-3">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      Your Name
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-white/3 text-slate-100 placeholder-slate-600 text-sm outline-none py-3 px-4 rounded-xl border border-violet-500/40 transition-all duration-300 ${focused === "name"
                        ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                        : "border-violet-500/40 hover:border-white/20"
                        }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                      Email Address
                    </label>
                    <input
                      id="email" name="email" type="email" required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-white/3 text-slate-100 placeholder-slate-600 text-sm outline-none py-3 px-4 rounded-xl border border-violet-500/40 transition-all duration-300 ${focused === "email"
                        ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                        : "border-violet-500/40 hover:border-white/20"
                        }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold tracking-widest text-slate-400 uppercase pt-2">
                    Subject
                  </label>
                  <input
                    id="subject" name="subject" type="text" required
                    placeholder="Project Inquiry / Freelance / Collaboration"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-white/3 text-slate-100 placeholder-slate-600 text-sm outline-none py-3 px-4 rounded-xl border border-violet-500/40 transition-all duration-300 ${focused === "subject"
                      ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                      : "border-violet-500/40 hover:border-white/20"
                      }`}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message" name="message" required
                      rows={6}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-white/3 text-slate-100 placeholder-slate-600 text-sm outline-none py-3 px-4 rounded-xl border border-violet-500/40 transition-all duration-300 resize-none ${focused === "message"
                        ? "border-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.12)]"
                        : "border-violet-500/40 hover:border-white/20"
                        }`}
                    />
                    <span className="absolute bottom-0 right-0 text-[10px] text-slate-600 font-mono">
                      {form.message.length}
                    </span>
                  </div>
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                    </svg>
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full relative flex items-center justify-center gap-3 py-2 px-6 rounded-2xl font-syne font-semibold text-sm tracking-wide transition-all duration-300 border border-gray-400 dark:border-white 
                    bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-cyan-500
                     shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-violet-600 disabled:hover:to-violet-500 cursor-pointer"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
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