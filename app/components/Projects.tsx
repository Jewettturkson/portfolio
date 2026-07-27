"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RoundedButton from "./RoundedButton";

type Project = {
  name: string;
  category: string;
  href: string;
  gradient: string;
  caption: string;
  image?: string; // live-site screenshot shown in the hover preview
};

const PROJECTS: Project[] = [
  {
    name: "TurkNode",
    category: "Design & Development · AI",
    href: "https://nodeenturk.org",
    gradient: "from-[#0b1a37] to-[#123a7a]",
    caption: "AI volunteer matching · pgvector",
    image: "./previews/turknode.webp",
  },
  {
    name: "nkae",
    category: "Founder · AI Study App · Live",
    href: "https://nkae.study",
    gradient: "from-[#17141d] to-[#5b4be0]",
    caption: "Remember what you learn · nkae.study",
    image: "./previews/nkae.webp",
  },
  {
    name: "TCC Field Layout Pro",
    category: "Flutter · Client app · Live on both stores",
    href: "https://apps.apple.com/us/app/tcc-field-layout-pro/id6766678029",
    gradient: "from-[#07091c] to-[#e85000]",
    caption: "MUTCD work-zone calculator · 5.0★ App Store",
    image: "./previews/tcc.webp",
  },
  {
    name: "MEND Journey",
    category: "Nonprofit Platform · Astro + Netlify · Live",
    href: "https://mendjourney.org",
    gradient: "from-[#241536] to-[#c9a227]",
    caption: "Two production sites + automated email pipeline",
    image: "./previews/mend.webp",
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  return (
    <section
      id="work"
      className="relative mx-auto max-w-6xl px-6 pb-32 pt-40 md:px-12"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <p className="mb-16 text-base text-neutral-500">Recent work</p>

      <div>
        {PROJECTS.map((project, i) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group flex items-center justify-between border-t border-neutral-300 py-12 transition-opacity duration-300 last:border-b md:py-16 [&:hover]:opacity-100"
            style={{ opacity: active !== null && active !== i ? 0.35 : 1 }}
          >
            <h3 className="text-4xl font-medium tracking-tight text-[var(--dark)] transition-transform duration-300 group-hover:-translate-x-2 md:text-6xl">
              {project.name}
            </h3>
            <p className="text-right text-sm text-neutral-500 transition-transform duration-300 group-hover:translate-x-2 md:text-base">
              {project.category}
            </p>
          </a>
        ))}
      </div>

      {/* cursor-following preview panel */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
        animate={{
          x: cursor.x - 160,
          y: cursor.y - 110,
          scale: active !== null ? 1 : 0,
          opacity: active !== null ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 32, mass: 0.4 }}
      >
        {active !== null && (
          <div className="relative h-[240px] w-[380px] overflow-hidden rounded-lg shadow-2xl">
            {PROJECTS[active].image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={PROJECTS[active].image}
                alt={`${PROJECTS[active].name} website`}
                className="h-full w-full object-cover"
                draggable={false}
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${PROJECTS[active].gradient}`}>
                <div className="px-8 text-center text-white">
                  <p className="text-2xl font-semibold">{PROJECTS[active].name}</p>
                  <p className="mt-2 text-sm text-white/70">{PROJECTS[active].caption}</p>
                </div>
              </div>
            )}
            {/* Dennis-style View circle */}
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-white">
              View
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-20 flex justify-center">
        <RoundedButton href="https://github.com/Jewettturkson">More on GitHub</RoundedButton>
      </div>
    </section>
  );
}
