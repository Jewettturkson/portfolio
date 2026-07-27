"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import VelocityMarquee from "./VelocityMarquee";

// Rotating circular badge (SVG textPath) — the "located in" globe stamp.
function RotatingBadge() {
  return (
    <div className="spin-slow h-28 w-28 md:h-36 md:w-36" aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-[var(--dark)] text-[10.5px] uppercase tracking-[0.18em]">
          <textPath href="#circlePath">Located in Philadelphia · Open to internships ·</textPath>
        </text>
      </svg>
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-white pb-0">
      {/* role label + arrow, upper right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 2.6 } }}
        className="absolute right-6 top-1/3 md:right-16"
      >
        <p className="border-t border-neutral-400/50 pt-4 text-lg leading-snug text-[var(--dark)] md:text-2xl">
          <span className="mb-3 block text-3xl" aria-hidden>↘</span>
          Full-Stack Developer
          <br />
          &amp; AI Builder
        </p>
      </motion.div>

      {/* rotating badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 2.9 } }}
        className="absolute left-6 top-[26%] md:left-16"
      >
        <RotatingBadge />
      </motion.div>

      {/* portrait */}
      <motion.div
        style={{ y: parallaxY }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] w-[82vw] max-w-[460px] md:w-[36vw] md:max-w-[560px]"
      >
      <motion.div
        initial={{ opacity: 0, y: 60, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%", transition: { duration: 1, delay: 2.5, ease: [0.33, 1, 0.68, 1] } }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="./portrait.webp"
          alt="Portrait of Jewett Turkson"
          className="h-auto w-full select-none grayscale"
          draggable={false}
        />
      </motion.div>
      </motion.div>

      {/* scrolling name marquee (scroll-velocity reactive) */}
      <VelocityMarquee baseVelocity={2.5}>
        <h1 className="inline-block pr-16 text-[19vw] font-medium leading-none tracking-tight text-[var(--dark)] md:text-[16vw]">
          Jewett Turkson ·
        </h1>
      </VelocityMarquee>
    </section>
  );
}
