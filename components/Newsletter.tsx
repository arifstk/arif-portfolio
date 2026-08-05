// components/Newsletter.tsx

"use client";
import React, { useState } from "react";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const errorMessage = errorData?.message || `Server error (${res.status})`;
        throw new Error(errorMessage);
      }

      const data = await res.json();

      setStatus({ type: "success", message: "Thanks for subscribing!" });
      setName("");
      setEmail("");
    } catch (err: any) {
      setStatus({ type: "error", message: err.message || "Failed to subscribe" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 border border-slate-200 dark:border-gray-700 px-5 py-10 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] md:p-10 bg-white dark:bg-[#0c1021] shadow-violet-500/5 font-sans relative overflow-hidden sm:rounded-2xl">

      <span className="absolute -top-1.5 sm:-top-6 -right-1.5 sm:-right-6 text-4xl sm:text-8xl md:text-9xl font-black text-violet-900/5 dark:text-violet-100/5 select-none pointer-events-none tracking-tighter uppercase z-0">
        Newsletter
      </span>

      {/* Badge */}
      <div className="inline-block mb-4 relative z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-300/60 dark:border-violet-800/50 text-violet-800 dark:text-violet-500 text-sm font-bold tracking-wider uppercase">
          Newsletter
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 max-w-3xl mb-8 relative z-10">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-700 dark:text-slate-300 tracking-wide">
          Build Better, Faster Full-Stack Applications
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          Get expert insights on Next.js, TypeScript architecture, scalable database patterns, and modern web performance strategies delivered straight to your inbox.
        </p>
      </div>

      {/* Status Feedback */}
      {status && (
        <div
          className={`mb-4 p-3 rounded-xl text-sm font-medium relative z-10 ${status.type === "success"
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
            }`}
        >
          {status.message}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative z-10">
        {/* Name Field */}
        <div className="md:col-span-4 space-y-1.5">
          <label htmlFor="name" className="block text-[11px] font-extrabold text-violet-700 dark:text-violet-400 uppercase tracking-wider">
            Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Preferred name"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
          />
        </div>

        {/* Email Field */}
        <div className="md:col-span-5 space-y-1.5">
          <label htmlFor="email" className="block text-[11px] font-extrabold text-violet-700 dark:text-violet-400 uppercase tracking-wider">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-violet-800 hover:bg-violet-700 active:bg-violet-900 disabled:bg-violet-500/50 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-violet-700/20 hover:shadow-violet-700/30 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      </form>
    </section>
  );
}

