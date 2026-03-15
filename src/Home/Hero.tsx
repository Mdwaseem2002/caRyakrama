"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Heart,
  Bell,
  Phone,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
  CheckCircle2,
  ScanSearch,
  Trophy,
  ClipboardList,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tickerItems = [
  { icon: CheckCircle2,  label: "Verified Cars Only"           },
  { icon: ScanSearch,    label: "Inspected for Your Confidence" },
  { icon: Trophy,        label: "Handpicked for Enthusiasts"   },
  { icon: ClipboardList, label: "Full Transparency"            },
];

const trustBadges = [
  { icon: BadgeCheck,  label: "Verified Listings"   },
  { icon: Sparkles,    label: "Handpicked Selection" },
];

const secondaryCTAs = [
  { icon: User,          label: "Login / Sign-Up", href: "#"                          },
  { icon: Heart,         label: "Wishlist",         href: "/wishlist"                 },
  { icon: Bell,          label: "Notifications",    href: "#"                          },
  { icon: Phone,         label: "Call Us",          href: "tel:+919876543210"         },
  { icon: MessageCircle, label: "WhatsApp",          href: "https://wa.me/919876543210" },
];

export default function Hero() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const group1Ref     = useRef<HTMLDivElement>(null);  // badge + headline
  const group2Ref     = useRef<HTMLDivElement>(null); // subheadline + badge
  const group3Ref     = useRef<HTMLDivElement>(null);  // badges + CTAs

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Stage 1 – badge + headline
    tl.from(group1Ref.current, { y: 50, opacity: 0, duration: 0.9 })
    // Stage 2 – subheadline (starts after stage 1 finishes)
      .from(group2Ref.current, { y: 30, opacity: 0, duration: 0.8 }, "+= 0.1")
    // Stage 3 – trust badges + CTAs
      .from(group3Ref.current, { y: 30, opacity: 0, duration: 0.8 }, "+= 0.1");
  }, { scope: containerRef });

  return (
    <>
      {/* ── HERO WRAPPER ── */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden flex flex-col text-white"
        style={{ minHeight: "100svh" }}
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          playsInline
          onEnded={(e) => {
            // freeze on last frame – do not loop
            const vid = e.currentTarget;
            vid.pause();
          }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            transform: "translateZ(0)",        // force GPU compositing layer
            willChange: "transform",            // hint browser to keep on GPU
            imageRendering: "crisp-edges",      // disable subpixel blurring
            backfaceVisibility: "hidden",       // prevent aliasing artefacts
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <source src="/HOME.mp4" type="video/mp4" />
        </video>

        {/* Dark Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0.88) 100%)",
            zIndex: 1,
          }}
        />

        {/* ── TOP POINTERS BAR ── */}
        <div
          className="relative w-full py-2 sm:py-3"
          style={{ background: "rgba(254,44,85,0.97)", zIndex: 10 }}
        >
          <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-10 px-4 max-w-7xl mx-auto">
            {tickerItems.map(({ icon: Icon, label }, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-white shrink-0">
                <Icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT (vertically centered in remaining space) ── */}
        <div
          className="relative flex flex-col items-center justify-start flex-1 w-full px-4 pt-32 lg:pt-40 pb-10 text-center"
          style={{ zIndex: 10 }}
        >
          <div className="flex flex-col items-center gap-5 max-w-5xl w-full">

            {/* ── GROUP 1: Headline ── */}
            <div ref={group1Ref} className="flex flex-col items-center gap-5">
              {/* Powered By Badge */}
              <a
                href="https://www.instagram.com/car.diologist/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/15 text-[10px] font-black tracking-[0.2em] uppercase text-white mb-2 shadow-2xl transition-all hover:scale-105 hover:bg-white/5 active:scale-95"
                style={{ 
                  background: "rgba(0,0,0,0.45)", 
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)"
                }}
              >
                <ShieldCheck className="w-4 h-4 text-[#3b82f6]" strokeWidth={2.5} />
                <span style={{ 
                  background: "linear-gradient(90deg, #E2E8F0 0%, #FFFFFF 50%, #E2E8F0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "0.25em"
                }}>
                  Powered by car.diologist
                </span>
              </a>

              {/* Headline */}
              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] sm:leading-[1.12] tracking-tight text-white drop-shadow-2xl px-2">
                Every Car You See is{" "}
                <span style={{ color: "#fe2c55" }}>Handpicked,</span>
                <br className="hidden md:block" />
                {" "}Inspected, and{" "}
                <span style={{ color: "#fe2c55" }}>Verified.</span>
              </h1>
            </div>

            {/* ── GROUP 2: Subheadline + USP Badge ── */}
            <div ref={group2Ref} className="flex flex-col items-center gap-5">
              <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed text-white font-medium drop-shadow-lg">
                Say good bye to uncertainty in used car market, caRya.krama brings you the best cars you can trust
              </p>

              <div
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/20 text-[11px] sm:text-sm font-black tracking-[0.1em] sm:tracking-[0.15em] uppercase text-white shadow-xl"
                style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
              >
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#fe2c55] animate-pulse shrink-0" />
                The Best Car or Nothing.
              </div>
            </div>

            {/* ── GROUP 3: Primary CTA + Trust Badges ── */}
            <div ref={group3Ref} className="flex flex-col items-center gap-7 w-full mt-8 lg:mt-12">
              {/* Primary CTA */}
              <Link
                href="#used-cars"
                className="hero-cta-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold transition-all group hover:-translate-y-1"
                style={{
                  background: "#fe2c55",
                  color: "white",
                  boxShadow: "0 0 24px rgba(254,44,85,0.55)",
                }}
              >
                Explore Used Cars
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-10 lg:mt-14 w-full max-w-4xl">
                {trustBadges.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="trust-badge flex justify-center items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 text-xs sm:text-sm font-semibold text-white w-auto sm:w-[220px]"
                    style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)" }}
                  >
                    <Icon className="w-4 h-4 text-[#fe2c55] shrink-0" />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative flex flex-col items-center pb-5 gap-1.5 opacity-50" style={{ zIndex: 10 }}>
          <span className="text-[10px] uppercase tracking-widest text-white font-bold">Scroll</span>
          <div className="w-px h-7 overflow-hidden rounded-full bg-white/30">
            <div className="w-full h-1/3 bg-white rounded-full" style={{ animation: "scroll-indicator 1.6s ease-in-out infinite" }} />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-indicator {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>

    </>
  );
}
