"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Bell,
  ShieldCheck,
  FileSearch,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";

// ── Types ──────────────────────────────────────────────────────────────────────
interface UsedCarData {
  id: number;
  name: string;
  make: string;
  model: string;
  year: string;
  kms: string;
  fuel: string;
  transmission: string;
  price: string;
  originalPrice: string;
  savings: string;
  location: string;
  image: string;
  inspectionScore: string;
  condition: string;
  inspectionSummary: string[];
  isNewArrival: boolean;
  isFeatured: boolean;
  reportPrice: string;
}

// ── Car Data ───────────────────────────────────────────────────────────────────
const usedCars: UsedCarData[] = [
  {
    id: 101,
    name: "2020 Honda City ZX CVT",
    make: "Honda", model: "City", year: "2020",
    kms: "38,500 kms", fuel: "Petrol", transmission: "Automatic",
    price: "₹9.75 Lakh", originalPrice: "₹10.20 Lakh", savings: "Save ₹45,000",
    location: "Koramangala, Bangalore",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.4/10", condition: "Excellent",
    inspectionSummary: ["Engine oil fresh, no leaks", "Accident-free history", "Interior like new", "All electronics functional"],
    isNewArrival: true, isFeatured: false, reportPrice: "₹299",
  },
  {
    id: 102,
    name: "2019 Hyundai Creta SX+ AT",
    make: "Hyundai", model: "Creta", year: "2019",
    kms: "52,000 kms", fuel: "Petrol", transmission: "Automatic",
    price: "₹13.50 Lakh", originalPrice: "₹14.00 Lakh", savings: "Save ₹50,000",
    location: "Indiranagar, Bangalore",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.1/10", condition: "Very Good",
    inspectionSummary: ["Single owner, full service records", "Tires 80% tread left", "Sunroof functional", "Brakes recently serviced"],
    isNewArrival: false, isFeatured: true, reportPrice: "₹299",
  },
  {
    id: 103,
    name: "2021 Maruti Swift ZXI+",
    make: "Maruti", model: "Swift", year: "2021",
    kms: "22,400 kms", fuel: "Petrol", transmission: "Manual",
    price: "₹6.85 Lakh", originalPrice: "₹7.10 Lakh", savings: "Save ₹25,000",
    location: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.7/10", condition: "Like New",
    inspectionSummary: ["Zero paint work", "Original tyres intact", "Premium audio working", "AC cooling excellent"],
    isNewArrival: true, isFeatured: true, reportPrice: "₹199",
  },
  {
    id: 104,
    name: "2018 Toyota Fortuner 4x4 AT",
    make: "Toyota", model: "Fortuner", year: "2018",
    kms: "88,000 kms", fuel: "Diesel", transmission: "Automatic",
    price: "₹28.50 Lakh", originalPrice: "₹30.00 Lakh", savings: "Save ₹1.5 Lakh",
    location: "Hebbal, Bangalore",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "8.8/10", condition: "Good",
    inspectionSummary: ["4x4 system verified", "Chassis underbody checked", "Minor exterior scratches noted", "All safety systems tested"],
    isNewArrival: false, isFeatured: false, reportPrice: "₹499",
  },
  {
    id: 105,
    name: "2022 Tata Nexon EV Max",
    make: "Tata", model: "Nexon EV", year: "2022",
    kms: "18,700 kms", fuel: "Electric", transmission: "Automatic",
    price: "₹16.40 Lakh", originalPrice: "₹17.00 Lakh", savings: "Save ₹60,000",
    location: "HSR Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.6/10", condition: "Excellent",
    inspectionSummary: ["Battery health 97%", "Charging port A-OK", "Warranty still active", "Regenerative braking optimal"],
    isNewArrival: true, isFeatured: false, reportPrice: "₹399",
  },
  {
    id: 106,
    name: "2017 Volkswagen Polo GT TSI",
    make: "Volkswagen", model: "Polo GT", year: "2017",
    kms: "72,100 kms", fuel: "Petrol", transmission: "Automatic",
    price: "₹8.20 Lakh", originalPrice: "₹8.75 Lakh", savings: "Save ₹55,000",
    location: "JP Nagar, Bangalore",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "8.9/10", condition: "Very Good",
    inspectionSummary: ["DSG gearbox tested OK", "Full service history available", "Original paint body", "New battery installed"],
    isNewArrival: false, isFeatured: true, reportPrice: "₹299",
  },
];

const filterOptions = ["All Cars", "New Arrivals", "Featured"];
const sortOptions   = ["Price: Low to High", "Price: High to Low", "Inspection Score", "Year: Newest"];
const fuelOptions   = ["All Fuel Types", "Petrol", "Diesel", "Electric"];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function UsedCar() {
  const [activeFilter, setActiveFilter] = useState("All Cars");
  const [activeSort,   setActiveSort]   = useState(sortOptions[0]);
  const [activeFuel,   setActiveFuel]   = useState("All Fuel Types");
  const [showFilters,  setShowFilters]  = useState(false);

  const filteredCars = usedCars.filter((car) => {
    const byFilter =
      activeFilter === "All Cars"    ? true :
      activeFilter === "New Arrivals" ? car.isNewArrival :
      activeFilter === "Featured"    ? car.isFeatured   : true;
    const byFuel = activeFuel === "All Fuel Types" ? true : car.fuel === activeFuel;
    return byFilter && byFuel;
  });

  return (
    <section id="used-cars" className="w-full py-16" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* ── TRUST BANNER ── */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 px-6 py-4 rounded-2xl mb-12 text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #fe2c55 0%, #c51e3a 100%)" }}
        >
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Verified & Inspected Cars Only</span>
          <span className="hidden md:block opacity-30">|</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Save Time, Buy With Confidence</span>
          <span className="hidden md:block opacity-30">|</span>
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Handpicked for Discerning Buyers</span>
        </div>

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: "var(--foreground)" }}>
              Browse <span style={{ color: "#fe2c55" }}>Inspected</span> Used Cars
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
              Every listing below has passed our 150-point inspection. Nothing less.
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-all hover:scale-105 shrink-0"
            style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--card-bg)" }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters & Sort
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* ── FILTER / SORT BAR ── */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mb-8 p-5 rounded-2xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: "var(--muted)" }}>View:</span>
              {filterOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: activeFilter === f ? "#fe2c55"                                             : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color:      activeFilter === f ? "#fff"                                                 : "var(--foreground)",
                    border:     activeFilter === f ? "1px solid #fe2c55" : "1px solid var(--border)",
                  }}
                >{f}</button>
              ))}
            </div>
            <div className="h-full w-px hidden md:block" style={{ background: "var(--border)" }} />
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: "var(--muted)" }}>Fuel:</span>
              {fuelOptions.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFuel(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: activeFuel === f ? "#fe2c55"                                           : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color:      activeFuel === f ? "#fff"                                               : "var(--foreground)",
                    border:     activeFuel === f ? "1px solid #fe2c55" : "1px solid var(--border)",
                  }}
                >{f}</button>
              ))}
            </div>
            <div className="h-full w-px hidden md:block" style={{ background: "var(--border)" }} />
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: "var(--muted)" }}>Sort:</span>
              {sortOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSort(s)}
                  className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
                  style={{
                    background: activeSort === s ? "#fe2c55"                                          : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color:      activeSort === s ? "#fff"                                              : "var(--foreground)",
                    border:     activeSort === s ? "1px solid #fe2c55" : "1px solid var(--border)",
                  }}
                >{s}</button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── RESULTS COUNT ── */}
        <p className="text-sm font-medium mb-6" style={{ color: "var(--muted)" }}>
          Showing <strong style={{ color: "var(--foreground)" }}>{filteredCars.length}</strong> inspected cars
        </p>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <UsedCarCard key={car.id} car={car} index={index} />
          ))}
        </div>

        {/* ── EMPTY STATE ── */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: "var(--foreground)" }} />
            <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>No cars match your filters.</p>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Try adjusting the filters above.</p>
          </div>
        )}

      </div>
    </section>
  );
}

// ── Car Card Sub-Component ─────────────────────────────────────────────────────
function UsedCarCard({ car, index }: { car: UsedCarData; index: number }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(car.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="group relative rounded-[1.75rem] overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      {/* ── IMAGE ── */}
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={car.image} alt={car.name} fill sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10 pointer-events-none">
          {car.isNewArrival && (
            <span className="bg-[#fe2c55] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              New Arrival
            </span>
          )}
          {car.isFeatured && (
            <span className="bg-amber-400 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
              ⭐ Featured
            </span>
          )}
          <span className="bg-white/95 text-[#111] text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 w-fit border border-gray-100">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            {car.inspectionScore}
          </span>
        </div>

        {/* Wishlist + Notify */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(car as Parameters<typeof toggleWishlist>[0])}
            title="Add to Wishlist"
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-[#fe2c55] text-[#fe2c55]" : "text-gray-400"}`} />
          </button>
          <button title="Notify me of updates" className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform">
            <Bell className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* ── HOVER INSPECTION PREVIEW ── */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center px-7 z-10">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-white font-bold text-base">Inspection Summary</span>
          </div>
          <ul className="space-y-2.5">
            {car.inspectionSummary.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-white/60">
            <Lock className="w-3.5 h-3.5" />
            Full report available for {car.reportPrice}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-5 flex flex-col flex-grow" style={{ background: "var(--card-bg)" }}>

        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-extrabold text-[17px] leading-tight group-hover:text-[#fe2c55] transition-colors line-clamp-1" style={{ color: "var(--foreground)" }}>
            {car.name}
          </h3>
          <span className="text-xs font-bold px-2 py-1 rounded-lg shrink-0" style={{ background: "color-mix(in srgb, var(--foreground) 8%, transparent)", color: "var(--foreground)" }}>
            {car.year}
          </span>
        </div>

        {/* Specs row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "var(--muted)" }}>
          <span>{car.kms}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{car.fuel}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{car.transmission}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{car.condition}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-[22px] font-black leading-none" style={{ color: "var(--foreground)" }}>{car.price}</p>
          <div className="flex items-center gap-2 mt-1 text-xs">
            <span className="line-through" style={{ color: "var(--muted)" }}>{car.originalPrice}</span>
            <span className="text-emerald-500 font-bold">{car.savings}</span>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs mb-5 flex items-center gap-1" style={{ color: "var(--muted)" }}>
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {car.location}
        </p>

        {/* CTAs */}
        <div className="mt-auto flex flex-col gap-2.5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          {/* Primary: View Details */}
          <Link
            href={`/cars/${car.id}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "#fe2c55", boxShadow: "0 4px 14px rgba(254,44,85,0.3)" }}
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Secondary: View Inspection Report */}
          <Link
            href={`/cars/${car.id}/inspection`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.01]"
            style={{ background: "color-mix(in srgb, #fe2c55 8%, var(--card-bg))", color: "#fe2c55", border: "1px solid color-mix(in srgb, #fe2c55 25%, transparent)" }}
          >
            <FileSearch className="w-4 h-4" />
            View Inspection Report · {car.reportPrice}
            <Lock className="w-3.5 h-3.5 opacity-60" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
