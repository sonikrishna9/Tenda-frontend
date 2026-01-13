"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDownload,
  FiMapPin,
  FiMessageCircle,
  FiChevronRight,
  FiChevronDown,
  FiPlay,
  FiFileText,
  FiExternalLink,
  FiCalendar,
  FiEye,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";
import { useParams } from "next/navigation";
import HaveQuestion from "../../../components/Haveaquestion";

// PARAMETER JSON
import parametersData from "../../../../parameter.json";

/* ================= UPDATED PARAMETER HELPERS ================= */
const ParameterValue = ({ value, level = 0 }) => {
  if (typeof value === "string" || typeof value === "number") {
    return (
      <span className={`${typeof value === "number" ? "font-semibold text-blue-600" : "text-gray-700"}`}>
        {value}
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex items-start group">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <div className="space-y-4 pl-2 border-l-2 border-gray-200 ml-2">
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="space-y-2">
            <div className="flex items-center">
              <FiChevronRight className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
              <span className="font-medium text-gray-800 capitalize">
                {k.replace(/_/g, " ")}
              </span>
            </div>
            <div className="ml-6">
              <ParameterValue value={v} level={level + 1} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

/* ================= BEAUTIFUL PARAMETER SECTION ================= */
const ParameterSection = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const copyToClipboard = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const highlightMatch = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">{part}</mark>
      ) : (
        part
      )
    );
  };

  // Filter data based on search term
  const filteredData = Object.entries(data).reduce((acc, [sectionKey, sectionValue]) => {
    const filteredParams = Object.entries(sectionValue).filter(([key, value]) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        key.toLowerCase().includes(searchLower) ||
        JSON.stringify(value).toLowerCase().includes(searchLower)
      );
    });

    if (filteredParams.length > 0) {
      acc[sectionKey] = Object.fromEntries(filteredParams);
    }
    return acc;
  }, {});

  const totalParams = Object.values(data).reduce((sum, section) => sum + Object.keys(section).length, 0);
  const filteredTotal = Object.values(filteredData).reduce((sum, section) => sum + Object.keys(section).length, 0);

  return (
    <div className="w-full mt-10">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 opacity-10"></div>
          <div className="p-8 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Technical Specifications</h2>
                <p className="text-gray-600 mt-2">Complete product parameters and specifications</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{totalParams}</div>
                    <div className="text-sm text-gray-500">Total Parameters</div>
                  </div>
                  <div className="h-10 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {Object.keys(data).length}
                    </div>
                    <div className="text-sm text-gray-500">Categories</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search parameters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-4 pl-12 pr-4 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2 text-sm text-gray-500">
                  Found {filteredTotal} parameter{filteredTotal !== 1 ? 's' : ''} matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-6 pb-6">
          <AnimatePresence>
            {Object.entries(filteredData).map(([sectionKey, sectionValue], index) => {
              const isExpanded = expandedSections[sectionKey] !== false;
              const paramCount = Object.keys(sectionValue).length;

              return (
                <motion.div
                  key={sectionKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-4"
                >
                  <motion.button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full group"
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors capitalize">
                              {highlightMatch(sectionKey.replace(/_/g, " "))}
                            </h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-500">
                                {paramCount} parameter{paramCount !== 1 ? 's' : ''}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-green-600">
                                <FiCheckCircle className="w-4 h-4" /> Verified
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 text-sm font-medium">
                            {paramCount}
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2"
                      >
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {Object.entries(sectionValue).map(([key, value]) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 }}
                                whileHover={{ y: -2 }}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 group"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-amber-500"></div>
                                      <h4 className="font-bold text-gray-800 text-lg capitalize group-hover:text-orange-600 transition-colors">
                                        {highlightMatch(key.replace(/_/g, " "))}
                                      </h4>
                                    </div>
                                    <button
                                      onClick={() => copyToClipboard(JSON.stringify(value), `${sectionKey}_${key}`)}
                                      className="text-xs text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-1"
                                    >
                                      {copiedKey === `${sectionKey}_${key}` ? (
                                        <>
                                          <FiCheckCircle className="w-3 h-3 text-green-500" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <FiInfo className="w-3 h-3" />
                                          Click to copy value
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                                <div className="pl-5">
                                  <ParameterValue value={value} />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No Results */}
          {Object.keys(filteredData).length === 0 && searchTerm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <FiEye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No Parameters Found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No parameters match your search for "{searchTerm}". Try a different term or browse all categories.
              </p>
            </motion.div>
          )}

          {/* Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Complete Technical Overview</h3>
                <p className="text-gray-600">
                  All specifications are verified and regularly updated. Contact us for the latest information.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <FiDownload /> Export as PDF
                </button>
                <button className="px-6 py-3 bg-white border-2 border-orange-300 text-orange-600 hover:bg-orange-50 font-medium rounded-xl flex items-center gap-2 transition-all duration-300">
                  <FiAlertCircle /> Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= SUPPORT COMPONENTS WITH CLICK HANDLERS ================= */
const VideoCard = ({ title, description, thumbnail, duration, uploadDate, views, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative">
      <div className="w-full h-48 bg-gradient-to-r from-orange-400 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <FiPlay className="w-8 h-8 text-orange-600 ml-1" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg">
          {duration}
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-xl text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full ml-2 whitespace-nowrap flex-shrink-0">
          Tutorial
        </span>
      </div>

      <p className="text-gray-600 mb-5 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <FiCalendar className="w-4 h-4 mr-2" />
          {uploadDate}
        </div>
        <div className="flex items-center">
          <FiEye className="w-4 h-4 mr-2" />
          {views}
        </div>
      </div>

      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg text-center text-orange-700 font-medium">
        Click to watch
      </div>
    </div>
  </motion.div>
);

const PDFCard = ({ title, description, size, pages, downloadCount, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex items-start gap-5 mb-5">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <FiFileText className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg text-center">
          <div className="text-orange-600 font-bold text-sm">Size</div>
          <div className="text-gray-800 font-semibold">{size}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg text-center">
          <div className="text-orange-600 font-bold text-sm">Pages</div>
          <div className="text-gray-800 font-semibold">{pages}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg text-center">
          <div className="text-orange-600 font-bold text-sm">Downloads</div>
          <div className="text-gray-800 font-semibold">{downloadCount}</div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg text-center text-orange-700 font-medium">
        Click to download or preview
      </div>
    </div>
  </motion.div>
);

export default function ProductDisplay() {
  const { parentCategory, subCategory } = useParams();

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activetab, setactivetab] = useState("feature");
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState({ type: null, title: null });

  const tabs = [
    { id: "parameter", label: "Parameter" },
    { id: "feature", label: "Feature" },
    { id: "support", label: "Support" },
  ];

  // Dummy data for support section
  const supportVideos = [
    {
      id: 1,
      title: "Product Installation Guide",
      description: "Step-by-step tutorial on how to properly install and set up your device",
      duration: "15:42",
      uploadDate: "Jan 15, 2024",
      views: "2.4K views"
    },
    {
      id: 2,
      title: "Advanced Configuration Setup",
      description: "Learn advanced settings and optimization techniques for maximum performance",
      duration: "22:18",
      uploadDate: "Feb 03, 2024",
      views: "1.8K views"
    },
    {
      id: 3,
      title: "Troubleshooting Common Issues",
      description: "Quick solutions for the most common problems users encounter",
      duration: "18:30",
      uploadDate: "Dec 20, 2023",
      views: "3.1K views"
    },
    {
      id: 4,
      title: "Product Features Overview",
      description: "Complete walkthrough of all features and capabilities",
      duration: "12:45",
      uploadDate: "Jan 28, 2024",
      views: "1.2K views"
    }
  ];

  const supportPDFs = [
    {
      id: 1,
      title: "User Manual - Complete Guide",
      description: "Detailed user manual covering all aspects of product operation and maintenance",
      size: "4.2 MB",
      pages: "56 pages",
      downloadCount: "1,245 downloads"
    },
    {
      id: 2,
      title: "Technical Specifications Sheet",
      description: "Complete technical specifications and hardware details",
      size: "1.8 MB",
      pages: "12 pages",
      downloadCount: "892 downloads"
    },
    {
      id: 3,
      title: "Safety & Compliance Guide",
      description: "Important safety information and regulatory compliance documents",
      size: "2.1 MB",
      pages: "24 pages",
      downloadCount: "567 downloads"
    },
    {
      id: 4,
      title: "Warranty & Service Manual",
      description: "Warranty terms, service procedures, and support contacts",
      size: "3.5 MB",
      pages: "32 pages",
      downloadCount: "723 downloads"
    }
  ];

  // Handle video click
  const handleVideoClick = (videoTitle) => {
    setShowMessage({
      type: 'video',
      title: videoTitle,
      message: 'This is a dummy video which will be available shortly. Actual content coming soon!'
    });
    setTimeout(() => setShowMessage({ type: null, title: null }), 3000);
  };

  // Handle PDF click
  const handlePDFClick = (pdfTitle) => {
    setShowMessage({
      type: 'pdf',
      title: pdfTitle,
      message: 'This is a dummy PDF which will be available shortly. Actual document coming soon!'
    });
    setTimeout(() => setShowMessage({ type: null, title: null }), 3000);
  };

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    if (!parentCategory || !subCategory) return;

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    fetch(
      `${API_BASE_URL}/api/product/single-product/${decodeURIComponent(
        parentCategory
      )}/${decodeURIComponent(subCategory)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.category);
        }
      });
  }, [parentCategory, subCategory]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const images = product.images?.map((img) => img.url) || [];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* ================= NOTIFICATION MESSAGE ================= */}
      <AnimatePresence>
        {showMessage.type && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className={`rounded-2xl shadow-2xl border-2 p-6 max-w-md ${showMessage.type === 'video'
              ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${showMessage.type === 'video'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}>
                  {showMessage.type === 'video' ? (
                    <FiPlay className="w-7 h-7 text-white" />
                  ) : (
                    <FiFileText className="w-7 h-7 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1">{showMessage.title}</h4>
                  <p className="text-gray-600 text-sm">{showMessage.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TOP SECTION ================= */}
      <div className="w-full flex flex-col md:flex-row gap-10 p-5 md:p-10 mt-[5rem]">
        {/* LEFT */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={product.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-3/4 rounded-xl shadow-md"
          />

          <div className="flex items-center gap-3 mt-5">
            <button onClick={handlePrev} className="p-2 rounded-full border">
              <FiArrowLeft />
            </button>

            <div className="flex gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-16 h-16 rounded-md border cursor-pointer overflow-hidden ${currentIndex === i
                    ? "ring-2 ring-orange-500"
                    : "hover:scale-105"
                    }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="p-2 rounded-full border">
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2">
          <span className="bg-black text-white px-3 py-1 rounded text-sm">
            {product.subCategory}
          </span>

          <h2 className="text-2xl md:text-3xl font-bold mt-3">
            {product.title}
          </h2>

          <p className="text-gray-600 mt-2">{product.subtitle}</p>

          <div className="mt-5 space-y-2">
            {product.uspPoints?.map((usp, i) => (
              <p key={i} className="text-gray-700">• {usp}</p>
            ))}
          </div>

          <p className="text-gray-600 mt-5">{product.description}</p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-md">
              <FiDownload /> Download Datasheet
            </button>
            <button className="flex items-center gap-2 bg-gray-200 px-5 py-2 rounded-md">
              <FiMapPin /> Where to Buy ?
            </button>
            <button className="flex items-center gap-2 bg-white border px-5 py-2 rounded-md">
              <FiMessageCircle /> Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-6 justify-center my-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setactivetab(tab.id)}
            className="cursor-pointer flex flex-col items-center"
          >
            <span
              className={`${activetab === tab.id
                ? "text-zinc-800 font-semibold"
                : "text-zinc-500"
                }`}
            >
              {tab.label}
            </span>

            {activetab === tab.id && (
              <div className="w-20 h-[3px] mt-1 bg-gradient-to-r from-[#7DD8D0] to-[#F0622B]" />
            )}
          </div>
        ))}
      </div>

      {/* ================= TAB CONTENT ================= */}
      {activetab === "parameter" && (
        <ParameterSection data={parametersData} />
      )}

      {activetab === "feature" && (
        <div className="bg-[#0A0907] rounded-b-[2rem] pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-bold text-center pt-14"
          >
            <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
              Enjoy blazing-fast Wi-Fi7 BE5100 <br /> throughout your home
            </span>
          </motion.h2>

          <img
            src="/images/products/whocanapply/mainbgbanner.png"
            className="h-[55%] w-4/5 mx-auto"
          />

          {!viewDetailsOpen && (
            <div
              className="flex justify-center"
              onClick={() => setViewDetailsOpen(true)}
            >
              <button
                className="text-white px-6 py-3 rounded-md"
                style={{
                  background:
                    "linear-gradient(90deg, #612F1B 0%, rgba(254,129,81,0.8) 51.92%, #612F1B 100%)",
                }}
              >
                View Details
              </button>
            </div>
          )}

          {viewDetailsOpen && (
            <div className="view-details-open-tab">
              {["4", "5", "6", "7", "8", "9"].map((img) => (
                <img
                  key={img}
                  src={`/images/featuretab/${img}.png`}
                  className="w-4/5 mx-auto"
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activetab === "support" && (
        <div className="py-10 px-5 md:px-10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Product Support & Resources
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find tutorials, documentation, and resources to get the most out of your product
              </p>
            </div>

            {/* Video Tutorials Section */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-3"></div>
                    Video Tutorials
                  </h3>
                  <p className="text-gray-600 mt-1">Click on any video to watch</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2 rounded-lg">
                  <span className="text-orange-600 font-medium">{supportVideos.length} videos</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    {...video}
                    onClick={() => handleVideoClick(video.title)}
                  />
                ))}
              </div>
            </div>

            {/* Documentation Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <div className="w-3 h-8 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full mr-3"></div>
                    Documentation & Manuals
                  </h3>
                  <p className="text-gray-600 mt-1">Click on any document to download or preview</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2 rounded-lg">
                  <span className="text-orange-600 font-medium">{supportPDFs.length} documents</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportPDFs.map((pdf) => (
                  <PDFCard
                    key={pdf.id}
                    {...pdf}
                    onClick={() => handlePDFClick(pdf.title)}
                  />
                ))}
              </div>
            </div>

            {/* Support Contact */}
            <div className="mt-16 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Need Additional Help?</h3>
                  <p className="text-gray-600">Contact our support team for personalized assistance</p>
                </div>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300">
                  <FiMessageCircle /> Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <HaveQuestion />
    </>
  );
}