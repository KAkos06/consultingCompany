import {
  ArrowUpRight,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const defaultCards = [
  {
    icon: Compass,
    title: "Executive Coaching",
    desc: "Személyre szabott 1:1 program C-szintű vezetőknek. Mély önismeret, döntéshozatali tisztaság és nagyobb hatás.",
    tag: "1:1",
  },
  {
    icon: Users,
    title: "Team Coaching",
    desc: "Vezetői csapatok együttműködésének mélyebb feltárása. Bizalom, konfliktuskezelés, közös cél.",
    tag: "Csapat",
  },
  {
    icon: TrendingUp,
    title: "Leadership Akadémia",
    desc: "Strukturált 6 hónapos vezetőképző azoknak, akik most lépnek nagyobb felelősségbe.",
    tag: "Program",
  },
  {
    icon: Lightbulb,
    title: "Stratégiai Műhely",
    desc: "Off-site workshopok, ahol a vezetői csapat átgondolja a következő 12-36 hónap irányát.",
    tag: "Workshop",
  },
  {
    icon: Target,
    title: "Performance Review",
    desc: "Független, objektív értékelés és visszajelzés vezetők és csapatok teljesítményéről.",
    tag: "Audit",
  },
  {
    icon: Sparkles,
    title: "Change Coaching",
    desc: "Szervezeti átalakulás, M&A vagy gyors növekedés időszakának vezetői támogatása.",
    tag: "Változás",
  },
];

export default function Services({
  variant = "cream",
  eyebrow = "01 - Szolgáltatások",
  cards = defaultCards,
}) {
  return (
    <Section
      variant={variant}
      id="services"
      testid="services-section"
      className="px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A2A4F]/50">
              {eyebrow}
            </span>
            <h2 className="mt-4 font-[Outfit] text-4xl font-bold leading-[1.05] tracking-tight text-[#1A2A4F] md:text-6xl">
              Programok, amik
              <br />
              <span className="font-medium italic text-[#1A2A4F]/70">
                a vezetődet építik.
              </span>
            </h2>
          </Reveal>
          <Reveal
            delay={1}
            as="p"
            className="max-w-md text-lg leading-relaxed text-[#1A2A4F]/70"
          >
            Hat különböző formátum, egy közös cél: tisztább gondolkodás,
            bátrabb döntés és erősebb hatás.
          </Reveal>
        </div>

        <div
          data-testid="services-grid"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal
                key={card.title}
                delay={i}
                data-testid={`service-card-${i}`}
                className="group relative cursor-pointer rounded-3xl border border-transparent bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#F7A5A5]/40 hover:shadow-[0_24px_48px_-12px_rgba(26,42,79,0.12)]"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFDBB6]/40 text-[#1A2A4F] transition-colors group-hover:bg-[#F7A5A5]/50">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="rounded-full bg-[#FFF2EF] px-3 py-1 text-xs font-medium text-[#1A2A4F]/50">
                    {card.tag}
                  </span>
                </div>
                <h3 className="mb-3 font-[Outfit] text-2xl font-semibold text-[#1A2A4F]">
                  {card.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#1A2A4F]/65">
                  {card.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[#1A2A4F] transition-colors group-hover:text-[#F7A5A5]">
                  Részletek
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
