"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiHeart,
  FiDownload,
  FiEye,
  FiUser,
  FiCalendar,
  FiTag,
  FiMapPin,
  FiUsers,
  FiGrid,
  FiList,
} from "react-icons/fi";

/* ================= DUMMY DATA - EVENT GALLERY ================= */
const galleryImages = [
  {
    id: 1,
    title: "Annual Tech Conference 2024",
    description: "Keynote session featuring industry leaders discussing AI and future tech innovations. Over 500 attendees gathered for this inspiring event.",
    category: "Conference",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format",
      "https://images.unsplash.com/photo-1515169067865-5387ec356754?w=800&auto=format"
    ],
    photographer: "Michael Chen",
    date: "March 15, 2024",
    location: "San Francisco Convention Center",
    // attendees: 520,
    // likes: 345,
    // views: 2100,
    // tags: ["tech", "conference", "innovation"],
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Amazing performances by top artists at the annual summer music festival. Crowd enjoying live music under the stars.",
    category: "Concert",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format"
    ],
    photographer: "Sarah Johnson",
    date: "March 10, 2024",
    location: "Central Park, NY",
    // attendees: 2500,
    // likes: 892,
    // views: 4500,
    // tags: ["music", "festival", "concert"],
  },
  {
    id: 3,
    title: "Charity Gala Dinner",
    description: "Fundraising event for local children's hospital with silent auction and dinner. Raised over $50,000 for charity.",
    category: "Fundraiser",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format"
    ],
    photographer: "David Williams",
    date: "March 5, 2024",
    location: "Grand Hotel, Chicago",
    // attendees: 320,
    // likes: 234,
    // views: 1200,
    // tags: ["charity", "gala", "fundraising"],
  },
  {
    id: 4,
    title: "Corporate Team Building",
    description: "Fun outdoor activities and team challenges to boost workplace morale and collaboration.",
    category: "Corporate",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format"
    ],
    photographer: "Emily Brown",
    date: "February 28, 2024",
    location: "Adventure Park, Denver",
    // attendees: 85,
    // likes: 167,
    // views: 890,
    // tags: ["corporate", "team building", "outdoor"],
  },
  {
    id: 5,
    title: "Art Exhibition Opening",
    description: "Contemporary art showcase featuring local artists. Beautiful collection of paintings and sculptures.",
    category: "Art",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format"
    ],
    photographer: "Lisa Anderson",
    date: "February 20, 2024",
    location: "Modern Art Gallery, LA",
    // attendees: 150,
    // likes: 278,
    // views: 1500,
    // tags: ["art", "exhibition", "gallery"],
  },
  {
    id: 6,
    title: "Wedding Celebration",
    description: "Beautiful outdoor wedding ceremony with stunning sunset views. Romantic moments captured throughout the day.",
    category: "Wedding",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format"
    ],
    photographer: "James Wilson",
    date: "February 14, 2024",
    location: "Beach Resort, Miami",
    // attendees: 200,
    // likes: 567,
    // views: 3200,
    // tags: ["wedding", "romantic", "celebration"],
  },
];

/* ================= RESPONSIVE EVENT CARD ================= */
const EventCard = ({ image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={!isMobile ? { y: -4 } : {}}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-300"
      onClick={() => onClick(image)}
    >
      {/* Image Container - Responsive height */}
      <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 lg:h-56 xl:h-64 overflow-hidden">
        <img
          src={image.images[0]}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay - Hidden on mobile for better performance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - Responsive sizing */}
        {/* <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] sm:text-xs font-medium rounded-full shadow-lg">
            {image.category}
          </span>
        </div> */}

        {/* Like Button - Always visible on mobile, hover on desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${isMobile
            ? 'opacity-100 hover:bg-white'
            : 'opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110'
            }`}
          aria-label="Like"
        >
          <FiHeart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>

        {/* Event Date Badge - Responsive */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 text-white text-[10px] sm:text-xs bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          <FiCalendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">{image.date}</span>
        </div>

        {/* View Count - Responsive */}
        {/* <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 text-white text-[10px] sm:text-xs bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          <FiEye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>{image.views >= 1000 ? `${(image.views/1000).toFixed(1)}K` : image.views}</span>
        </div> */}
      </div>

      {/* Content - Responsive padding and text sizes */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1 text-sm sm:text-base">
          {image.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
          {image.description}
        </p>

        {/* Event Details - Responsive layout */}
        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
            <FiMapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 flex-shrink-0" />
            <span className="truncate">{image.location}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
            <FiUsers className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-500 flex-shrink-0" />
            <span>{image.attendees >= 1000 ? `${(image.attendees / 1000).toFixed(1)}K` : image.attendees} attendees</span>
          </div>
        </div>

        {/* Photographer and Likes - Responsive */}
        {/* <div className="flex items-center justify-between text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <FiUser className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-600" />
            </div>
            <span className="text-gray-600 truncate">{image.photographer}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
            <FiHeart className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{image.likes}</span>
          </div>
        </div> */}

        {/* Tags - Responsive */}
        {/* <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
          {image.tags.slice(0, isMobile ? 2 : 3).map((tag, i) => (
            <span
              key={i}
              className="px-1.5 sm:px-2 py-0.5 bg-orange-50 text-orange-600 text-[8px] sm:text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {!isMobile && image.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-full">
              +{image.tags.length - 3}
            </span>
          )}
        </div> */}
      </div>
    </motion.div>
  );
};

/* ================= RESPONSIVE LIGHTBOX MODAL ================= */
const LightboxModal = ({ image, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === image.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? image.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full text-white transition"
        >
          <FiX size={18} />
        </button>

        {/* ================= LEFT SIDE - IMAGE SLIDER ================= */}
        <div className="lg:w-3/5 bg-black relative overflow-hidden flex items-center justify-center">

          <motion.div
            className="flex w-full h-full"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {image.images.map((img, index) => (
              <div
                key={index}
                className="min-w-full h-[300px] sm:h-[400px] lg:h-auto flex items-center justify-center"
              >
                <img
                  src={img}
                  alt="event"
                  className="max-h-full object-contain"
                />
              </div>
            ))}
          </motion.div>

          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
          >
            ❮
          </button>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full text-white transition"
          >
            ❯
          </button>
        </div>

        {/* ================= RIGHT SIDE - CONTENT ================= */}
        <div className="lg:w-2/5 p-6 overflow-y-auto bg-gradient-to-b from-white to-orange-50/40">

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {image.title}
          </h2>

          <p className="text-gray-600 mb-6">
            {image.description}
          </p>

          <div className="space-y-4 text-sm text-gray-700">

            <div className="flex items-center gap-2">
              <FiCalendar className="text-orange-500" />
              <span>{image.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <FiMapPin className="text-orange-500" />
              <span>{image.location}</span>
            </div>

            {/* <div className="flex items-center gap-2">
              <FiUser className="text-orange-500" />
              <span>{image.photographer}</span>
            </div> */}

          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-8 overflow-x-auto">
            {image.images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setCurrentIndex(index)}
                className={`w-20 h-14 object-cover rounded cursor-pointer border-2 ${currentIndex === index
                    ? "border-orange-500"
                    : "border-transparent"
                  }`}
              />
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

/* ================= MAIN GALLERY COMPONENT ================= */
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive grid columns
  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-2 lg:grid-cols-3';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-orange-50/30 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Simple Title - Responsive */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent px-2">
            Event Gallery
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 px-4">
            Memorable moments captured
          </p>
        </div>

        {/* Gallery Grid - Fully Responsive */}
        <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-5 lg:gap-6`}>
          {galleryImages.map((image) => (
            <EventCard
              key={image.id}
              image={image}
              onClick={setSelectedImage}
            />
          ))}
        </div>

        {/* Optional: Show image count on mobile */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
          {galleryImages.length} beautiful moments captured
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <LightboxModal
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}