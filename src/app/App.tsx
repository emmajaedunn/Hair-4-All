import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Star, Phone, Mail, MapPin, Clock,
  Instagram, Facebook, Twitter, Youtube,
  ChevronLeft, ChevronRight, Scissors,
  Sparkles, Wind, Crown, Heart, Menu, X, Palette,
} from "lucide-react";

// ─── Brand constants ──────────────────────────────────────────────────────────
const GOLD = "#D4AF37";
const PLUM = "#2D1B2E";
const BLUSH = "#FCEEF5";
const BABY_PINK = "#F8D7E6";
const CREAM = "#FFF9F5";
const MAUVE = "#8B6B7A";

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @keyframes floatSparkle {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.45; }
        50% { transform: translateY(-18px) rotate(180deg); opacity: 1; }
      }
      @keyframes shimmer {
        0% { background-position: -220% center; }
        100% { background-position: 220% center; }
      }
      @keyframes floatSlow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .shimmer-btn {
        background: linear-gradient(90deg, #B8962E 0%, #EDD97E 40%, #D4AF37 55%, #B8962E 100%);
        background-size: 220% auto;
        animation: shimmer 2.8s linear infinite;
      }
      .shimmer-text {
        background: linear-gradient(90deg, ${GOLD} 0%, #F5E080 40%, ${GOLD} 80%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3.5s linear infinite;
      }
      .sparkle { animation: floatSparkle var(--dur, 4s) var(--delay, 0s) ease-in-out infinite; }
      .float-slow { animation: floatSlow 6s ease-in-out infinite; }
      html { scroll-behavior: smooth; }
      body { font-family: "Jost", system-ui, sans-serif; }
      h1, h2, h3 { font-family: "Playfair Display", Georgia, serif; }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: ${CREAM}; }
      ::-webkit-scrollbar-thumb { background: ${GOLD}; border-radius: 3px; }
      .gallery-item .gallery-overlay { opacity: 0; transition: opacity 0.35s ease; }
      .gallery-item:hover .gallery-overlay { opacity: 1; }
      .gallery-item img { transition: transform 0.5s ease; }
      .gallery-item:hover img { transform: scale(1.06); }
      .service-card { transition: all 0.35s ease; }
      .service-card:hover {
        border-color: ${GOLD} !important;
        background: ${BLUSH} !important;
        transform: translateY(-5px);
        box-shadow: 0 20px 50px rgba(212,175,55,0.15);
      }
      .social-icon { transition: all 0.3s ease; }
      .social-icon:hover { color: ${GOLD} !important; transform: scale(1.2); }
    `}</style>
  );
}

// ─── Sparkle SVG ──────────────────────────────────────────────────────────────
function SparkleIcon({ size = 12, opacity = 0.85 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M6 0L7.3 4.7L12 6L7.3 7.3L6 12L4.7 7.3L0 6L4.7 4.7L6 0Z" fill={GOLD} opacity={opacity} />
    </svg>
  );
}

// ─── Divider label ────────────────────────────────────────────────────────────
function SectionLabel({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="h-px w-10" style={{ background: GOLD }} />
      <span
        className="text-xs tracking-[0.3em] uppercase"
        style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
      >
        {label}
      </span>
      <div className="h-px w-10" style={{ background: GOLD }} />
    </div>
  );
}

function SectionHeader({
  label, title, subtitle, light = false,
}: { label: string; title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <SectionLabel label={label} light={light} />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold mb-5 leading-tight"
        style={{ color: light ? "#ffffff" : PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base max-w-xl mx-auto leading-relaxed"
          style={{ color: light ? "rgba(255,255,255,0.7)" : MAUVE, fontFamily: "Jost, sans-serif" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Stylists", href: "#stylists" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,249,245,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 30px rgba(212,175,55,0.1)" : "none",
        padding: scrolled ? "12px 0" : "24px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl font-bold tracking-wide"
          style={{ fontFamily: "Playfair Display, Georgia, serif", color: scrolled ? GOLD : GOLD }}
        >
          Hair<span style={{ color: scrolled ? PLUM : "white" }}>4All</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs tracking-[0.18em] uppercase transition-colors duration-300 hover:opacity-70"
              style={{ color: scrolled ? PLUM : "white", fontFamily: "Jost, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="shimmer-btn text-white text-xs tracking-[0.2em] uppercase px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Book Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 transition-colors"
          style={{ color: scrolled ? PLUM : "white" }}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pt-2 pb-6 flex flex-col gap-4"
          style={{
            background: "rgba(255,249,245,0.98)",
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${BABY_PINK}`,
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-xs tracking-[0.18em] uppercase py-2"
              style={{ color: PLUM, fontFamily: "Jost, sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setOpen(false)}
            className="shimmer-btn text-white text-xs tracking-[0.2em] uppercase px-7 py-3 rounded-full text-center"
            style={{ fontFamily: "Jost, sans-serif" }}
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const sparkles = [
    { top: "14%", left: "7%", size: 14, dur: "5s", delay: "0s" },
    { top: "22%", left: "87%", size: 10, dur: "4s", delay: "1.1s" },
    { top: "58%", left: "4%", size: 8, dur: "6s", delay: "2s" },
    { top: "72%", left: "91%", size: 16, dur: "4.5s", delay: "0.5s" },
    { top: "38%", left: "14%", size: 6, dur: "3.5s", delay: "1.6s" },
    { top: "33%", left: "79%", size: 12, dur: "5.5s", delay: "0.9s" },
    { top: "82%", left: "24%", size: 8, dur: "4s", delay: "2.5s" },
    { top: "18%", left: "58%", size: 10, dur: "6s", delay: "1.3s" },
    { top: "52%", left: "68%", size: 6, dur: "3s", delay: "0.3s" },
    { top: "8%", left: "43%", size: 14, dur: "5s", delay: "1.9s" },
  ];

  return (
    <section id="hero" className="relative h-screen min-h-[680px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop&auto=format"
          alt="Luxury hair salon styling"
          className="w-full h-full object-cover"
          style={{ backgroundColor: BABY_PINK }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(45,27,46,0.82) 0%, rgba(45,27,46,0.6) 55%, rgba(45,27,46,0.42) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 75% 55%, rgba(248,215,230,0.14) 0%, transparent 65%)",
          }}
        />
      </div>

      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle absolute pointer-events-none"
          style={
            { top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties
          }
        >
          <SparkleIcon size={s.size} opacity={0.9} />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{
              background: "rgba(212,175,55,0.18)",
              border: "1px solid rgba(212,175,55,0.5)",
            }}
          >
            <SparkleIcon size={10} />
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
            >
              Premium Hair Salon
            </span>
            <SparkleIcon size={10} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-[1.08] mb-6 text-white"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            Luxury Hair,
            <br />
            <span className="shimmer-text italic">Timeless</span>{" "}
            Beauty
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="text-lg md:text-xl mb-10 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontFamily: "Jost, sans-serif",
              fontWeight: 300,
            }}
          >
            Expert styling, color transformations, and personalized beauty
            <br className="hidden md:block" />
            experiences designed to make you feel confident.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#booking"
              className="shimmer-btn text-white px-9 py-4 rounded-full text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ fontFamily: "Jost, sans-serif" }}
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="px-9 py-4 rounded-full text-xs tracking-[0.22em] uppercase font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.55)",
                color: "white",
                fontFamily: "Jost, sans-serif",
                backdropFilter: "blur(6px)",
              }}
            >
              View Services
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 float-slow">
        <span
          className="text-xs tracking-[0.22em] uppercase"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Jost, sans-serif" }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
        />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const highlights = [
    { icon: Crown, title: "Expert Stylists", desc: "Award-winning artists with international experience in the finest salons." },
    { icon: Sparkles, title: "Premium Products", desc: "Exclusively using luxury hair care brands for extraordinary results." },
    { icon: Heart, title: "Personalized Care", desc: "Bespoke consultations tailored precisely to your hair and lifestyle." },
    { icon: Star, title: "Luxury Experience", desc: "Champagne, heated towels, and every detail crafted for indulgence." },
  ];

  return (
    <section id="about" className="py-28" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&h=600&fit=crop&auto=format"
                alt="Luxury salon interior"
                className="rounded-2xl w-full h-72 object-cover shadow-lg"
                style={{ backgroundColor: BABY_PINK }}
              />
              <div className="flex flex-col gap-4 mt-10">
                <img
                  src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=400&h=280&fit=crop&auto=format"
                  alt="Hair styling session"
                  className="rounded-2xl w-full h-40 object-cover shadow-lg"
                  style={{ backgroundColor: BABY_PINK }}
                />
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: GOLD }}
                >
                  <div
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    12+
                  </div>
                  <div
                    className="text-white text-xs mt-1 tracking-[0.2em] uppercase"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    Years of Excellence
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full"
              style={{ background: BABY_PINK, opacity: 0.5, zIndex: -1 }}
            />
            <div
              className="absolute -top-4 -right-4 w-14 h-14 rounded-full"
              style={{ background: "transparent", border: `2px solid ${GOLD}`, opacity: 0.6 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: GOLD }} />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
              >
                Our Story
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Where Beauty<br />Meets Artistry
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
            >
              At Hair4All Salon, every visit is an escape from the ordinary. Our sanctuary of beauty
              offers world-class hair services within an atmosphere of refined elegance — where your
              transformation becomes our masterpiece, and your confidence our greatest reward.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-2xl"
                  style={{ background: BLUSH }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{ background: BABY_PINK }}
                  >
                    <h.icon size={18} style={{ color: GOLD }} />
                  </div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    {h.title}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                  >
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: Scissors, name: "Haircuts & Styling", desc: "Precision cuts and expert styling tailored to your face shape and lifestyle.", from: "£65" },
    { icon: Sparkles, name: "Balayage & Highlights", desc: "Sun-kissed, hand-painted dimensions that naturally frame your face.", from: "£120" },
    { icon: Palette, name: "Hair Coloring", desc: "Full-spectrum color services from vibrant fashion shades to classic tones.", from: "£95" },
    { icon: Wind, name: "Hair Treatments", desc: "Intensive repair, hydration, and bond-building for visibly healthier hair.", from: "£55" },
    { icon: Heart, name: "Blow Waves", desc: "Flawless, long-lasting blow-outs leaving hair voluminous, silky, and radiant.", from: "£45" },
    { icon: Crown, name: "Bridal Hair Styling", desc: "Bespoke bridal looks — trials and on-the-day styling for your perfect day.", from: "£175" },
  ];

  return (
    <section id="services" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="What We Offer"
          title="Our Services"
          subtitle="Indulge in our full menu of luxury hair services, each crafted with precision and care."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="service-card p-8 rounded-2xl bg-card cursor-default"
              style={{ border: `1.5px solid ${BABY_PINK}` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: BLUSH }}
              >
                <s.icon size={22} style={{ color: GOLD }} />
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {s.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-7"
                style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
              >
                {s.desc}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className="text-xs tracking-[0.15em] uppercase block"
                    style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                  >
                    From
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: GOLD, fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    {s.from}
                  </span>
                </div>
                <a
                  href="#booking"
                  className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{ background: GOLD, color: "white", fontFamily: "Jost, sans-serif" }}
                >
                  Book
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const images = [
    { id: "photo-1522337360788-8b13dee7a37e", label: "Color Transformation" },
    { id: "photo-1487412947147-5cebf100ffc2", label: "Blonde Balayage" },
    { id: "photo-1519415943484-9fa1873496d4", label: "Bridal Updo" },
    { id: "photo-1526045431048-f857369baa9f", label: "Textured Waves" },
    { id: "photo-1595476108010-b4d1f102b1b1", label: "Vivid Color" },
    { id: "photo-1605497788044-5a32c7078486", label: "Sleek Styling" },
  ];

  const heights = ["h-64", "h-52", "h-60", "h-72", "h-48", "h-64"];

  return (
    <section id="gallery" className="py-28" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Our Work"
          title="Hair Transformations"
          subtitle="Every look tells a story. Browse our portfolio of breathtaking hair transformations."
        />
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="gallery-item relative overflow-hidden rounded-2xl break-inside-avoid cursor-pointer"
            >
              <img
                src={`https://images.unsplash.com/${img.id}?w=600&h=500&fit=crop&auto=format`}
                alt={img.label}
                className={`w-full object-cover ${heights[i]}`}
                style={{ backgroundColor: BABY_PINK }}
              />
              <div
                className="gallery-overlay absolute inset-0 flex items-end p-5"
                style={{
                  background: "linear-gradient(to top, rgba(45,27,46,0.88) 0%, transparent 55%)",
                }}
              >
                <span
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stylists ─────────────────────────────────────────────────────────────────
function Stylists() {
  const team = [
    {
      name: "Sophia Laurent",
      role: "Creative Director",
      specialty: "Color Specialist & Balayage Artist",
      img: "photo-1494790108377-be9c29b29330",
    },
    {
      name: "Isabella Rose",
      role: "Senior Stylist",
      specialty: "Bridal & Special Occasion Hair",
      img: "photo-1438761681033-6461ffad8d80",
    },
    {
      name: "Olivia Chen",
      role: "Style Expert",
      specialty: "Precision Cuts & Treatments",
      img: "photo-1544005313-94ddf0286df2",
    },
  ];

  return (
    <section id="stylists" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="The Team"
          title="Meet Our Stylists"
          subtitle="Our passionate team of hair artists is dedicated to bringing your vision to life."
        />
        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-6">
                <div
                  className="w-52 h-52 mx-auto rounded-full overflow-hidden"
                  style={{ border: `3px solid ${BABY_PINK}` }}
                >
                  <img
                    src={`https://images.unsplash.com/${member.img}?w=400&h=400&fit=crop&auto=format`}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: BABY_PINK }}
                  />
                </div>
                <div
                  className="absolute inset-0 rounded-full transition-all duration-400 group-hover:scale-105"
                  style={{ border: `2px solid ${GOLD}`, margin: "6px", opacity: 0.6 }}
                />
              </div>
              <div className="p-6 rounded-2xl" style={{ background: BLUSH }}>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {member.name}
                </h3>
                <div
                  className="text-sm font-medium mb-2 tracking-wide"
                  style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
                >
                  {member.role}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                >
                  {member.specialty}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    {
      name: "Emily Watson",
      location: "Mayfair",
      review: "Absolutely transformed my hair! Sophia created the most beautiful balayage — I receive compliments everywhere I go. The salon feels like a true sanctuary of luxury.",
      rating: 5,
      img: "photo-1487412720507-e7ab37603c6f",
    },
    {
      name: "Charlotte Reed",
      location: "Chelsea",
      review: "Isabella did my bridal hair and I cried happy tears when I saw the result. The attention to detail, the products they use — everything is first class and unforgettable.",
      rating: 5,
      img: "photo-1489424731084-a5d8b219a5bb",
    },
    {
      name: "Amelia Brooks",
      location: "Kensington",
      review: "I have visited salons all over London and Hair4All is in a league of its own. The team truly listens and the results consistently exceed every expectation.",
      rating: 5,
      img: "photo-1508214751196-bcfd4ca60f91",
    },
    {
      name: "Zoe Williams",
      location: "Notting Hill",
      review: "From the champagne welcome to the stunning blow-dry, every detail felt considered. My hair has never felt so healthy or looked so incredibly radiant.",
      rating: 5,
      img: "photo-1544723795-3fb6469f5b39",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % reviews.length), 5000);
    return () => clearInterval(id);
  }, [reviews.length]);

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(150deg, ${PLUM} 0%, #3A2242 100%)` }}
    >
      {[
        { top: "10%", left: "4%", size: 16, dur: "5s", delay: "0s" },
        { top: "78%", left: "92%", size: 12, dur: "4.2s", delay: "1.5s" },
        { top: "45%", left: "96%", size: 8, dur: "6s", delay: "0.6s" },
        { top: "18%", left: "88%", size: 10, dur: "4.8s", delay: "2s" },
      ].map((s, i) => (
        <div
          key={i}
          className="sparkle absolute pointer-events-none"
          style={{ top: s.top, left: s.left, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties}
        >
          <SparkleIcon size={s.size} opacity={0.35} />
        </div>
      ))}

      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          label="Client Love"
          title="What Our Clients Say"
          subtitle="Join thousands of women who trust Hair4All for their most beautiful hair."
          light
        />

        <div
          className="rounded-3xl p-10 md:p-14 text-center"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(212,175,55,0.22)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex justify-center gap-1 mb-7">
            {Array.from({ length: reviews[active].rating }).map((_, i) => (
              <Star key={i} size={20} fill={GOLD} style={{ color: GOLD }} />
            ))}
          </div>
          <p
            className="text-xl md:text-2xl leading-relaxed mb-9 italic"
            style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Playfair Display, Georgia, serif" }}
          >
            &ldquo;{reviews[active].review}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <img
              src={`https://images.unsplash.com/${reviews[active].img}?w=80&h=80&fit=crop&auto=format`}
              alt={reviews[active].name}
              className="w-12 h-12 rounded-full object-cover"
              style={{ backgroundColor: BABY_PINK, border: `2px solid ${GOLD}` }}
            />
            <div className="text-left">
              <div
                className="font-semibold text-white"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                {reviews[active].name}
              </div>
              <div
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
              >
                {reviews[active].location}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setActive((a) => (a - 1 + reviews.length) % reviews.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(212,175,55,0.18)", border: `1px solid ${GOLD}` }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} style={{ color: GOLD }} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: active === i ? "26px" : "8px",
                  height: "8px",
                  background: active === i ? GOLD : "rgba(212,175,55,0.35)",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive((a) => (a + 1) % reviews.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(212,175,55,0.18)", border: `1px solid ${GOLD}` }}
            aria-label="Next"
          >
            <ChevronRight size={18} style={{ color: GOLD }} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Booking ──────────────────────────────────────────────────────────────────
function Booking() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", date: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    "Haircuts & Styling", "Balayage & Highlights", "Hair Coloring",
    "Hair Treatments", "Blow Waves", "Bridal Hair Styling",
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const field: React.CSSProperties = {
    fontFamily: "Jost, sans-serif",
    background: "#ffffff",
    border: `1.5px solid ${BABY_PINK}`,
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    color: PLUM,
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.3s ease",
  };

  return (
    <section id="booking" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="grid md:grid-cols-2 rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 30px 90px rgba(212,175,55,0.14)" }}
        >
          {/* Image panel */}
          <div className="relative min-h-96">
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=900&fit=crop&auto=format"
              alt="Book an appointment at Hair4All Salon"
              className="w-full h-full object-cover"
              style={{ backgroundColor: BABY_PINK }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-10"
              style={{
                background: "linear-gradient(to top, rgba(45,27,46,0.92) 0%, rgba(45,27,46,0.35) 55%, transparent 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10" style={{ background: GOLD }} />
                <span
                  className="text-xs tracking-[0.28em] uppercase"
                  style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
                >
                  Book Online
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                Reserve Your<br />Experience
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Jost, sans-serif" }}
              >
                We respond within 2 hours to confirm your appointment.
              </p>
            </div>
          </div>

          {/* Form panel */}
          <div className="p-10 md:p-14" style={{ background: BLUSH }}>
            {submitted ? (
              <div className="h-full min-h-96 flex flex-col items-center justify-center text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: GOLD }}
                >
                  <Star size={28} fill="white" style={{ color: "white" }} />
                </div>
                <h3
                  className="text-3xl font-bold mb-3"
                  style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  You&apos;re All Set!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                >
                  Thank you, {form.name || "Beautiful"}. We&apos;ll be in touch shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-2xl font-bold mb-8"
                  style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  Book Your Appointment
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs tracking-[0.15em] uppercase mb-2 block"
                        style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                      >
                        Full Name
                      </label>
                      <input
                        name="name" value={form.name} onChange={handleChange}
                        required placeholder="Your name" style={field}
                      />
                    </div>
                    <div>
                      <label
                        className="text-xs tracking-[0.15em] uppercase mb-2 block"
                        style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                      >
                        Phone
                      </label>
                      <input
                        name="phone" value={form.phone} onChange={handleChange}
                        required type="tel" placeholder="+44 ..." style={field}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-xs tracking-[0.15em] uppercase mb-2 block"
                      style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                    >
                      Email Address
                    </label>
                    <input
                      name="email" value={form.email} onChange={handleChange}
                      required type="email" placeholder="you@email.com" style={field}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs tracking-[0.15em] uppercase mb-2 block"
                        style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                      >
                        Service
                      </label>
                      <select
                        name="service" value={form.service} onChange={handleChange}
                        required style={field}
                      >
                        <option value="">Select…</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        className="text-xs tracking-[0.15em] uppercase mb-2 block"
                        style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                      >
                        Preferred Date
                      </label>
                      <input
                        name="date" value={form.date} onChange={handleChange}
                        required type="date" style={field}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="text-xs tracking-[0.15em] uppercase mb-2 block"
                      style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      rows={3} placeholder="Tell us about your hair goals…"
                      style={{ ...field, resize: "none" } as React.CSSProperties}
                    />
                  </div>
                  <button
                    type="submit"
                    className="shimmer-btn text-white py-4 rounded-full text-xs tracking-[0.22em] uppercase font-medium mt-1 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ fontFamily: "Jost, sans-serif" }}
                  >
                    Request Appointment
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Instagram ────────────────────────────────────────────────────────────────
function InstagramGrid() {
  const photos = [
    "photo-1522337360788-8b13dee7a37e",
    "photo-1595476108010-b4d1f102b1b1",
    "photo-1487412947147-5cebf100ffc2",
    "photo-1526045431048-f857369baa9f",
    "photo-1519415943484-9fa1873496d4",
    "photo-1605497788044-5a32c7078486",
  ];

  return (
    <section className="py-28" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Instagram"
          title="Follow Our Journey"
          subtitle="Get inspired daily @hair4allsalon — transformations, behind the scenes, and more."
        />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {photos.map((photo, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="gallery-item relative aspect-square overflow-hidden rounded-xl block"
              aria-label={`Instagram post ${i + 1}`}
            >
              <img
                src={`https://images.unsplash.com/${photo}?w=300&h=300&fit=crop&auto=format`}
                alt={`Salon work ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ backgroundColor: BABY_PINK }}
              />
              <div
                className="gallery-overlay absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(212,175,55,0.55)" }}
              >
                <Instagram size={22} style={{ color: "white" }} />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs tracking-[0.22em] uppercase transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{
              border: `1.5px solid ${GOLD}`,
              color: GOLD,
              fontFamily: "Jost, sans-serif",
              background: "transparent",
            }}
          >
            <Instagram size={15} />
            Follow @hair4allsalon
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const info = [
    { icon: MapPin, title: "Find Us", lines: ["42 Mayfair Lane", "London, W1K 5BT", "United Kingdom"] },
    { icon: Phone, title: "Call Us", lines: ["+44 20 7123 4567", "+44 7890 123 456"] },
    { icon: Mail, title: "Email Us", lines: ["hello@hair4allsalon.com", "bookings@hair4allsalon.com"] },
    { icon: Clock, title: "Opening Hours", lines: ["Mon–Fri: 9:00 – 19:00", "Saturday: 9:00 – 18:00", "Sunday: 10:00 – 16:00"] },
  ];

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Get In Touch"
          title="Visit Our Salon"
          subtitle="We would love to welcome you. Come in for a consultation or reach out anytime."
        />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-2 gap-5">
            {info.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: BLUSH }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                  style={{ background: BABY_PINK }}
                >
                  <item.icon size={18} style={{ color: GOLD }} />
                </div>
                <h4
                  className="font-bold text-sm mb-3"
                  style={{ color: PLUM, fontFamily: "Playfair Display, Georgia, serif" }}
                >
                  {item.title}
                </h4>
                {item.lines.map((line, j) => (
                  <p
                    key={j}
                    className="text-xs leading-6"
                    style={{ color: MAUVE, fontFamily: "Jost, sans-serif" }}
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden"
            style={{ height: "390px", border: `2px solid ${BABY_PINK}` }}
          >
            <iframe
              title="Hair4All Salon Location — Mayfair, London"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.206!2d-0.1467!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrA4JzQ4LjMiVw!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const quickLinks = ["About", "Services", "Gallery", "Stylists", "Booking", "Contact"];
  const serviceLinks = ["Haircuts", "Balayage", "Coloring", "Treatments", "Blow Waves", "Bridal"];

  return (
    <footer style={{ background: PLUM }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div
              className="text-3xl font-bold mb-4"
              style={{ color: GOLD, fontFamily: "Playfair Display, Georgia, serif" }}
            >
              Hair4All
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Jost, sans-serif" }}
            >
              London&apos;s premier destination for luxury hair services. Where beauty meets artistry.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="social-icon w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(212,175,55,0.14)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "rgba(255,255,255,0.55)",
                  }}
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5
              className="text-xs tracking-[0.22em] uppercase mb-5"
              style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
            >
              Navigation
            </h5>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Jost, sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className="text-xs tracking-[0.22em] uppercase mb-5"
              style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
            >
              Services
            </h5>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Jost, sans-serif" }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className="text-xs tracking-[0.22em] uppercase mb-5"
              style={{ color: GOLD, fontFamily: "Jost, sans-serif" }}
            >
              Contact
            </h5>
            <ul className="flex flex-col gap-3.5">
              {[
                { Icon: MapPin, text: "42 Mayfair Lane, London W1K 5BT" },
                { Icon: Phone, text: "+44 20 7123 4567" },
                { Icon: Mail, text: "hello@hair4allsalon.com" },
                { Icon: Clock, text: "Mon–Sat: 9:00 – 19:00" },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon size={13} style={{ color: GOLD, marginTop: "3px", flexShrink: 0 }} />
                  <span
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Jost, sans-serif" }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px mb-8" style={{ background: "rgba(212,175,55,0.18)" }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Jost, sans-serif" }}>
            © 2025 Hair4All Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Jost, sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: CREAM }}>
      <GlobalStyles />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Stylists />
      <Testimonials />
      <Booking />
      <InstagramGrid />
      <Contact />
      <Footer />
    </div>
  );
}
