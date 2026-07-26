import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Linkedin, MessageCircle, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";

const contactBlocks = [
  { icon: Mail, label: "E-mail", value: "hello@executiveinsights.hu", href: "mailto:hello@executiveinsights.hu" },
  { icon: Phone, label: "Telefon", value: "+36 1 234 5678", href: "tel:+3612345678" },
  { icon: MapPin, label: "Iroda", value: "Budapest, Bajcsy-Zsilinszky út 12." },
  { icon: Clock, label: "Nyitva", value: "H–P, 09:00 – 18:00" },
];

const faqs = [
  {
    q: "Mennyibe kerül egy coaching-program?",
    a: "Programjaink ára egyénre szabott — a fókusz, a vezetői szint és a hossz alapján alakul. Egy 6 hónapos Executive Coaching program nettó 2 500 000 Ft-tól indul. A diagnosztikai beszélgetés díjmentes.",
  },
  {
    q: "Milyen hamar tudunk indulni?",
    a: "Általában 2–4 héten belül indítható egy új program — első körben egy 60 perces diagnosztikai beszélgetésen ülünk le, és csak ha mindkét fél úgy érzi, hogy értelmes az együttműködés, lépünk tovább.",
  },
  {
    q: "Online vagy személyes ülések?",
    a: "Mindkettő. A budapesti irodánkban szívesen fogadunk, de a régiós (cseh, lengyel, román) ügyfelekkel online dolgozunk. A legtöbb program hibrid — egyes ülések személyesek, mások online.",
  },
  {
    q: "Mennyire bizalmas az együttműködés?",
    a: "Maximálisan. NDA-t kötünk minden ügyfelünkkel. A tartalom semmilyen formában nem kerül ki, kivéve, ha az ügyfél maga kéri (pl. fejlesztési riport HR vezetőnek).",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    topic: "executive",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", company: "", role: "", topic: "executive", message: "" });
  };

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main data-testid="contact-page" className="relative">
      <Navbar />
      <PageHero
        breadcrumbs={[
          { label: "Kezdőlap", to: "/" },
          { label: "Kapcsolat" },
        ]}
        eyebrow="Beszéljünk"
        title="Egy beszélgetés sokszor"
        highlight="messzebb visz."
        description="Egy 30 perces, kötelezettség nélküli konzultáció. Megnézzük a kontextust, és eldöntjük együtt, van-e értelme tovább menni."
        testid="contact-hero"
      />

      {/* Contact blocks */}
      <Section variant="cream" testid="contact-info" className="py-20 md:py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactBlocks.map((b, i) => {
            const Icon = b.icon;
            const inner = (
              <>
                <div className="w-11 h-11 rounded-xl bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] mb-4">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="text-xs text-[#1A2A4F]/50 font-semibold tracking-wider uppercase">
                  {b.label}
                </div>
                <div className="text-sm md:text-base font-semibold text-[#1A2A4F] mt-1 break-words">
                  {b.value}
                </div>
              </>
            );
            const cls =
              "block bg-white rounded-3xl p-6 border border-[#1A2A4F]/5 hover:-translate-y-1 transition-all hover:shadow-[0_18px_36px_-12px_rgba(26,42,79,0.12)]";
            return (
              <Reveal key={i} delay={i} data-testid={`contact-info-${i}`}>
                {b.href ? (
                  <a href={b.href} className={cls}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Form + side panel */}
      <Section variant="warm" testid="contact-form-section" className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Side */}
          <Reveal className="lg:col-span-2 flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Vedd fel velünk a kapcsolatot
            </span>
            <h2 className="font-[Outfit] text-3xl md:text-5xl font-bold text-[#1A2A4F] leading-tight tracking-tight">
              Írj nekünk pár sort.
            </h2>
            <p className="text-[#1A2A4F]/70 leading-relaxed">
              Általában 24 órán belül válaszolunk. A kérdéseid bizalmasak —
              ezeket csak a coaching csapat látja.
            </p>

            <div className="mt-3 space-y-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-side-linkedin"
                className="flex items-center gap-3 bg-white/70 backdrop-blur px-5 py-4 rounded-2xl border border-[#1A2A4F]/5 hover:-translate-y-0.5 transition-all"
              >
                <Linkedin size={18} className="text-[#1A2A4F]" />
                <span className="text-sm font-semibold text-[#1A2A4F]">
                  Kövess LinkedIn-en
                </span>
              </a>
              <a
                href="https://wa.me/3612345678"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-side-whatsapp"
                className="flex items-center gap-3 bg-white/70 backdrop-blur px-5 py-4 rounded-2xl border border-[#1A2A4F]/5 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle size={18} className="text-[#1A2A4F]" />
                <span className="text-sm font-semibold text-[#1A2A4F]">
                  WhatsApp / Signal
                </span>
              </a>
              <a
                href="#"
                data-testid="contact-side-calendar"
                className="flex items-center gap-3 bg-[#1A2A4F] text-[#FFF2EF] px-5 py-4 rounded-2xl hover:-translate-y-0.5 transition-all"
              >
                <Calendar size={18} />
                <span className="text-sm font-semibold">
                  Foglalj 30 perces időpontot →
                </span>
              </a>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal
            as="form"
            delay={1}
            onSubmit={handleSubmit}
            data-testid="contact-form"
            className="lg:col-span-3 bg-white rounded-[32px] p-8 md:p-10 border border-[#1A2A4F]/5 shadow-[0_24px_48px_-24px_rgba(26,42,79,0.18)]"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  Név *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  data-testid="contact-input-name"
                  placeholder="Vezetéknév Keresztnév"
                  className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  data-testid="contact-input-email"
                  placeholder="te@cegednev.hu"
                  className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  Cég
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  data-testid="contact-input-company"
                  placeholder="Nordwell Group"
                  className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  Pozíció
                </label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  data-testid="contact-input-role"
                  placeholder="CEO / CFO / COO ..."
                  className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                Téma
              </label>
              <select
                name="topic"
                value={form.topic}
                onChange={handleChange}
                data-testid="contact-input-topic"
                className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] transition-all"
              >
                <option value="executive">Executive Coaching</option>
                <option value="team">Team Coaching</option>
                <option value="academy">Leadership Akadémia</option>
                <option value="workshop">Stratégiai Műhely</option>
                <option value="other">Egyéb / Még nem tudom</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                Miben segíthetünk? *
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={form.message}
                onChange={handleChange}
                data-testid="contact-input-message"
                placeholder="Pár mondatban a helyzetről, kihívásokról..."
                className="w-full bg-[#FFF2EF] px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all resize-none"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-[#1A2A4F]/60 max-w-xs leading-relaxed">
                Adatvédelmi tájékoztatónk elolvasása után értjük, hogy
                feldolgozzuk az üzeneted.
              </p>
              <button
                type="submit"
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-2 bg-[#1A2A4F] text-[#FFF2EF] px-7 py-3.5 rounded-full font-semibold hover:bg-[#1A2A4F]/90 active:scale-95 transition-all shadow-lg"
              >
                {sent ? "Köszönjük! ✓" : "Üzenet küldése"}
                {!sent && <Send size={16} strokeWidth={2.5} />}
              </button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="cream" testid="contact-faq" className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
              Gyakori kérdések
            </span>
            <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-tight tracking-tight">
              Mielőtt írsz, talán hasznos.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal
                  key={i}
                  delay={i}
                  data-testid={`faq-item-${i}`}
                  className="bg-white rounded-2xl border border-[#1A2A4F]/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full text-left flex items-center justify-between gap-4 px-6 py-5 hover:bg-[#FFF2EF] transition-colors"
                  >
                    <span className="font-semibold text-[#1A2A4F]">{f.q}</span>
                    <span
                      className={`w-7 h-7 rounded-full bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-400 ease-out ${
                      open ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-6 pb-6 text-[#1A2A4F]/70 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
