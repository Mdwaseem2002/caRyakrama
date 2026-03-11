"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";
import { cars } from "../Card";

interface ViewFullReportProps {
  carId: string | number;
}

export default function ViewFullReport({ carId }: ViewFullReportProps) {
  // Find the car based on ID
  const car = cars.find((c) => c.id.toString() === carId.toString()) || cars[0];

  const reportCategories = [
    { label: "Exterior", status: "Passed" },
    { label: "Engine", status: "Passed" },
    { label: "Electricals", status: "Passed" },
    { label: "Suspension", status: "Passed" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" style={{ background: "var(--background)" }}>
      
      {/* ── SECTION 1: INSPECTION SUMMARY (Image 2) ── */}
      <div className="p-6 md:p-10 rounded-[2rem] shadow-sm border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#10b981]/10">
              <ShieldCheck className="w-8 h-8 text-[#10b981]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--foreground)" }}>
              Inspection Summary
            </h2>
          </div>
          <div className="bg-[#10b981]/10 text-[#10b981] font-bold px-6 py-2 rounded-full text-sm md:text-base border border-[#10b981]/20">
            Score: {car.inspectionScore}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {car.inspectionSummary?.map((point, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-md" 
              style={{ borderColor: "var(--border)", background: "var(--background)" }}
            >
              <div className="p-1 rounded-full border border-[#10b981]/30">
                <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
              </div>
              <span className="font-bold text-base md:text-lg" style={{ color: "var(--foreground)" }}>
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: INSPECTION REPORT (Image 1) ── */}
      <div className="p-6 md:p-10 rounded-[2rem] shadow-sm border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
        
        {/* Left: Featured Card */}
        <div className="lg:col-span-5 relative aspect-square md:aspect-auto md:h-[400px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#166534] via-[#15803d] to-[#14532d] p-8 flex flex-col justify-between group">
          {/* Subtle patterns/glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-white relative z-10 leading-tight">
            Inspection <br /> Report
          </h2>

          <div className="relative z-10 w-full mt-auto">
             {/* Checklist/Report Graphic background */}
             <div className="absolute bottom-10 left-4 w-32 h-40 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 -rotate-6 transform translate-y-4">
                <div className="p-4 space-y-3">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-white/40"></div>
                      <div className="w-16 h-2 bg-white/20 rounded-full"></div>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border-2 border-white/40"></div>
                      <div className="w-12 h-2 bg-white/20 rounded-full"></div>
                   </div>
                </div>
             </div>

             <div className="relative transform hover:scale-105 transition-transform duration-500 rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/About car.png" 
                  alt="Inspection Car" 
                  width={600} 
                  height={300} 
                  className="w-full object-cover"
                />
             </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-7 space-y-8 lg:pl-6">
          {/* Status Tags Grid */}
          <div className="grid grid-cols-2 gap-4">
            {reportCategories.map((cat) => (
              <div 
                key={cat.label} 
                className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default group"
              >
                <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shadow-sm shadow-[#10b981]/20 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm md:text-base" style={{ color: "var(--foreground)" }}>{cat.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: "var(--foreground)" }}>
              Every car goes through three thorough inspections: when we buy it, after refurbishment, and before delivery. 
              This ensures you get a used car in Dubai that looks and drives like new, backed by a free one-year warranty. 
              For full transparency, you can check the final inspection report here.
            </p>

            <button className="flex items-center gap-2 text-[#fe2c55] font-extrabold text-lg group hover:gap-3 transition-all underline-offset-4 hover:underline">
              View full report
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
