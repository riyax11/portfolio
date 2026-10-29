"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(useGSAP);

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const el = card.current!;
        const ul = list.current!;
        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

        const move = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const enter = () => gsap.to(el, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
        const leave = () => gsap.to(el, { scale: 0, opacity: 0, duration: 0.3 });

        ul.addEventListener("mousemove", move);
        ul.addEventListener("mouseenter", enter);
        ul.addEventListener("mouseleave", leave);
        return () => {
          ul.removeEventListener("mousemove", move);
          ul.removeEventListener("mouseenter", enter);
          ul.removeEventListener("mouseleave", leave);
        };
      });
    },
    { scope: root }
  );

  const hue = (i: number) => `linear-gradient(135deg, hsl(${170 + i * 40} 60% 35%), hsl(${260 + i * 20} 70% 45%))`;

  return (
    <section ref={root} id="experience" className="bg-ink px-6 py-24 text-bg md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="opacity-60">Experience</p>
        <ul ref={list} className="mt-8 border-t border-bg/20" onMouseLeave={() => setActive(null)}>
          {p.experience.map((e, i) => (
            <li
              key={e.org}
              onMouseEnter={() => setActive(i)}
              className={`flex flex-col gap-2 border-b border-bg/20 py-6 transition-opacity duration-300 md:flex-row md:items-center md:justify-between md:gap-6 md:py-8 ${
                active !== null && active !== i ? "opacity-30" : "opacity-100"
              }`}
            >
              <div>
                <p className="text-2xl font-bold md:text-5xl">{e.org}</p>
                <p className="mt-1 opacity-70">{e.role}</p>
              </div>
              <p className="shrink-0 text-sm opacity-70">{e.when}</p>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={card}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-36 w-56 items-end rounded-2xl p-4 text-lg font-bold text-white md:flex"
        style={{ background: hue(active ?? 0) }}
      >
        {active !== null ? p.experience[active].org : ""}
      </div>
    </section>
  );
}