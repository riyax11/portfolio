"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { portfolio as p } from "@/data/portfolio";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

// only these repos are shown, in this order (names are not case sensitive)
const FEATURED = [
  "verijob-ai",
  "finsight-ai",
  "chainguard-aml",
  "dataforge-ai",
  "InventoryQR",
  "chair-occupancy-detection",
];

export default function GithubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${p.github}/repos?per_page=100`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<Repo[]>;
      })
      .then((data) => {
        const byName = new Map(data.map((r) => [r.name.toLowerCase(), r]));
        setRepos(
          FEATURED.map((name) => byName.get(name.toLowerCase())).filter(
            (r): r is Repo => r !== undefined
          )
        );
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-sm text-teal">{"// open source"}</p>
        <h2 className="mt-2 text-5xl font-bold uppercase md:text-7xl">On GitHub</h2>
        <a
          href={`https://github.com/${p.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-mono text-sm text-mute hover:text-ink"
        >
          github.com/{p.github} ↗
        </a>
      </Reveal>

      <Reveal className="mt-12">
        {failed ? (
          <p className="text-mute">Couldn&apos;t load repositories right now. Visit my GitHub profile above.</p>
        ) : repos === null ? (
          <p className="font-mono text-sm text-mute">fetching repositories...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-teal"
              >
                <p className="font-mono text-teal">{r.name}</p>
                <p className="mt-3 flex-1 text-sm text-mute">
                  {r.description ?? "No description yet."}
                </p>
                <div className="mt-5 flex items-center gap-4 font-mono text-xs text-mute">
                  {r.language ? (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-teal" />
                      {r.language}
                    </span>
                  ) : null}
                  <span>★ {r.stargazers_count}</span>
                  <span>
                    {new Date(r.pushed_at).toLocaleDateString("en-IN", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}