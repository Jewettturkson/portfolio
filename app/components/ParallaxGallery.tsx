"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Photo = { src: string; alt: string };

// Three columns scrolling at different speeds: the classic parallax gallery.
const COLUMNS: Photo[][] = [
  [
    { src: "./photos/p2.webp", alt: "Jewett in a navy pinstripe shirt" },
    { src: "./photos/p3.webp", alt: "Jewett in a striped sweater" },
  ],
  [{ src: "./photos/p0.webp", alt: "Jewett out in the city" }],
  [
    { src: "./photos/p4.webp", alt: "Jewett in a tropical shirt" },
    { src: "./photos/p1.webp", alt: "Jewett crossing the street in Center City" },
  ],
];

function Column({ photos, y, className = "" }: { photos: Photo[]; y: MotionValue<string>; className?: string }) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-4 md:gap-6 ${className}`}>
      {photos.map((photo) => (
        <div key={photo.src} className="overflow-hidden rounded-2xl md:rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-auto w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            draggable={false}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function ParallaxGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yLeft = useTransform(scrollYProgress, [0, 1], ["4%", "-8%"]);
  const yCenter = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  return (
    <div ref={ref} className="relative mx-auto max-w-[1400px] overflow-hidden px-6 md:px-10">
      <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6">
        <Column photos={COLUMNS[0]} y={yLeft} />
        <Column photos={COLUMNS[1]} y={yCenter} className="pt-16 md:pt-24" />
        <Column photos={COLUMNS[2]} y={yRight} className="hidden md:flex" />
      </div>
      {/* location chip */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#141516]/85 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
        New Castle, DE · Accra, GH
      </div>
    </div>
  );
}
