"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { portfolio as p } from "@/data/portfolio";

gsap.registerPlugin(useGSAP);

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { display: "none" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { v: 0 };
        gsap
          .timeline()
          .to(counter, {
            v: 100,
            duration: 1.4,
            ease: "power2.inOut",
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v));
            },
          })
          .to(".pl-inner", { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" })
          .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.1")
          .set(root.current, { display: "none" });
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-end bg-bg p-8 md:p-12"
    >
      <div className="pl-inner flex w-full items-end justify-between">
        <p className="text-sm text-mute">{p.name}</p>
        <span
          ref={num}
          className="text-[28vw] font-bold leading-none text-teal md:text-[18vw]"
        >
          0
        </span>
      </div>
    </div>
  );
}