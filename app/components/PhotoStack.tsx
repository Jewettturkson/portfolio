"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

export type PhotoCard = {
  src: string | null;
  caption: string;
  gradient?: string;
};

const AUTO_ADVANCE_MS = 5000;

export default function PhotoStack({ cards, chip }: { cards: PhotoCard[]; chip: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const card = cards[index];

  // 3D tilt toward the cursor
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const frame = useRef<HTMLDivElement>(null);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + cards.length) % cards.length);
  };

  // auto-advance, paused on hover/drag and for reduced-motion users
  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => go(1), AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, reduced]);

  return (
    <div
      className="relative mx-auto w-full max-w-[340px] select-none md:max-w-[380px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        mx.set(0.5);
        my.set(0.5);
      }}
      onMouseMove={(e) => {
        const el = frame.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* chip */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="absolute -top-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#141516] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300"
      >
        {chip}
      </motion.div>

      {/* back cards shuffle as the index changes */}
      <motion.div
        aria-hidden
        animate={{ rotate: index % 2 === 0 ? -6 : -3, x: index % 2 === 0 ? -6 : 2 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="absolute inset-0 rounded-3xl bg-white/5"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: index % 2 === 0 ? 3 : 6, x: index % 2 === 0 ? 4 : 8 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="absolute inset-0 rounded-3xl bg-white/10"
      />

      {/* active card: tilt wrapper + draggable inner */}
      <motion.div ref={frame} style={{ rotateX, rotateY, transformPerspective: 900 }} className="relative z-10">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-800">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            <motion.div
              key={index}
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -90) go(1);
                else if (info.offset.x > 90) go(-1);
              }}
              onClick={() => go(1)}
              initial={{ x: direction * 320, opacity: 0, rotate: direction * 10 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: direction * -320, opacity: 0, rotate: direction * -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              {card.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.src}
                  alt={card.caption}
                  className="pointer-events-none h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${card.gradient ?? "from-neutral-700 to-neutral-900"}`}>
                  <p className="px-8 text-center font-mono text-xs uppercase tracking-widest text-white/60">Photo coming soon</p>
                </div>
              )}

              {/* caption plate */}
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-black/70 p-4 backdrop-blur">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  0{index + 1} / 0{cards.length}
                </p>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white">{card.caption}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* pagination: active dash fills over the auto-advance window */}
      <div className="mt-6 flex justify-center gap-2">
        {cards.map((c, i) => (
          <button
            key={c.caption}
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`Photo ${i + 1}`}
            className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-white/15" : "w-5 bg-white/20 hover:bg-white/40"
            }`}
          >
            {i === index && (
              <motion.span
                key={`fill-${index}-${paused}`}
                initial={{ width: "0%" }}
                animate={{ width: paused || reduced ? "100%" : ["0%", "100%"] }}
                transition={{ duration: paused || reduced ? 0.2 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
              />
            )}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-600">
        Drag, click, or wait
      </p>
    </div>
  );
}
