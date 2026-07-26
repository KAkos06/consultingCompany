import { Award, Target, Users, Heart, BookOpen, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

const values = [
  {
    icon: Heart,
    title: "Mély bizalom",
    desc: "A titoktartás nem klauzula, hanem alapfeltétel. Az ügyfeleink legbizalmasabb döntéseit kísérjük.",
  },
  {
    icon: Target,
    title: "Mérhető hatás",
    desc: "Diagnosztika és negyedéves checkpoint. Számokkal, érintettek visszajelzéseivel.",
  },
  {
    icon: Compass,
    title: "Insight-alapú",
    desc: "Nem trénerek vagyunk. Strukturált gondolkodás, mély kérdések, saját válaszok.",
  },
  {
    icon: Users,
    title: "Hosszú távú partnerség",
    desc: "94%-os ismételt megbízási arány — több vezetőt 5+ éve kísérünk.",
  },
];

const milestones = [
  { year: "2013", title: "Alapítás", desc: "Két alapító, három első ügyfél." },
  { year: "2016", title: "Csapatra váltás", desc: "Első Team Coaching programok indulása." },
  { year: "2019", title: "Régiós bővülés", desc: "Cseh, lengyel és román piac." },
  { year: "2022", title: "Leadership Akadémia", desc: "Strukturált 6 hónapos vezetőképző." },
  { year: "2024", title: "240+ vezető", desc: "Vezetői NPS: +78." },
];

const team = [
  {
    name: "dr. Horváth Eszter",
    role: "Alapító, Senior Executive Coach",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    bio: "20+ év C-szintű tapasztalat. ICF MCC akkreditáció.",
  },
  {
    name: "Szabó Márton",
    role: "Társalapító, Team Coaching vezető",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    bio: "Volt CEO. Specializáció: vezetői csapat-dinamika.",
  },
  {
    name: "Kovács Júlia",
    role: "Senior Coach, Change Management",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    bio: "M&A és transzformáció specialista. EMCC EIA.",
  },
  {
    name: "Nagy Péter",
    role: "Senior Coach, Performance",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    bio: "Volt Big4 partner. Pénzügyi szektor mélyebb ismerete.",
  },
];

export default function AboutPage() {
  return (
    <main data-testid="about-page" className="relative">
      <Navbar />
      <PageHero
        breadcrumbs={[
          { label: "Kezdőlap", to: "/" },
          { label: "Rólunk" },
        ]}
        eyebrow="Az Executive Insights csapata"
        title="12 év, 240+ vezető,"
        highlight="egyetlen küldetés."
        description="Tapasztalt mentorok hálózata, akik a magyar és közép-európai piac C-szintű vezetőit kísérik a növekedés legkritikusabb pillanataiban — diszkréten, mélyen, mérhető eredménnyel."
        testid="about-hero"
      />

      {/* Story */}
      <Section variant="cream" testid="about-story" className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              A történetünk
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Egy meggyőződés, amiből cég lett.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-8 space-y-5 text-[#1A2A4F]/75 text-lg leading-relaxed">
              <p>
                2013-ban két alapító — egy volt vezérigazgató és egy szervezetfejlesztő —
                ült le egy budapesti kávézóban azzal a kérdéssel:{" "}
                <em>„Miért nincs Magyarországon olyan coaching cég, ahova mi magunk is mennénk?”</em>
              </p>
              <p>
                A válaszuk lett az Executive Insights. Nem trénerek vagyunk, nem
                gyors fejlesztési programokat árulunk. Olyan vezetőket kísérünk,
                akiknek a hétköznapi döntései sok ember életét befolyásolják — és
                akiknek ehhez kérdéseik vannak, amit máshol nem tudnak feltenni.
              </p>
              <p>
                12 év alatt 240+ vezető fordult meg nálunk. Az ismételt megbízási
                arányunk 94%. Ez nem reklámszöveg — ez a munkánk lényege.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section variant="warm" testid="about-values" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Értékek
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Amitől mi mások vagyunk.
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal
                  key={i}
                  delay={i}
                  className="bg-white/70 backdrop-blur rounded-3xl p-8 border border-[#1A2A4F]/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1A2A4F] text-[#FFF2EF] flex items-center justify-center mb-5">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <h3 className="font-[Outfit] text-2xl font-semibold text-[#1A2A4F] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[#1A2A4F]/70 leading-relaxed">{v.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section variant="dark" testid="about-timeline" className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FFDBB6] uppercase">
              Mérföldkövek
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#FFF2EF] mt-4 leading-tight tracking-tight">
              Tizenkét év építkezés.
            </h2>
          </Reveal>
          <div className="mt-16 relative">
            {/* vertical line */}
            <div
              aria-hidden
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/15 md:-translate-x-1/2"
            />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <Reveal
                  key={i}
                  delay={i}
                  data-testid={`milestone-${i}`}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                    i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className="hidden md:block" />
                  <div className="pl-12 md:pl-0 md:pr-8">
                    <span
                      aria-hidden
                      className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#F7A5A5] -translate-x-1/2 mt-2 ring-4 ring-[#1A2A4F]"
                    />
                    <div className="font-[Outfit] text-[#FFDBB6] font-bold text-3xl mb-1">
                      {m.year}
                    </div>
                    <h3 className="font-[Outfit] text-xl font-semibold text-[#FFF2EF] mb-1">
                      {m.title}
                    </h3>
                    <p className="text-[#FFF2EF]/65 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Team */}
      <Section variant="cream" testid="about-team" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              A csapat
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Mentorok, akik már jártak ott.
            </h2>
            <p className="mt-5 text-[#1A2A4F]/70 leading-relaxed">
              Mindenki, aki nálunk coach-ol, volt korábban felső vezető.
              Nem elméletet tanítunk, hanem terepen szerzett tapasztalatot.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <Reveal
                key={i}
                delay={i}
                data-testid={`team-member-${i}`}
                className="group bg-white rounded-3xl p-3 border border-[#1A2A4F]/5 hover:-translate-y-1 hover:shadow-[0_24px_48px_-12px_rgba(26,42,79,0.12)] transition-all"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pb-4">
                  <h4 className="font-[Outfit] font-semibold text-[#1A2A4F] text-lg leading-tight">
                    {t.name}
                  </h4>
                  <div className="text-xs text-[#F7A5A5] font-semibold mt-1 uppercase tracking-wider">
                    {t.role}
                  </div>
                  <p className="text-sm text-[#1A2A4F]/65 mt-3 leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Quick stats */}
      <Section variant="warm" testid="about-stats" className="py-20 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: "12+", l: "év tapasztalat", icon: Award },
            { n: "240+", l: "kísért vezető", icon: Users },
            { n: "94%", l: "ismételt megbízás", icon: Target },
            { n: "5", l: "ország régióban", icon: BookOpen },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                key={i}
                delay={i}
                className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-[#1A2A4F]/5"
              >
                <Icon
                  size={20}
                  strokeWidth={2}
                  className="text-[#F7A5A5] mb-3"
                />
                <div className="font-[Outfit] text-4xl font-bold text-[#1A2A4F]">
                  {s.n}
                </div>
                <div className="text-xs md:text-sm text-[#1A2A4F]/60 mt-2">
                  {s.l}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        eyebrow="Ismerjük meg egymást"
        title="Egy 30 perces beszélgetés sokszor messzebb visz, mint hisszük."
        primary={{ label: "Foglalj diagnosztikát", to: "/kapcsolat" }}
        secondary={{ label: "Szolgáltatások", to: "/executive-coaching" }}
        testid="about-cta-band"
      />

      <Footer />
    </main>
  );
}
