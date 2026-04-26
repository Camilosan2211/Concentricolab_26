"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className, delay = 0, width = 400, height = 100, rotate = 0,
  darkGradient = "from-white/[0.08]",
  lightGradient = "from-[#5170FF]/[0.30]",
  lightBorder = "rgba(255,255,255,0.55)",
  lightShadowColor = "rgba(81,112,255,0.18)",
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
        animate={{ y: [0, 18, 0], x: [0, 5, 0] }}
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
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent", lightGradient,
              "backdrop-blur-[8px]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.70),transparent_60%)]",
            )}
            style={{
              border: `1.5px solid ${lightBorder}`,
              boxShadow: `inset 0 2px 0 rgba(255,255,255,0.80), 0 8px 32px ${lightShadowColor}`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function GeometricBackground({ className, darkMode = true }) {
  const bg     = darkMode ? "#0D0F1C" : "#EEF1FF"
  const radial = darkMode
    ? "bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]"
    : "bg-gradient-to-br from-blue-400/[0.07] via-transparent to-rose-400/[0.07]"
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
        {/* Cápsula grande izquierda — cyan dark / azul light */}
        <ElegantShape delay={0.3} width={600} height={140} rotate={12}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#5170FF]/[0.38]"
          lightBorder="rgba(255,255,255,0.58)"
          lightShadowColor="rgba(81,112,255,0.22)"
          darkMode={darkMode}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        {/* Cápsula grande derecha — coral */}
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightGradient="from-[#FF6D4D]/[0.34]"
          lightBorder="rgba(255,255,255,0.52)"
          lightShadowColor="rgba(255,109,77,0.20)"
          darkMode={darkMode}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        {/* Cápsula pequeña inferior izquierda — cyan */}
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#41EAFF]/[0.36]"
          lightBorder="rgba(255,255,255,0.55)"
          lightShadowColor="rgba(65,234,255,0.20)"
          darkMode={darkMode}
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        {/* Cápsula pequeña superior derecha — coral */}
        <ElegantShape delay={0.6} width={200} height={60} rotate={20}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightGradient="from-[#FF6D4D]/[0.32]"
          lightBorder="rgba(255,255,255,0.50)"
          lightShadowColor="rgba(255,109,77,0.18)"
          darkMode={darkMode}
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        {/* Cápsula mínima centro-izquierda — purple */}
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#828AFF]/[0.38]"
          lightBorder="rgba(255,255,255,0.55)"
          lightShadowColor="rgba(130,138,255,0.20)"
          darkMode={darkMode}
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Glows laterales de marca */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-side-glow hero-side-glow-left" />
        <div className="hero-side-glow hero-side-glow-right" />
      </div>

      {/* Fade top/bottom */}
      <div className={cn("absolute inset-0 bg-gradient-to-t pointer-events-none", fadeClass)} />
    </div>
  );
}
