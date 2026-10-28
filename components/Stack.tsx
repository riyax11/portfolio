import Reveal from "@/components/Reveal";
import { portfolio as p } from "@/data/portfolio";

export default function Stack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <p className="font-mono text-sm text-teal">{"// stack"}</p>
        <h2 className="mt-2 text-5xl font-bold uppercase md:text-7xl">What I build with</h2>
      </Reveal>
      <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {p.stack.map((g) => (
          <div key={g.group} className="rounded-2xl border border-line bg-card p-6">
            <p className="font-mono text-sm text-teal">{`// ${g.group}`}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="rounded-md border border-line px-3 py-1 font-mono text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}