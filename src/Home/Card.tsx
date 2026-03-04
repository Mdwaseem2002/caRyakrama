"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, ArrowRight, CheckCircle2, SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";

export const cars = [
  // First 3
  {
    id: 1,
    name: "Infiniti QX60 Autograph",
    year: "2022",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
    price: "₹45.99 Lakh",
    odometer: "62,000 kms",
    condition: "Excellent",
    inspectionScore: "9.8/10",
    inspectionSummary: [
      "Engine health: Perfect",
      "Transmission: Smooth",
      "Exterior: Scratch-free",
      "Interior: Like new"
    ],
    isNewArrival: true,
  },
  {
    id: 2,
    name: "Jeep Wrangler Rubicon",
    year: "2024",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    price: "₹65.50 Lakh",
    odometer: "14,000 kms",
    condition: "Like New",
    inspectionScore: "9.9/10",
    inspectionSummary: [
      "4x4 System tested: 100%",
      "Suspension: Perfect",
      "Underbody: Rust-free",
      "Tires: 90% tread left"
    ],
    isNewArrival: true,
  },
  {
    id: 3,
    name: "Audi Q3 Sportback",
    year: "2023",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=800&auto=format&fit=crop",
    price: "₹42.25 Lakh",
    odometer: "28,000 kms",
    condition: "Very Good",
    inspectionScore: "9.5/10",
    inspectionSummary: [
      "No accident history",
      "Full service records",
      "Brakes: Recently replaced",
      "Electronics: All functional"
    ],
    isNewArrival: false,
  },
  // Next 3
  {
    id: 4,
    name: "Mercedes-Benz GLE 450",
    year: "2023",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop",
    price: "₹95.00 Lakh",
    odometer: "18,000 kms",
    condition: "Pristine",
    inspectionScore: "9.9/10",
    inspectionSummary: [
      "Air suspension: Tested ok",
      "MBUX System: Updated",
      "Paint: Original ceramic",
      "Upholstery: Flawless"
    ],
    isNewArrival: false,
  },
  {
    id: 5,
    name: "BMW X5 xDrive40i",
    year: "2022",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    price: "₹82.50 Lakh",
    odometer: "32,000 kms",
    condition: "Excellent",
    inspectionScore: "9.6/10",
    inspectionSummary: [
      "xDrive system verified",
      "Engine oil recently changed",
      "No warning lights",
      "Laser lights functional"
    ],
    isNewArrival: false,
  },
  {
    id: 6,
    name: "Toyota Land Cruiser LC300",
    year: "2024",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
    price: "₹2.10 Crore",
    odometer: "5,000 kms",
    condition: "Brand New",
    inspectionScore: "10/10",
    inspectionSummary: [
      "Factory fresh condition",
      "Still under OEM warranty",
      "Zero paint work",
      "Immaculate interior"
    ],
    isNewArrival: true,
  }
];

export default function Card() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Cars");

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto" style={{ background: "var(--background)" }}>
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="text-left max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight tracking-tight items-baseline" style={{ color: "var(--foreground)" }}>
            Only Inspected Cars. <br className="hidden md:block"/>
            <span style={{ color: "#fe2c55" }}>Every Detail Checked.</span>
          </h2>
          <p className="text-lg md:text-xl font-medium" style={{ color: "var(--muted)" }}>
            Handpicked for Enthusiasts Who Demand the Best.
          </p>
        </div>
        
        {/* Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[18px] text-sm font-bold border transition-all hover:scale-105 shrink-0 self-start md:self-auto mt-2 md:mt-0"
          style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card-bg)" }}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters & Sort
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {showFilters && (
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-wrap gap-3 justify-center md:justify-start mb-12"
        >
          {["All Cars", "Price: Low to High", "Highest Rated", "SUVs", "Sedans"].map((filter, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === filter 
                  ? "border-[#fe2c55] bg-[#fe2c55] text-white shadow-md shadow-[#fe2c55]/20" 
                  : "hover:border-[#fe2c55] hover:text-[#fe2c55]"
              }`}
              style={activeFilter === filter ? {} : { borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card-bg)" }}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>
    </section>
  );
}

// Extracted Component for Individual Car Cards
function CarCard({ car, index }: { car: typeof cars[0], index: number }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(car.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className="group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-white"
      style={{ backgroundColor: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      {/* ── IMAGE SECTION ── */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
        />
        
        {/* Badges container */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
          {car.isNewArrival && (
            <div className="bg-[#fe2c55] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg w-fit">
              New Arrival
            </div>
          )}
          <div className="bg-white/95 backdrop-blur-sm text-[#111827] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-gray-100 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
            Score: {car.inspectionScore}
          </div>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(car);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform z-20"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isSaved ? "fill-[#fe2c55] text-[#fe2c55]" : "text-gray-400"
            }`} 
          />
        </button>

        {/* ── HOVER: INSPECTION PREVIEW ── */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8 z-10">
          <h4 className="text-white font-bold mb-5 flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            Inspection Summary
          </h4>
          <ul className="space-y-3">
            {car.inspectionSummary.map((point, i) => (
              <li key={i} className="text-gray-200 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* ── CONTENT SECTION ── */}
      <div className="p-6 flex flex-col flex-grow relative z-10" style={{ background: "var(--card-bg)" }}>
        
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="font-extrabold text-xl leading-tight line-clamp-1 group-hover:text-[#fe2c55] transition-colors" style={{ color: "var(--foreground)" }}>
            {car.name}
          </h3>
          <span className="font-bold text-sm shrink-0 px-2.5 py-1 rounded-lg" style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)", color: "var(--foreground)" }}>
            {car.year}
          </span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-2 text-xs font-bold mb-6 uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          <span>{car.odometer}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <span>{car.condition}</span>
        </div>
        
        {/* Bottom Row / CTA */}
        <div className="mt-auto flex items-end justify-between pt-5" style={{ borderTop: "1px solid var(--border)" }}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Cash Price</p>
            <p className="font-black text-2xl leading-none" style={{ color: "var(--foreground)" }}>{car.price}</p>
          </div>
          
          {/* Quick CTA */}
          <Link
            href={`/car/${car.id}`}
            className="flex items-center gap-2 text-sm font-bold transition-colors group/link pb-1"
            style={{ color: "#fe2c55" }}
          >
            View Details
            <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/link:translate-x-1" style={{ background: "color-mix(in srgb, #fe2c55 10%, transparent)" }}>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
