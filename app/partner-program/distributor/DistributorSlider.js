'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHandshake,
  FaNetworkWired,
  FaHeadset,
  FaArrowRight,
} from 'react-icons/fa';

export default function DistributorSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80',
      title: 'Become a TENDA Distributor',
      subtitle:
        'Lead the networking market with a globally trusted brand',
      icon: <FaHandshake className="w-14 h-14" />,
    },
    {
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
      title: 'Enterprise Networking Portfolio',
      subtitle:
        'Routers, switches, access points & ISP-grade solutions',
      icon: <FaNetworkWired className="w-14 h-14" />,
    },
    {
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80',
      title: 'Nationwide Partner Support',
      subtitle:
        'Sales enablement, logistics & 24/7 technical assistance',
      icon: <FaHeadset className="w-14 h-14" />,
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
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/60" />

            {/* -------- Distributor Content (ADDED) -------- */}
            {/* <div className="relative h-full flex items-center justify-center px-4 md:px-8">
              <div className="text-center max-w-4xl mx-auto text-white">
                <div className="flex justify-center mb-8">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur">
                    {slide.icon}
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/contactus">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full text-base md:text-lg font-semibold flex items-center gap-3 shadow-lg"
                    >
                      Become a Distributor
                      <FaArrowRight />
                    </motion.button>
                  </Link>
                </div>
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
              className={`w-3 h-3 rounded-full transition ${i === currentSlide ? 'bg-white' : 'bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
