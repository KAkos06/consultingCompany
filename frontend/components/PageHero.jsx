// Reusable, more compact "page hero" for subpages.
// Uses the same wrapping dark background as the home Hero, so the
// floating navbar sits cleanly above it.
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs = [], // [{label, to}]
  testid = "page-hero",
}) {
  return (
    <section
      data-testid={testid}
      className="relative hero-bg overflow-hidden"
    >
      <div className="grain" />
      <div
        aria-hidden
        className="absolute top-32 -left-20 w-72 h-72 rounded-full bg-[#F7A5A5]/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#FFDBB6]/15 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-20 md:pt-44 md:pb-24">
        {breadcrumbs.length > 0 && (
          <nav
            data-testid={`${testid}-breadcrumb`}
            className="fade-up flex items-center gap-1.5 text-xs text-[#FFF2EF]/60 mb-7"
          >
            {breadcrumbs.map((b, i) => {
              const last = i === breadcrumbs.length - 1;
              return (
                <span key={i} className="flex items-center gap-1.5">
                  {b.to && !last ? (
                    <Link href={b.to}
                      className="hover:text-[#F7A5A5] transition-colors"
                    >
                      {b.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        last ? "text-[#FFDBB6] font-medium" : "text-[#FFF2EF]/60"
                      }
                    >
                      {b.label}
                    </span>
                  )}
                  {!last && (
                    <ChevronRight size={12} className="text-[#FFF2EF]/30" />
                  )}
                </span>
              );
            })}
          </nav>
        )}

        {eyebrow && (
          <div
            data-testid={`${testid}-eyebrow`}
            className="fade-up delay-1 inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-[#FFF2EF] text-xs font-medium px-4 py-2 rounded-full mb-6"
          >
            {eyebrow}
          </div>
        )}

        <h1
          data-testid={`${testid}-title`}
          className="fade-up delay-2 font-[Outfit] text-[#FFF2EF] text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-4xl"
        >
          {title}{" "}
          {highlight && (
            <span className="text-[#F7A5A5] italic font-medium">
              {highlight}
            </span>
          )}
        </h1>

        {description && (
          <p
            data-testid={`${testid}-description`}
            className="fade-up delay-3 mt-7 text-base md:text-xl text-[#FFF2EF]/75 max-w-2xl leading-relaxed"
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
