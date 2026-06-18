const fs = require('fs');
const path = require('path');

const demoDir = path.join(__dirname, 'demo/frontend/src/components');
const targetDir = path.join(__dirname, 'frontend/components');

// 1. Copy all files from demo to target
fs.readdirSync(demoDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    const content = fs.readFileSync(path.join(demoDir, file), 'utf8');
    fs.writeFileSync(path.join(targetDir, file), content, 'utf8');
  }
});
// Also copy ui folder if it exists
if (fs.existsSync(path.join(demoDir, 'ui'))) {
  if (!fs.existsSync(path.join(targetDir, 'ui'))) fs.mkdirSync(path.join(targetDir, 'ui'));
  fs.readdirSync(path.join(demoDir, 'ui')).forEach(file => {
    const content = fs.readFileSync(path.join(demoDir, 'ui', file), 'utf8');
    fs.writeFileSync(path.join(targetDir, 'ui', file), content, 'utf8');
  });
}

// 2. Transform Hero.jsx
let hero = fs.readFileSync(path.join(targetDir, 'Hero.jsx'), 'utf8');
hero = hero.replace('export default function Hero() {', 'export default function Hero({ eyebrow, title, subtitle, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink, stats }) {');
hero = hero.replace('{/* Decorative blurred orbs */}', 'eyebrow = eyebrow || "Vezetői coaching"; title = title || "Vezetői döntések tisztábban"; subtitle = subtitle || "Tapasztalt mentorok..."; primaryCtaText = primaryCtaText || "Foglalj"; primaryCtaLink = primaryCtaLink || "#contact"; secondaryCtaText = secondaryCtaText || "Hogyan"; secondaryCtaLink = secondaryCtaLink || "#methodology";\n      {/* Decorative blurred orbs */}');
hero = hero.replace('Vezetői coaching, ami valódi változást hoz', '{eyebrow}');
hero = hero.replace(/'Vezetői döntések<br\/>.*?bátrabban\.'/, '{__html: title}');
hero = hero.replace(/"Az Executive Insights tapasztalt mentorok.*?üzleti pillanatokban\."/, 'subtitle');
hero = hero.replace(/>Foglalj diagnosztikát</, '>{primaryCtaText}<');
hero = hero.replace(/href="#contact"/, 'href={primaryCtaLink}');
hero = hero.replace(/>Hogyan dolgozunk\?</, '>{secondaryCtaText}<');
hero = hero.replace(/href="#methodology"/, 'href={secondaryCtaLink}');
fs.writeFileSync(path.join(targetDir, 'Hero.jsx'), hero, 'utf8');

// 3. Transform Services.jsx
let services = fs.readFileSync(path.join(targetDir, 'Services.jsx'), 'utf8');
services = services.replace('export default function Services() {', 'export default function Services({ variant, eyebrow, title, subtitle, cards }) {');
services = services.replace('const services = [', 'cards = cards || [\n');
services = services.replace('];', '];'); // keep default cards if none
services = services.replace('01 — Szolgáltatások', '{eyebrow || "01 — Szolgáltatások"}');
services = services.replace(/'Miben tudunk<br\/>.*?támogatni\?'/, '{__html: title || \'Miben tudunk<br/><span class="italic font-medium text-[#1A2A4F]/70">támogatni?</span>\'}');
services = services.replace(/"Hat különböző formátum.*?a csúcson\."/, 'subtitle || "Hat különböző formátum..."');
services = services.replace(/services\.map/g, 'cards.map');
services = services.replace(/service\.description/g, '(service.description || service.desc)');
fs.writeFileSync(path.join(targetDir, 'Services.jsx'), services, 'utf8');

// 4. Transform About.jsx
let about = fs.readFileSync(path.join(targetDir, 'About.jsx'), 'utf8');
about = about.replace('export default function About() {', 'export default function About({ variant, eyebrow, title, description, floatingCardTitle, floatingCardValue, ctaText, ctaLink, bullets }) {');
about = about.replace('02 — Rólunk', '{eyebrow || "02 — Rólunk"}');
about = about.replace(/'12 év, 240\+ vezető,<br\/>.*?küldetés\.'/, '{__html: title || \'12 év, 240+ vezető,<br/><span class="italic font-medium">egyetlen küldetés.</span>\'}');
about = about.replace(/"Nem vagyunk teoretikusok.*?kerestünk korábban\."/, 'description || "Nem vagyunk teoretikusok..."');
about = about.replace('Vezetői NPS 2024', '{floatingCardTitle || "Vezetői NPS 2024"}');
about = about.replace('+78', '{floatingCardValue || "+78"}');
about = about.replace('>A csapat<', '>{ctaText || "A csapat"}<');
about = about.replace('href="/rolunk"', 'href={ctaLink || "/rolunk"}');
about = about.replace(/\[\s*\{\s*text: "Korábbi C-szintű tapasztalat"\s*\},[\s\S]*?\]/m, '(bullets || [{text:"Korábbi C-szintű tapasztalat"}, {text:"Mérhető üzleti eredmények"}, {text:"Abszolút diszkréció és transzparencia"}])');
fs.writeFileSync(path.join(targetDir, 'About.jsx'), about, 'utf8');

// 5. Transform Methodology.jsx
let methodology = fs.readFileSync(path.join(targetDir, 'Methodology.jsx'), 'utf8');
methodology = methodology.replace('export default function Methodology() {', 'export default function Methodology({ variant, eyebrow, title, steps, bottomStripTitle, bottomStripDesc, bottomStripCtaText, bottomStripCtaLink }) {');
methodology = methodology.replace('03 — Módszertan', '{eyebrow || "03 — Módszertan"}');
methodology = methodology.replace(/'A mi <span class="italic font-medium">megközelítésünk\.<\/span>'/, '{__html: title || \'A mi <span class="italic font-medium">megközelítésünk.</span>\'}');
methodology = methodology.replace('const steps = [', 'steps = steps || [\n');
methodology = methodology.replace('Készen állsz egy 30 perces beszélgetésre?', '{bottomStripTitle || "Készen állsz egy 30 perces beszélgetésre?"}');
methodology = methodology.replace('Díjmentes diagnosztikai konzultáció — kötelezettség nélkül.', '{bottomStripDesc || "Díjmentes diagnosztikai konzultáció — kötelezettség nélkül."}');
methodology = methodology.replace('>Időpont foglalása<', '>{bottomStripCtaText || "Időpont foglalása"}<');
methodology = methodology.replace('href="#contact"', 'href={bottomStripCtaLink || "#contact"}');
fs.writeFileSync(path.join(targetDir, 'Methodology.jsx'), methodology, 'utf8');

// 6. Transform Testimonials.jsx
let testimonials = fs.readFileSync(path.join(targetDir, 'Testimonials.jsx'), 'utf8');
testimonials = testimonials.replace('export default function Testimonials() {', 'export default function Testimonials({ variant, eyebrow, title, testimonials, stats }) {');
testimonials = testimonials.replace('const testimonials = [', 'testimonials = testimonials || [\n');
testimonials = testimonials.replace('const stats = [', 'stats = stats || [\n');
testimonials = testimonials.replace('04 — Visszajelzések', '{eyebrow || "04 — Visszajelzések"}');
testimonials = testimonials.replace(/'Amit a partnereink<br\/>.*?rólunk\.<\/span>'/, '{__html: title || \'Amit a partnereink<br/><span class="italic font-medium text-[#FFF2EF]/80">mondanak rólunk.</span>\'}');
fs.writeFileSync(path.join(targetDir, 'Testimonials.jsx'), testimonials, 'utf8');

// 7. Transform Contact.jsx
let contact = fs.readFileSync(path.join(targetDir, 'Contact.jsx'), 'utf8');
contact = contact.replace('export default function Contact() {', 'export default function Contact({ variant, eyebrow, title, description, contactInfo }) {');
contact = contact.replace('const contactInfo = [', 'contactInfo = contactInfo || [\n');
contact = contact.replace('05 — Kapcsolat', '{eyebrow || "05 — Kapcsolat"}');
contact = contact.replace(/'Beszéljünk\.<br\/>.*?Diszkréten\.<\/span>'/, '{__html: title || \'Beszéljünk.<br/><span class="italic font-medium text-[#1A2A4F]/70">Diszkréten.</span>\'}');
contact = contact.replace(/"Egy 30 perces, kötelezettség nélküli konzultáció.*?tovább menni\."/, '{__html: description || "Egy 30 perces..."}');
fs.writeFileSync(path.join(targetDir, 'Contact.jsx'), contact, 'utf8');

console.log("Transformations complete");