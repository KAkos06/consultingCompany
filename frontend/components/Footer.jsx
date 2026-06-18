import { ArrowUpRight, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="mt-12 bg-[#1A2A4F] px-6 pb-10 pt-20 text-[#FFF2EF]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <Logo size={48} variant="dark" />
              <span className="font-[Outfit] text-xl font-bold">
                Executive Insights
              </span>
            </div>
            <p className="max-w-sm leading-relaxed text-[#FFF2EF]/65">
              Vezetői coaching és stratégiai mentorálás C-szintű vezetőknek és
              vezetői csapatoknak, Budapesten és online.
            </p>

            <div className="mt-7 flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all hover:border-[#F7A5A5] hover:bg-[#F7A5A5] hover:text-[#1A2A4F]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
              Cég
            </div>
            <ul className="space-y-3 text-sm text-[#FFF2EF]/75">
              <li>
                <Link href="/rolunk" className="transition-colors hover:text-[#F7A5A5]">
                  Rólunk
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-coaching"
                  className="transition-colors hover:text-[#F7A5A5]"
                >
                  Módszertan
                </Link>
              </li>
              <li>
                <Link href="/rolunk" className="transition-colors hover:text-[#F7A5A5]">
                  Esettanulmányok
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-[#F7A5A5]">
                  Karrier
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
              Szolgáltatások
            </div>
            <ul className="space-y-3 text-sm text-[#FFF2EF]/75">
              <li>
                <Link
                  href="/executive-coaching"
                  className="transition-colors hover:text-[#F7A5A5]"
                >
                  Executive Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-coaching"
                  className="transition-colors hover:text-[#F7A5A5]"
                >
                  Team Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-coaching"
                  className="transition-colors hover:text-[#F7A5A5]"
                >
                  Leadership Akadémia
                </Link>
              </li>
              <li>
                <Link
                  href="/executive-coaching"
                  className="transition-colors hover:text-[#F7A5A5]"
                >
                  Stratégiai Műhely
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
              Iratkozz fel
            </div>
            <p className="mb-4 text-sm text-[#FFF2EF]/65">
              Havi egy mély insight a vezetésről. Spam nélkül.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="te@email.hu"
                data-testid="footer-newsletter-input"
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#FFF2EF] transition-colors placeholder:text-[#FFF2EF]/40 focus:border-[#F7A5A5] focus:outline-none"
              />
              <button
                type="button"
                data-testid="footer-newsletter-submit"
                aria-label="Feliratkozás"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F7A5A5] text-[#1A2A4F] transition-all hover:bg-[#FFDBB6] active:scale-95"
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-[#FFF2EF]/50 md:flex-row md:items-center md:justify-between">
          <div>© 2025 Executive Insights Kft. Minden jog fenntartva.</div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#F7A5A5]">
              Adatvédelem
            </a>
            <a href="#" className="transition-colors hover:text-[#F7A5A5]">
              ÁSZF
            </a>
            <a href="#" className="transition-colors hover:text-[#F7A5A5]">
              Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
