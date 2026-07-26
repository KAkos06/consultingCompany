import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const testimonials = [
  {
    quote:
      "Az EI-vel töltött 9 hónap alatt nem csak a vezetői stílusom változott meg — a teljes felső csapatunk dinamikája. Tisztábban látunk, gyorsabban döntünk.",
    name: "Kovács Andrea",
    role: "CEO, Nordwell Group",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MTc3MDkzNXww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Olyan kérdéseket tettek fel, amiket magamtól nem mertem volna. A coaching-ülések után minden alkalommal tisztább fejjel ültem vissza a tárgyalóasztalhoz.",
    name: "Nagy Bálint",
    role: "Managing Director, Aether Capital",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MTc3MDkzNXww&ixlib=rb-4.1.0&q=85",
  },
];

const stats = [
  { n: "94%", l: "ismételt megbízás" },
  { n: "240+", l: "kísért vezető" },
  { n: "12", l: "iparág" },
  { n: "9.6/10", l: "elégedettség" },
];

export default function Testimonials({ variant = "dark" }) {
  return (
    <Section
      variant={variant}
      id="cases"
      testid="testimonials-section"
      className="py-28 md:py-36 px-6"
    >
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#FFDBB6] uppercase">
              04 — Esettanulmányok
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-6xl font-bold text-[#FFF2EF] mt-4 leading-[1.05] tracking-tight">
              Vezetők, akik velünk
              <br />
              <span className="italic font-medium text-[#F7A5A5]">léptek tovább.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <Reveal
              key={i}
              delay={i}
              data-testid={`testimonial-${i}`}
              className="bg-white/[0.04] backdrop-blur rounded-3xl p-8 border border-white/10 hover:border-[#F7A5A5]/30 transition-colors"
            >
              <Quote
                size={32}
                className="text-[#F7A5A5] mb-5"
                strokeWidth={1.5}
              />
              <p className="text-[#FFF2EF]/90 text-lg leading-relaxed mb-7">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-5 border-t border-white/10">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[#FFF2EF]">{t.name}</div>
                  <div className="text-sm text-[#FFF2EF]/60">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stats row */}
        <div
          data-testid="testimonials-stats"
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <Reveal
              key={i}
              delay={i}
              className="bg-white/[0.04] backdrop-blur rounded-2xl p-6 border border-white/5"
            >
              <div className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#FFDBB6]">
                {s.n}
              </div>
              <div className="text-xs md:text-sm text-[#FFF2EF]/60 mt-2">
                {s.l}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
