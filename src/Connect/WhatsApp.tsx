"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhatsApp = () => {
  const handleClick = () => {
    // You can replace this with your actual WhatsApp link
    window.open('https://wa.me/your-number', '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-[100] cursor-pointer group"
    >

      {/* Main Button Container */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden border-2 border-white">
        <Image
          src="/Icon/WhatsApp.jpg"
          alt="WhatsApp"
          fill
          className="object-cover rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default WhatsApp;
