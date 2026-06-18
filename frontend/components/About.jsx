import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const defaultBullets = [
  "Több mint egy évtized C-szintű vezetői tapasztalat",
  "ICF, EMCC akkreditált mentorok",
  "Bizalmas, titoktartással védett környezet",
  "Mérhető eredmények, dokumentált fejlődési ív",
];

export default function About({
  variant = "warm",
  eyebrow = "02 - Rólunk",
  title = "12 év, 240+ vezető, egyetlen küldetés.",
  description = "Az Executive Insights 2013-ban indult azzal a meggyőződéssel, hogy a legjobb vezetők sem dolgoznak egyedül. A magyar és közép-európai piac felső vezetőivel dolgozunk együtt diszkréten, mélyen és mérhető eredménnyel.",
  bullets = defaultBullets,
  floatingCardTitle = "Vezetői NPS 2024",
  floatingCardValue = "+78",
}) {
  return (
    <Section
      variant={variant}
      id="about"
      testid="about-section"
      className="px-6 py-28 md:py-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl shadow-[#1A2A4F]/15">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwyfHxleGVjdXRpdmUlMjBjb2FjaGluZyUyMG1lZXRpbmd8ZW58MHx8fHwxNzgxNzcwOTM2fDA&ixlib=rb-4.1.0&q=85"
              alt="Executive coaching ülés"
              data-testid="about-image"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A4F]/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-8 -right-4 max-w-[240px] rounded-2xl border border-[#1A2A4F]/5 bg-white p-5 shadow-xl shadow-[#1A2A4F]/10 md:-right-10">
            <div className="mb-2 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2 w-2 rounded-full bg-[#F7A5A5]" />
              ))}
            </div>
            <div className="text-xs font-medium text-[#1A2A4F]/60">
              {floatingCardTitle}
            </div>
            <div className="mt-1 font-[Outfit] text-3xl font-bold text-[#1A2A4F]">
              {floatingCardValue}
            </div>
          </div>

          <div className="absolute -left-6 -top-6 -z-10 h-32 w-32 rounded-full bg-[#FFDBB6]/40" />
        </Reveal>

        <Reveal delay={1}>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A2A4F]/50">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-[Outfit] text-4xl font-bold leading-[1.08] tracking-tight text-[#1A2A4F] md:text-5xl">
            {title}
          </h2>
          <p className="mt-7 text-lg leading-relaxed text-[#1A2A4F]/70">
            {description}
          </p>

          <div className="mt-9 space-y-3">
            {bullets.map((bullet, i) => (
              <div
                key={i}
                data-testid={`about-bullet-${i}`}
                className="flex items-start gap-3 rounded-2xl border border-[#1A2A4F]/5 bg-white px-5 py-4"
              >
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-[#F7A5A5]"
                  strokeWidth={2.2}
                />
                <span className="text-sm font-medium text-[#1A2A4F]">
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            data-testid="about-cta"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#1A2A4F] px-6 py-3.5 text-sm font-semibold text-[#FFF2EF] transition-all hover:bg-[#1A2A4F]/90 active:scale-95"
          >
            Ismerj meg minket →
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
