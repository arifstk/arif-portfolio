// app/api/check-repo/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const githubUrl = searchParams.get("url");

  if (!githubUrl) {
    return NextResponse.json(
      { available: null, reason: "missing-url" },
      { status: 400 },
    );
  }

  let owner: string;
  let repo: string;

  try {
    const normalized = /^https?:\/\//i.test(githubUrl)
      ? githubUrl
      : `https://${githubUrl}`;
    const u = new URL(normalized);

    if (!u.hostname.includes("github.com")) {
      return NextResponse.json({ available: null, reason: "not-github" });
    }

    const parts = u.pathname.replace(/^\/|\/$/g, "").split("/");
    if (parts.length < 2) {
      return NextResponse.json({ available: null, reason: "invalid-path" });
    }

    owner = parts[0];
    repo = parts[1].replace(/\.git$/, "");
  } catch {
    return NextResponse.json({ available: null, reason: "invalid-url" });
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      cache: "no-store",
    });

    if (res.status === 404) {
      return NextResponse.json({ available: false });
    }
    if (res.ok) {
      return NextResponse.json({ available: true });
    }

    // Rate-limited or some other GitHub-side hiccup — we genuinely don't know.
    return NextResponse.json({
      available: null,
      reason: `github-${res.status}`,
    });
  } catch {
    return NextResponse.json({ available: null, reason: "network-error" });
  }
}
