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
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format",
    photographer: "Michael Chen",
    date: "March 15, 2024",
    location: "San Francisco Convention Center",
    attendees: 520,
    likes: 345,
    views: 2100,
    tags: ["tech", "conference", "innovation"],
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "Amazing performances by top artists at the annual summer music festival. Crowd enjoying live music under the stars.",
    category: "Concert",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format",
    photographer: "Sarah Johnson",
    date: "March 10, 2024",
    location: "Central Park, NY",
    attendees: 2500,
    likes: 892,
    views: 4500,
    tags: ["music", "festival", "concert"],
  },
  {
    id: 3,
    title: "Charity Gala Dinner",
    description: "Fundraising event for local children's hospital with silent auction and dinner. Raised over $50,000 for charity.",
    category: "Fundraiser",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format",
    photographer: "David Williams",
    date: "March 5, 2024",
    location: "Grand Hotel, Chicago",
    attendees: 320,
    likes: 234,
    views: 1200,
    tags: ["charity", "gala", "fundraising"],
  },
  {
    id: 4,
    title: "Corporate Team Building",
    description: "Fun outdoor activities and team challenges to boost workplace morale and collaboration.",
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format",
    photographer: "Emily Brown",
    date: "February 28, 2024",
    location: "Adventure Park, Denver",
    attendees: 85,
    likes: 167,
    views: 890,
    tags: ["corporate", "team building", "outdoor"],
  },
  {
    id: 5,
    title: "Art Exhibition Opening",
    description: "Contemporary art showcase featuring local artists. Beautiful collection of paintings and sculptures.",
    category: "Art",
    imageUrl: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format",
    photographer: "Lisa Anderson",
    date: "February 20, 2024",
    location: "Modern Art Gallery, LA",
    attendees: 150,
    likes: 278,
    views: 1500,
    tags: ["art", "exhibition", "gallery"],
  },
  {
    id: 6,
    title: "Wedding Celebration",
    description: "Beautiful outdoor wedding ceremony with stunning sunset views. Romantic moments captured throughout the day.",
    category: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format",
    photographer: "James Wilson",
    date: "February 14, 2024",
    location: "Beach Resort, Miami",
    attendees: 200,
    likes: 567,
    views: 3200,
    tags: ["wedding", "romantic", "celebration"],
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
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Gradient Overlay - Hidden on mobile for better performance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge - Responsive sizing */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] sm:text-xs font-medium rounded-full shadow-lg">
            {image.category}
          </span>
        </div>

        {/* Like Button - Always visible on mobile, hover on desktop */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 ${
            isMobile 
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
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 text-white text-[10px] sm:text-xs bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          <FiEye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>{image.views >= 1000 ? `${(image.views/1000).toFixed(1)}K` : image.views}</span>
        </div>
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
            <span>{image.attendees >= 1000 ? `${(image.attendees/1000).toFixed(1)}K` : image.attendees} attendees</span>
          </div>
        </div>

        {/* Photographer and Likes - Responsive */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs">
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
        </div>

        {/* Tags - Responsive */}
        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1">
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
        </div>
      </div>
    </motion.div>
  );
};

/* ================= RESPONSIVE LIGHTBOX MODAL ================= */
const LightboxModal = ({ image, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl max-h-[98vh] sm:max-h-[90vh] flex flex-col lg:flex-row bg-white rounded-xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Responsive */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        {/* Image Section - Responsive */}
        <div className={`${isMobile ? 'h-48' : 'lg:w-3/5 h-64 lg:h-auto'} bg-black relative`}>
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-contain"
          />
          
          {/* Mobile Quick Info Overlay */}
          {isMobile && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
              <div className="flex items-center gap-3 text-white/80 text-xs">
                <span className="flex items-center gap-1">
                  <FiEye className="w-3 h-3" /> {image.views}
                </span>
                <span className="flex items-center gap-1">
                  <FiHeart className="w-3 h-3" /> {image.likes}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Details Section - Responsive */}
        <div className={`${isMobile ? 'p-4' : 'lg:w-2/5 p-4 sm:p-6'} overflow-y-auto bg-gradient-to-b from-white to-orange-50/50`}>
          {!isMobile && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{image.title}</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{image.description}</p>
            </>
          )}

          {/* Event Details Grid - Responsive */}
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-2 gap-3'} mb-4 sm:mb-6`}>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-orange-100">
              <p className="text-orange-500 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Event Date</p>
              <p className="font-medium text-gray-800 text-xs sm:text-sm">{image.date}</p>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-orange-100">
              <p className="text-orange-500 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Location</p>
              <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{image.location}</p>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-orange-100">
              <p className="text-orange-500 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Attendees</p>
              <p className="font-medium text-gray-800 text-xs sm:text-sm">{image.attendees}</p>
            </div>
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-orange-100">
              <p className="text-orange-500 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Category</p>
              <p className="font-medium text-gray-800 text-xs sm:text-sm">{image.category}</p>
            </div>
          </div>

          {/* Photographer Info - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-500">Photographer</p>
              <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{image.photographer}</p>
            </div>
          </div>

          {/* Stats - Responsive */}
          <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'} mb-4 sm:mb-6`}>
            <div className="flex-1 bg-white p-2 sm:p-3 rounded-lg text-center">
              <FiEye className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-orange-500 mx-auto mb-0.5 sm:mb-1`} />
              <p className="text-gray-500 text-[8px] sm:text-xs">Views</p>
              <p className="text-sm sm:text-lg font-bold text-gray-800">{image.views}</p>
            </div>
            <div className="flex-1 bg-white p-2 sm:p-3 rounded-lg text-center">
              <FiHeart className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-orange-500 mx-auto mb-0.5 sm:mb-1`} />
              <p className="text-gray-500 text-[8px] sm:text-xs">Likes</p>
              <p className="text-sm sm:text-lg font-bold text-gray-800">{image.likes}</p>
            </div>
          </div>

          {/* Tags - Responsive */}
          <div className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Event Tags</p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {image.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-orange-100 text-orange-700 text-[8px] sm:text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Download Button - Responsive */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`w-full ${
              isMobile ? 'py-2 text-xs' : 'py-3 text-sm sm:text-base'
            } bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50`}
          >
            {isDownloading ? (
              <>
                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-xs sm:text-sm">Downloading...</span>
              </>
            ) : (
              <>
                <FiDownload className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span className="text-xs sm:text-sm">Download Photo</span>
              </>
            )}
          </button>
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