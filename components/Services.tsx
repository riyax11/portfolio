import Reveal from "@/components/Reveal";
import { portfolio as p } from "@/data/portfolio";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="text-mute">What I do</p>
      </Reveal>
      <Reveal stagger className="mt-8 border-t border-line">
        {p.services.map((s) => (
          <div
            key={s.title}
            className="group relative flex items-center justify-between overflow-hidden border-b border-line py-8 md:py-10"
          >
            <span className="absolute inset-0 translate-y-full bg-teal transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 text-4xl font-bold uppercase transition-all duration-500 group-hover:px-6 group-hover:text-bg md:text-7xl">
              {s.title}
            </span>
            <span className="relative z-10 hidden text-right text-sm text-mute transition-all duration-500 group-hover:pr-6 group-hover:text-bg md:block">
              {s.note}
            </span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}