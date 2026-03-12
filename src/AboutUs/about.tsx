"use client";

import Image from "next/image";
import { ShieldCheck, Search, Wrench, ThumbsUp, ClipboardList, Coins, Target } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const steps = [
    {
      id: 1,
      title: "Handpicked Selection",
      description: "We source only the finest vehicles, filtering out anything with a compromised history.",
      icon: Search,
      color: "#60a5fa"
    },
    {
      id: 2,
      title: "150-Point Inspection",
      description: "Every car undergoes a rigorous mechanical and electrical check by certified experts.",
      icon: Wrench,
      color: "#f59e0b"
    },
    {
      id: 3,
      title: "Specialist Audit Clearance",
      description: "100% guaranteed legal status with fully verified agency records and clean titles.",
      icon: ShieldCheck,
      color: "#10b981"
    },
    {
      id: 4,
      title: "Exceptional Delivery",
      description: "Your car is detailed, polished, and presented ready for the road with absolute transparency.",
      icon: ThumbsUp,
      color: "#fe2c55"
    }
  ];

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 py-12 md:py-20" style={{ background: "var(--background)" }}>
      
      {/* ── HEADER SECTION ── */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6" style={{ color: "var(--foreground)" }}>
          Our <span style={{ color: "#fe2c55" }}>Vision.</span>
        </h1>
        <p className="text-lg md:text-2xl leading-relaxed max-w-4xl mx-auto font-medium" style={{ color: "var(--foreground)" }}>
          “caRya.krama exists to save your time and restore trust in car buying. Every car is inspected, curated, and presented with transparency — so you can focus on what matters: finding the perfect vehicle.”
        </p>
      </div>

      {/* ── HERO IMAGE ── */}
      <div className="rounded-3xl overflow-hidden shadow-2xl mb-20 relative w-full h-[300px] md:h-[500px]">
        <Image
          src="/About car.png"
          alt="Luxury Car Lifestyle"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8 text-white md:bottom-12 md:left-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">The Standard of Excellence</h2>
          <p className="text-white/90 text-sm md:text-base font-medium max-w-xl">Curating only the most premium, inspected vehicles for our discerning clientele.</p>
        </div>
      </div>

      {/* ── QUALITY STANDARDS SECTION ── */}
      <section 
        className="mb-24 px-4 overflow-hidden" 
        id="quality-standards"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ color: "var(--foreground)" }}>
            Only the Best Cars Make It to <span style={{ color: "#fe2c55" }}>caRya.krama</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            At caRya.krama, we believe buying a car should come with complete confidence and transparency. 
            That’s why not every car makes it onto our platform.
          </p>
        </div>

        <div className="quality-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {[
            {
              title: "Expert Inspection",
              desc: "Every vehicle is thoroughly examined by our certified specialists — our Car-Diologists.",
              icon: Search
            },
            {
              title: "Verified Reports",
              desc: "Only cars that successfully pass the inspection process with a valid report qualify.",
              icon: ClipboardList
            },
            {
              title: "Competitive Pricing",
              desc: "Listed only if pricing is competitive and fair within the current market.",
              icon: Coins
            },
            {
              title: "Curated Listings",
              desc: "Vehicles that meet our quality benchmarks earned a place on our platform.",
              icon: Target
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="quality-card group flex flex-col items-center gap-5 p-8 rounded-[2rem] border border-[var(--border)] hover:border-[#fe2c55] transition-all duration-300 hover:shadow-2xl text-center"
              style={{ background: "var(--card-bg)" }}
            >
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#fe2c55]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_15px_rgba(254,44,85,0.3)]">
                <item.icon className="w-8 h-8 text-[#fe2c55]" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 uppercase tracking-wide" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-[2rem] text-center border bg-[#fe2c55]/5 border-[#fe2c55]/20">
          <p className="font-bold text-lg md:text-xl" style={{ color: "var(--foreground)" }}>
            In short: <span className="text-[#fe2c55]">If a car is listed on caRya.krama, it has been inspected, verified, and valued.</span>
          </p>
        </div>
      </section>

      {/* ── TIMELINE / INFOGRAPHIC SECTION ── */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>How We Select Your Car</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Our uncompromising four-step process ensures you drive away with complete peace of mind.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line for Desktop */}
          <div 
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 rounded-full" 
            style={{ backgroundColor: "var(--border)" }}
          ></div>

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center justify-between group ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Desktop Content */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-[#fe2c55]" style={{ color: "var(--foreground)" }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Node */}
                  <div className="z-10 flex items-center justify-center shrink-0 mb-4 md:mb-0 relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg transition-transform duration-300 group-hover:scale-110" 
                         style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--background)" }}>
                      <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Mobile Content (Hidden on Desktop) */}
                  <div className="md:hidden text-center px-4">
                    <h3 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Desktop Empty Space */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { value: "150+", label: "Points Inspected" },
          { value: "0", label: "Hidden Fees" },
          { value: "100%", label: "Transparency" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl shadow-sm p-8 text-center transition-transform hover:-translate-y-1 duration-300"
            style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <p className="text-4xl md:text-5xl font-black text-[#fe2c55] mb-3">{stat.value}</p>
            <p className="font-semibold text-sm md:text-base tracking-wide uppercase" style={{ color: "var(--foreground)" }}>{stat.label}</p>
          </div>
        ))}
      </div>

    </main>
  );
}
