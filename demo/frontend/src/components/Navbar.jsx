import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Compass,
  Users,
  TrendingUp,
  Lightbulb,
  BookOpen,
  Sparkles,
  Mail,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";

const servicesItems = [
  { icon: Compass, title: "Executive Coaching", desc: "1:1 vezetői fejlesztés", to: "/executive-coaching" },
  { icon: Users, title: "Team Coaching", desc: "Csapat dinamika és kohézió", to: "/executive-coaching" },
  { icon: TrendingUp, title: "Leadership Growth", desc: "Stratégiai vezetőképzés", to: "/executive-coaching" },
  { icon: Lightbulb, title: "Change Management", desc: "Szervezeti átalakulás", to: "/executive-coaching" },
];

const aboutItems = [
  { icon: Sparkles, title: "Küldetésünk", desc: "Vezetők, akikre számítani lehet", to: "/rolunk" },
  { icon: Users, title: "A csapat", desc: "Tapasztalt mentorok", to: "/rolunk" },
  { icon: BookOpen, title: "Eredmények", desc: "Számokban a hatás", to: "/rolunk" },
  { icon: Compass, title: "Filozófia", desc: "Insight-alapú coaching", to: "/rolunk" },
];

const MegaMenu = ({ items, testid }) => (
  // The outer wrapper supplies the invisible "hover bridge" via padding-top
  // (set in index.css .mega-menu), so the cursor can cross the gap.
  <div
    data-testid={testid}
    className="mega-menu absolute top-full left-1/2 w-[460px]"
  >
    <div className="bg-white rounded-[28px] shadow-[0_24px_64px_-12px_rgba(26,42,79,0.25)] p-5 grid grid-cols-2 gap-2 border border-[#1A2A4F]/5">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link
            key={i}
            to={item.to || "#"}
            data-testid={`${testid}-item-${i}`}
            className="group/item flex items-start gap-3 p-3 rounded-2xl hover:bg-[#FFF2EF] transition-colors"
          >
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] group-hover/item:bg-[#F7A5A5]/50 transition-colors">
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#1A2A4F] text-sm leading-tight">
                {item.title}
              </div>
              <div className="text-xs text-[#1A2A4F]/60 mt-1 leading-snug">
                {item.desc}
              </div>
            </div>
          </Link>
        );
      })}
      <div className="col-span-2 mt-2 pt-3 border-t border-[#1A2A4F]/5 flex items-center justify-between px-2">
        <span className="text-xs text-[#1A2A4F]/60">Fedezz fel többet</span>
        <a href="#" className="text-xs font-semibold text-[#1A2A4F] hover:text-[#F7A5A5] transition-colors">
          Összes →
        </a>
      </div>
    </div>
  </div>
);

const MobileAccordion = ({ label, items, testid }) => {
  const [open, setOpen] = useState(false);
  return (
    <div data-testid={testid}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl hover:bg-[#FFF2EF] font-semibold text-[#1A2A4F] transition-colors"
      >
        <span>{label}</span>
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height] duration-400 ease-out ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="pl-3 pr-1 pt-2 pb-1 space-y-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={i}
                to={item.to || "#"}
                data-testid={`${testid}-sub-${i}`}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FFF2EF] transition-colors"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F]">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-[#1A2A4F] text-sm leading-tight">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#1A2A4F]/60 mt-0.5 leading-snug">
                    {item.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        data-testid="main-navbar"
        className={`nav-shell fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-white/95 backdrop-blur-md shadow-[0_8px_32px_rgba(26,42,79,0.18)] py-3 ${
          scrolled ? "nav-stuck" : "nav-floating"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo + name (visible on all viewports) */}
          <Link
            to="/"
            data-testid="nav-logo"
            className="flex items-center gap-2.5 shrink-0"
          >
            <Logo size={44} />
            <span className="font-[Outfit] font-bold text-[#1A2A4F] text-base sm:text-lg tracking-tight whitespace-nowrap">
              Executive Insights
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            data-testid="nav-menu-desktop"
            className="hidden lg:flex items-center gap-8"
          >
            <div className="nav-item relative" tabIndex={0}>
              <button
                data-testid="nav-services-link"
                className="nav-link flex items-center gap-1"
              >
                Szolgáltatások
                <ChevronDown size={14} strokeWidth={2.5} className="opacity-70" />
              </button>
              <MegaMenu items={servicesItems} testid="mega-services" />
            </div>

            <div className="nav-item relative" tabIndex={0}>
              <button
                data-testid="nav-about-link"
                className="nav-link flex items-center gap-1"
              >
                Rólunk
                <ChevronDown size={14} strokeWidth={2.5} className="opacity-70" />
              </button>
              <MegaMenu items={aboutItems} testid="mega-about" />
            </div>

            <Link to="/executive-coaching" data-testid="nav-methodology-link" className="nav-link">
              Módszertan
            </Link>
            <Link to="/rolunk" data-testid="nav-cases-link" className="nav-link">
              Esettanulmányok
            </Link>
          </nav>

          {/* Right side: contact button + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/kapcsolat"
              data-testid="nav-contact-cta"
              className="hidden sm:inline-flex items-center gap-2 bg-[#F7A5A5] text-[#1A2A4F] pl-5 pr-2 py-2 rounded-full hover:bg-[#FFDBB6] active:scale-95 transition-all shadow-md text-sm font-semibold group"
            >
              Kapcsolat
              <span className="w-8 h-8 rounded-full bg-[#1A2A4F] text-[#FFF2EF] flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Mail size={14} strokeWidth={2.5} />
              </span>
            </Link>

            <button
              data-testid="mobile-menu-toggle"
              aria-label="Menü"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-11 h-11 rounded-full bg-[#F7A5A5] text-[#1A2A4F] flex items-center justify-center hover:bg-[#FFDBB6] active:scale-95 transition-all shadow-md"
            >
              <MenuIcon size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in drawer (from left) */}
      {/* Backdrop */}
      <div
        data-testid="mobile-drawer-backdrop"
        onClick={() => setMobileOpen(false)}
        className={`lg:hidden fixed inset-0 z-[60] bg-[#1A2A4F]/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      {/* Drawer panel */}
      <aside
        data-testid="mobile-drawer"
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-[61] w-[88%] max-w-sm bg-white shadow-2xl transition-transform duration-400 ease-out flex flex-col ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1A2A4F]/5">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <Logo size={42} />
            <span className="font-[Outfit] font-bold text-[#1A2A4F] text-lg tracking-tight">
              Executive Insights
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            data-testid="mobile-drawer-close"
            aria-label="Bezárás"
            className="w-10 h-10 rounded-full bg-[#FFF2EF] flex items-center justify-center text-[#1A2A4F] hover:bg-[#FFDBB6]/60 active:scale-95 transition-all"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Drawer nav items */}
        <nav
          data-testid="mobile-drawer-nav"
          className="flex-1 overflow-y-auto p-3 space-y-1"
          onClick={(e) => {
            // close drawer on link click (but keep submenu toggles working)
            if (e.target.closest("a")) setMobileOpen(false);
          }}
        >
          <MobileAccordion
            label="Szolgáltatások"
            items={servicesItems}
            testid="mobile-services"
          />
          <MobileAccordion
            label="Rólunk"
            items={aboutItems}
            testid="mobile-about"
          />
          <Link
            to="/executive-coaching"
            className="block px-4 py-3.5 rounded-2xl hover:bg-[#FFF2EF] font-semibold text-[#1A2A4F]"
          >
            Módszertan
          </Link>
          <Link
            to="/rolunk"
            className="block px-4 py-3.5 rounded-2xl hover:bg-[#FFF2EF] font-semibold text-[#1A2A4F]"
          >
            Esettanulmányok
          </Link>
        </nav>

        {/* Drawer CTA */}
        <div className="p-5 border-t border-[#1A2A4F]/5">
          <Link
            to="/kapcsolat"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#F7A5A5] text-[#1A2A4F] py-3.5 rounded-full font-semibold hover:bg-[#FFDBB6] active:scale-95 transition-all shadow-md"
          >
            Kapcsolat
            <Mail size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </aside>
    </>
  );
}
