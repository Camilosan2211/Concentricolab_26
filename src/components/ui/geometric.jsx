"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className, delay = 0, width = 400, height = 100, rotate = 0,
  darkGradient = "from-white/[0.08]",
  lightColor = "rgba(77,102,255,0.52)",
  lightGlow  = "rgba(77,102,255,0.28)",
  darkMode = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        {darkMode ? (
          <div className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent", darkGradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )} />
        ) : (
          /* LIGHT — formas sólidas con color de marca, glass y sombra fuerte */
          <div
            className="absolute inset-0 rounded-full backdrop-blur-[10px]"
            style={{
              background: `linear-gradient(135deg, ${lightColor} 0%, ${lightColor.replace(/[\d.]+\)$/, '0.28)')} 100%)`,
              border: '1.5px solid rgba(255,255,255,0.75)',
              boxShadow: [
                `inset 0 2px 0 rgba(255,255,255,0.85)`,
                `0 12px 40px ${lightGlow}`,
                `0 4px 16px rgba(0,0,0,0.06)`,
              ].join(', '),
            }}
          >
            {/* Reflejo interno superior */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse 80% 40% at 50% 15%, rgba(255,255,255,0.65), transparent 60%)',
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function GeometricBackground({ className, darkMode = true }) {
  const bg       = darkMode ? "#0D0F1C" : "#EEF1FF"
  const radial   = darkMode
    ? "bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]"
    : "bg-gradient-to-br from-blue-400/[0.08] via-transparent to-rose-400/[0.08]"
  const fadeClass = darkMode
    ? "from-[#0D0F1C] via-transparent to-[#0D0F1C]/80"
    : "from-[#EEF1FF] via-transparent to-[#EEF1FF]/80"

  return (
    <div
      className={cn("fixed inset-0 w-full h-full z-[-1]", className)}
      style={{ backgroundColor: bg }}
    >
      <div className={cn("absolute inset-0 blur-3xl", radial)} />

      <div className="absolute inset-0 overflow-hidden">
        {/* Grande izq — azul */}
        <ElegantShape delay={0.3} width={600} height={140} rotate={12}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightColor="rgba(77,102,255,0.55)" lightGlow="rgba(77,102,255,0.30)"
          darkMode={darkMode} className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        {/* Grande der — coral */}
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightColor="rgba(255,109,77,0.52)" lightGlow="rgba(255,109,77,0.28)"
          darkMode={darkMode} className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        {/* Pequeña inf izq — cyan */}
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightColor="rgba(65,234,255,0.50)" lightGlow="rgba(65,234,255,0.26)"
          darkMode={darkMode} className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        {/* Pequeña sup der — coral */}
        <ElegantShape delay={0.6} width={200} height={60} rotate={20}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightColor="rgba(255,109,77,0.48)" lightGlow="rgba(255,109,77,0.24)"
          darkMode={darkMode} className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        {/* Mínima — purple */}
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25}
          darkGradient="from-[#828AFF]/[0.15]"
          lightColor="rgba(130,138,255,0.52)" lightGlow="rgba(130,138,255,0.26)"
          darkMode={darkMode} className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-side-glow hero-side-glow-left" />
        <div className="hero-side-glow hero-side-glow-right" />
      </div>

      <div className={cn("absolute inset-0 bg-gradient-to-t pointer-events-none", fadeClass)} />
    </div>
  );
}
