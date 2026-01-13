"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Homeblog() {
  const newsItems = [
    {
      date: "Feb 13, 2025",
      title: "Nexus IO strengthens its presence in the security solutions sector at Business Expo",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=60",
    },
    {
      date: "Mar 25, 2025",
      title: "Nexus IO Debuts TV Spot with an iconic advertisement trending all over social media…",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60",
    },
    {
      date: "Feb 13, 2025",
      title: "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=60",
    },
    {
      date: "Feb 13, 2025",
      title: "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=60",
    },
    {
      date: "Feb 13, 2025",
      title: "Nexus IO Premieres Star-Studded TV Ad Campaign at National Level",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=60",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % newsItems.length;
      items.push(newsItems[index]);
    }
    return items;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };

  const visibleItems = getVisibleItems();

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
        <div className="h-[2px] w-16 bg-gradient-to-r from-orange-400 to-teal-400 mt-3 mx-auto md:mx-0"></div>
      </div>

      {/* NEWS CARDS SLIDER - 3 CARDS WITH INDIVIDUAL ANIMATION */}
      <div className="max-w-7xl mx-auto relative">
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition hover:bg-gray-50 z-10"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition hover:bg-gray-50 z-10"
          >
            <FaChevronRight className="text-gray-600" />
          </button>

          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-8">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    layout: { duration: 0.5 }
                  }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-3"
                >
                  <div className="overflow-hidden rounded-lg">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="mt-4 px-2 pb-4">
                    <p className="text-sm text-gray-400 mb-1">{item.date}</p>
                    <h3 className="text-gray-800 font-medium text-lg leading-snug mb-3">
                      {item.title}
                    </h3>
                    <button className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600 transition font-medium">
                      Read More <FaArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* SLIDER INDICATORS */}
        <div className="flex justify-center mt-8 space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-orange-500 text-orange-500 px-6 py-2 rounded-md font-medium hover:bg-orange-500 hover:text-white transition"
        >
          View All
        </motion.button>
      </div>
    </section>
  );
}