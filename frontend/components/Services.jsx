import {
  ArrowUpRight,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { getIcon } from "@/lib/icons";
import Reveal from "@/components/Reveal";

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
  title,
  subtitle,
  cards = defaultCards,
}) {
  const isDark = variant === "dark" || variant === "solidDark";
  const isWarm = variant === "warm";

  const cardBgClasses = isDark
    ? "bg-white/5 hover:border-[#FFF2EF]/20 hover:bg-white/10"
    : isWarm
    ? "bg-gradient-to-br from-white to-[#FFDBB6]/30 hover:border-[#F7A5A5]/60 hover:shadow-[0_24px_48px_-12px_rgba(26,42,79,0.15)]"
    : "bg-white hover:border-[#F7A5A5]/40 hover:shadow-[0_24px_48px_-12px_rgba(26,42,79,0.12)]";

  const iconBgClasses = isDark
    ? "bg-white/10 text-[#FFF2EF] group-hover:bg-[#F7A5A5]/80 group-hover:text-[#1A2A4F]"
    : isWarm
    ? "bg-[#F7A5A5]/20 text-[#1A2A4F] group-hover:bg-[#F7A5A5]/60"
    : "bg-[#FFDBB6]/40 text-[#1A2A4F] group-hover:bg-[#F7A5A5]/50";

  return (
    <div
      id="services"
      data-testid="services-section"
      className="w-full"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-[#FFF2EF]/50' : 'text-[#1A2A4F]/50'}`}>
              {eyebrow}
            </span>
            {title ? (
              <h2 
                className={`mt-4 font-[Outfit] text-4xl font-bold leading-[1.05] tracking-tight ${isDark ? 'text-[#FFF2EF] [&_span]:!text-[#FFF2EF]/70' : 'text-[#1A2A4F] [&_span]:!text-[#1A2A4F]/70'} md:text-6xl`}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            ) : (
              <h2 className={`mt-4 font-[Outfit] text-4xl font-bold leading-[1.05] tracking-tight ${isDark ? 'text-[#FFF2EF]' : 'text-[#1A2A4F]'} md:text-6xl`}>
                Programok, amik
                <br />
                <span className={`font-medium italic ${isDark ? 'text-[#FFF2EF]/70' : 'text-[#1A2A4F]/70'}`}>
                  a vezetődet építik.
                </span>
              </h2>
            )}
          </Reveal>
          <Reveal
            delay={1}
            as="div"
            className={`max-w-md text-lg leading-relaxed ${isDark ? 'text-[#FFF2EF]/70' : 'text-[#1A2A4F]/70'}`}
          >
            {subtitle ? (
              <div dangerouslySetInnerHTML={{ __html: subtitle }} />
            ) : (
              <p>Hat különböző formátum, egy közös cél: tisztább gondolkodás, bátrabb döntés és erősebb hatás.</p>
            )}
          </Reveal>
        </div>

        <div
          data-testid="services-grid"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <Reveal
                key={card.title}
                delay={i}
                data-testid={`service-card-${i}`}
                className={`group relative cursor-pointer rounded-3xl border border-transparent p-7 transition-all hover:-translate-y-1 ${cardBgClasses}`}
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${iconBgClasses}`}>
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    isDark ? "bg-white/10 text-[#FFF2EF]/70" : "bg-[#FFF2EF] text-[#1A2A4F]/50"
                  }`}>
                    {card.tag}
                  </span>
                </div>
                <h3 className={`mb-3 font-[Outfit] text-2xl font-semibold ${isDark ? "text-[#FFF2EF]" : "text-[#1A2A4F]"}`}>
                  {card.title}
                </h3>
                <p className={`mb-6 text-sm leading-relaxed ${isDark ? "text-[#FFF2EF]/70" : "text-[#1A2A4F]/65"}`}>
                  {card.desc}
                </p>
                <div className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isDark ? "text-[#FFF2EF] group-hover:text-[#F7A5A5]" : "text-[#1A2A4F] group-hover:text-[#F7A5A5]"
                }`}>
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
    </div>
  );
}
