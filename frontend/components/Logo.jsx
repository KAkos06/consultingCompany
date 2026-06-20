// Brand logo (provided by user as PNG with transparent background).
// The PNG is recolored to a solid cream tone via CSS filter so it reads
// crisply on the navy badge; the badge itself gets a subtle peach inner
// ring + coral glow for presence at small sizes.
export default function Logo({ size = 44, variant = "light", className = "", logoUrl = "/default-logo.svg" }) {
  const isDark = variant === "dark";

  // Badge background follows the brand-name text color in each context.
  const bg = isDark ? "#FFF2EF" : "#1A2A4F";
  // Inner ring (slight accent for depth) and image color.
  const ring = isDark ? "rgba(26,42,79,0.08)" : "rgba(247,165,165,0.45)";
  // brightness(0) collapses the image to pure black; invert(1) flips to
  // pure white. We then nudge with sepia + hue-rotate to land on the
  // desired tone. The dark variant uses navy-ish, the light variant
  // uses cream/off-white so it pops on the navy badge.
  const imgFilter = isDark
    ? // navy on cream
      "brightness(0) saturate(100%)"
    : // cream on navy
      "brightness(0) invert(100%) sepia(8%) saturate(400%) hue-rotate(330deg) brightness(98%)";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full shrink-0 relative ${className}`}
      style={{
        width: size,
        height: size,
        padding: Math.round(size * 0.18),
        backgroundColor: bg,
        boxShadow: isDark
          ? "0 4px 14px -4px rgba(26,42,79,0.18)"
          : "0 6px 18px -6px rgba(247,165,165,0.55), inset 0 0 0 1px rgba(247,165,165,0.18)",
      }}
    >
      {/* subtle inner accent ring */}
      <span
        aria-hidden
        className="absolute inset-[3px] rounded-full pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${ring}` }}
      />
      <img
        src={logoUrl}
        alt="Executive Insights"
        className="w-full h-full object-contain relative"
        style={{ filter: imgFilter }}
        draggable={false}
      />
    </span>
  );
}
