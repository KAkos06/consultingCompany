import { Quote } from "lucide-react";
import Reveal from "@/components/Reveal";

const defaultTestimonials = [
  {
    quote:
      "Az EI-vel töltött 9 hónap alatt nem csak a vezetői stílusom változott meg, a teljes felső csapatunk dinamikája is. Tisztábban látunk, gyorsabban döntünk.",
    name: "Kovács Andrea",
    role: "CEO, Nordwell Group",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MTc3MDkzNXww&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "Olyan kérdéseket tettek fel, amiket magamtól nem mertem volna. A coaching ülések után minden alkalommal tisztább fejjel ültem vissza a tárgyalóasztalhoz.",
    name: "Nagy Bálint",
    role: "Managing Director, Aether Capital",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MTc3MDkzNXww&ixlib=rb-4.1.0&q=85",
  },
];

const defaultStats = [
  { n: "94%", l: "ismételt megbízás" },
  { n: "240+", l: "kísért vezető" },
  { n: "12", l: "iparág" },
  { n: "9.6/10", l: "elégedettség" },
];

export default function Testimonials({
  variant = "dark",
  testimonials = defaultTestimonials,
  stats = defaultStats,
}) {
  return (
    <div
      id="testimonials"
      data-testid="testimonials-section"
      className="w-full"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FFDBB6]">
              04 - Esettanulmányok
            </span>
            <h2 className="mt-4 font-[Outfit] text-4xl font-bold leading-[1.05] tracking-tight text-[#FFF2EF] md:text-6xl">
              Vezetők, akik velünk
              <br />
              <span className="font-medium italic text-[#F7A5A5]">
                léptek tovább.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Reveal
              key={i}
              delay={i}
              data-testid={`testimonial-${i}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-colors hover:border-[#F7A5A5]/30"
            >
              <Quote
                size={32}
                className="mb-5 text-[#F7A5A5]"
                strokeWidth={1.5}
              />
              <p className="mb-7 text-lg leading-relaxed text-[#FFF2EF]/90">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-[#FFF2EF]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#FFF2EF]/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div
          data-testid="testimonials-stats"
          className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <Reveal
              key={i}
              delay={i}
              className="rounded-2xl border border-white/5 bg-white/[0.04] p-6 backdrop-blur"
            >
              <div className="font-[Outfit] text-4xl font-bold text-[#FFDBB6] md:text-5xl">
                {stat.n}
              </div>
              <div className="mt-2 text-xs text-[#FFF2EF]/60 md:text-sm">
                {stat.l}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
