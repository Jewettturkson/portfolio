"use client";

import { motion } from "framer-motion";
import ParallaxGallery from "./ParallaxGallery";
import RevealText from "./RevealText";
import Magnetic from "./Magnetic";

const SOCIALS = [
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com/in/jewett-turkson-5b223728b/" },
  { label: "GitHub", short: "gh", href: "https://github.com/Jewettturkson" },
  { label: "Email", short: "@", href: "mailto:akwasiturkson1@gmail.com" },
  { label: "Resume", short: "cv", href: "./resume.pdf" },
];

const SERVICES = [
  {
    index: "01",
    title: "Full-Stack Development",
    body: "From database schema to deployed URL. I build complete products with React, Next.js, TypeScript, Node, and Python, backed by PostgreSQL and shipped with Docker and CI. Quality is non-negotiable: typed code, tests, and error handling included.",
  },
  {
    index: "02",
    title: "AI-Powered Products",
    body: "Semantic search with embeddings and pgvector, adaptive learning flows, intelligent matching pipelines. I integrate AI where it solves a real problem, with mock modes and cost controls so it works in production, not just in the demo.",
  },
  {
    index: "03",
    title: "The Full Package",
    body: "Product thinking plus engineering. As a founder and CTO I own the whole lifecycle: architecture decisions, payments, auth, deployment, and the pixel-level UI. One person, end to end, from idea to live users.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-[var(--bg)] pt-32 md:pt-44">
      {/* statement + side paragraph */}
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1.7fr_1fr] md:gap-20">
          <h2 className="text-4xl font-medium leading-[1.15] tracking-tight text-[var(--dark)] md:text-6xl">
            <RevealText text="Turning ideas into shipped, AI-powered products for real communities." />
          </h2>
          <div className="flex flex-col justify-between gap-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              I started in architecture, learning to think in systems and design with purpose.
              Software won me over when I saw how far an idea could scale beyond a single
              building. Today I study computer science with an AI concentration at Wilmington
              University (&rsquo;28), serve as CTO at ENTURK, and build nkae.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base leading-relaxed text-neutral-600 md:text-lg"
            >
              From Accra to New Castle, Delaware, adaptability is the throughline. Off the keyboard I
              shoot photography and video, and that eye for story shapes how I build: products
              should work, read clearly, and feel like something.
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-3xl text-[var(--dark)]"
              aria-hidden
            >
              ↓
            </motion.span>
          </div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          className="mt-16 h-px origin-left bg-neutral-300"
        />
      </div>

      {/* parallax photo gallery */}
      <div className="mt-16">
        <ParallaxGallery />
      </div>

      {/* numbered services */}
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-28 md:px-12 md:pt-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-base text-neutral-500"
        >
          I can help you with ...
        </motion.p>
        <div>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              className="group grid gap-4 border-t border-neutral-300 py-12 last:border-b md:grid-cols-[100px_1fr_1.2fr] md:gap-10 md:py-16"
            >
              <p className="font-mono text-sm text-neutral-400 transition-colors duration-300 group-hover:text-[var(--accent)]">
                {service.index}
              </p>
              <h3 className="text-2xl font-medium tracking-tight text-[var(--dark)] transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                {service.title}
              </h3>
              <p className="max-w-md leading-relaxed text-neutral-600">{service.body}</p>
            </motion.div>
          ))}
        </div>

        {/* socials */}
        <div className="mt-16 flex items-center gap-3">
          {SOCIALS.map((social, i) => (
            <motion.div
              key={social.label}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 + i * 0.08 }}
            >
              <Magnetic>
                <a
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-300 bg-white font-mono text-sm text-neutral-600 transition-colors duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                  {social.short}
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
