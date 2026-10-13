"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const el = dot.current!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
      gsap.set(el, { opacity: 1 });

      const move = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const over = (e: MouseEvent) => {
        const onLink = (e.target as HTMLElement).closest("a, button");
        gsap.to(el, { scale: onLink ? 4 : 1, duration: 0.35, ease: "power3.out" });
      };

      window.addEventListener("mousemove", move);
      window.addEventListener("mouseover", over);
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseover", over);
      };
    });
  });

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed left-0 top-0 z-[100] -ml-2 -mt-2 h-4 w-4 rounded-full bg-white opacity-0 mix-blend-difference"
    />
  );
}