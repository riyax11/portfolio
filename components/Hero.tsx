"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const chars = (s: string) =>
  s.split("").map((c, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.05em] align-bottom">
      <span className="char inline-block">{c === " " ? "\u00A0" : c}</span>
    </span>
  ));

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [first, ...others] = p.name.split(" ");
  const initials = p.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // wait for the preloader curtain on the first visit, start almost at once after that
        const seen = sessionStorage.getItem("pl") === "1";
        const tl = gsap.timeline({ delay: seen ? 0.2 : 2.1, defaults: { ease: "power4.out" } });
        tl.from(".char", { yPercent: 115, duration: 1.1, stagger: 0.045 })
          .from(".portrait", { y: 140, opacity: 0, duration: 1.2 }, "-=0.8")
          .from(".hero-meta > *", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.7");

        const scrub = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };
        gsap.to(".w1", { xPercent: -18, ease: "none", scrollTrigger: scrub });
        gsap.to(".w2", { xPercent: 18, ease: "none", scrollTrigger: scrub });
        gsap.to(".portrait", { yPercent: -10, ease: "none", scrollTrigger: scrub });
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 pb-10 pt-24"
    >
      <h1 className="flex gap-[2vw] whitespace-nowrap text-[12vw] font-bold uppercase leading-[0.95] tracking-tight">
        <span className="w1 text-stroke inline-block">{chars(first)}</span>
        <span className="w2 inline-block">{chars(others.join(" "))}</span>
      </h1>

      <div className="portrait relative z-10 -mt-[3vw] aspect-[2/3] w-[min(62vw,320px)]">
        {p.photo ? (
          <Image
            src={p.photo}
            alt={p.name}
            fill
            priority
            sizes="320px"
            className="rounded-3xl object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gradient-to-br from-teal to-violet text-8xl font-bold text-bg">
            {initials}
          </div>
        )}
      </div>

      <div className="hero-meta relative z-20 mt-8 flex w-full items-end justify-between gap-6 md:absolute md:inset-x-6 md:bottom-8 md:mt-0 md:w-auto">
        <div className="max-w-sm">
          <p className="text-xl font-semibold">{p.role}</p>
          <p className="mt-2 text-sm text-mute">{p.intro}</p>
          <div className="mt-5">
            <Magnetic>
              <a
                href="#contact"
                className="inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold text-bg"
              >
                Let&apos;s collaborate
              </a>
            </Magnetic>
          </div>
        </div>
        <ul className="hidden flex-col gap-2 text-sm text-mute md:flex">
          {p.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}