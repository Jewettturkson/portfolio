"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, delay: 2.4 } }}
      className="absolute left-0 top-0 z-30 flex w-full items-center justify-between px-6 py-6 md:px-16"
    >
      <Magnetic>
        <a href="#" className="text-base font-medium text-[var(--dark)]">
          © Jewett Turkson
        </a>
      </Magnetic>
      <nav className="flex gap-8 text-base text-[var(--dark)]">
        {[
          { label: "Work", href: "#work" },
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ].map((item) => (
          <Magnetic key={item.label}>
            <a href={item.href} className="group relative">
              {item.label}
              <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 scale-0 rounded-full bg-[var(--dark)] transition-transform duration-200 group-hover:scale-100" />
            </a>
          </Magnetic>
        ))}
      </nav>
    </motion.header>
  );
}
