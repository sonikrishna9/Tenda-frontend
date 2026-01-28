"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

/* ================= RESPONSIVE ITEMS COUNT ================= */
const getItemsToShow = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3; // desktop
  if (window.innerWidth >= 640) return 2;  // tablet
  return 1;                                // mobile
};

export default function Homeblog() {
  const newsItems = [
    {
      date: "Feb 13, 2025",
      title:
        "Nexus IO strengthens its presence in the security solutions sector at Business Expo",
      image: "/images/carousel/sliderp4.jpeg",
    },
    {
      date: "Mar 25, 2025",
      title:
        "Nexus IO Debuts TV Spot with an iconic advertisement trending all over social media…",
      image: "/images/carousel/sliderp2.jpeg",
    },
    {
      date: "Feb 13, 2025",
      title:
        "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "/images/carousel/sliderp1.jpg",
    },
    {
      date: "Feb 13, 2025",
      title:
        "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "/images/carousel/c1.webp",
    },
    {
      date: "Feb 13, 2025",
      title:
        "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "/images/carousel/sliderp3.jpeg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const intervalRef = useRef(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, []);

  /* ================= RESPONSIVE HANDLER ================= */
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + newsItems.length) % newsItems.length
    );
  };

  const visibleItems = Array.from({ length: itemsToShow }, (_, i) => {
    return newsItems[(currentIndex + i) % newsItems.length];
  });

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          In The News
        </h2>
        <p className="text-gray-500 mt-2">
          Nexus IO delivers smart & innovative security solutions
        </p>
        <div className="h-[2px] w-16 bg-gradient-to-r from-orange-400 to-teal-400 mt-3 mx-auto md:mx-0" />
      </div>

      {/* SLIDER */}
      <div className="max-w-7xl mx-auto relative overflow-hidden">
        {/* PREV */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-white border border-gray-200
                     shadow-md hover:bg-gray-100 transition z-20"
        >
          <FaChevronLeft className="text-gray-700 text-sm" />
        </button>

        {/* NEXT */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-white border border-gray-200
                     shadow-md hover:bg-gray-100 transition z-20"
        >
          <FaChevronRight className="text-gray-700 text-sm" />
        </button>

        {/* CARDS */}
        <motion.div
          className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2 sm:px-4 md:px-8"
          animate={{ x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="mt-4 px-2 pb-4">
                <p className="text-sm text-gray-400 mb-1">{item.date}</p>
                <h3 className="text-gray-800 font-medium text-lg mb-3">
                  {item.title}
                </h3>
                <button className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Read More <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* DOTS */}
        <div className="flex justify-center mt-8 space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
