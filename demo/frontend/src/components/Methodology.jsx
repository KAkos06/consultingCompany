import Reveal from "@/components/Reveal";
import Section from "@/components/Section";


const steps = [
  {
    n: "01",
    title: "Diagnosztika",
    desc: "Felmérjük a kontextust, kihívásokat és a kívánt eredményeket — strukturált interjú és 360° visszajelzés alapján.",
  },
  {
    n: "02",
    title: "Megállapodás",
    desc: "Közösen rögzítjük a fókuszt, a sikermutatókat és a ritmust. Átlátható szerződés és titoktartás.",
  },
  {
    n: "03",
    title: "Coaching",
    desc: "Kétheti rendszerességű, 90 perces ülések. Strukturált gondolkodás, terep-helyzetek elemzése.",
  },
  {
    n: "04",
    title: "Mérés",
    desc: "Negyedéves checkpoint, érintettek visszajelzése, fejlődési ív dokumentálása.",
  },
];

export default function Methodology({ variant = "cream" }) {
  return (
    <Section
      variant={variant}
      id="methodology"
      testid="methodology-section"
      className="py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
            03 — Módszertan
          </span>
          <h2 className="font-[Outfit] text-4xl md:text-6xl font-bold text-[#1A2A4F] mt-4 leading-[1.05] tracking-tight">
            Négy lépés. Nincs trükk,
            <br />
            <span className="italic font-medium text-[#1A2A4F]/70">csak rendszer.</span>
          </h2>
        </Reveal>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <Reveal
              key={i}
              delay={i}
              data-testid={`method-step-${i}`}
              className={`relative rounded-3xl p-7 min-h-[280px] flex flex-col justify-between transition-all hover:-translate-y-1 ${
                i % 2 === 0
                  ? "bg-[#1A2A4F] text-[#FFF2EF]"
                  : "bg-white text-[#1A2A4F] border border-[#1A2A4F]/5"
              }`}
            >
              <div
                className={`font-[Outfit] text-6xl font-bold ${
                  i % 2 === 0 ? "text-[#F7A5A5]" : "text-[#FFDBB6]"
                }`}
              >
                {s.n}
              </div>

              <div>
                <h3
                  className={`font-[Outfit] text-2xl font-semibold mb-2 ${
                    i % 2 === 0 ? "text-[#FFF2EF]" : "text-[#1A2A4F]"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    i % 2 === 0 ? "text-[#FFF2EF]/70" : "text-[#1A2A4F]/65"
                  }`}
                >
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom strip */}
        <Reveal className="mt-8 bg-gradient-to-r from-[#FFDBB6]/40 to-[#F7A5A5]/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-[Outfit] text-2xl md:text-3xl font-bold text-[#1A2A4F]">
              Készen állsz egy 30 perces beszélgetésre?
            </h3>
            <p className="text-[#1A2A4F]/70 mt-2 text-sm md:text-base">
              Díjmentes diagnosztikai konzultáció — kötelezettség nélkül.
            </p>
          </div>
          <a
            href="#contact"
            data-testid="methodology-cta"
            className="shrink-0 bg-[#1A2A4F] text-[#FFF2EF] px-7 py-4 rounded-full font-semibold hover:bg-[#1A2A4F]/90 active:scale-95 transition-all"
          >
            Időpont foglalása
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
