import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const bullets = [
  "Több mint egy évtized C-szintű vezetői tapasztalat",
  "ICF, EMCC akkreditált mentorok",
  "Bizalmas, titoktartással védett környezet",
  "Mérhető eredmények, dokumentált fejlődési ív",
];

export default function About({ variant = "warm" }) {
  return (
    <Section
      variant={variant}
      id="about"
      testid="about-section"
      className="py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Image side */}
        <Reveal className="relative">
          <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] shadow-2xl shadow-[#1A2A4F]/15">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwyfHxleGVjdXRpdmUlMjBjb2FjaGluZyUyMG1lZXRpbmd8ZW58MHx8fHwxNzgxNzcwOTM2fDA&ixlib=rb-4.1.0&q=85"
              alt="Executive coaching ülés"
              data-testid="about-image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F]/40 via-transparent to-transparent" />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-8 -right-4 md:-right-10 bg-white rounded-2xl p-5 shadow-xl shadow-[#1A2A4F]/10 max-w-[240px] border border-[#1A2A4F]/5">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#F7A5A5]" />
              ))}
            </div>
            <div className="text-xs font-medium text-[#1A2A4F]/60">
              Vezetői NPS 2024
            </div>
            <div className="font-[Outfit] font-bold text-3xl text-[#1A2A4F] mt-1">
              +78
            </div>
          </div>

          {/* Floating accent */}
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-[#FFDBB6]/40 -z-10" />
        </Reveal>

        {/* Text side */}
        <Reveal delay={1}>
          <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
            02 — Rólunk
          </span>
          <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-[1.08] tracking-tight">
            12 év, 240+ vezető,
            <br />
            <span className="italic font-medium">egyetlen küldetés.</span>
          </h2>
          <p className="text-[#1A2A4F]/70 text-lg leading-relaxed mt-7">
            Az Executive Insights 2013-ban indult azzal a meggyőződéssel, hogy a
            legjobb vezetők sem dolgoznak egyedül. A magyar és közép-európai
            piac felső vezetőivel dolgozunk együtt — diszkréten, mélyen és
            mérhető eredménnyel.
          </p>

          <div className="mt-9 space-y-3">
            {bullets.map((b, i) => (
              <div
                key={i}
                data-testid={`about-bullet-${i}`}
                className="flex items-start gap-3 bg-white px-5 py-4 rounded-2xl border border-[#1A2A4F]/5"
              >
                <CheckCircle2
                  size={20}
                  className="text-[#F7A5A5] shrink-0 mt-0.5"
                  strokeWidth={2.2}
                />
                <span className="text-sm font-medium text-[#1A2A4F]">{b}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            data-testid="about-cta"
            className="inline-flex items-center gap-2 mt-10 bg-[#1A2A4F] text-[#FFF2EF] px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#1A2A4F]/90 active:scale-95 transition-all"
          >
            Ismerj meg minket →
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
