"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  darkGradient = "from-white/[0.08]",
  lightGradient = "from-[#5170FF]/[0.12]",
  darkMode = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        {darkMode ? (
          /* DARK — glass semitransparente sobre fondo oscuro */
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent",
              darkGradient,
              "backdrop-blur-[2px] border-2 border-white/[0.15]",
              "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
            )}
          />
        ) : (
          /* LIGHT — shapes con color de marca, más opacos y con sombra suave */
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent",
              lightGradient,
              "backdrop-blur-[6px]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.55),transparent_65%)]"
            )}
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 24px rgba(81,112,255,0.10)',
              border: '1.5px solid rgba(255,255,255,0.60)',
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
    : "bg-gradient-to-br from-blue-400/[0.06] via-transparent to-rose-400/[0.06]"
  const fade   = darkMode
    ? "from-[#0D0F1C] via-transparent to-[#0D0F1C]/80"
    : "from-[#EEF1FF] via-transparent to-[#EEF1FF]/80"

  return (
    <div
      className={cn("fixed inset-0 w-full h-full z-[-1]", className)}
      style={{ backgroundColor: bg }}
    >
      {/* Gradiente de ambiente */}
      <div className={cn("absolute inset-0 blur-3xl", radial)} />

      <div className="absolute inset-0 overflow-hidden">
        {/* Cápsula grande izquierda — cyan en dark, azul en light */}
        <ElegantShape
          delay={0.3}
          width={600} height={140} rotate={12}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#5170FF]/[0.18]"
          darkMode={darkMode}
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        {/* Cápsula grande derecha — coral en ambos modos */}
        <ElegantShape
          delay={0.5}
          width={500} height={120} rotate={-15}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightGradient="from-[#FF6D4D]/[0.16]"
          darkMode={darkMode}
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        {/* Cápsula pequeña inferior izquierda — cyan en dark, cyan oscuro en light */}
        <ElegantShape
          delay={0.4}
          width={300} height={80} rotate={-8}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#41EAFF]/[0.20]"
          darkMode={darkMode}
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        {/* Cápsula pequeña superior derecha — coral */}
        <ElegantShape
          delay={0.6}
          width={200} height={60} rotate={20}
          darkGradient="from-[#FF6D4D]/[0.15]"
          lightGradient="from-[#FF6D4D]/[0.18]"
          darkMode={darkMode}
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        {/* Cápsula mínima superior centro-izquierda — azul */}
        <ElegantShape
          delay={0.7}
          width={150} height={40} rotate={-25}
          darkGradient="from-[#41EAFF]/[0.15]"
          lightGradient="from-[#828AFF]/[0.22]"
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
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t pointer-events-none",
          fade
        )}
      />
    </div>
  );
}
