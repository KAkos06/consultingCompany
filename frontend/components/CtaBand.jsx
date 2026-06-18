// Shared call-to-action band reused on subpages
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

export default function CtaBand({
  variant = "warm",
  eyebrow = "Készen állsz?",
  title = "Beszéljünk egy 30 perces ingyenes diagnosztikán.",
  primary = { label: "Kapcsolatfelvétel", to: "/kapcsolat" },
  secondary = { label: "Vissza a kezdőlapra", to: "/" },
  testid = "cta-band",
}) {
  return (
    <Section variant={variant} testid={testid} className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
            {eyebrow}
          </span>
          <h3 className="font-[Outfit] text-3xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
            {title}
          </h3>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href={primary.to}
              data-testid={`${testid}-primary`}
              className="group inline-flex items-center gap-2 bg-[#1A2A4F] text-[#FFF2EF] px-7 py-4 rounded-full font-semibold hover:bg-[#1A2A4F]/90 active:scale-95 transition-all shadow-lg"
            >
              {primary.label}
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
            {secondary && (
              <Link href={secondary.to}
                data-testid={`${testid}-secondary`}
                className="inline-flex items-center gap-2 border border-[#1A2A4F]/15 text-[#1A2A4F] px-7 py-4 rounded-full font-medium hover:bg-white/40 transition-colors"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
