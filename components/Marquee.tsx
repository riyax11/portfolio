import { portfolio as p } from "@/data/portfolio";

export default function Marquee() {
  const items = [...p.skills, ...p.skills, ...p.skills, ...p.skills];

  return (
    <div className="overflow-hidden border-y border-line py-8" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center">
        {items.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-10 pr-10 text-6xl font-bold uppercase md:text-8xl"
          >
            <span className={i % 2 ? "text-stroke" : ""}>{s}</span>
            <span className="text-teal">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}