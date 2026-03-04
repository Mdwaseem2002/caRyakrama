"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, Phone, CreditCard, ShieldCheck, CheckCircle2, Calendar, Gauge, Award, Wrench, Car } from "lucide-react";
import { cars } from "../Card";
import { useWishlist } from "@/context/WishlistContext";

export default function CarDetails({ id }: { id: string }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find the car based on string ID from params
  const car = cars.find((c) => c.id.toString() === id) || cars[0];
  const isSaved = isInWishlist(car.id);

  const carImages = [
    car.image,
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    "/car banner.png",
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % carImages.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + carImages.length) % carImages.length);

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12" style={{ background: "var(--background)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ── LEFT: GALLERY & SPECS ── */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8 order-last lg:order-first">
          
          {/* Gallery Carousel */}
          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl md:rounded-[2rem] overflow-hidden group shadow-lg">
            <Image 
              src={carImages[currentImage]} 
              alt={car.name} 
              fill 
              className="object-cover transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            {/* Carousel Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={prevImage}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-[#fe2c55] transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-[#fe2c55] transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {carImages.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? 'w-6 bg-[#fe2c55]' : 'w-2 bg-white/50'}`} 
                />
              ))}
            </div>
          </div>

          {/* ── CAR OVERVIEW ── */}
          <div className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-sm" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Car Overview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
              {[
                { icon: Calendar,  iconBg: "#22c55e", label: "Year",             value: car.year },
                { icon: Gauge,     iconBg: "#22c55e", label: "Mileage",          value: car.odometer },
                { icon: Award,     iconBg: "#22c55e", label: "Warranty",         value: "Until 27-APR-2026 or Unlimited Kms" },
                { icon: ShieldCheck, iconBg: "#06b6d4", label: "Service Contract", value: "Paid add-on" },
                { icon: Wrench, iconBg: "#06b6d4", label: "Spec",      value: "GCC SPECS" },
                { icon: Car,   iconBg: "#06b6d4", label: "Cylinders",  value: "4" },
              ].map(({ icon: Icon, iconBg, label, value }) => (
                <div key={label} className="group flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default" style={{ background: "var(--background)", border: "1px solid var(--border)" }}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 shadow-sm transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: iconBg }}>
                    <Icon className="w-4 h-4 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold mb-0.5 sm:mb-1" style={{ color: "var(--foreground)" }}>{label}</p>
                  <p className="text-[10px] sm:text-[11px] leading-snug" style={{ color: "var(--muted)" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details & Inspection Section */}
          <div className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-sm" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-8 h-8 text-[#10b981]" />
                 <h2 className="text-xl md:text-2xl font-bold" style={{ color: "var(--foreground)"}}>Inspection Summary</h2>
               </div>
               <span className="md:ml-auto w-fit bg-[#10b981]/10 text-[#10b981] font-bold px-4 py-1.5 rounded-full text-xs md:text-sm border border-[#10b981]/20">
                 Score: {car.inspectionScore}
               </span>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.inspectionSummary?.map((point, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--background)" }}>
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                  <span className="font-semibold text-sm md:text-base" style={{ color: "var(--foreground)" }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── RIGHT: PRICING & CTA SIDEBAR ── */}
        <div className="space-y-6 order-first lg:order-last">
          <div className="p-6 md:p-8 rounded-2xl md:rounded-[2rem] shadow-xl sticky top-28" style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}>
            
            {/* Promo Banner */}
            <div className="w-full h-[100px] relative rounded-xl overflow-hidden mb-6">
              <Image
                src="/car banner.png"
                alt="Car Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            {/* Header: Title & Heart */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold line-clamp-2" style={{ color: "var(--foreground)" }}>{car.name}</h1>
                <p className="text-xs md:text-sm font-semibold opacity-60 mt-1 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                   Stock no: {id.padStart(5, '0')}AC • {car.year} • {car.odometer}
                </p>
              </div>
              <button 
                onClick={() => toggleWishlist(car)}
                className="p-2.5 border rounded-full transition-colors hover:scale-110 shrink-0 ml-3 shadow-sm hover:shadow-md" 
                style={{ borderColor: "var(--border)", background: "var(--background)" }}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 transition-colors ${isSaved ? "fill-[#fe2c55] text-[#fe2c55]" : "text-gray-400"}`} />
              </button>
            </div>

            {/* Price Area */}
            <div className="mt-8 mb-6">
               <div className="text-3xl md:text-4xl font-black mb-1.5" style={{ color: "var(--foreground)" }}>
                 {car.price} <span className="text-[10px] md:text-xs font-bold opacity-50 uppercase align-middle ml-1 tracking-wider">(Exclusive of VAT)</span>
               </div>
               <div className="text-[#10b981] font-bold text-sm bg-[#10b981]/10 w-fit px-3 py-1 rounded-md border border-[#10b981]/20">
                 EMI starts @ ₹45,000/Month
               </div>
            </div>

            {/* Live Viewers Indicator */}
            <div className="flex items-center gap-3 mb-6 p-3 rounded-xl border border-[#fe2c55]/20 bg-[#fe2c55]/5">
               <span className="relative flex h-3 w-3 shrink-0">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe2c55] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe2c55]"></span>
               </span>
               <span className="text-[11px] md:text-xs font-bold text-[#fe2c55] uppercase tracking-wide">
                 <span className="text-sm font-black mr-1">14</span> People are viewing right now
               </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                 <button className="py-3.5 rounded-xl font-bold transition-all hover:bg-[#fe2c55] hover:text-white flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 group border border-[#fe2c55]/20" style={{ backgroundColor: "color-mix(in srgb, #fe2c55 5%, transparent)", color: "#fe2c55" }}>
                   <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span className="text-[11px] sm:text-xs md:text-sm">Call Us</span>
                 </button>
                 <button className="py-3.5 rounded-xl font-bold transition-all hover:bg-[#fe2c55] hover:text-white flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 group border border-[#fe2c55]/20" style={{ backgroundColor: "color-mix(in srgb, #fe2c55 5%, transparent)", color: "#fe2c55" }}>
                   <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                   <span className="text-[11px] sm:text-xs md:text-sm">Buy this Car</span>
                 </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
