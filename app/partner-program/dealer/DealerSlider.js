'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from "next/link"
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from 'react-icons/fa';

export default function DealerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: '/images/carousel/sliderp1.jpg',
      title: 'Become a TENDA Dealer',
      subtitle:
        'Grow your business with India’s fastest-growing networking brand',
    },
    {
      image: '/images/carousel/c1.webp',
      title: 'High Margin Products',
      subtitle:
        'Access premium routers, switches & enterprise networking solutions',
    },
    {
      image: '/images/carousel/sliderp4.jpeg',
      title: 'Strong Partner Support',
      subtitle:
        'Sales, marketing & technical support to help you scale faster',
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative mt-20 w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* ------------------ SLIDER ------------------ */}
      <div className="relative h-[75vh] md:h-[80vh] overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
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
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* -------- Dealer Content (ADDED) -------- */}
            {/* <div className="relative h-full flex items-center justify-center px-4">
              <div className="text-center text-white max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-xl text-gray-200 mb-8 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>

                <Link href="/contactus">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full text-base md:text-lg font-semibold shadow-lg"
                  >
                    Apply as Dealer
                    <FaArrowRight />
                  </motion.button>
                </Link>
              </div>
            </div> */}
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
              className={`w-3 h-3 rounded-full transition ${i === currentSlide ? 'bg-white' : 'bg-white/60'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
