"use client";

import { motion } from "framer-motion";
import { ShieldCheck, RotateCcw, FileText, BadgeDollarSign } from "lucide-react";

// ── Guarantee Data ──────────────────────────────────────────────────────────────
const guarantees = [
  {
    icon: ShieldCheck,
    title: "Verified quality, every time",
    description: "Inspected and refurbished to top standards",
    color: "#22c55e",
  },
  {
    icon: RotateCcw,
    title: "30-Day return policy",
    description: "Live with the car. Return it if it's not right",
    color: "#3b82f6",
  },
  {
    icon: FileText,
    title: "Transparent, hassle-free process",
    description: "No hidden steps. No surprises",
    color: "#f59e0b",
  },
  {
    icon: BadgeDollarSign,
    title: "Fair pricing you can trust",
    description: "Data-backed, competitive valuations",
    color: "#fe2c55",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function Guarantees() {
  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4"
            style={{
              background: "color-mix(in srgb, #fe2c55 10%, transparent)",
              color: "#fe2c55",
            }}
          >
            Our Promise
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Why Buyers{" "}
            <span style={{ color: "#fe2c55" }}>Trust Us</span>
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "var(--muted)" }}
          >
            Every car comes backed by our four core guarantees — because confidence shouldn't cost extra.
          </p>
        </div>

        {/* Guarantee Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guarantees.map((g, index) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-5 p-5 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Icon bubble */}
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: `color-mix(in srgb, ${g.color} 12%, transparent)`,
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: g.color }}
                  />
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-bold text-[16px] mb-0.5"
                    style={{ color: "var(--foreground)" }}
                  >
                    {g.title}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {g.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
