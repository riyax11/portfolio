"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADING = "Have a project in mind?";

const words = (cls: string) =>
  HEADING.split(" ").map((w, wi) => (
    <span key={wi} className="mr-[0.25em] inline-block whitespace-nowrap">
      {w.split("").map((c, ci) => (
        <span key={ci} className={`${cls} inline-block`}>
          {c}
        </span>
      ))}
    </span>
  ));

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: ".c-title", start: "top 80%", once: true },
        });

        tl.from(".c-pill", { y: 20, opacity: 0, duration: 0.6 })
          .from(
            ".c-main",
            { y: 40, opacity: 0, filter: "blur(14px)", duration: 1, stagger: 0.03 },
            "-=0.2"
          )
          .from(
            ".c-ghost",
            { y: 70, opacity: 0, filter: "blur(18px)", duration: 1.1, stagger: 0.03 },
            "<0.15"
          )
          .to(".c-ghost-wrap", { opacity: 0, duration: 0.7 }, ">-0.1")
          .from(
            ".c-after",
            { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 },
            "-=1.2"
          );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="contact"
      className="mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-6 py-32 text-center"
    >
      <p className="c-pill inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm text-mute">
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
        Available for internships and new opportunities
      </p>

      <h2 className="c-title relative mt-8 text-[clamp(2rem,6.2vw,5.5rem)] font-bold uppercase leading-[1.05] tracking-tight md:whitespace-nowrap">
        <span className="relative block">{words("c-main")}</span>
        <span
          aria-hidden="true"
          className="c-ghost-wrap pointer-events-none absolute inset-0 block text-teal opacity-35"
        >
          {words("c-ghost")}
        </span>
      </h2>

      <p className="c-after mt-6 max-w-xl text-lg text-mute">
        Together, we can create something useful, thoughtful and built to last. Let&apos;s
        collaborate and turn your idea into a working product.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Magnetic>
          <a
            href={`mailto:${p.email}`}
            className="c-after inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-bg transition-colors hover:bg-teal"
          >
            Contact Me
            <span aria-hidden="true">↗</span>
          </a>
        </Magnetic>
        <a
          href="/resume.pdf"
          download="Riya_Patkar_Resume.pdf"
          className="c-after inline-flex items-center gap-2 rounded-full border border-teal px-8 py-4 font-semibold text-teal transition-colors hover:bg-teal hover:text-bg"
        >
          Download resume
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <p className="c-after mt-6 text-sm text-mute">{p.email}</p>

      <div className="c-after mt-12 flex gap-8 text-mute">
        {p.socials.map((s) => (
          <a key={s.label} href={s.href} className="hover:text-ink">
            {s.label}
          </a>
        ))}
      </div>

      <p className="c-after mt-24 text-sm text-mute">© 2026 {p.name}</p>
    </section>
  );
}