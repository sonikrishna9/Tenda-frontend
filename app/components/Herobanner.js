"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

/* ---------------- SLIDES ---------------- */
const slidesData = [
  {
    id: 1,
    title1: "Build",
    title2: "Modern Websites",
    description: "High performance and scalable web solutions.",
    img: "/images/carousel/sliderp1.jpg",
  },
  {
    id: 2,
    title1: "Design",
    title2: "Creative UI",
    description: "Clean UI with smooth animations.",
    img: "/images/carousel/sliderp2.jpeg",
  },
  {
    id: 3,
    title1: "Develop",
    title2: "Fast Apps",
    description: "React & Next.js powered applications.",
    img: "/images/carousel/sliderp3.jpeg",
  },
  {
    id: 4,
    title1: "Scale",
    title2: "Your Business",
    description: "Secure, scalable and future-ready solutions.",
    img: "/images/carousel/sliderp4.jpeg",
  },
];

export default function Herobanner() {
  const [current, setCurrent] = useState(0);
  const slides = slidesData;

  /* ---------------- AUTO SLIDER ---------------- */
  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  /* ---------------- HANDLERS ---------------- */
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] xl:h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ✅ FIXED IMAGE */}
          <Image
            src={slides[current].img}
            alt={slides[current].title1}
            fill
            priority={current === 0}   // preload only first slide
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* NAVIGATION */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <FaArrowRight />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              current === idx
                ? "bg-orange-400 scale-110"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
