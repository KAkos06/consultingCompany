import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function Contact({ variant = "cream" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <Section
      variant={variant}
      id="contact"
      testid="contact-section"
      className="py-28 md:py-36 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-10 items-stretch">
          {/* Left: text + contact infos */}
          <Reveal className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] text-[#1A2A4F]/50 uppercase">
                05 — Kapcsolat
              </span>
              <h2 className="font-[Outfit] text-4xl md:text-5xl font-bold text-[#1A2A4F] mt-4 leading-[1.08] tracking-tight">
                Beszéljünk.
                <br />
                <span className="italic font-medium text-[#1A2A4F]/70">
                  Diszkréten.
                </span>
              </h2>
              <p className="text-[#1A2A4F]/70 mt-6 leading-relaxed">
                Egy 30 perces, kötelezettség nélküli konzultáció. Megnézzük a
                kontextust, és eldöntjük együtt, van-e értelme tovább menni.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              {[
                { Icon: Mail, label: "E-mail", value: "hello@executiveinsights.hu" },
                { Icon: Phone, label: "Telefon", value: "+36 1 234 5678" },
                { Icon: MapPin, label: "Iroda", value: "Budapest, Bajcsy-Zsilinszky út 12." },
              ].map(({ Icon, label, value }, i) => (
                <div
                  key={i}
                  data-testid={`contact-info-${i}`}
                  className="flex items-center gap-4 bg-white px-5 py-4 rounded-2xl border border-[#1A2A4F]/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFDBB6]/40 flex items-center justify-center text-[#1A2A4F] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[#1A2A4F]/50 font-medium">
                      {label}
                    </div>
                    <div className="text-sm font-semibold text-[#1A2A4F]">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal
            as="form"
            delay={1}
            onSubmit={handleSubmit}
            data-testid="contact-form"
            className="lg:col-span-3 bg-gradient-to-br from-[#FFDBB6]/35 to-[#F7A5A5]/20 rounded-[32px] p-8 md:p-10 border border-[#1A2A4F]/5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  Név
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  data-testid="contact-input-name"
                  placeholder="Vezetéknév Keresztnév"
                  className="w-full bg-white/80 backdrop-blur px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  data-testid="contact-input-email"
                  placeholder="te@cegednev.hu"
                  className="w-full bg-white/80 backdrop-blur px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                Cég / Pozíció
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                data-testid="contact-input-company"
                placeholder="pl. CEO, Nordwell Group"
                className="w-full bg-white/80 backdrop-blur px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all"
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-[#1A2A4F]/70 mb-2 ml-1">
                Miben segíthetünk?
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={form.message}
                onChange={handleChange}
                data-testid="contact-input-message"
                placeholder="Pár mondatban a helyzetről, kihívásokról..."
                className="w-full bg-white/80 backdrop-blur px-5 py-3.5 rounded-xl border border-transparent focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none text-[#1A2A4F] placeholder:text-[#1A2A4F]/40 transition-all resize-none"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xs text-[#1A2A4F]/60 max-w-xs leading-relaxed">
                Üzeneted bizalmas. 24 órán belül válaszolunk.
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
      </div>
    </Section>
  );
}
