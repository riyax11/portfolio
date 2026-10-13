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
        className="flex flex-col gap-12 px-6 py-32 md:h-screen md:w-max md:flex-row md:items-center md:gap-16 md:py-0 md:pr-[10vw]"
      >
        <div className="shrink-0 md:w-[34vw]">
          <p className="text-mute">Selected work</p>
          <h2 className="mt-2 text-6xl font-bold uppercase md:text-8xl">Projects</h2>
        </div>

        {p.projects.map((pr, i) => (
          <article key={pr.title} className="group w-full shrink-0 md:w-[46vw]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-card to-bg">
              {pr.image ? (
                <Image
                  src={pr.image}
                  alt={pr.title}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <span className="text-stroke absolute left-6 top-4 text-8xl font-bold opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="text-3xl font-bold">{pr.title}</h3>
                <p className="mt-2 max-w-md text-mute">{pr.description}</p>
                <p className="mt-3 text-sm text-teal">{pr.tech.join("  ·  ")}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 text-sm font-semibold text-teal">
                <a href={pr.live}>Live demo ↗</a>
                <a href={pr.code}>Source code ↗</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}