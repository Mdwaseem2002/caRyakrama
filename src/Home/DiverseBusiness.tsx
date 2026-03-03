"use client";

import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const businesses = [
  {
    title: "DriveAgain Motors",
    img: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Light Vehicles",
    img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Heavy Vehicles",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Revive Rides",
    img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Electric Vehicles",
    img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Sports Cars",
    img: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "SUVs & Off-Road",
    img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "RideRenew",
    img: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=800&auto=format&fit=crop"
  }
];

export default function DiverseBusiness() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animating the top node
    gsap.from(".diverse-top-node", {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Animating the connecting lines
    gsap.from(".diverse-line", {
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Animating the business car boxes (fade in and zoom in)
    gsap.from(".diverse-business-card", {
      scale: 0.3,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
        toggleActions: "play reverse play reverse",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full py-16 relative flex flex-col items-center overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full px-4 flex flex-col items-center mt-8">
        
        {/* Top Diamond Node */}
        <div className="diverse-top-node relative flex flex-col items-center">
          {/* Diamond Shape */}
          <div className="w-36 h-36 md:w-44 md:h-44 transform rotate-45 rounded-2xl md:rounded-[2rem] border-[4px] md:border-[5px] border-black shadow-xl flex items-center justify-center z-10 bg-white">
            {/* Un-rotate Content */}
            <div className="transform -rotate-45 text-center flex flex-col items-center justify-center">
              <h2 className="text-base md:text-xl font-bold text-black leading-tight">
                Our<br/>Diverse<br/>Business
              </h2>
            </div>
          </div>
          
          {/* Vertical line going down from top node */}
          <div className="diverse-line w-[1px] h-20 md:h-24 bg-[#00b4d8]/50 z-0"></div>
        </div>

        {/* Bottom Nodes */}
        <div className="relative w-full max-w-6xl mt-[-1px]">
          {/* Standard horizontal line in desktop mode */}
          <div className="diverse-line hidden md:block absolute top-0 left-[12.5%] right-[12.5%] h-[1px] bg-[#00b4d8]/50 z-0"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-20 md:gap-y-24 gap-x-4 w-full pt-12 md:pt-16">
            {businesses.map((business, idx) => (
              <div key={idx} className="diverse-business-card flex flex-col items-center relative group">
                
                {/* Connecting drop line for desktop */}
                {idx < 4 ? (
                  <div className="diverse-line hidden md:block absolute -top-12 md:-top-16 w-[1px] h-12 md:h-16 bg-[#00b4d8]/50 z-0"></div>
                ) : (
                  <div className="diverse-line hidden md:block absolute -top-20 md:-top-24 w-[1px] h-20 md:h-24 bg-[#00b4d8]/50 z-0"></div>
                )}
                
                {/* Connecting drop line for mobile/tablet */}
                <div className="diverse-line block md:hidden absolute -top-20 w-[1px] h-20 bg-[#00b4d8]/50 z-0"></div>

                {/* Diamond Image Container */}
                <div 
                  className="w-40 h-40 md:w-48 md:h-48 transform rotate-45 rounded-[1.5rem] md:rounded-[2rem] border-[4px] md:border-[5px] border-white overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10 bg-white"
                >
                  <div className="w-[150%] h-[150%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45">
                    <img 
                      src={business.img} 
                      alt={business.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 
                  className="mt-12 md:mt-14 text-center text-sm md:text-[15px] font-semibold px-2 tracking-wide"
                  style={{ color: "var(--foreground, #1f2937)" }}
                >
                  {business.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
