import {
  Compass,
  Users,
  TrendingUp,
  Lightbulb,
  Target,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const services = [
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
    desc: "Szervezeti átalakulás, M&A, vagy gyors növekedés időszakának vezetői támogatása.",
    tag: "Változás",
  },
];

export default function Services({ variant = "cream" }) {
  return (
    <Section
      variant={variant}
      id="services"
      testid="services-section"
      className="py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              01 — Szolgáltatások
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-6xl font-bold text-[#1A2A4F] mt-4 leading-[1.05] tracking-tight">
              Programok, amik
              <br />
              <span className="italic font-medium text-[#1A2A4F]/70">a vezetődet építik.</span>
            </h2>
          </Reveal>
          <Reveal delay={1} as="p" className="text-[#1A2A4F]/70 text-lg max-w-md leading-relaxed">
            Hat különböző formátum — egy közös cél: tisztább gondolkodás, bátrabb
            döntés, erősebb hatás.
          </Reveal>
        </div>

        <div
          data-testid="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={i}
                delay={i}
                data-testid={`service-card-${i}`}
                className="group relative bg-white rounded-3xl p-7 border border-transparent hover:border-[#F7A5A5]/40 transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(26,42,79,0.12)] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] group-hover:bg-[#F7A5A5]/50 transition-colors">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <span className="text-xs font-medium text-[#1A2A4F]/50 bg-[#FFF2EF] px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-[Outfit] text-2xl font-semibold text-[#1A2A4F] mb-3">
                  {s.title}
                </h3>
                <p className="text-[#1A2A4F]/65 text-sm leading-relaxed mb-6">
                  {s.desc}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[#1A2A4F] group-hover:text-[#F7A5A5] transition-colors">
                  Részletek
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.5}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
