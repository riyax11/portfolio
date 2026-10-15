import Reveal from "@/components/Reveal";
import { portfolio as p } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="text-mute">Certifications</p>
      </Reveal>
      <Reveal stagger className="mt-8 grid gap-6 md:grid-cols-2">
        {p.certifications.map((c) => (
          <article
            key={c.title}
            className="rounded-2xl border border-line bg-card p-6 transition-colors hover:border-teal"
          >
            <p className="text-sm text-teal">{c.when}</p>
            <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
            <p className="mt-1 text-mute">{c.issuer}</p>
            <p className="mt-4 text-sm text-mute">{c.note}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}