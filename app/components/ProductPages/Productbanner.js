"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title1: "SMART",
    title2: "NETWORKING",
    title3: "FORTIFIED",
    title4: "SECURITY",
    description:
      "Experience the command of truly blazing-fast Wi-Fi and proactive, AI-powered protection, seamlessly integrated and effortlessly managed from a single, intuitive app on your smartphone.",
    img: "/images/carousel/c1.webp",
  },
  {
    id: 2,
    title1: "INTELLIGENT",
    title2: "SOLUTIONS",
    title3: "CONNECTED",
    title4: "LIFESTYLE",
    description:
      "Discover the power of smart technology that brings your devices together for a seamless, connected experience — designed for convenience and security.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    title1: "INNOVATIVE",
    title2: "TECHNOLOGY",
    title3: "ADVANCED",
    title4: "PERFORMANCE",
    description:
      "Empower your business with next-gen solutions that ensure speed, safety, and reliability — built for the future of digital innovation.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Productbanner() {
    
  const [current, setCurrent] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <img
            src={slides[current].img}
            alt={slides[current].title1}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
            {/* Animated text block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {slides[current].title1}{" "}
                <span className="text-teal-400">{slides[current].title2}</span>
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2">
                {slides[current].title3}{" "}
                <span className="text-orange-400">{slides[current].title4}</span>
              </h2>
              <p className="text-gray-200 mt-4 text-sm sm:text-base md:text-lg">
                {slides[current].description}
              </p>

              {/* Buttons */}
              <div className="flex gap-4 mt-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-teal-400 to-orange-400 text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition"
                >
                  Contact Us
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition"
                >
                  Know More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaArrowLeft />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        <FaArrowRight />
      </motion.button>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${current === idx ? "bg-orange-400 scale-110" : "bg-white/50"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
