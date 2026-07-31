"use client";

import React, { useState, useEffect } from "react";

interface Subscriber {
  _id: string;
  name: string;
  email: string;
  subscribedAt: string;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"activity" | "compose">("activity");
  const [statusMsg, setStatusMsg] = useState("");

  // Offer email form state
  const [formData, setFormData] = useState({
    subject: "",
    title: "",
    message: "",
    ctaText: "",
    ctaUrl: "",
  });
  const [sending, setSending] = useState(false);

  // Fetch Subscribers List & Activity
  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/newsletter/subscribers");
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      console.error("Failed to load subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete Subscriber Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await fetch("/api/admin/newsletter/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
      }
    } catch (error) {
      console.error("Failed to remove subscriber:", error);
    }
  };

  // Broadcast Email Handler via Nodemailer
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg(data.message);
        setFormData({ subject: "", title: "", message: "", ctaText: "", ctaUrl: "" });
      } else {
        setStatusMsg(data.error || "Failed to send broadcast email.");
      }
    } catch {
      setStatusMsg("An error occurred while sending the email.");
    } finally {
      setSending(false);
    }
  };

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-8 font-sans">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Admin Module
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Newsletter Activity & Marketing
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage email subscribers and send broadcast promotional offers.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "activity"
                ? "bg-violet-700 text-white shadow-md shadow-violet-700/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
          >
            Subscribers ({subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab("compose")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === "compose"
                ? "bg-violet-700 text-white shadow-md shadow-violet-700/20"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
          >
            Compose Offer
          </button>
        </div>
      </div>

      {/* TAB 1: SUBSCRIBER LIST & ACTIVITY */}
      {activeTab === "activity" && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <span className="text-[10px] font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                Total Active Audience
              </span>
              <p className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {subscribers.length}
              </p>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold text-xs">
                ✉
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search subscriber by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-sm px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-600 transition-all shadow-sm"
            />
          </div>

          {/* Subscribers Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-10 text-center text-sm font-medium text-slate-500">
                Loading activity data...
              </div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="p-10 text-center text-sm font-medium text-slate-500">
                No subscribers match your query.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-[11px] text-violet-700 dark:text-violet-400 uppercase font-extrabold tracking-wider">
                    <tr>
                      <th className="p-4">Subscriber Name</th>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Subscribed Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filteredSubscribers.map((sub) => (
                      <tr
                        key={sub._id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">
                          {sub.name}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                          {sub.email}
                        </td>
                        <td className="p-4 text-xs text-slate-500">
                          {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDelete(sub._id)}
                            className="px-3 py-1 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Unsubscribe
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: EMAIL BROADCAST FORM */}
      {activeTab === "compose" && (
        <div className="max-w-3xl mx-auto space-y-6">
          {statusMsg && (
            <div className="p-4 rounded-xl bg-violet-100/70 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-900 dark:text-violet-200 text-sm font-medium">
              {statusMsg}
            </div>
          )}

          <form
            onSubmit={handleSendEmail}
            className="space-y-5 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Broadcast Promotional Offer
              </h3>
              <p className="text-xs text-slate-500">
                This offer email will be sent directly to all {subscribers.length} subscribers via SMTP Nodemailer.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase text-violet-700 dark:text-violet-400 tracking-wider">
                Email Subject Line*
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., 🔥 Exclusive 30% Off on Full-Stack Web Development Services!"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase text-violet-700 dark:text-violet-400 tracking-wider">
                Header Banner Title*
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Special Limited-Time Offer for Subscribers"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold uppercase text-violet-700 dark:text-violet-400 tracking-wider">
                Offer Message Details*
              </label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write the full details of your promotional offer or update here..."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600 resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase text-violet-700 dark:text-violet-400 tracking-wider">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="e.g., Claim Offer Now"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold uppercase text-violet-700 dark:text-violet-400 tracking-wider">
                  Call-to-Action Target Link
                </label>
                <input
                  type="url"
                  value={formData.ctaUrl}
                  onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                  placeholder="https://yourdomain.com/offer"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-violet-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending || subscribers.length === 0}
              className="w-full py-3 bg-violet-700 hover:bg-violet-600 active:bg-violet-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-violet-700/20 disabled:opacity-50 cursor-pointer"
            >
              {sending
                ? "Broadcasting Emails via Nodemailer..."
                : `Send Offer to ${subscribers.length} Subscriber(s)`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

