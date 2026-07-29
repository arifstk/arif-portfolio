// lib/github.ts

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export interface ContributionDay {
  date: string;
  count: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface GithubActivity {
  totalContributions: number;
  weeks: ContributionWeek[];
  lastPushedAt: string | null;
}

async function githubGraphQL(query: string, variables: Record<string, any>) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN environment variable");

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    // Contribution data doesn't need to be real-time — cache for an hour.
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GitHub GraphQL error");
  }
  return json.data;
}

async function getLastPushedAt(username: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const events = await res.json();
    const push = Array.isArray(events)
      ? events.find((e: any) => e.type === "PushEvent")
      : null;
    return push?.created_at ?? null;
  } catch {
    return null;
  }
}

export async function getGithubActivity(
  username: string,
): Promise<GithubActivity | null> {
  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const [data, lastPushedAt] = await Promise.all([
      githubGraphQL(query, { login: username }),
      getLastPushedAt(username),
    ]);

    const calendar = data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((w: any) => ({
        days: w.contributionDays.map((d: any) => ({
          date: d.date,
          count: d.contributionCount,
        })),
      })),
      lastPushedAt,
    };
  } catch {
    return null;
  }
}
