'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from "next/link";
import { toast } from "react-hot-toast";
import { normalizeMediaUrlsDeep } from "@/lib/media";

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




/* ------------------ COMPONENT ------------------ */

export default function PartnerSlider() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";


  const getSlides = async () => {
    try {

      const res = await fetch(`${API_URL}api/slider/partner`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data?.success) {
        setSlides(normalizeMediaUrlsDeep(data.data.images || []));
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
              style={{ backgroundImage: `url(${slide.url})` }}
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
