"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiHeart,
  FiDownload,
  FiEye,
  FiUser,
  FiCalendar,
  FiTag,
  FiCamera,
} from "react-icons/fi";

/* ================= DUMMY DATA - 6 CARDS ONLY ================= */
const galleryImages = [
  {
    id: 1,
    title: "Mountain Sunrise",
    description: "Beautiful sunrise over snow-capped mountains with golden light.",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format",
    photographer: "Alex Thompson",
    date: "2024-02-15",
    likes: 234,
    views: 1243,
    tags: ["mountains", "sunrise", "nature"],
  },
  {
    id: 2,
    title: "Modern Architecture",
    description: "Minimalist building design with clean lines and shadows.",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format",
    photographer: "Sarah Chen",
    date: "2024-02-10",
    likes: 189,
    views: 987,
    tags: ["architecture", "modern", "minimal"],
  },
  {
    id: 3,
    title: "Ocean Waves",
    description: "Powerful waves crashing against rocky coastline at sunset.",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format",
    photographer: "Michael Ray",
    date: "2024-02-05",
    likes: 312,
    views: 1567,
    tags: ["ocean", "waves", "coast"],
  },
  {
    id: 4,
    title: "Urban Life",
    description: "Vibrant city street with bustling activity and neon lights.",
    category: "City",
    imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format",
    photographer: "Jessica Wong",
    date: "2024-01-28",
    likes: 276,
    views: 1432,
    tags: ["city", "urban", "night"],
  },
  {
    id: 5,
    title: "Desert Dunes",
    description: "Rolling sand dunes creating abstract patterns in golden light.",
    category: "Landscape",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format",
    photographer: "David Kumar",
    date: "2024-01-20",
    likes: 198,
    views: 876,
    tags: ["desert", "sand", "landscape"],
  },
  {
    id: 6,
    title: "Forest Path",
    description: "Mystical forest path covered in autumn leaves and soft light.",
    category: "Nature",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format",
    photographer: "Emma Watson",
    date: "2024-01-15",
    likes: 345,
    views: 1890,
    tags: ["forest", "autumn", "path"],
  },
];

/* ================= STATS CARD ================= */
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-orange-500" />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <p className="text-lg font-semibold text-gray-800 mt-1">{value}</p>
  </div>
);

/* ================= IMAGE CARD ================= */
const ImageCard = ({ image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-xl transition-all duration-300"
      onClick={() => onClick(image)}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-medium rounded-full shadow-lg">
            {image.category}
          </span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        >
          <FiHeart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </button>

        {/* View Count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiEye className="w-3 h-3" />
          <span>{image.views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
          {image.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {image.description}
        </p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <FiUser className="w-3 h-3 text-orange-600" />
            </div>
            <span className="text-gray-600">{image.photographer}</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <FiHeart className="w-3 h-3" />
            <span>{image.likes}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {image.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {image.tags.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{image.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ================= LIGHTBOX MODAL ================= */
const LightboxModal = ({ image, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

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
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white rounded-xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        >
          <FiX className="w-5 h-5 text-white" />
        </button>

        {/* Image Section */}
        <div className="md:w-2/3 h-64 md:h-auto bg-black">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/3 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{image.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{image.description}</p>

          {/* Metadata Grid */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FiUser className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Photographer</p>
                <p className="font-medium text-gray-800">{image.photographer}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FiCalendar className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Date</p>
                <p className="font-medium text-gray-800">{image.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FiTag className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Category</p>
                <p className="font-medium text-gray-800">{image.category}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-gray-500 text-xs">Views</p>
              <p className="text-lg font-semibold text-gray-800">{image.views}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-gray-500 text-xs">Likes</p>
              <p className="text-lg font-semibold text-gray-800">{image.likes}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FiDownload className="w-4 h-4" />
                Download Image
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= MAIN GALLERY COMPONENT ================= */
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  // Get unique categories
  const categories = ["all", ...new Set(galleryImages.map(img => img.category))];

  // Filter images
  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Calculate stats
  const totalViews = galleryImages.reduce((sum, img) => sum + img.views, 0);
  const totalLikes = galleryImages.reduce((sum, img) => sum + img.likes, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gallery</h1>
              <p className="text-gray-600 mt-1">Curated collection of stunning photography</p>
            </div>

            {/* Stats */}
            {/* <div className="flex gap-3">
              <StatCard icon={FiEye} label="Total Views" value={totalViews.toLocaleString()} />
              <StatCard icon={FiHeart} label="Total Likes" value={totalLikes.toLocaleString()} />
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                filter === category
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div> */}

        {/* Gallery Grid - 6 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={setSelectedImage}
            />
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredImages.length} of {galleryImages.length} images
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