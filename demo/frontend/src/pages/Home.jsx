import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Methodology from "@/components/Methodology";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// ─────────────────────────────────────────────────────────────
// Section background config
// Available variants: "cream" | "warm" | "dark"
//   - cream: warm off-white base with dotted grid + peach orbs
//   - warm : peach→coral gradient with blurred orbs (light)
//   - dark : deep navy with radial highlights + grain
// Change the values below to swap any section's background.
// ─────────────────────────────────────────────────────────────
const SECTION_VARIANTS = {
  services: "cream",
  about: "warm",
  methodology: "cream",
  testimonials: "dark",
  contact: "warm",
};

export default function Home() {
  return (
    <main data-testid="home-page" className="relative">
      <Navbar />
      <Hero />
      <Services variant={SECTION_VARIANTS.services} />
      <About variant={SECTION_VARIANTS.about} />
      <Methodology variant={SECTION_VARIANTS.methodology} />
      <Testimonials variant={SECTION_VARIANTS.testimonials} />
      <Contact variant={SECTION_VARIANTS.contact} />
      <Footer />
    </main>
  );
}
