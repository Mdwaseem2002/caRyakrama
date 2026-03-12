"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface ViewReopProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewReop({ isOpen, onClose }: ViewReopProps) {
  const router = useRouter();

  const handleProceed = () => {
    onClose();
    router.push("/pay");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white dark:bg-[#111] w-full max-w-md rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="relative p-8 text-center space-y-6 pt-12">

                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#fe2c55]/10 flex items-center justify-center">
                  <Info className="w-8 h-8 text-[#fe2c55]" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fe2c55] to-[#ff5c7c]">
                    Notice
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                    If you would like to view the inspection report of this car, please make the payment and then download the report.
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleProceed}
                  className="w-full py-4 rounded-2xl bg-[#fe2c55] text-white font-bold text-lg hover:bg-[#e0244a] active:scale-[0.98] transition-all shadow-lg shadow-[#fe2c55]/20"
                >
                  Proceed
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
