"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolio as p, type Project } from "@/data/portfolio";
import { SCENES } from "@/components/ProjectScenes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- case-study popup ---------------- */

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const Scene = SCENES[project.slug];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtn.current?.focus();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".cs-backdrop", { opacity: 0, duration: 0.3 });
      gsap.from(".cs-panel", {
        opacity: 0,
        y: 90,
        rotateX: 24,
        scale: 0.9,
        transformPerspective: 1200,
        duration: 0.75,
        ease: "power4.out",
      });
      gsap.from(".cs-item", {
        opacity: 0,
        y: 26,
        duration: 0.6,
        stagger: 0.07,
        delay: 0.25,
        ease: "power3.out",
      });
    }, ref);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      ctx.revert();
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[150] grid place-items-center p-4 md:p-8"
      data-lenis-prevent
    >
      <div className="cs-backdrop absolute inset-0 bg-bg/85 backdrop-blur-md" onClick={onClose} />

      <div
        className="cs-panel relative max-h-[90vh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-3xl border border-line bg-card p-6 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] md:p-10"
        data-lenis-prevent
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 rounded-full border border-line px-3 py-1 font-mono text-sm text-mute hover:text-ink"
        >
          esc ✕
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="cs-item font-mono text-xs text-teal">{project.label}</p>
            <h3 className="cs-item mt-2 text-3xl font-bold md:text-4xl">{project.title}</h3>
            <p className="cs-item mt-2 text-mute">{project.tagline}</p>

            <ul className="mt-6 space-y-4">
              {project.highlights.map((h, i) => (
                <li key={h} className="cs-item flex gap-4">
                  <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink/90">{h}</span>
                </li>
              ))}
            </ul>

            <ul className="cs-item mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>

            <div className="cs-item mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
              {project.code ? (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-teal px-5 py-2.5 text-bg"
                >
                  Source code ↗
                </a>
              ) : project.isPrivate ? (
                <span className="rounded-full border border-line px-5 py-2.5 font-normal text-mute">
                  Private repository
                </span>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-teal px-5 py-2.5 text-teal"
                >
                  Watch demo ↗
                </a>
              ) : null}
              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-teal px-5 py-2.5 text-teal"
                >
                  Live ↗
                </a>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <div className="cs-item h-64">{Scene ? <Scene /> : null}</div>

            {project.image ? (
              <div className="cs-item overflow-hidden rounded-xl border border-line bg-bg">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <i className="h-2.5 w-2.5 rounded-full bg-danger/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                  <i className="h-2.5 w-2.5 rounded-full bg-teal/70" />
                  <span className="ml-3 font-mono text-xs text-mute">
                    {project.slug}.local
                  </span>
                </div>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 480px, 90vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 3D flight-through deck ---------------- */

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const [active, setActive] = useState(0);
  const close = useCallback(() => setOpen(null), []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".deck-card");
        const n = cards.length;
        let last = -1;

        const render = (progress: number) => {
          const pos = progress * (n - 1);
          cards.forEach((el, i) => {
            const d = i - pos; // > 0: still ahead in depth, < 0: already passed the camera
            const side = i % 2 === 0 ? -1 : 1;
            const ahead = Math.max(d, 0);
            const passed = Math.max(-d, 0);
            gsap.set(el, {
              xPercent: -50 + side * (ahead * 62 + passed * 150),
              yPercent: -50 - ahead * 4 + passed * 8,
              z: -ahead * 650 + passed * 900,
              rotateY: side * -(ahead * 14) + side * passed * 30,
              rotateX: ahead * 3,
              opacity: d >= 0 ? Math.max(0, 1 - ahead * 0.4) : Math.max(0, 1 - passed * 1.8),
              filter: ahead > 0.05 ? `blur(${Math.min(ahead * 1.6, 5)}px)` : "none",
              pointerEvents: Math.abs(d) < 0.45 ? "auto" : "none",
            });
          });
          const idx = Math.round(pos);
          if (idx !== last) {
            last = idx;
            setActive(idx);
          }
        };

        render(0);
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => "+=" + n * window.innerHeight * 0.9,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => render(self.progress),
        });
      });
    },
    { scope: root }
  );

  const total = p.projects.length;

  return (
    <section ref={root} id="projects" className="relative overflow-hidden md:motion-safe:h-screen">
      <div
        className="relative grid gap-6 px-6 py-24 sm:grid-cols-2 lg:grid-cols-3 md:motion-safe:block md:motion-safe:h-full md:motion-safe:p-0"
        style={{ perspective: "1400px" }}
      >
        <div className="sm:col-span-2 lg:col-span-3 md:motion-safe:absolute md:motion-safe:left-8 md:motion-safe:top-24 md:motion-safe:z-20">
          <p className="font-mono text-sm text-teal">{"// selected work"}</p>
          <h2 className="mt-1 text-5xl font-bold uppercase md:text-6xl">Projects</h2>
        </div>

        <div
          aria-hidden="true"
          className="text-stroke pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-full -translate-x-1/2 -translate-y-1/2 select-none text-center text-[11vw] font-bold uppercase leading-none opacity-[0.12] md:motion-safe:block"
        >
          {p.projects[active]?.title}
        </div>

        {p.projects.map((pr, i) => {
          const Scene = SCENES[pr.slug];
          return (
            <div
              key={pr.slug}
              className="deck-card will-change-transform md:motion-safe:absolute md:motion-safe:left-1/2 md:motion-safe:top-1/2 md:motion-safe:z-10 md:motion-safe:h-[min(64vh,520px)] md:motion-safe:w-[min(44vw,620px)]"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpen(pr)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpen(pr);
                  }
                }}
                aria-label={`Open ${pr.title} case study`}
                className="group flex h-full cursor-pointer flex-col rounded-3xl border border-line bg-card/90 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur transition duration-300 hover:border-teal hover:shadow-[0_30px_90px_-20px_rgba(31,181,168,0.35)]"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="rounded-full border border-line px-3 py-1 text-mute">{pr.label}</span>
                  <span className="text-teal">
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 h-40 shrink-0 md:motion-safe:h-auto md:motion-safe:min-h-0 md:motion-safe:flex-1">
                  {Scene ? <Scene /> : null}
                </div>

                <h3 className="mt-4 text-2xl font-bold md:text-3xl">{pr.title}</h3>
                <p className="mt-1 text-sm text-teal">{pr.tagline}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {pr.tech.slice(0, 4).map((t) => (
                      <li key={t} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="shrink-0 text-sm font-semibold text-teal transition-transform group-hover:translate-x-1">
                    Case study ↗
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pointer-events-none hidden font-mono text-xs text-mute md:motion-safe:absolute md:motion-safe:bottom-8 md:motion-safe:left-8 md:motion-safe:z-20 md:motion-safe:block">
          <span className="text-2xl text-ink">{String(active + 1).padStart(2, "0")}</span>
          <span> / {String(total).padStart(2, "0")}</span>
          <p className="mt-1">scroll to fly through · click a card to open it</p>
        </div>
      </div>

      {open ? <CaseStudy project={open} onClose={close} /> : null}
    </section>
  );
}
