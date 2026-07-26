import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote, Award, TrendingUp, Users } from "lucide-react";

const slides = [
  {
    icon: Quote,
    tag: "Vélemény",
    title: "„9 hónap alatt megváltozott a felső csapatunk dinamikája.”",
    desc: "Kovács Andrea — CEO, Nordwell Group",
  },
  {
    icon: Award,
    tag: "Elismerés",
    title: "Top 10 Executive Coaching firm Közép-Európában — 2024",
    desc: "Független szakmai díj a Coaching at Work magazintól.",
  },
  {
    icon: TrendingUp,
    tag: "Adat",
    title: "Vezetői NPS +78 az ügyfeleinknél",
    desc: "240+ kísért vezető válasza alapján — 2024 évzáró felmérés.",
  },
  {
    icon: Users,
    tag: "Esemény",
    title: "Leadership Insights Forum — 2025. március 14.",
    desc: "Egynapos zártkörű esemény C-szintű vezetőknek Budapesten.",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    // autoplay
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(id);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      data-testid="hero-slider"
      className="relative border-t border-white/10 bg-[#1A2A4F]/40 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex items-center gap-6">
        {/* Slider */}
        <div className="overflow-hidden flex-1" ref={emblaRef}>
          <div className="flex">
            {slides.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  data-testid={`hero-slide-${i}`}
                  className="shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 pr-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F7A5A5]/20 border border-[#F7A5A5]/30 flex items-center justify-center text-[#F7A5A5]">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-[#FFDBB6] font-semibold mb-1">
                        {s.tag}
                      </div>
                      <div className="text-[#FFF2EF] font-semibold text-sm leading-snug line-clamp-2">
                        {s.title}
                      </div>
                      <div className="text-[#FFF2EF]/55 text-xs mt-1 line-clamp-1">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 mr-3">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  selected === i ? "w-6 bg-[#F7A5A5]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={scrollPrev}
            data-testid="hero-slider-prev"
            aria-label="Előző"
            className="w-10 h-10 rounded-full border border-white/15 text-[#FFF2EF] flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            data-testid="hero-slider-next"
            aria-label="Következő"
            className="w-10 h-10 rounded-full bg-[#F7A5A5] text-[#1A2A4F] flex items-center justify-center hover:bg-[#FFDBB6] active:scale-95 transition-all"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
