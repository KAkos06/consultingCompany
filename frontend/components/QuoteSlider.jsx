"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Quote,
  TrendingUp,
  Users,
} from "lucide-react";

const iconMap = {
  Quote,
  Award,
  TrendingUp,
  Users,
};

const defaultSlides = [
  {
    icon: "Quote",
    tag: "Vélemény",
    title: "9 hónap alatt megváltozott a felső csapatunk dinamikája.",
    desc: "Kovács Andrea - CEO, Nordwell Group",
  },
  {
    icon: "Award",
    tag: "Elismerés",
    title: "Top 10 Executive Coaching firm Közép-Európában - 2024",
    desc: "Független szakmai díj a Coaching at Work magazintól.",
  },
  {
    icon: "TrendingUp",
    tag: "Adat",
    title: "Vezetői NPS +78 az ügyfeleinknél",
    desc: "240+ kísért vezető válasza alapján - 2024 évzáró felmérés.",
  },
  {
    icon: "Users",
    tag: "Esemény",
    title: "Leadership Insights Forum - 2025. március 14.",
    desc: "Egynapos zártkörű esemény C-szintű vezetőknek Budapesten.",
  },
];

export default function QuoteSlider({ items = defaultSlides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const slides = items.length > 0 ? items : defaultSlides;
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const id = setInterval(() => emblaApi.scrollNext(), 5000);

    return () => {
      clearInterval(id);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      data-testid="quote-slider"
      className="relative rounded-3xl bg-[#1A2A4F] shadow-2xl shadow-[#1A2A4F]/20 overflow-hidden"
    >
      {/* Subtle decor for the card */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")" }} />

      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-8">
        <div className="flex-1 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, i) => {
              const Icon = iconMap[slide.icon] || Award;
              return (
                <div
                  key={`${slide.title}-${i}`}
                  data-testid={`quote-slide-${i}`}
                  className="basis-full shrink-0 grow-0 pr-6 md:basis-1/2"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F7A5A5]/30 bg-[#F7A5A5]/20 text-[#F7A5A5]">
                      <Icon size={18} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
                        {slide.tag}
                      </div>
                      <div className="line-clamp-2 text-sm font-semibold leading-snug text-[#FFF2EF]">
                        {slide.title}
                      </div>
                      <div className="mt-1 line-clamp-1 text-xs text-[#FFF2EF]/55">
                        {slide.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="mr-3 hidden items-center gap-1.5 md:flex">
            {slides.map((slide, i) => (
              <span
                key={`${slide.title}-${i}`}
                className={`h-1 rounded-full transition-all ${
                  selected === i ? "w-6 bg-[#F7A5A5]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={scrollPrev}
            data-testid="quote-slider-prev"
            aria-label="Előző"
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#FFF2EF] transition-all hover:bg-white/10 active:scale-95"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={scrollNext}
            data-testid="quote-slider-next"
            aria-label="Következő"
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7A5A5] text-[#1A2A4F] transition-all hover:bg-[#FFDBB6] active:scale-95"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
