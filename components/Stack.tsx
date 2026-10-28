"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  // which projects use the hovered tech, and which other techs appear next to it
  const { used, related } = useMemo(() => {
    if (!hover) return { used: [] as string[], related: new Set<string>() };
    const prs = p.projects.filter((pr) => pr.tech.includes(hover));
    const inSite = p.siteTech.includes(hover);
    return {
      used: [...prs.map((pr) => pr.title), ...(inSite ? ["This portfolio"] : [])],
      related: new Set<string>([hover, ...prs.flatMap((pr) => pr.tech), ...(inSite ? p.siteTech : [])]),
    };
  }, [hover]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const el = plane.current!;
        const slabs = gsap.utils.toArray<HTMLElement>(".slab");

        gsap.set(el, { rotateX: 16, rotateY: -10 });
        gsap.set(slabs, { z: (i: number) => i * 26 });
        gsap.from(slabs, {
          opacity: 0,
          z: -520,
          y: 90,
          rotateX: 38,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });

        const rx = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3" });
        const section = root.current!;
        const move = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          ry(-10 + nx * 18);
          rx(16 - ny * 14);
        };
        section.addEventListener("pointermove", move);
        return () => section.removeEventListener("pointermove", move);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="stack" className="mx-auto max-w-6xl px-6 py-32">
      <p className="font-mono text-sm text-teal">{"// stack"}</p>
      <h2 className="mt-2 text-5xl font-bold uppercase md:text-7xl">What I build with</h2>
      <p className="mt-4 max-w-xl text-mute">
        Hover a technology to light up every project that uses it, and the tools that travel with it.
      </p>

      <div className="mt-14" style={{ perspective: "1400px" }}>
        <div
          ref={plane}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {p.stack.map((g) => (
            <div
              key={g.group}
              className="slab rounded-2xl border border-line bg-card/90 p-6 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)] backdrop-blur"
            >
              <p className="font-mono text-sm text-teal">{`// ${g.group}`}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => {
                  const isHover = hover === item;
                  const isRelated = hover !== null && related.has(item);
                  const dim = hover !== null && !isRelated;
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onMouseEnter={() => setHover(item)}
                        onMouseLeave={() => setHover(null)}
                        onFocus={() => setHover(item)}
                        onBlur={() => setHover(null)}
                        className={`rounded-md border px-3 py-1.5 font-mono text-sm transition duration-200 ${
                          isHover
                            ? "scale-110 border-teal bg-teal text-bg shadow-[0_0_24px_rgba(31,181,168,0.55)]"
                            : isRelated
                              ? "border-teal text-ink"
                              : dim
                                ? "border-line text-mute opacity-30"
                                : "border-line text-ink hover:border-teal"
                        }`}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-line bg-card px-5 py-4 font-mono text-sm">
        <p>
          <span className="text-teal">$</span>{" "}
          {hover ? `used --tech "${hover}"` : "hover a technology"}
        </p>
        <p className="mt-1 min-h-6 text-mute">
          {hover ? (used.length ? used.join("  ·  ") : "no project listed yet") : "see which projects use it"}
        </p>
      </div>
    </section>
  );
}
