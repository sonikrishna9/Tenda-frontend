"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductFeature = ({ title, featurePictures = [] }) => {
  const [viewMore, setViewMore] = useState(false);

  if (!featurePictures.length) {
    return (
      <div className="text-center text-white py-20">
        No feature images available
      </div>
    );
  }

  const firstImage = featurePictures[0];
  const remainingImages = featurePictures.slice(1);

  return (
    <div className="bg-[#0A0907] rounded-b-[2rem] pb-20">
      {/* ===== TITLE ===== */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-bold text-center pt-16 mb-12"
      >
        <span className="bg-gradient-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
          {title} Features
        </span>
      </motion.h2>

      {/* ===== FIRST IMAGE (ALWAYS VISIBLE) ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <img
          src={firstImage.url}
          alt="Main Feature"
          className="w-full rounded-2xl shadow-2xl object-cover"
        />
      </motion.div>

      {/* ===== VIEW MORE BUTTON ===== */}
      {!viewMore && remainingImages.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setViewMore(true)}
            className="px-10 py-3 text-white rounded-md font-medium tracking-wide
            bg-gradient-to-r from-[#612F1B] via-[#FE8151] to-[#612F1B]
            hover:scale-105 transition-transform"
          >
            View More
          </button>
        </div>
      )}

      {/* ===== REMAINING IMAGES (SINGLE COLUMN) ===== */}
      <AnimatePresence>
        {viewMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 space-y-14 px-4"
          >
            <div className="max-w-6xl mx-auto space-y-14">
              {remainingImages.map((item, index) => (
                <motion.img
                  key={item._id || index}
                  src={item.url}
                  alt={`Feature ${index + 2}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="w-full rounded-2xl shadow-xl object-cover"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFeature;
