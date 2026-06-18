import { ArrowRight, Star } from "lucide-react";

const defaultStats = [
  { n: "12+", l: "év tapasztalat" },
  { n: "240+", l: "kísért vezető" },
  { n: "94%", l: "ismételt megbízás" },
];

export default function Hero({
  eyebrow = "Vezetői coaching",
  title = "Vezetői döntések tisztábban, stratégia bátrabban.",
  subtitle = "Az Executive Insights tapasztalt mentorok hálózata, akik C-szintű vezetőket és vezetői csapatokat kísérnek a növekedés legkritikusabb pillanataiban.",
  primaryCtaText = "Foglalj diagnosztikát",
  primaryCtaLink = "#contact",
  secondaryCtaText = "Hogyan dolgozunk?",
  secondaryCtaLink = "#methodology",
  stats = defaultStats,
}) {
  return (
    <section
      data-testid="hero-section"
      className="relative hero-bg overflow-hidden"
    >
      <div className="grain" />

      <div className="absolute top-32 -left-20 h-72 w-72 rounded-full bg-[#F7A5A5]/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#FFDBB6]/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-40 md:pb-36 md:pt-48">
        <div className="max-w-3xl">
          <div
            data-testid="hero-eyebrow"
            className="fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-[#FFF2EF] backdrop-blur"
          >
            <Star size={12} className="text-[#F7A5A5]" fill="#F7A5A5" />
            {eyebrow}
          </div>

          <h1
            data-testid="hero-title"
            className="fade-up delay-1 font-[Outfit] text-5xl font-bold leading-[1.05] tracking-tight text-[#FFF2EF] md:text-7xl"
          >
            {title}
          </h1>

          <p
            data-testid="hero-subtitle"
            className="fade-up delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-[#FFF2EF]/75 md:text-xl"
          >
            {subtitle}
          </p>

          <div className="fade-up delay-3 mt-10 flex flex-wrap gap-4">
            <a
              href={primaryCtaLink}
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F7A5A5] px-7 py-4 text-base font-semibold text-[#1A2A4F] shadow-xl shadow-[#F7A5A5]/20 transition-all hover:bg-[#FFDBB6] active:scale-95"
            >
              {primaryCtaText}
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={secondaryCtaLink}
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-medium text-[#FFF2EF] transition-colors hover:bg-white/10"
            >
              {secondaryCtaText}
            </a>
          </div>

          <div
            data-testid="hero-stats"
            className="fade-up delay-4 mt-16 grid max-w-2xl grid-cols-3 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="border-l border-white/15 pl-5">
                <div className="font-[Outfit] text-3xl font-bold text-[#FFF2EF] md:text-4xl">
                  {stat.n}
                </div>
                <div className="mt-1 text-xs text-[#FFF2EF]/60 md:text-sm">
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
