"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

/* ---------------- DUMMY SLIDES (ADDED ONLY) ---------------- */
const dummySlides = [
  {
    id: 1,
    title1: "Build",
    title2: "Modern Websites",
    title3: "",
    title4: "",
    description: "High performance and scalable web solutions.",
    img: "/images/carousel/sliderp1.jpg",
  },
  {
    id: 2,
    title1: "Design",
    title2: "Creative UI",
    title3: "",
    title4: "",
    description: "Clean UI with smooth animations.",
    img: "/images/carousel/sliderp2.jpeg",
  },
  {
    id: 3,
    title1: "Develop",
    title2: "Fast Apps",
    title3: "",
    title4: "",
    description: "React & Next.js powered applications.",
    img: "/images/carousel/sliderp3.jpeg",
  },
  {
    id: 4,
    title1: "Scale",
    title2: "Your Business",
    title3: "",
    title4: "",
    description: "Secure, scalable and future-ready solutions.",
    img: "/images/carousel/sliderp4.jpeg",
  },
];

export default function Herobanner() {
  const [current, setCurrent] = useState(0);

  /* ---------------- SLIDES STATE (OPTIMIZED) ---------------- */
  const [slides] = useState(dummySlides);

  /* ---------------- FETCH SLIDERS ---------------- */
  // useEffect(() => {
  //   const fetchSliders = async () => {
  //     try {
  //       const res = await fetch(
  //         "/sliders?type=homepage"
  //       );
  //       const data = await res.json();

  //       if (data?.status && data?.data?.length) {
  //         // Map API data to UI format
  //         const formattedSlides = data.data.map((item) => ({
  //           id: item.id,
  //           title1: item.title,
  //           title2: item.subtitle,
  //           title3: "",
  //           title4: "",
  //           description: "",
  //           img: `http://127.0.0.1:8000/storage/${item.image}`,
  //         }));

  //         setSlides(formattedSlides);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch sliders:", error);
  //     }
  //   };

  //   fetchSliders();
  // }, []);

  /* ---------------- AUTO SLIDE (PERFORMANCE SAFE) ---------------- */
  useEffect(() => {
    if (!slides.length) return;

    let timer;

    const startSlider = () => {
      timer = setInterval(() => {
        setCurrent((prev) =>
          prev === slides.length - 1 ? 0 : prev + 1
        );
      }, 6000);
    };

    const stopSlider = () => {
      if (timer) clearInterval(timer);
    };

    startSlider();

    const handleVisibility = () => {
      document.hidden ? stopSlider() : startSlider();
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopSlider();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [slides.length]);

  /* ---------------- HANDLERS (MEMOIZED) ---------------- */
  const nextSlide = useCallback(() => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }, [slides.length]);

  /* ---------------- SAFETY CHECK ---------------- */
  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] xl:h-[90vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src={slides[current].img}
            alt={slides[current].title1}
            fill
            priority={current === 0}
            quality={100}
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {slides[current].title1}{" "}
                <span className="text-teal-400">
                  {slides[current].title2}
                </span>
              </h2>

              {slides[current].description && (
                <p className="text-gray-200 mt-4 text-sm sm:text-base md:text-lg">
                  {slides[current].description}
                </p>
              )} */}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <FaArrowLeft />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full"
      >
        <FaArrowRight />
      </motion.button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3">
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
