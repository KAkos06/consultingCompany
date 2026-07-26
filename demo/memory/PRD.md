# Executive Insights — Vezetői Coaching Landing

## Original Problem Statement
Hungarian landing page for "Executive Insights" executive coaching firm.
- Color palette (mandatory): https://colorhunt.co/palette/1a2a4ff7a5a5ffdbb6fff2ef
- Floating rounded top menu: logo+name left, menu+contact CTA right
- Mega menus on hover/focus
- Center-expanding underline on hover (not full width)
- Hero with background wrapping the floating menu
- Multiple section wrappers, footer
- Hungarian only, no backend, design only
- Tech: React (CRA, platform default)

## Architecture
- Frontend only (React 19 + Tailwind + lucide-react icons)
- No backend changes required
- Components under `/app/frontend/src/components/`
- Single page route `/` → `Home.jsx`

## What's been implemented (2025-12-18)
- Navbar (floating pill, logo+name left, menu+CTA right, center-expanding underline, mega menus with icon boxes on Szolgáltatások / Rólunk, mobile drawer)
- Hero (deep navy bg wrapping navbar, animated headline, eyebrow chip, two CTAs, stats row, logo marquee)
- Services (6 cards with icons, hover lift, tag chips)
- About (split image+text with floating stat card and decorative peach orb)
- Methodology (4-step bento alternating navy/white + gradient CTA strip)
- Testimonials (#1A2A4F section with glassmorphic quote cards + stats)
- Contact (split: info cards + form on peach/coral gradient bg)
- Footer (4-col with newsletter, social, legal links, rounded top corners)
- Global styles: Outfit (display) + Manrope (body) fonts, custom CSS for center-expanding underline, mega menu transitions, grain texture, marquee, fade-up animations

## Core requirements satisfied
- ✓ Floating rounded navbar
- ✓ Center-expanding underline (50% width, peach color)
- ✓ Mega menus on hover and focus-within
- ✓ Hero bg wraps around navbar (navbar floats inside hero)
- ✓ 6 sections (Hero, Services, About, Methodology, Testimonials, Contact)
- ✓ Footer with rounded top corners
- ✓ Exact color palette respected
- ✓ 100% Hungarian content
- ✓ data-testid attributes on interactive elements

## Backlog / Next
- P1: Conversion enhancement — add an inline lead-magnet (e.g. "Letöltheted: Vezetői önreflexiós kérdőív PDF") to grow email list
- P2: Animate-on-scroll for sections (use Framer Motion already in deps)
- P2: Team subpage with portraits
- P2: Blog/Insights cikkek szekció
- P2: Backend wiring of contact form to MongoDB + email notification
