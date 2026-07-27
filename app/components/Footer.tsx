"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import RoundedButton from "./RoundedButton";

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/New_York",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <>{time} ET</>;
}

export default function Footer() {
  return (
    <footer id="contact" className="mt-20 rounded-t-[3rem] bg-[var(--dark)] px-6 pb-10 pt-32 text-white md:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="text-[13vw] font-medium leading-none tracking-tight md:text-8xl"
        >
          Let&rsquo;s work
          <br />
          together
        </motion.h2>

        {/* rule with floating CTA riding on it */}
        <div className="relative mt-16 border-t border-white/20">
          <div className="absolute -top-8 right-4 md:right-24">
            <Magnetic strength={0.5}>
              <a
                href="mailto:akwasiturkson1@gmail.com"
                className="flex h-32 w-32 items-center justify-center rounded-full bg-[var(--accent)] text-center text-sm font-medium text-white transition-transform duration-300 hover:scale-110 md:h-44 md:w-44 md:text-base"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-28 flex flex-wrap gap-4">
          <RoundedButton dark href="mailto:akwasiturkson1@gmail.com">
            akwasiturkson1@gmail.com
          </RoundedButton>
        </div>

        <div className="mt-24 flex flex-wrap items-end justify-between gap-8 text-sm">
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">Version</p>
            <p className="text-neutral-300">2026 © Jewett Turkson</p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">Local time</p>
            <p className="text-neutral-300">
              <LocalTime />
            </p>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-neutral-500">Socials</p>
            <div className="flex gap-6 text-neutral-300">
              <Magnetic>
                <a className="transition hover:text-white" href="https://github.com/Jewettturkson" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  className="transition hover:text-white"
                  href="https://www.linkedin.com/in/jewett-turkson-5b223728b/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
