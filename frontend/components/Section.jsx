// Three reusable section-background variants you can swap per section.
//
// Usage:
//   <Section variant="cream" id="services" testid="services-section">
//      ...your content...
//   </Section>
//
// Variants:
//   "cream" — warm off-white base with subtle peach orbs + dotted grid
//   "warm"  — peach→coral diagonal gradient over cream, with blurred orbs
//   "dark"  — deep navy with radial coral/peach highlights + grain
//
// Each variant carries its own decorative layer behind the content.
// Text inside should remain readable: variants "cream" and "warm" assume
// dark navy text; variant "dark" expects light cream text (use the
// appropriate color in the children).

import { forwardRef } from "react";

const variants = {
  cream: {
    wrapper: "bg-[#FFF2EF] text-[#1A2A4F]",
    decor: (
      <>
        {/* dotted grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1A2A4F 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#FFDBB6]/35 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-20 w-[360px] h-[360px] rounded-full bg-[#F7A5A5]/20 blur-3xl pointer-events-none"
        />
      </>
    ),
  },

  warm: {
    wrapper:
      "text-[#1A2A4F] bg-gradient-to-br from-[#FFDBB6]/55 via-[#FFF2EF] to-[#F7A5A5]/30",
    decor: (
      <>
        <div
          aria-hidden
          className="absolute top-1/4 left-1/3 w-[520px] h-[520px] rounded-full bg-[#F7A5A5]/30 blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full bg-[#FFDBB6]/60 blur-3xl pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -right-16 w-[460px] h-[460px] rounded-full bg-[#F7A5A5]/25 blur-3xl pointer-events-none"
        />
        {/* faint diagonal lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #1A2A4F 0 1px, transparent 1px 28px)",
          }}
        />
      </>
    ),
  },

  dark: {
    wrapper: "bg-[#1A2A4F] text-[#FFF2EF]",
    decor: (
      <>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 15% 10%, rgba(247,165,165,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(255,219,182,0.15) 0%, transparent 55%)",
          }}
        />
        {/* grain overlay */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />
      </>
    ),
  },
};

const Section = forwardRef(function Section(
  { variant = "cream", id, testid, className = "", children, ...rest },
  ref
) {
  const v = variants[variant] || variants.cream;
  return (
    <section
      ref={ref}
      id={id}
      data-testid={testid}
      data-section-variant={variant}
      className={`relative overflow-hidden ${v.wrapper} ${className}`}
      {...rest}
    >
      {v.decor}
      <div className="relative">{children}</div>
    </section>
  );
});

export default Section;
