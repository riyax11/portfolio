import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import { portfolio as p } from "@/data/portfolio";

export default function Home() {
  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#home" className="font-bold">
            {p.name}
          </a>
          <ul className="flex gap-6 text-sm text-mute">
            <li>
              <a href="#about" className="hover:text-ink">About</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-ink">Work</a>
            </li>
            <li>
              <a href="#experience" className="hover:text-ink">Experience</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-ink">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <Hero />
      <Marquee />

      <section id="about" className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <h2 className="text-5xl font-bold uppercase md:text-7xl">About me</h2>
          <p className="mt-6 max-w-2xl text-lg text-mute">{p.about}</p>
        </Reveal>
        <Reveal stagger className="mt-10 flex flex-wrap gap-3">
          {p.skills.map((s) => (
            <span key={s} className="rounded-full border border-line bg-card px-4 py-2 text-sm">
              {s}
            </span>
          ))}
        </Reveal>
      </section>

      <Services />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
    </main>
  );
}