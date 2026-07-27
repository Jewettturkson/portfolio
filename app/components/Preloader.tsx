"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Multilingual greeting cycle, then the whole panel slides up with a
// curved bottom edge — the Snellenberg signature intro.
const WORDS = ["Hello", "Bonjour", "Ciao", "Olá", "やあ", "Hallo", "Guten Tag", "Akwaaba"];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === WORDS.length - 1) return;
    const timeout = setTimeout(() => setIndex(index + 1), index === 0 ? 900 : 170);
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height + 300
  } 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141516]"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.15 } }}
            className="z-10 flex items-center gap-3 text-4xl font-light text-white md:text-5xl"
          >
            <span className="block h-2.5 w-2.5 rounded-full bg-white" />
            {WORDS[index]}
          </motion.p>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full" aria-hidden>
            <motion.path
              initial={{ d: initialPath }}
              exit={{ d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
              fill="#141516"
            />
          </svg>
        </>
      )}
    </motion.div>
  );
}
