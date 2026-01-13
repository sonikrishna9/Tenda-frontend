'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaAward,
  FaUsers,
  FaShieldAlt,
  FaLightbulb,
  FaChartLine,
  FaHandshake,
  FaHeadset,
  FaDownload,
  FaPhoneAlt,
  FaArrowRight,
  FaWifi,
  FaNetworkWired,
  FaSignal,
  FaBroadcastTower,
} from 'react-icons/fa';

/* ------------------ DATA ------------------ */

const featuredProducts = [
  {
    category: 'WiFi-6 Router',
    model: 'RX27 Pro',
    icon: <FaWifi className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop',
    description: 'High-performance WiFi-6 router with extended coverage',
  },
  {
    category: 'Managed POE Switch',
    model: 'TEG5328P',
    icon: <FaNetworkWired className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format&fit=crop',
    description: '24-port managed POE switch with 410W power budget',
  },
  {
    category: 'Outdoor AP',
    model: 'O9',
    icon: <FaBroadcastTower className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop',
    description: 'Weatherproof outdoor access point for enterprise deployment',
  },
  {
    category: 'WiFi-7 Router',
    model: 'RE6L Pro',
    icon: <FaSignal className="w-6 h-6" />,
    image:
      'https://images.unsplash.com/photo-1591789033331-02d6b8f64f06?w=800&auto=format&fit=crop',
    description: 'Next-generation WiFi-7 router with multi-gigabit speeds',
  },
];

const benefits = [
  {
    icon: <FaAward className="w-10 h-10" />,
    title: 'Technical Training',
    description: 'Comprehensive product and technical training programs',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <FaUsers className="w-10 h-10" />,
    title: 'Marketing Support',
    description: 'Co-marketing funds and promotional materials',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FaChartLine className="w-10 h-10" />,
    title: 'Sales Enablement',
    description: 'Dedicated sales tools and pre-sales support',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <FaShieldAlt className="w-10 h-10" />,
    title: 'Warranty & Support',
    description: 'Extended warranty and priority technical support',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <FaLightbulb className="w-10 h-10" />,
    title: 'Solution Design',
    description: 'Custom network design and architecture support',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: <FaHandshake className="w-10 h-10" />,
    title: 'Partner Portal',
    description: 'Exclusive access to partner resources and tools',
    color: 'from-indigo-500 to-blue-500',
  },
];

/* ------------------ COMPONENT ------------------ */

export default function PartnerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80',
      title: 'Partner Program',
      subtitle: 'Grow Your Business With TENDA',
      icon: <FaHandshake className="w-14 h-14" />,
    },
    {
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
      title: 'Enterprise Solutions',
      subtitle: 'Complete Networking Portfolio',
      icon: <FaNetworkWired className="w-14 h-14" />,
    },
    {
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80',
      title: 'Technical Support',
      subtitle: '24/7 Professional Assistance',
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

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-4 md:px-8">
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
                  <Link href={"/partner-program/distributor"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-base md:text-lg font-semibold flex items-center gap-3 shadow-lg"
                    >
                      To Become Distributor
                      <FaArrowRight />
                    </motion.button>
                  </Link>

                  <Link href={"/partner-program/dealer"}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-full text-base md:text-lg font-semibold flex items-center gap-3 shadow-lg"
                    >
                      To Become a Dealer
                      <FaArrowRight />
                    </motion.button>
                  </Link>
                </div>

              </div>
            </div>
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
              className="w-3 h-3 rounded-full bg-white/70 hover:bg-white"
            />
          ))}
        </div>
      </div>

      {/* ------------------ REST OF CONTENT (UNCHANGED LOGIC) ------------------ */}
      {/* Benefits, Products & CTA sections remain exactly as you already have */}
    </div>
  );
}
