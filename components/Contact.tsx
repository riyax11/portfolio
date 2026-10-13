"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TEXT = "Have a project in mind?";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".c-char", {
          opacity: 0,
          y: 60,
          filter: "blur(16px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.03,
          scrollTrigger: { trigger: ".c-title", start: "top 80%", once: true },
        });
        gsap.from(".c-rest", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".c-title", start: "top 70%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-32 text-center"
    >
      <p className="c-rest inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm text-mute">
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
        Available for new projects
      </p>

      <h2 className="c-title mt-8 text-6xl font-bold uppercase leading-[0.95] md:text-9xl">
        {TEXT.split(" ").map((w, wi) => (
          <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
            {w.split("").map((c, ci) => (
              <span key={ci} className="c-char inline-block">
                {c}
              </span>
            ))}
          </span>
        ))}
      </h2>

      <div className="c-rest mt-12">
        <Magnetic>
          <a
            href={`mailto:${p.email}`}
            className="inline-block rounded-full bg-teal px-10 py-5 text-lg font-semibold text-bg"
          >
            {p.email}
          </a>
        </Magnetic>
      </div>

      <div className="c-rest mt-12 flex gap-8 text-mute">
        {p.socials.map((s) => (
          <a key={s.label} href={s.href} className="hover:text-ink">
            {s.label}
          </a>
        ))}
      </div>

      <p className="c-rest mt-24 text-sm text-mute">© 2026 {p.name}</p>
    </section>
  );
}