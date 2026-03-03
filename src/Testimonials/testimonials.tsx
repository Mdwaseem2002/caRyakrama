"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────
type BadgeKey = "Verified Buyer" | "Repeat Customer" | "Referred Customer" | "New Customer";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  photo: string;
  rating: number;
  text: string;
  car: string;
  badge: BadgeKey;
}

interface TestimonialCardProps {
  item: Testimonial;
  compact?: boolean;
}

// ── Data ───────────────────────────────────────────────
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "First-Time Car Buyer",
    location: "Dubai, UAE",
    photo: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "I was terrified of buying a used car — stories of hidden damage and fake paperwork scared me for years. caRya.kRama changed everything. The inspection report was thorough, the team was honest, and I drove away in my dream car without a single worry.",
    car: "2021 BMW 3 Series",
    badge: "Verified Buyer",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Entrepreneur",
    location: "Abu Dhabi, UAE",
    photo: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "What I appreciated most was the transparency. They presented every flaw, every service record, every detail — no sugarcoating. That level of honesty is rare. I've bought three cars through them now and I will never go anywhere else.",
    car: "2022 Range Rover Evoque",
    badge: "Repeat Customer",
  },
  {
    id: 3,
    name: "Khalid Al Mansouri",
    role: "Business Executive",
    location: "Sharjah, UAE",
    photo: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: "The difference between caRya.kRama and other dealers? Respect. They respected my time, my budget, and my intelligence. No pushy sales tactics — just honest guidance. My Audi A6 is exactly as described: pristine condition, fair price.",
    car: "2020 Audi A6",
    badge: "Verified Buyer",
  },
  {
    id: 4,
    name: "Fatima Al Hassan",
    role: "Doctor",
    location: "Dubai, UAE",
    photo: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    text: "As a woman, I often felt intimidated at car dealerships. caRya.kRama's team treated me with full professionalism and gave me complete confidence in my decision. The car was exactly as listed — no surprises, no regrets.",
    car: "2023 Mercedes GLC",
    badge: "Verified Buyer",
  },
  {
    id: 5,
    name: "Rohan Mehta",
    role: "Software Engineer",
    location: "Dubai, UAE",
    photo: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    text: "I did months of research online and kept hitting shady listings. Then a friend recommended caRya.kRama. Within one week I found, inspected, and purchased my perfect car. The process was seamless — like buying from a trusted friend who happens to be a car expert.",
    car: "2021 Toyota Land Cruiser",
    badge: "Referred Customer",
  },
  {
    id: 6,
    name: "Sara Johnson",
    role: "Marketing Director",
    location: "Abu Dhabi, UAE",
    photo: "https://i.pravatar.cc/150?img=39",
    rating: 5,
    text: "I relocated to UAE and had no local knowledge of the car market. caRya.kRama guided me through every step, explained regulations, helped me compare options, and never pressured me. I got a fantastic deal on a beautiful Porsche Cayenne.",
    car: "2020 Porsche Cayenne",
    badge: "New Customer",
  },
];

const badgeColors: Record<BadgeKey, { bg: string; text: string }> = {
  "Verified Buyer":   { bg: "#eef7ee", text: "#2e7d32" },
  "Repeat Customer":  { bg: "#fff3e0", text: "#e65100" },
  "Referred Customer":{ bg: "#e8eaf6", text: "#3949ab" },
  "New Customer":     { bg: "#fce4ec", text: "#c62828" },
};

// ── Sub-components ─────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#fbbf24] text-[#fbbf24]" />
      ))}
    </div>
  );
}

function TestimonialCard({ item, compact = false }: TestimonialCardProps) {
  const badge = badgeColors[item.badge] ?? badgeColors["Verified Buyer"];
  return (
    <div
      className={`rounded-2xl p-4 md:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${compact ? "text-xs" : ""}`}
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      {/* Quote Icon */}
      <div className="mb-2">
        <Quote className="w-5 h-5 md:w-7 md:h-7 opacity-20 rotate-180" style={{ color: "#fe2c55" }} />
      </div>

      {/* Stars */}
      <StarRating count={item.rating} />

      {/* Testimonial text */}
      <p className="leading-relaxed flex-grow mb-3 text-xs md:text-sm" style={{ color: "var(--muted)" }}>
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Car bought */}
      <div
        className="text-[10px] md:text-xs font-bold px-2 py-1 rounded-full inline-block mb-3 w-fit"
        style={{ background: "color-mix(in srgb, #fe2c55 10%, transparent)", color: "#fe2c55" }}
      >
        🚗 {item.car}
      </div>

      {/* Author */}
      <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden shrink-0">
          <Image src={item.photo} alt={item.name} fill className="object-cover" sizes="40px" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-xs md:text-sm truncate" style={{ color: "var(--foreground)" }}>{item.name}</p>
          <p className="text-[10px] md:text-xs truncate" style={{ color: "var(--muted)" }}>{item.role} · {item.location}</p>
        </div>
        <div className="ml-auto shrink-0">
          <span
            className="text-[9px] md:text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ background: badge.bg, color: badge.text }}
          >
            {item.badge}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────
export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

  const featured = testimonials[activeIndex];

  return (
    <section className="min-h-screen max-w-7xl mx-auto px-3 py-8 md:py-24" style={{ background: "var(--background)" }}>

      {/* ── HEADER ── */}
      <div className="text-center mb-8 md:mb-16">
        <span
          className="inline-block text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3"
          style={{ background: "color-mix(in srgb, #fe2c55 10%, transparent)", color: "#fe2c55" }}
        >
          Customer Stories
        </span>
        <h1 className="text-2xl md:text-6xl font-extrabold mb-3 leading-tight" style={{ color: "var(--foreground)" }}>
          Trusted by Buyers Who{" "}
          <span style={{ color: "#fe2c55" }}>Refuse Compromise.</span>
        </h1>
        <p className="text-sm md:text-xl max-w-2xl mx-auto px-2" style={{ color: "var(--muted)" }}>
          Real stories from real buyers who found confidence, ease, and their perfect car through caRya.kRama.
        </p>
      </div>

      {/* ── FEATURED CAROUSEL ── */}
      <div className="mb-8 md:mb-20 flex items-center gap-2">

        {/* ← Prev arrow */}
        <button
          onClick={prev}
          className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Card */}
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={featured.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="rounded-2xl md:rounded-[2rem] p-4 md:p-12 grid md:grid-cols-2 gap-4 md:gap-10 items-center"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              {/* Left: text */}
              <div>
                <StarRating count={featured.rating} />
                <blockquote
                  className="text-sm md:text-2xl font-semibold leading-relaxed mb-3 md:mb-6"
                  style={{ color: "var(--foreground)" }}
                >
                  &ldquo;{featured.text}&rdquo;
                </blockquote>
                <div
                  className="text-[11px] md:text-sm font-bold px-3 py-1 md:px-4 md:py-2 rounded-full inline-flex items-center gap-1 mb-3 md:mb-6"
                  style={{ background: "color-mix(in srgb, #fe2c55 10%, transparent)", color: "#fe2c55" }}
                >
                  🚗 {featured.car}
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-[#fe2c55]/30 shrink-0">
                    <Image src={featured.photo} alt={featured.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="font-extrabold text-sm md:text-lg" style={{ color: "var(--foreground)" }}>{featured.name}</p>
                    <p className="text-[11px] md:text-sm" style={{ color: "var(--muted)" }}>{featured.role} · {featured.location}</p>
                  </div>
                </div>
              </div>

              {/* Right: dot indicators */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <Quote className="w-32 h-32 opacity-[0.06] rotate-180 mb-6" style={{ color: "#fe2c55" }} />
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIndex ? "2rem" : "0.5rem",
                        height: "0.5rem",
                        background: i === activeIndex ? "#fe2c55" : "var(--border)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile dot indicators */}
          <div className="mt-3 flex justify-center gap-2 md:hidden">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "1.25rem" : "0.4rem",
                  height: "0.4rem",
                  background: i === activeIndex ? "#fe2c55" : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>

        {/* → Next arrow */}
        <button
          onClick={next}
          className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--foreground)" }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>

      {/* ── MASONRY GRID ── */}
      <div className="mt-6 md:mt-16">
        <h2 className="text-lg md:text-3xl font-extrabold mb-4 md:mb-8 text-center" style={{ color: "var(--foreground)" }}>
          More Stories from Our Community
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-6">
          {testimonials.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-3 md:mb-6">
              <TestimonialCard item={item} compact />
            </div>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div
        className="mt-6 md:mt-20 rounded-2xl md:rounded-3xl p-4 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center"
        style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
      >
        {[
          { value: "500+", label: "Happy Buyers" },
          { value: "4.9★", label: "Average Rating" },
          { value: "100%", label: "Inspected Cars" },
          { value: "3 min", label: "Avg. Response Time" },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-xl md:text-4xl font-black mb-0.5" style={{ color: "#fe2c55" }}>{stat.value}</p>
            <p className="text-[11px] md:text-sm font-semibold" style={{ color: "var(--muted)" }}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
