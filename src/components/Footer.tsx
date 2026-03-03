"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ChevronRight,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

/* ── data ── */
const quickLinks = [
  { label: "About", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const contactInfo = [
  { Icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  { Icon: MessageCircle, text: "WhatsApp Us", href: "https://wa.me/919876543210" },
  { Icon: Mail, text: "hello@caryakrama.in", href: "mailto:hello@caryakrama.in" },
];

const socials = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Twitter, href: "#", label: "Twitter / X" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

/* ── component ── */
export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* ── GSAP animations ── */
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Logo fade-in from left
        gsap.fromTo(
          logoRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
            },
          }
        );

        // Columns stagger from bottom
        colRefs.current.forEach((col, i) => {
          if (!col) return;
          gsap.fromTo(
            col,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 88%",
              },
            }
          );
        });

        // Bottom bar slide up
        gsap.fromTo(
          bottomRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomRef.current,
              start: "top 98%",
            },
          }
        );
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  /* ── colours ── */
  const accent = "#fe2c55";
  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const surface = isDark ? "#141414" : "#f8f9fb";
  const border = isDark ? "#2a2a2a" : "#e5e7eb";
  const muted = isDark ? "#9ca3af" : "#6b7280";
  const textTitle = isDark ? "#f5f5f5" : "#111827";

  return (
    <footer
      ref={footerRef}
      style={{ backgroundColor: bg, color: textTitle, borderTop: `1px solid ${border}` }}
      className="relative overflow-hidden transition-colors duration-300"
    >
      {/* ── decorative background glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accent}0d 0%, transparent 60%)`,
          filter: "blur(40px)",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* COL 1 — Brand (Spans 5 cols on lg) */}
          <div ref={logoRef} className="md:col-span-12 lg:col-span-5">
            <div className="mb-6">
              <Image
                src="/carYakrama.png"
                alt="caRyakrama Logo"
                width={320}
                height={110}
                className="object-contain h-24 w-auto drop-shadow-sm"
                style={{ filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.3s' }}
              />
            </div>

            <p style={{ color: muted }} className="text-base md:text-lg font-medium leading-relaxed mb-8 max-w-[280px]">
              Handpicked. Inspected. Exceptional. <br/>
              <span className="font-bold uppercase tracking-wider text-xs block mt-2" style={{ color: textTitle }}>The Best — or Nothing.</span>
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="social-icon group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: surface,
                    border: `1px solid ${border}`,
                    color: textTitle,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = accent;
                    el.style.borderColor = accent;
                    el.style.transform = "translateY(-4px)";
                    el.style.color = "#ffffff";
                    el.style.boxShadow = `0 10px 25px ${accent}40`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = surface;
                    el.style.borderColor = border;
                    el.style.transform = "translateY(0)";
                    el.style.color = textTitle;
                    el.style.boxShadow = "none";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* COL 2 — Quick Links (Spans 3 cols on lg) */}
          <div ref={(el) => { colRefs.current[0] = el; }} className="md:col-span-6 lg:col-span-3">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: textTitle }}>
              <span className="inline-block w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }} />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[15px] font-medium transition-all duration-200"
                    style={{ color: muted }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = muted;
                    }}
                  >
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" style={{ color: accent }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Contact (Spans 3 cols on lg) */}
          <div ref={(el) => { colRefs.current[1] = el; }} className="md:col-span-6 lg:col-span-3">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2" style={{ color: textTitle }}>
              <span className="inline-block w-1.5 h-5 rounded-full" style={{ backgroundColor: accent }} />
              Contact Us
            </h3>

            <ul className="space-y-4">
              {contactInfo.map(({ Icon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300"
                    style={{ backgroundColor: surface, border: `1px solid ${border}` }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = accent;
                      // Find the icon container and text to change colors
                      const iconContainer = el.querySelector(".icon-container") as HTMLElement;
                      if(iconContainer) iconContainer.style.backgroundColor = accent;
                      const iconEl = el.querySelector(".contact-icon") as HTMLElement;
                      if(iconEl) iconEl.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.borderColor = border;
                      const iconContainer = el.querySelector(".icon-container") as HTMLElement;
                      if(iconContainer) iconContainer.style.backgroundColor = `color-mix(in srgb, ${accent} 15%, transparent)`;
                      const iconEl = el.querySelector(".contact-icon") as HTMLElement;
                      if(iconEl) iconEl.style.color = accent;
                    }}
                  >
                    <span
                      className="icon-container flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)` }}
                    >
                      <Icon className="contact-icon w-4 h-4 transition-colors duration-300" style={{ color: accent }} />
                    </span>
                    <span className="text-[14px] font-semibold leading-snug transition-colors duration-300" style={{ color: textTitle }}>
                      {text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{ borderTop: `1px solid ${border}` }} />

      {/* ── BOTTOM BAR ── */}
      <div ref={bottomRef} className="max-w-7xl mx-auto px-6 py-6 border-t" style={{ borderColor: border }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm font-medium" style={{ color: muted }}>
            © {new Date().getFullYear()} <span className="font-bold" style={{ color: textTitle }}>caRya.kRama</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-6 justify-center">
            <span className="text-sm font-medium flex items-center gap-1.5" style={{ color: muted }}>
              Curated with <Heart className="w-4 h-4 fill-[#fe2c55] text-[#fe2c55]" /> for car enthusiasts.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
