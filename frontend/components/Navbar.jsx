"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  Compass,
  Lightbulb,
  Mail,
  Menu as MenuIcon,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";

const servicesItems = [
  {
    icon: Compass,
    title: "Executive Coaching",
    desc: "1:1 vezetői fejlesztés",
    to: "/executive-coaching",
  },
  {
    icon: Users,
    title: "Team Coaching",
    desc: "Csapatdinamika és kohézió",
    to: "/executive-coaching",
  },
  {
    icon: TrendingUp,
    title: "Leadership Growth",
    desc: "Stratégiai vezetőképzés",
    to: "/executive-coaching",
  },
  {
    icon: Lightbulb,
    title: "Change Management",
    desc: "Szervezeti átalakulás",
    to: "/executive-coaching",
  },
];

const aboutItems = [
  {
    icon: Sparkles,
    title: "Küldetésünk",
    desc: "Vezetők, akikre számítani lehet",
    to: "/rolunk",
  },
  {
    icon: Users,
    title: "A csapat",
    desc: "Tapasztalt mentorok",
    to: "/rolunk",
  },
  {
    icon: BookOpen,
    title: "Eredmények",
    desc: "Számokban a hatás",
    to: "/rolunk",
  },
  {
    icon: Compass,
    title: "Filozófia",
    desc: "Insight-alapú coaching",
    to: "/rolunk",
  },
];

const MegaMenu = ({ items, testid }) => (
  <div
    data-testid={testid}
    className="mega-menu absolute left-1/2 top-full w-[460px]"
  >
    <div className="grid grid-cols-2 gap-2 rounded-[28px] border border-[#1A2A4F]/5 bg-white p-5 shadow-[0_24px_64px_-12px_rgba(26,42,79,0.25)]">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.to || "#"}
            data-testid={`${testid}-item-${i}`}
            className="group/item flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-[#FFF2EF]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFDBB6]/40 text-[#1A2A4F] transition-colors group-hover/item:bg-[#F7A5A5]/50">
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight text-[#1A2A4F]">
                {item.title}
              </div>
              <div className="mt-1 text-xs leading-snug text-[#1A2A4F]/60">
                {item.desc}
              </div>
            </div>
          </Link>
        );
      })}
      <div className="col-span-2 mt-2 flex items-center justify-between border-t border-[#1A2A4F]/5 px-2 pt-3">
        <span className="text-xs text-[#1A2A4F]/60">Fedezz fel többet</span>
        <a
          href="#"
          className="text-xs font-semibold text-[#1A2A4F] transition-colors hover:text-[#F7A5A5]"
        >
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
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-semibold text-[#1A2A4F] transition-colors hover:bg-[#FFF2EF]"
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
        <div className="space-y-1 pb-1 pl-3 pr-1 pt-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.to || "#"}
                data-testid={`${testid}-sub-${i}`}
                className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#FFF2EF]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFDBB6]/40 text-[#1A2A4F]">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight text-[#1A2A4F]">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-[#1A2A4F]/60">
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
        className={`nav-shell fixed left-1/2 top-0 z-50 -translate-x-1/2 bg-white/95 py-3 shadow-[0_8px_32px_rgba(26,42,79,0.18)] backdrop-blur-md ${
          scrolled ? "nav-stuck" : "nav-floating"
        }`}
      >
        <div className="nav-shell-inner">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            data-testid="nav-logo"
            className="flex shrink-0 items-center gap-2.5"
          >
            <Logo size={44} />
            <span className="whitespace-nowrap font-[Outfit] text-base font-bold tracking-tight text-[#1A2A4F] sm:text-lg">
              Executive Insights
            </span>
          </Link>

          <nav
            data-testid="nav-menu-desktop"
            className="hidden items-center gap-8 lg:flex"
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

            <Link
              href="/executive-coaching"
              data-testid="nav-methodology-link"
              className="nav-link"
            >
              Módszertan
            </Link>
            <Link href="/rolunk" data-testid="nav-cases-link" className="nav-link">
              Esettanulmányok
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/kapcsolat"
              data-testid="nav-contact-cta"
              className="group hidden items-center gap-2 rounded-full bg-[#F7A5A5] py-2 pl-5 pr-2 text-sm font-semibold text-[#1A2A4F] shadow-md transition-all hover:bg-[#FFDBB6] active:scale-95 sm:inline-flex"
            >
              Kapcsolat
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A2A4F] text-[#FFF2EF] transition-transform group-hover:rotate-12">
                <Mail size={14} strokeWidth={2.5} />
              </span>
            </Link>

            <button
              data-testid="mobile-menu-toggle"
              aria-label="Menü"
              onClick={() => setMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7A5A5] text-[#1A2A4F] shadow-md transition-all hover:bg-[#FFDBB6] active:scale-95 lg:hidden"
            >
              <MenuIcon size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        </div>
      </header>

      <div
        data-testid="mobile-drawer-backdrop"
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[60] bg-[#1A2A4F]/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        data-testid="mobile-drawer"
        className={`fixed bottom-0 left-0 top-0 z-[61] flex w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-400 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#1A2A4F]/5 p-5">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <Logo size={42} />
            <span className="font-[Outfit] text-lg font-bold tracking-tight text-[#1A2A4F]">
              Executive Insights
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            data-testid="mobile-drawer-close"
            aria-label="Bezárás"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF2EF] text-[#1A2A4F] transition-all hover:bg-[#FFDBB6]/60 active:scale-95"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        <nav
          data-testid="mobile-drawer-nav"
          className="flex-1 space-y-1 overflow-y-auto p-3"
          onClick={(event) => {
            if (event.target.closest("a")) {
              setMobileOpen(false);
            }
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
            href="/executive-coaching"
            className="block rounded-2xl px-4 py-3.5 font-semibold text-[#1A2A4F] hover:bg-[#FFF2EF]"
          >
            Módszertan
          </Link>
          <Link
            href="/rolunk"
            className="block rounded-2xl px-4 py-3.5 font-semibold text-[#1A2A4F] hover:bg-[#FFF2EF]"
          >
            Esettanulmányok
          </Link>
        </nav>

        <div className="border-t border-[#1A2A4F]/5 p-5">
          <Link
            href="/kapcsolat"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 rounded-full bg-[#F7A5A5] py-3.5 font-semibold text-[#1A2A4F] shadow-md transition-all hover:bg-[#FFDBB6] active:scale-95"
          >
            Kapcsolat
            <Mail size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </aside>
    </>
  );
}
