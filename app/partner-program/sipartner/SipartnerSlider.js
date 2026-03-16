'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { toast } from "react-hot-toast";
import { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHandshake,
  FaNetworkWired,
  FaHeadset,
  FaArrowRight,
} from 'react-icons/fa';

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export default function SipartnerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const [loading, setLoading] = useState(true);
  const [slides, setslides] = useState([])

  const getslides = async () => {
    try {
      const res = await fetch(`${API_URL}api/slider/si-partner`, {
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


  // const slides = [
  //   {
  //     image:
  //       'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000&q=80',
  //     title: 'Become a TENDA Distributor',
  //     subtitle:
  //       'Lead the networking market with a globally trusted brand',
  //     icon: <FaHandshake className="w-14 h-14" />,
  //   },
  //   {
  //     image:
  //       'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
  //     title: 'Enterprise Networking Portfolio',
  //     subtitle:
  //       'Routers, switches, access points & ISP-grade solutions',
  //     icon: <FaNetworkWired className="w-14 h-14" />,
  //   },
  //   {
  //     image:
  //       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000&q=80',
  //     title: 'Nationwide Partner Support',
  //     subtitle:
  //       'Sales enablement, logistics & 24/7 technical assistance',
  //     icon: <FaHeadset className="w-14 h-14" />,
  //   },
  // ];

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
              style={{ backgroundImage: `url(${slide.url})` }}
            />
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
              className={`w-3 h-3 rounded-full transition ${i === currentSlide ? 'bg-white' : 'bg-white/70'
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
