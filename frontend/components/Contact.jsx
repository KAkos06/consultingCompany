"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

export default function Contact({
  variant = "cream",
  eyebrow = "05 - Kapcsolat",
}) {
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
      className="px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-5">
          <Reveal className="flex flex-col justify-between lg:col-span-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A2A4F]/50">
                {eyebrow}
              </span>
              <h2 className="mt-4 font-[Outfit] text-4xl font-bold leading-[1.08] tracking-tight text-[#1A2A4F] md:text-5xl">
                Beszéljünk.
                <br />
                <span className="font-medium italic text-[#1A2A4F]/70">
                  Diszkréten.
                </span>
              </h2>
              <p className="mt-6 leading-relaxed text-[#1A2A4F]/70">
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
                  className="flex items-center gap-4 rounded-2xl border border-[#1A2A4F]/5 bg-white px-5 py-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFDBB6]/40 text-[#1A2A4F]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#1A2A4F]/50">
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

          <Reveal
            delay={1}
            className="rounded-[32px] border border-[#1A2A4F]/5 bg-gradient-to-br from-[#FFDBB6]/35 to-[#F7A5A5]/20 p-8 md:p-10 lg:col-span-3"
          >
          <form onSubmit={handleSubmit} data-testid="contact-form">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 ml-1 block text-xs font-semibold text-[#1A2A4F]/70">
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
                  className="w-full rounded-xl border border-transparent bg-white/80 px-5 py-3.5 text-[#1A2A4F] transition-all placeholder:text-[#1A2A4F]/40 focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 ml-1 block text-xs font-semibold text-[#1A2A4F]/70">
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
                  className="w-full rounded-xl border border-transparent bg-white/80 px-5 py-3.5 text-[#1A2A4F] transition-all placeholder:text-[#1A2A4F]/40 focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 ml-1 block text-xs font-semibold text-[#1A2A4F]/70">
                Cég / Pozíció
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                data-testid="contact-input-company"
                placeholder="pl. CEO, Nordwell Group"
                className="w-full rounded-xl border border-transparent bg-white/80 px-5 py-3.5 text-[#1A2A4F] transition-all placeholder:text-[#1A2A4F]/40 focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 ml-1 block text-xs font-semibold text-[#1A2A4F]/70">
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
                className="w-full resize-none rounded-xl border border-transparent bg-white/80 px-5 py-3.5 text-[#1A2A4F] transition-all placeholder:text-[#1A2A4F]/40 focus:border-[#1A2A4F]/30 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-xs leading-relaxed text-[#1A2A4F]/60">
                Üzeneted bizalmas. 24 órán belül válaszolunk.
              </p>
              <button
                type="submit"
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A2A4F] px-7 py-3.5 font-semibold text-[#FFF2EF] shadow-lg transition-all hover:bg-[#1A2A4F]/90 active:scale-95"
              >
                {sent ? "Köszönjük! ✓" : "Üzenet küldése"}
                {!sent && <Send size={16} strokeWidth={2.5} />}
              </button>
            </div>
          </form>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
