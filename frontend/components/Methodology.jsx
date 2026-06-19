import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const defaultSteps = [
  {
    n: "01",
    title: "Diagnosztika",
    desc: "Felmérjük a kontextust, kihívásokat és a kívánt eredményeket strukturált interjú és 360 fokos visszajelzés alapján.",
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

export default function Methodology({
  variant = "cream",
  eyebrow = "03 - Módszertan",
  steps = defaultSteps,
  bottomStripTitle = "Készen állsz egy 30 perces beszélgetésre?",
  bottomStripDesc = "Díjmentes diagnosztikai konzultáció, kötelezettség nélkül.",
  bottomStripCtaLink = "#contact",
}) {
  return (
    <div
      id="methodology"
      data-testid="methodology-section"
      className="w-full"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-20 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A2A4F]/50">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-[Outfit] text-4xl font-bold leading-[1.05] tracking-tight text-[#1A2A4F] md:text-6xl">
            Négy lépés. Nincs trükk,
            <br />
            <span className="font-medium italic text-[#1A2A4F]/70">
              csak rendszer.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              key={i}
              delay={i}
              data-testid={`method-step-${i}`}
              className={`relative flex min-h-[280px] flex-col justify-between rounded-3xl p-7 transition-all hover:-translate-y-1 ${
                i % 2 === 0
                  ? "bg-[#1A2A4F] text-[#FFF2EF]"
                  : "border border-[#1A2A4F]/5 bg-white text-[#1A2A4F]"
              }`}
            >
              <div
                className={`font-[Outfit] text-6xl font-bold ${
                  i % 2 === 0 ? "text-[#F7A5A5]" : "text-[#FFDBB6]"
                }`}
              >
                {step.n}
              </div>

              <div>
                <h3
                  className={`mb-2 font-[Outfit] text-2xl font-semibold ${
                    i % 2 === 0 ? "text-[#FFF2EF]" : "text-[#1A2A4F]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    i % 2 === 0 ? "text-[#FFF2EF]/70" : "text-[#1A2A4F]/65"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#FFDBB6]/40 to-[#F7A5A5]/30 p-8 md:flex-row md:p-12">
          <div>
            <h3 className="font-[Outfit] text-2xl font-bold text-[#1A2A4F] md:text-3xl">
              {bottomStripTitle}
            </h3>
            <p className="mt-2 text-sm text-[#1A2A4F]/70 md:text-base">
              {bottomStripDesc}
            </p>
          </div>
          <a
            href={bottomStripCtaLink}
            data-testid="methodology-cta"
            className="shrink-0 rounded-full bg-[#1A2A4F] px-7 py-4 font-semibold text-[#FFF2EF] transition-all hover:bg-[#1A2A4F]/90 active:scale-95"
          >
            Időpont foglalása
          </a>
        </Reveal>
      </div>
    </div>
  );
}
