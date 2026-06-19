import { ArrowUpRight, Instagram, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { fetchGlobal } from "@/lib/payload";

// Helper to map social platform names to icons
const getSocialIcon = (platform) => {
  switch (platform?.toLowerCase()) {
    case 'linkedin': return Linkedin;
    case 'twitter': return Twitter;
    case 'instagram': return Instagram;
    case 'facebook': return Facebook;
    case 'youtube': return Youtube;
    default: return Linkedin;
  }
}

// Helper for Tailwind Grid Column Spans
const getColSpanClass = (width) => {
  const map = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  };
  return map[width] || 'md:col-span-5';
};

export default async function Footer() {
  const footerData = await fetchGlobal('footer');
  const siteSettings = await fetchGlobal('site-settings');

  const siteName = siteSettings?.siteName || "Executive Insights";
  
  // Default blocks in case CMS is empty or not seeded
  const blocks = footerData?.columns || [];
  const bottomBar = footerData?.bottomBar || { copyright: '', legalLinks: [] };

  return (
    <footer
      data-testid="footer"
      className="mt-12 bg-[#1A2A4F] px-6 pb-10 pt-20 text-[#FFF2EF]"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-white/10 pb-16 md:grid-cols-12">
          
          {blocks.map((block, index) => {
            const colClass = getColSpanClass(block.width);

            if (block.blockType === 'textBlock') {
              return (
                <div key={index} className={colClass}>
                  {block.showLogo && (
                    <div className="mb-5 flex items-center gap-3">
                      <Logo size={48} variant="dark" />
                      <span className="font-[Outfit] text-xl font-bold">
                        {siteName}
                      </span>
                    </div>
                  )}
                  {block.content && (
                    <p className="max-w-sm leading-relaxed text-[#FFF2EF]/65">
                      {block.content}
                    </p>
                  )}

                  {block.socialLinks && block.socialLinks.length > 0 && (
                    <div className="mt-7 flex gap-3">
                      {block.socialLinks.map((social, i) => {
                        const Icon = getSocialIcon(social.platform);
                        return (
                          <a
                            key={i}
                            href={social.url || '#'}
                            data-testid={`footer-social-${i}`}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all hover:border-[#F7A5A5] hover:bg-[#F7A5A5] hover:text-[#1A2A4F]"
                          >
                            <Icon size={16} />
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              );
            }

            if (block.blockType === 'linkBlock') {
              return (
                <div key={index} className={colClass}>
                  {block.title && (
                    <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
                      {block.title}
                    </div>
                  )}
                  <ul className="space-y-3 text-sm text-[#FFF2EF]/75">
                    {block.links?.map((linkItem, i) => {
                      // CMS relation handling: if linkItem.page is an object with slug, use it. Otherwise fallback to #
                      const href = linkItem.page?.slug ? `/${linkItem.page.slug}` : '#';
                      return (
                        <li key={i}>
                          <Link href={href} className="transition-colors hover:text-[#F7A5A5]">
                            {linkItem.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }

            if (block.blockType === 'newsletterBlock') {
              return (
                <div key={index} className={colClass}>
                  {block.title && (
                    <div className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FFDBB6]">
                      {block.title}
                    </div>
                  )}
                  {block.description && (
                    <p className="mb-4 text-sm text-[#FFF2EF]/65">
                      {block.description}
                    </p>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder={block.placeholderText || "te@email.hu"}
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
              );
            }

            return null;
          })}

        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-[#FFF2EF]/50 md:flex-row md:items-center md:justify-between">
          <div>{bottomBar.copyright || "© 2025 Executive Insights Kft. Minden jog fenntartva."}</div>
          <div className="flex gap-6">
            {bottomBar.legalLinks?.map((linkItem, i) => {
              const href = linkItem.page?.slug ? `/${linkItem.page.slug}` : '#';
              return (
                <Link key={i} href={href} className="transition-colors hover:text-[#F7A5A5]">
                  {linkItem.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
