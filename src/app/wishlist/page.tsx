"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowLeft, Bell, Lock, AlertCircle, ArrowDown } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  
  // Mock login state for demonstration purposes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Mock notification preference state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 py-8 md:py-12" style={{ background: "var(--background)" }}>
      
      {/* ── HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10 pb-6 md:pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-start gap-4">
          <Link href="/" className="p-2 rounded-full transition-all hover:scale-105 mt-1 shadow-sm flex items-center justify-center w-10 h-10" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-1" style={{ color: 'var(--foreground)' }}>
              Save What <span className="text-[#fe2c55]">Moves You.</span>
            </h1>
            <p className="text-base md:text-xl font-medium max-w-2xl" style={{ color: 'var(--muted)' }}>
              Track Your Favorite Cars Effortlessly.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0 mt-3 md:mt-0 w-full md:w-auto">
          <button 
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`flex items-center justify-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-2 md:py-2.5 rounded-[18px] md:rounded-full text-[11px] md:text-sm font-bold transition-all text-center leading-tight max-w-[120px] md:max-w-none ${
              notificationsEnabled 
                ? 'bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' 
                : 'bg-gray-100 text-gray-500 border border-gray-200 dark:bg-zinc-800 dark:text-gray-400 dark:border-zinc-700'
            }`}
          >
            <Bell className={`w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 block ${notificationsEnabled ? 'fill-current' : ''}`} />
            <span className="md:whitespace-nowrap">{notificationsEnabled ? 'Alerts On' : 'Alerts Off'}</span>
          </button>
          
          {!isLoggedIn && (
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-[18px] md:rounded-full text-[11px] md:text-sm font-bold transition-all text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[#fe2c55] text-center leading-tight flex-1 md:flex-none"
            >
              <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 block" />
              <span className="md:whitespace-nowrap">Sign In to Save permanently</span>
            </button>
          )}
        </div>
      </div>

      {/* ── ALERTS BAR ── */}
      {notificationsEnabled && wishlist.length > 0 && (
        <div className="mb-8 p-4 rounded-xl flex items-start gap-3 bg-blue-50 border border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20">
          <AlertCircle className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300">Price Drop Alerts Enabled</p>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 font-medium mt-0.5">We'll notify you immediately if any of your saved cars receive a price reduction or status update.</p>
          </div>
        </div>
      )}

      {/* ── CONTENT AREA ── */}
      {wishlist.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 text-center rounded-3xl"
          style={{ background: 'var(--card-bg)', border: '2px dashed var(--border)' }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ background: 'color-mix(in srgb, #fe2c55 10%, var(--background))' }}
          >
            <Heart className="w-10 h-10 text-[#fe2c55]" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Your garage is empty</h2>
          <p className="max-w-md mb-8 text-base" style={{ color: 'var(--muted)' }}>
            Keep track of the cars you love. Click the heart icon on any car to instantly add it to your wishlist.
          </p>
          <Link
            href="/"
            className="text-white px-8 py-3.5 rounded-full font-bold transition-transform hover:scale-105 shadow-[0_4px_14px_0_rgba(254,44,85,0.39)] bg-[#fe2c55]"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {wishlist.map((car, index) => (
            <Link key={car.id} href={`/car/${car.id}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative cursor-pointer"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                {/* Image Section */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={car.image || ''}
                    alt={car.name || 'Car Image'}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay for Top Icons */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    {index === 0 && (
                      <span className="px-3 py-1 bg-[#22c55e] text-white text-[13px] font-bold rounded-full shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                        <ArrowDown className="w-3.5 h-3.5" strokeWidth={3} />
                        Price Dropped
                      </span>
                    )}
                  </div>

                  {/* Remove from Wishlist Button */}
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(car); }}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white dark:hover:bg-zinc-700 transition-all transform hover:scale-110 flex justify-center items-center"
                  >
                    <Heart className="w-5 h-5 text-[#fe2c55] fill-[#fe2c55]" />
                  </button>
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow relative" style={{ background: 'var(--card-bg)' }}>
                  <div className="flex justify-between items-start mb-6 gap-3">
                    <h3 className="font-extrabold text-2xl leading-tight transition-colors group-hover:text-[#fe2c55]" style={{ color: 'var(--foreground)' }}>{car.name}</h3>
                    <span className="font-bold text-sm md:text-base shrink-0 px-3 py-1 rounded-lg" style={{ background: 'var(--foreground)', color: 'var(--background)' }}>{car.year}</span>
                  </div>
                  
                  {/* Price Box */}
                  <div className="mb-6 mt-auto p-5 rounded-2xl flex justify-between items-end" style={{ background: 'var(--border)' }}>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--muted)' }}>Finance</p>
                      <p className="text-[#fe2c55] font-black text-xl md:text-2xl leading-none">{car.startsFrom}<span className="text-sm md:text-base font-bold text-[#fe2c55]">/month</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--muted)' }}>Cash Price</p>
                      <p className="font-black text-xl md:text-2xl leading-none" style={{ color: 'var(--foreground)' }}>{car.fullPrice}</p>
                    </div>
                  </div>
                  
                  {/* Footer Details */}
                  <div className="pt-4 flex justify-between items-center text-sm font-medium" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]"></div>
                      Available Now
                    </span>
                    <span className="font-bold" style={{ color: 'var(--foreground)' }}>{car.odometer}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
