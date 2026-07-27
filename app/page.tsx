"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main>
      <SmoothScroll />
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Footer />
    </main>
  );
}
