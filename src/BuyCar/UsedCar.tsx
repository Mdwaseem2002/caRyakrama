"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
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
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
  {
    id: 107,
    name: "2021 Kia Seltos GTX+ DCT",
    make: "Kia", model: "Seltos", year: "2021",
    kms: "31,200 kms", fuel: "Petrol", transmission: "Automatic",
    price: "₹15.75 Lakh", originalPrice: "₹16.50 Lakh", savings: "Save ₹75,000",
    location: "Koramangala, Bangalore",
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.3/10", condition: "Excellent",
    inspectionSummary: ["Turbo engine performance verified", "360-cam operational", "Ventilated seats functional", "New brake pads installed"],
    isNewArrival: true, isFeatured: true, reportPrice: "₹349",
  },
  {
    id: 108,
    name: "2019 Toyota Innova Crysta 2.4V",
    make: "Toyota", model: "Innova", year: "2019",
    kms: "68,000 kms", fuel: "Diesel", transmission: "Manual",
    price: "₹18.90 Lakh", originalPrice: "₹19.50 Lakh", savings: "Save ₹60,000",
    location: "Indiranagar, Bangalore",
    image: "https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.0/10", condition: "Very Good",
    inspectionSummary: ["Suspension overhauled recently", "Clutch plate in good health", "Zero underbody rust", "Service records up-to-date"],
    isNewArrival: false, isFeatured: false, reportPrice: "₹499",
  },
  {
    id: 109,
    name: "2022 MG ZS EV Exclusive",
    make: "MG", model: "ZS EV", year: "2022",
    kms: "14,500 kms", fuel: "Electric", transmission: "Automatic",
    price: "₹19.25 Lakh", originalPrice: "₹20.50 Lakh", savings: "Save ₹1.25 Lakh",
    location: "HSR Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.8/10", condition: "Pristine",
    inspectionSummary: ["Battery health at 99%", "Software up-to-date", "Fast charging module tested", "Panaromic sunroof smooth"],
    isNewArrival: true, isFeatured: true, reportPrice: "₹399",
  },
  {
    id: 110,
    name: "2018 Jeep Compass Limited PLUS",
    make: "Jeep", model: "Compass", year: "2018",
    kms: "55,400 kms", fuel: "Diesel", transmission: "Manual",
    price: "₹12.45 Lakh", originalPrice: "₹13.20 Lakh", savings: "Save ₹75,000",
    location: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "8.7/10", condition: "Good",
    inspectionSummary: ["4x2 transmission smooth", "Infotainment updated", "Leather seats cleaned & polished", "Tires good for 15k kms more"],
    isNewArrival: false, isFeatured: false, reportPrice: "₹349",
  },
  {
    id: 111,
    name: "2021 BMW 3 Series 330i M Sport",
    make: "BMW", model: "3 Series", year: "2021",
    kms: "28,000 kms", fuel: "Petrol", transmission: "Automatic",
    price: "₹42.00 Lakh", originalPrice: "₹45.00 Lakh", savings: "Save ₹3 Lakh",
    location: "Lavelle Road, Bangalore",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "9.5/10", condition: "Excellent",
    inspectionSummary: ["Full BMW service history", "Insurance valid till 2025", "BSI package active", "M-Sport features verified"],
    isNewArrival: false, isFeatured: true, reportPrice: "₹999",
  },
  {
    id: 112,
    name: "2020 Mahindra XUV500 W11",
    make: "Mahindra", model: "XUV500", year: "2020",
    kms: "42,800 kms", fuel: "Diesel", transmission: "Automatic",
    price: "₹14.85 Lakh", originalPrice: "₹15.50 Lakh", savings: "Save ₹65,000",
    location: "Hebbal, Bangalore",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop",
    inspectionScore: "8.9/10", condition: "Very Good",
    inspectionSummary: ["Engine noise within limits", "A/C cooling optimized", "Reverse camera crystal clear", "Brakes recently checked"],
    isNewArrival: true, isFeatured: false, reportPrice: "₹299",
  },
];

const filterOptions = ["All Cars", "New Arrivals", "Featured"];
const sortOptions = ["Price: Low to High", "Price: High to Low", "Inspection Score", "Year: Newest"];
const fuelOptions = ["All Fuel Types", "Petrol", "Diesel", "Electric"];

// ── Main Component ─────────────────────────────────────────────────────────────
export default function UsedCar() {
  const [activeFilter, setActiveFilter] = useState("All Cars");
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  const [activeFuel, setActiveFuel] = useState("All Fuel Types");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = usedCars.filter((car) => {
    const byFilter =
      activeFilter === "All Cars" ? true :
        activeFilter === "New Arrivals" ? car.isNewArrival :
          activeFilter === "Featured" ? car.isFeatured : true;
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
                    background: activeFilter === f ? "#fe2c55" : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color: activeFilter === f ? "#fff" : "var(--foreground)",
                    border: activeFilter === f ? "1px solid #fe2c55" : "1px solid var(--border)",
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
                    background: activeFuel === f ? "#fe2c55" : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color: activeFuel === f ? "#fff" : "var(--foreground)",
                    border: activeFuel === f ? "1px solid #fe2c55" : "1px solid var(--border)",
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
                    background: activeSort === s ? "#fe2c55" : "color-mix(in srgb, var(--foreground) 7%, transparent)",
                    color: activeSort === s ? "#fff" : "var(--foreground)",
                    border: activeSort === s ? "1px solid #fe2c55" : "1px solid var(--border)",
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
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    const row = Math.floor(index / 3);
    const xOffset = row % 2 === 0 ? -100 : 100;

    gsap.fromTo(cardRef.current, 
      { 
        opacity: 0, 
        x: xOffset 
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="group relative rounded-[1.75rem] overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
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

        {/* Wishlist Save */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
          <button
            onClick={() => toggleWishlist({ ...car, odometer: car.kms } as any)}
            title="Add to Wishlist"
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-[#fe2c55] text-[#fe2c55]" : "text-gray-400"}`} />
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
        <div className="mt-auto flex items-end justify-between pt-5" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="flex flex-col">
            <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Cash Price</p>
            <p className="font-black text-2xl leading-none" style={{ color: "var(--foreground)" }}>{car.price}</p>
          </div>
          
          <Link
            href={`/car/${car.id}`}
            className="flex items-center gap-2 text-sm font-bold transition-all group/link pb-1 hover:brightness-90 outline-none"
            style={{ color: "#fe2c55" }}
          >
            View Details
            <span className="w-9 h-9 rounded-full flex items-center justify-center transition-all group-hover/link:translate-x-1 shadow-sm" style={{ background: "color-mix(in srgb, #fe2c55 10%, transparent)" }}>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
