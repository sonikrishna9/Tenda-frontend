'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from "next/link"
import { toast } from "react-hot-toast";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from 'react-icons/fa';

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export default function DealerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSlides = async () => {
    try {
      const res = await fetch(`${API_URL}api/slider/dealer`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data?.success) {
        setSlides(data.data.images);
      } else {
        toast.error("Failed to load slides");
      }
    } catch (error) {
      toast.error("Error while fetching slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlides();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    if (!slides.length) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative mt-20 w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">

      <div className="relative h-[75vh] md:h-[80vh] overflow-hidden">

        {slides.map((slide, index) => (
          <motion.div
            key={slide._id || index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.05,
            }}
            transition={{ duration: 0.9 }}
          >

            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.url})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        ))}

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 p-3 md:p-4 rounded-full backdrop-blur"
        >
          <FaChevronLeft className="text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 p-3 md:p-4 rounded-full backdrop-blur"
        >
          <FaChevronRight className="text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentSlide(i);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition ${
                i === currentSlide ? 'bg-white' : 'bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}