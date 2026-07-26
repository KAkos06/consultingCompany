import { ArrowRight, Star } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative hero-bg overflow-hidden"
    >
      <div className="grain" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-32 -left-20 w-72 h-72 rounded-full bg-[#F7A5A5]/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#FFDBB6]/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-28 md:pt-48 md:pb-36">
        <div className="max-w-3xl">
          <div
            data-testid="hero-eyebrow"
            className="fade-up inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-[#FFF2EF] text-xs font-medium px-4 py-2 rounded-full mb-7"
          >
            <Star size={12} className="text-[#F7A5A5]" fill="#F7A5A5" />
            Vezetői coaching, ami valódi változást hoz
          </div>

          <h1
            data-testid="hero-title"
            className="fade-up delay-1 font-[Outfit] text-[#FFF2EF] text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight"
          >
            Vezetői döntések
            <br />
            <span className="text-[#F7A5A5] italic font-medium">tisztábban</span>,
            <br />
            stratégia <span className="underline decoration-[#FFDBB6] decoration-[6px] underline-offset-8">bátrabban</span>.
          </h1>

          <p
            data-testid="hero-subtitle"
            className="fade-up delay-2 mt-8 text-lg md:text-xl text-[#FFF2EF]/75 max-w-2xl leading-relaxed"
          >
            Az Executive Insights tapasztalt mentorok hálózata, akik C-szintű
            vezetőket és vezetői csapatokat kísérnek a növekedés legkritikusabb
            pillanataiban.
          </p>

          <div className="fade-up delay-3 mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              className="group inline-flex items-center gap-2 bg-[#F7A5A5] text-[#1A2A4F] px-7 py-4 rounded-full text-base font-semibold hover:bg-[#FFDBB6] active:scale-95 transition-all shadow-xl shadow-[#F7A5A5]/20"
            >
              Foglalj diagnosztikát
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#methodology"
              data-testid="hero-cta-secondary"
              className="inline-flex items-center gap-2 border border-white/25 text-[#FFF2EF] px-7 py-4 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
            >
              Hogyan dolgozunk?
            </a>
          </div>

          {/* Stats */}
          <div
            data-testid="hero-stats"
            className="fade-up delay-4 mt-16 grid grid-cols-3 gap-6 max-w-2xl"
          >
            {[
              { n: "12+", l: "év tapasztalat" },
              { n: "240+", l: "kísért vezető" },
              { n: "94%", l: "ismételt megbízás" },
            ].map((s, i) => (
              <div key={i} className="border-l border-white/15 pl-5">
                <div className="font-[Outfit] text-3xl md:text-4xl font-bold text-[#FFF2EF]">
                  {s.n}
                </div>
                <div className="text-xs md:text-sm text-[#FFF2EF]/60 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider at bottom of hero */}
      <HeroSlider />
    </section>
  );
}
