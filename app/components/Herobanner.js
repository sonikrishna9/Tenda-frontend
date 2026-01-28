"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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

  return (
    <section
      className="
        relative w-full overflow-hidden
        min-h-[560px]
        h-[70dvh]
        max-h-[900px]
      "
      style={{ contain: "layout paint" }} // 🔒 isolates layout
    >
      {/* SLIDE */}
      <motion.div
        key={current} // stable key (index-based)
        className="absolute inset-0"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={slides[current].img}
          alt={slides[current].title1}
          fill
          priority={current === 0}
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-3xl w-full text-center">
            {/* text intentionally unchanged */}
          </div>
        </div>
      </motion.div>

      {/* PREV */}
      <button
        onClick={prevSlide}
        className="
          absolute left-3 sm:left-4 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11
          flex items-center justify-center
          bg-black/50 text-white
          rounded-full
          hover:bg-black/70 transition
          z-20
        "
      >
        <FaArrowLeft />
      </button>

      {/* NEXT */}
      <button
        onClick={nextSlide}
        className="
          absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
          w-9 h-9 sm:w-11 sm:h-11
          flex items-center justify-center
          bg-black/50 text-white
          rounded-full
          hover:bg-black/70 transition
          z-20
        "
      >
        <FaArrowRight />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
              current === idx
                ? "bg-orange-400 scale-110"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
