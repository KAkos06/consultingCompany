import { Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-[#1A2A4F] text-[#FFF2EF] pt-20 pb-10 px-6 mt-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <Logo size={48} variant="dark" />
              <span className="font-[Outfit] font-bold text-xl">
                Executive Insights
              </span>
            </div>
            <p className="text-[#FFF2EF]/65 leading-relaxed max-w-sm">
              Vezetői coaching és stratégiai mentorálás C-szintű vezetőknek és
              vezetői csapatoknak — Budapesten és online.
            </p>

            <div className="flex gap-3 mt-7">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`footer-social-${i}`}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#F7A5A5] hover:border-[#F7A5A5] hover:text-[#1A2A4F] transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6] mb-5">
              Cég
            </div>
            <ul className="space-y-3 text-sm text-[#FFF2EF]/75">
              <li><Link to="/rolunk" className="hover:text-[#F7A5A5] transition-colors">Rólunk</Link></li>
              <li><Link to="/executive-coaching" className="hover:text-[#F7A5A5] transition-colors">Módszertan</Link></li>
              <li><Link to="/rolunk" className="hover:text-[#F7A5A5] transition-colors">Esettanulmányok</Link></li>
              <li><a href="#" className="hover:text-[#F7A5A5] transition-colors">Karrier</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6] mb-5">
              Szolgáltatások
            </div>
            <ul className="space-y-3 text-sm text-[#FFF2EF]/75">
              <li><Link to="/executive-coaching" className="hover:text-[#F7A5A5] transition-colors">Executive Coaching</Link></li>
              <li><Link to="/executive-coaching" className="hover:text-[#F7A5A5] transition-colors">Team Coaching</Link></li>
              <li><Link to="/executive-coaching" className="hover:text-[#F7A5A5] transition-colors">Leadership Akadémia</Link></li>
              <li><Link to="/executive-coaching" className="hover:text-[#F7A5A5] transition-colors">Stratégiai Műhely</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6] mb-5">
              Iratkozz fel
            </div>
            <p className="text-sm text-[#FFF2EF]/65 mb-4">
              Havi egy mély insight a vezetésről. Spam nélkül.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="te@email.hu"
                data-testid="footer-newsletter-input"
                className="flex-1 bg-white/5 border border-white/15 px-4 py-3 rounded-full text-sm text-[#FFF2EF] placeholder:text-[#FFF2EF]/40 focus:border-[#F7A5A5] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                data-testid="footer-newsletter-submit"
                aria-label="Feliratkozás"
                className="w-12 h-12 shrink-0 rounded-full bg-[#F7A5A5] text-[#1A2A4F] flex items-center justify-center hover:bg-[#FFDBB6] active:scale-95 transition-all"
              >
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 text-xs text-[#FFF2EF]/50">
          <div>© 2025 Executive Insights Kft. Minden jog fenntartva.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F7A5A5] transition-colors">Adatvédelem</a>
            <a href="#" className="hover:text-[#F7A5A5] transition-colors">ÁSZF</a>
            <a href="#" className="hover:text-[#F7A5A5] transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
