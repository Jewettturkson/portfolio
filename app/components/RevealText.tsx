"use client";

import { motion } from "framer-motion";

// Word-by-word masked reveal: each word slides up out of a clipped line.
export default function RevealText({
  text,
  accentWords = [],
  className = "",
  delay = 0,
}: {
  text: string;
  accentWords?: string[];
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[.,]/g, "");
        const accent = accentWords.includes(clean);
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: delay + i * 0.045, ease: [0.33, 1, 0.68, 1] }}
              className={`inline-block ${accent ? "text-[var(--accent)]" : ""}`}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
