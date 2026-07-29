// components/GitHubActivity.tsx

import { getGithubActivity } from "@/lib/github";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "your-github-username";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = [
  { dayIndex: 1, label: "Mon" },
  { dayIndex: 3, label: "Wed" },
  { dayIndex: 5, label: "Fri" },
];

function levelClass(count: number) {
  if (count === 0) return "bg-gray-100 dark:bg-slate-800/70";
  if (count <= 2) return "bg-emerald-200 dark:bg-emerald-900";
  if (count <= 5) return "bg-emerald-400 dark:bg-emerald-700";
  if (count <= 8) return "bg-emerald-600 dark:bg-emerald-500";
  return "bg-emerald-800 dark:bg-emerald-400";
}

export default async function GitHubActivity() {
  const activity = await getGithubActivity(GITHUB_USERNAME);

  if (!activity) return null;

  const { weeks, totalContributions, lastPushedAt } = activity;

  let lastMonth = -1;
  const monthMarkers = weeks.map((week) => {
    const firstDay = week.days[0];
    if (!firstDay) return null;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABELS[month];
    }
    return null;
  });

  const lastPushedLabel = lastPushedAt
    ? new Date(lastPushedAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-5 text-slate-800 dark:border-slate-700/60 dark:bg-[#0d1424] dark:text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-emerald-600 dark:text-[#7dd3a8]" strokeWidth="2.5">
            <path d="M2 12h4l2 7 4-14 2 7h8" />
          </svg>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">GitHub activity</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-right sm:max-w-xs leading-snug">
          Coding Contributions Insights from GitHub
        </p>
      </div>

      {/* Main */}
      <div className="overflow-x-scroll pb-3">
        {/* Month labels */}
        <div className="flex gap-1 mb-2 pl-9">
          {monthMarkers.map((label, i) => (
            <div key={i} className="w-3 shrink-0 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {label ?? ""}
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2">
          {/* Day of Week Labels (Mon, Wed, Fri) */}
          <div className="grid grid-rows-7 gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 h-29 pr-1">
            {Array.from({ length: 7 }).map((_, index) => {
              const day = DAY_LABELS.find((d) => d.dayIndex === index);
              return (
                <div key={index} className="h-3.5 flex items-center leading-none">
                  {day ? day.label : ""}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
                    className={`w-3 h-3 rounded-[3px] transition-colors ${levelClass(day.count)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          Less
          {[
            "bg-gray-100 dark:bg-slate-800/70",
            "bg-emerald-200 dark:bg-emerald-900",
            "bg-emerald-400 dark:bg-emerald-700",
            "bg-emerald-600 dark:bg-emerald-500",
            "bg-emerald-800 dark:bg-emerald-400",
          ].map((c, i) => (
            <span key={i} className={`w-3 h-3 rounded-[3px] ${c}`} />
          ))}
          More
        </div>
      </div>

      {lastPushedLabel && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Last pushed on {lastPushedLabel}
        </p>
      )}
    </div>
  );
}


