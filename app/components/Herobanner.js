"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const slidesData = [
  { id: 1, img: "/images/carousel/sliderp1.jpg" },
  { id: 2, img: "/images/carousel/sliderp2.jpeg" },
  { id: 3, img: "/images/carousel/sliderp3.jpeg" },
  { id: 4, img: "/images/carousel/sliderp4.jpeg" },
];

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";


export default function Herobanner() {
  const [current, setCurrent] = useState(0);
  // const slides = slidesData;
  const [loading, setLoading] = useState(true);
  const [slides, setslides] = useState([])

  const getslides = async () => {
    try {
      const res = await fetch(`${API_URL}api/slider/home`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data?.success) {
        setslides(data.data.images);
      } else {
        toast.error("Failed to load Slides");
      }
    } catch (error) {
      toast.error("Error while fetching Slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getslides();
  }, []);


  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* STACK ALL IMAGES (NO UNMOUNTING) */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide._id}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: current === index ? 1 : 0,
            scale: current === index ? 1 : 1.05,
          }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slide.url}
            alt="Hero Slide"
            fill
            priority={index === 0}
            quality={[100,75]}
            sizes="100vw"
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      {/* PREV BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 
        w-12 h-12 flex items-center justify-center 
        bg-white/20 backdrop-blur-md text-white 
        rounded-full hover:bg-white/40 transition z-20"
      >
        <FaArrowLeft />
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 
        w-12 h-12 flex items-center justify-center 
        bg-white/20 backdrop-blur-md text-white 
        rounded-full hover:bg-white/40 transition z-20"
      >
        <FaArrowRight />
      </button>

      {/* INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-3 rounded-full transition-all duration-300 ${current === idx
              ? "w-10 bg-orange-400"
              : "w-3 bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
}