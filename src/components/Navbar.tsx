"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Heart, User, Menu, X, Sun, Moon, MessageCircle, Bell } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isDark = theme === "dark";

  const navLinks = [
    { label: 'caRya.krama', href: '/' },
    { label: 'Buy', href: '/BuyCar' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  const btnClass = `flex items-center justify-center w-10 h-10 md:w-[44px] md:h-[44px] rounded-full transition-colors ${
    isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-[#eeeff2] hover:bg-[#e4e6eb]"
  }`;

  return (
    <header
      className="w-full sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        backgroundColor: "var(--navbar-bg)",
        borderColor: "var(--border)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-[70px] md:h-[90px] flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link href="/" className="flex items-center h-full">
            <Image 
              src="/carYakrama.png" 
              alt="caRyakrama Logo" 
              width={250} 
              height={80} 
              className={`object-contain origin-left h-6 w-auto max-w-[100px] md:h-16 md:max-w-none md:scale-110`}
              style={{ width: 'auto', height: 'auto', filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.3s' }}
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-semibold text-[15px] transition-colors hover:text-[#fe2c55]"
              style={{ color: "var(--foreground)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-3">

          {/* Call Button */}
          <button className={`hidden sm:flex ${btnClass}`} title="Call Us">
            <Phone className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#fe2c55] fill-[#fe2c55]" strokeWidth={0} />
          </button>

          {/* Bell / Notifications Button */}
          <button className={`hidden sm:flex ${btnClass}`} title="Notifications">
            <Bell className="w-4 h-4 md:w-[18px] md:h-[18px]" style={{ color: "var(--foreground)" }} strokeWidth={1.5} />
          </button>

          {/* Heart / Wishlist Button */}
          <Link href="/wishlist" className={`relative ${btnClass}`} title="Wishlist">
            <Heart className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#fe2c55] fill-[#fe2c55]" strokeWidth={1} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fe2c55] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-sm">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Profile Button */}
          <button className={`hidden sm:flex ${btnClass}`} title="Login / Profile">
            <User
              className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]"
              style={{ color: "var(--foreground)" }}
              strokeWidth={1.5}
            />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`hidden sm:flex ${btnClass}`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark
              ? <Sun className="w-[18px] h-[18px] md:w-[18px] md:h-[18px] text-yellow-400" strokeWidth={1.5} />
              : <Moon className="w-[18px] h-[18px] md:w-[18px] md:h-[18px] text-gray-600" strokeWidth={1.5} />
            }
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileOpen(true)}
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full ml-1 transition-colors ${
              isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Menu className="w-5 h-5" style={{ color: "var(--foreground)" }} />
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      <div 
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
          onClick={() => setIsMobileOpen(false)} 
        />
        
        {/* Sliding Drawer */}
        <div 
          className={`absolute top-0 left-0 w-[280px] h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ backgroundColor: "var(--navbar-bg)" }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 h-[70px] shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
            <Image 
              src="/carYakrama.png" 
              alt="caRyakrama Logo" 
              width={150} 
              height={50}
              className={`object-contain w-auto h-6 origin-left`}
              style={{ filter: isDark ? 'invert(1) hue-rotate(180deg)' : 'none', transition: 'filter 0.3s' }}
              priority
            />
            <button 
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isDark ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <X className="w-5 h-5" style={{ color: "var(--foreground)" }} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-semibold text-lg py-2 border-b last:border-0 hover:text-[#fe2c55] transition-colors"
                style={{ color: "var(--foreground)", borderColor: "var(--border)" }}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Extras */}
            <div className="flex flex-col gap-3 mt-2">
              <button
                className="flex items-center justify-center w-full py-3.5 rounded-[20px] font-bold text-sm transition-colors text-white"
                style={{ backgroundColor: "#fe2c55" }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </button>
            </div>

            {/* Mobile Theme & Account */}
            <div className="flex flex-col gap-3 pt-4 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-between px-5 py-3.5 rounded-[20px] font-bold text-sm transition-colors"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--border)" }}
              >
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                {isDark
                  ? <Sun className="w-4 h-4 text-yellow-400" strokeWidth={1.5} />
                  : <Moon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                }
              </button>
              <button
                className="flex items-center justify-center w-full py-3.5 rounded-[20px] font-bold text-sm transition-colors"
                style={{ backgroundColor: "var(--card-bg)", color: "var(--foreground)", border: "1px solid var(--border)" }}
              >
                <User className="w-4 h-4 mr-2" strokeWidth={1.5} />
                User Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
