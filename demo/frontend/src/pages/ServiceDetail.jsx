// Generic content / service-detail page.
// Used here for "Executive Coaching" but structured to be reusable for
// any service or article — just change the props/content.
import { Check, ArrowRight, Quote, Clock, Users, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

const outcomes = [
  "Tisztább döntéshozatal stratégiai szinten",
  "Erősebb vezetői jelenlét, mind belső, mind külső kommunikációban",
  "Konfliktuskezelés és nehéz beszélgetések magabiztos kezelése",
  "Saját vezetői stílus tudatosítása és finomhangolása",
  "Erőteljesebb csapatkohézió és bizalom építése",
  "Energia-menedzsment és kiégés megelőzése",
];

const forWhom = [
  {
    icon: Target,
    title: "Új C-szintű vezetőknek",
    desc: "Az első 12 hónap a legkritikusabb — strukturált kísérettel sokkal magabiztosabb a startod.",
  },
  {
    icon: Sparkles,
    title: "Tapasztalt vezetőknek",
    desc: "Aki már sok mindent látott, és új perspektívát keres a hatékonyabb döntésekhez.",
  },
  {
    icon: Users,
    title: "Vezetőknek átalakulásban",
    desc: "M&A, gyors növekedés, szervezeti változás — a coaching itt mértékadó támasz.",
  },
];

const phases = [
  {
    n: "01",
    title: "Diagnosztika (2 hét)",
    desc: "Strukturált interjú, 360° visszajelzés, kontextus felmérés. Közös fókuszmegállapodás.",
  },
  {
    n: "02",
    title: "Mély munka (3–6 hónap)",
    desc: "Kétheti, 90 perces ülések. Strukturált gondolkodás, terep-helyzetek elemzése, kísérleti viselkedések.",
  },
  {
    n: "03",
    title: "Megszilárdítás (1 hónap)",
    desc: "Visszajelzések beépítése, fejlődési ív értékelése, hosszabbtávú fókuszok.",
  },
];

export default function ServicePage() {
  return (
    <main data-testid="service-page" className="relative">
      <Navbar />
      <PageHero
        breadcrumbs={[
          { label: "Kezdőlap", to: "/" },
          { label: "Szolgáltatások" },
          { label: "Executive Coaching" },
        ]}
        eyebrow="01 — Szolgáltatás"
        title="Executive"
        highlight="Coaching"
        description="Személyre szabott 1:1 program C-szintű vezetőknek. Mély önismeret, döntéshozatali tisztaság és nagyobb hatás — strukturált, mérhető kísérettel."
        testid="service-hero"
      />

      {/* Intro stats */}
      <Section variant="cream" testid="service-meta" className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Clock, label: "Időtartam", value: "6–9 hónap" },
            { icon: Users, label: "Formátum", value: "1:1 ülés" },
            { icon: Target, label: "Ülések", value: "Kétheti, 90'" },
            { icon: Sparkles, label: "Akkreditáció", value: "ICF MCC / EMCC" },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal
                key={i}
                delay={i}
                data-testid={`service-meta-${i}`}
                className="bg-white rounded-2xl p-5 border border-[#1A2A4F]/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] shrink-0">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#1A2A4F]/50 font-semibold">
                    {m.label}
                  </div>
                  <div className="font-semibold text-[#1A2A4F] text-sm md:text-base">
                    {m.value}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Long-form intro */}
      <Section variant="cream" testid="service-intro" className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Mi ez valójában?
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Nem tréning. Nem terápia.
              <br />
              <span className="italic font-medium text-[#1A2A4F]/70">
                Strukturált gondolkodás-partnerség.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-8 space-y-5 text-[#1A2A4F]/75 text-lg leading-relaxed">
              <p>
                Az Executive Coaching nem arról szól, hogy mi megmondjuk, mit
                csinálj. Arról szól, hogy olyan kérdéseket teszünk fel, amiket
                magadtól nem mernél — vagy nincs időd —, és ezekkel saját
                tisztább válaszokhoz jutsz.
              </p>
              <p>
                Egy tipikus ülés 90 perc. A coach 80%-ban kérdez, és 20%-ban
                strukturál, kihív, reflektál. Nincs PPT, nincs házi feladat
                — csak a fejedben már ott lévő rendszerek világosabbá tétele.
              </p>
              <p>
                A kíséret hossza átlagosan 6–9 hónap, kétheti rendszerességgel.
                Negyedévente mérünk: önértékelés + érintettek visszajelzése. Ez
                tartja a programot mérhetőnek és felelősségteljesnek.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* For whom */}
      <Section variant="warm" testid="service-for-whom" className="py-24 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Kinek ajánljuk
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Három tipikus vezetői helyzet.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {forWhom.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal
                  key={i}
                  delay={i}
                  data-testid={`for-whom-${i}`}
                  className="bg-white/70 backdrop-blur rounded-3xl p-7 border border-[#1A2A4F]/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1A2A4F] text-[#FFF2EF] flex items-center justify-center mb-5">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-semibold text-[#1A2A4F] mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[#1A2A4F]/70 leading-relaxed">{f.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Outcomes — split layout */}
      <Section variant="cream" testid="service-outcomes" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Eredmények
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Amit a programból
              <br />
              <span className="italic font-medium">magaddal viszel.</span>
            </h2>
            <p className="mt-6 text-[#1A2A4F]/70 leading-relaxed">
              Konkrét, viselkedés-szintű változások — nem általános
              fogalmakban, hanem ahogy a Te kontextusodban megjelenik.
            </p>
          </Reveal>
          <Reveal delay={1} className="space-y-3">
            {outcomes.map((o, i) => (
              <div
                key={i}
                data-testid={`outcome-${i}`}
                className="flex items-start gap-3 bg-white px-5 py-4 rounded-2xl border border-[#1A2A4F]/5"
              >
                <div className="w-6 h-6 rounded-full bg-[#F7A5A5] text-[#1A2A4F] flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-sm md:text-base font-medium text-[#1A2A4F]">
                  {o}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Phases */}
      <Section variant="dark" testid="service-phases" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FFDBB6] uppercase">
              A program íve
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#FFF2EF] mt-4 leading-tight tracking-tight">
              Három fázis, egy ív.
            </h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {phases.map((p, i) => (
              <Reveal
                key={i}
                delay={i}
                data-testid={`phase-${i}`}
                className="bg-white/[0.05] backdrop-blur rounded-3xl p-8 border border-white/10"
              >
                <div className="font-[Outfit] text-5xl font-bold text-[#F7A5A5] mb-6">
                  {p.n}
                </div>
                <h3 className="font-[Outfit] text-2xl font-semibold text-[#FFF2EF] mb-3">
                  {p.title}
                </h3>
                <p className="text-[#FFF2EF]/65 leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Single testimonial */}
      <Section variant="warm" testid="service-testimonial" className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="bg-white rounded-[36px] p-10 md:p-14 border border-[#1A2A4F]/5 shadow-[0_24px_48px_-24px_rgba(26,42,79,0.18)]">
            <Quote size={36} className="text-[#F7A5A5] mb-6" strokeWidth={1.5} />
            <p className="font-[Outfit] text-2xl md:text-3xl text-[#1A2A4F] leading-snug tracking-tight">
              „9 hónap alatt megváltozott a teljes csapatdinamika. Olyan
              kérdéseket tettek fel, amiket magamtól nem mertem volna — és a
              válaszaim engem is meglepetésként értek. Ma sokkal tisztábban
              látom, hol vagyok jó vezető, és hol kell még finomhangolnom.”
            </p>
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#1A2A4F]/10">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&w=200&q=85"
                alt="Kovács Andrea"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-[#1A2A4F]">Kovács Andrea</div>
                <div className="text-sm text-[#1A2A4F]/60">
                  CEO, Nordwell Group
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Related services */}
      <Section variant="cream" testid="service-related" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Hasonló programok
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-4xl font-bold text-[#1A2A4F] mt-4">
              Lehet, hogy ezek is érdekelnek
            </h2>
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { title: "Team Coaching", desc: "Vezetői csapatok együttműködésének mélyebb feltárása." },
              { title: "Leadership Akadémia", desc: "Strukturált 6 hónapos vezetőképző azoknak, akik most lépnek nagyobb felelősségbe." },
              { title: "Stratégiai Műhely", desc: "Off-site workshopok a felső csapat számára." },
            ].map((s, i) => (
              <Reveal
                key={i}
                delay={i}
                className="group bg-white rounded-3xl p-6 border border-transparent hover:border-[#F7A5A5]/40 transition-all hover:-translate-y-1"
              >
                <h3 className="font-[Outfit] text-xl font-semibold text-[#1A2A4F]">
                  {s.title}
                </h3>
                <p className="text-sm text-[#1A2A4F]/65 mt-2 leading-relaxed mb-5">
                  {s.desc}
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A2A4F] group-hover:text-[#F7A5A5] transition-colors"
                >
                  Tovább <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Indítsuk el"
        title="Foglalj egy 30 perces díjmentes diagnosztikai beszélgetést."
        primary={{ label: "Kapcsolatfelvétel", to: "/kapcsolat" }}
        secondary={{ label: "Rólunk", to: "/rolunk" }}
        testid="service-cta-band"
      />

      <Footer />
    </main>
  );
}
