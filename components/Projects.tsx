"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const t = track.current!;
        const dist = () => t.scrollWidth - window.innerWidth;
        gsap.to(t, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="projects" className="overflow-hidden">
      <div
        ref={track}
        className="flex flex-col gap-16 px-6 py-32 md:h-screen md:w-max md:flex-row md:items-center md:gap-16 md:py-0 md:pr-[10vw]"
      >
        <div className="shrink-0 md:w-[30vw]">
          <p className="font-mono text-sm text-teal">{"// selected work"}</p>
          <h2 className="mt-2 text-6xl font-bold uppercase md:text-8xl">Projects</h2>
          <p className="mt-6 max-w-sm text-mute">
            {p.projects.length} projects across machine learning, LLM apps, computer vision,
            blockchain and full-stack systems.
          </p>
        </div>

        {p.projects.map((pr, i) => (
          <article key={pr.title} className="group w-full shrink-0 md:w-[44vw]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-card to-bg">
              {pr.image ? (
                <Image
                  src={pr.image}
                  alt={`${pr.title} screenshot`}
                  fill
                  sizes="(min-width: 768px) 44vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/80 px-3 py-1 font-mono text-xs backdrop-blur">
                {pr.label}
              </span>
              <span className="text-stroke absolute bottom-2 right-5 text-7xl font-bold opacity-50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-2xl font-bold md:text-3xl">{pr.title}</h3>
              <p className="mt-1 text-sm text-teal">{pr.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm text-mute md:text-base">
                {pr.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-teal">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {pr.tech.map((t) => (
                  <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-teal">
                {pr.code ? (
                  <a href={pr.code} target="_blank" rel="noopener noreferrer">
                    Source code ↗
                  </a>
                ) : pr.isPrivate ? (
                  <span className="font-normal text-mute">Private repository</span>
                ) : null}
                {pr.demo ? (
                  <a href={pr.demo} target="_blank" rel="noopener noreferrer">
                    Watch demo ↗
                  </a>
                ) : null}
                {pr.live ? (
                  <a href={pr.live} target="_blank" rel="noopener noreferrer">
                    Live ↗
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}