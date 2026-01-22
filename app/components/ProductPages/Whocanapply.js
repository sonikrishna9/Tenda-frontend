"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaChartLine,
  FaDollarSign,
  FaHeadset,
  FaHeart,
  FaRegEdit,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import "swiper/css";

/* ------------------ ANIMATIONS ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const leftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const rightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const floatVariant = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.3 } },
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ------------------ STATIC DATA ------------------ */

const data = [
  {
    title: "IT & Networking Product Resellers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply1.jpg",
  },
  {
    title: "Distributors & Wholesalers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply2.png",
  },
  {
    title: "System Integrators",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply3.jpg",
  },
  {
    title: "Networking Solutions Providers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply4.jpg",
  },
  {
    title: "E-Commerce & Retail Partners",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply4.jpg",
  },
];

const items = [
  { icon: <FaHome size={26} />, label: "High Quality Products" },
  { icon: <FaChartLine size={26} />, label: "Strong Market Reputation" },
  { icon: <FaDollarSign size={26} />, label: "Attractive Margins" },
  { icon: <FaHeadset size={26} />, label: "Marketing & Technical Support" },
  { icon: <FaHeart size={26} />, label: "Nationwide Distribution Network" },
];

/* ------------------ RESPONSIVE ITEM COUNT ------------------ */

const getItemsCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

/* ------------------ COMPONENT ------------------ */

export default function WhoCanApply() {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [sections, setSections] = useState([]);
  const [itemsCount, setItemsCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const sliderRef = useRef(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  /* ------------------ FETCH CATEGORIES ------------------ */

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/parentcategory/getall`);
      const data = await res.json();

      if (data?.success) {
        setSections(data.parentcategory || []);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ------------------ RESPONSIVE ------------------ */

  useEffect(() => {
    const handleResize = () => setItemsCount(getItemsCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------ SLIDER LOGIC ------------------ */

  const nextCategories = () => {
    if (sections.length <= itemsCount) return;
    setCurrentCategoryIndex((prev) =>
      prev + 1 > sections.length - itemsCount ? 0 : prev + 1
    );
  };

  const prevCategories = () => {
    if (sections.length <= itemsCount) return;
    setCurrentCategoryIndex((prev) =>
      prev === 0 ? sections.length - itemsCount : prev - 1
    );
  };

  const handleViewProducts = () => {
    router.push("/all-product");
  };

  const visibleCategories = sections.slice(
    currentCategoryIndex,
    currentCategoryIndex + itemsCount
  );

  /* ------------------ SKELETON ------------------ */

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden animate-pulse h-[280px]">
      <div className="h-3/5 bg-gray-200" />
      <div className="p-6">
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  );


  return (
    <>
      <div className="py-14 px-4 md:px-12 lg:px-16 text-center">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[26px] md:text-[30px] font-semibold mb-4"
          style={{
            background: "linear-gradient(90deg, #47d8dd, #eb5b32)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Enjoy blazing–fast Wi-Fi7 BE5100<br />
          throughout your home
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#666] max-w-[760px] mx-auto leading-[1.7] mb-12 text-[15px]"
        >
          Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps.
          The unique Multi-Link Operation technology of Wi-Fi 7, dual-band
          simultaneous transmission is possible with Wi-Fi 7 terminal devices,
          the network speed is faster than the BE3600 and the network latency is lower.
        </motion.p>

        {/* ICON SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          lg:grid-cols-5 
          gap-10 
          justify-items-center
        "
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              {/* ICON CIRCLE */}
              <div
                className="w-[70px] h-[70px] flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(255, 138, 101, 0.18)", // peach background (soft)
                }}
              >
                <div
                  className="text-[#ff845a]"
                  style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
                >
                  {item.icon}
                </div>
              </div>

              {/* LABEL */}
              <p className="text-[#555] text-[14.5px] max-w-[130px] leading-[1.4] font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="container py-5">

        {/* UPDATED HEADING -- EXACTLY LIKE SECOND IMAGE */}
        <div className="mb-8 ml-[8%]">
          <h2 className="fw-bold text-[28px] text-[#2d2d2d] mb-2">
            Who Can Apply ?
          </h2>

          <p className="text-[#6f6f6f] max-w-[420px] leading-[1.6] mb-3">
            Designed for partners ready to deliver trusted security solutions.
          </p>

          <div
            className="h-[3px] w-[55px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #47d8dd, #eb5b32)",
            }}
          ></div>
        </div>

        {/* LIST SECTION */}
        <div className="flex flex-col gap-12 px-3 lg:px-16">
          {data.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isEven ? rightVariant : leftVariant}
                whileHover="hover"
                className={`
                flex flex-col items-center text-center w-full gap-5 mx-auto
                md:flex-row md:text-left md:gap-6
                ${isEven ? "md:flex-row-reverse" : ""}
                lg:max-w-[650px]
                ${isEven ? "lg:mr-0 lg:ml-auto" : "lg:ml-0 lg:mr-auto"}
              `}
              >
                {/* Floating Image */}
                <motion.div
                  variants={floatVariant}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="w-[90px] h-[90px] p-[4px] rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(120deg, #eb5b32, #47d8dd)",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="bg-white rounded-[14px] p-5 w-full max-w-[430px] shadow-md border-2"
                  style={{
                    borderImage: "linear-gradient(120deg, #eb5b32, #47d8dd) 1",
                    borderImageSlice: 1,
                  }}
                >
                  <h6 className="fw-bold mb-1 text-[16px] text-[#333]">
                    {item.title}
                  </h6>
                  <p className="text-muted text-[14px] leading-[1.5] mb-0">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-full">

        {/* How It Works Section */}
        <section className="py-12 px-4 md:px-8 pb-2">
          <h2 className="text-3xl font-bold">How it Works ?</h2>
          <p className="text-gray-500 mt-1">
            Step-by-step collaboration designed for efficiency and trust.
          </p>

          <div className="bg-[#1b1b1b] mt-10 rounded-lg py-10 px-4 flex flex-col md:flex-row 
                        justify-between items-center gap-6">

            {/* Step 1 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                1
              </div>
              <FaRegEdit className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Partner Registration Form</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Fill out the partner registration form and wait for review.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                2
              </div>
              <MdOutlineRateReview className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Application Form Review</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Our team will review your application and update status.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                3
              </div>
              <IoMdCheckmarkCircleOutline className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Approval and Access</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Get full access to pricing, marketing materials, and support.
              </p>
            </motion.div>
          </div>
        </section>

      </div>

      {/* ---------------- CATEGORIES SLIDER ---------------- */}
      <section className="py-16 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Browse Our <span className="text-orange-500">Categories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore TENDA's comprehensive range of networking solutions
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            {sections.length > itemsCount && (
              <>
                <button
                  onClick={prevCategories}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl p-3 rounded-full hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300"
                  aria-label="Previous categories"
                >
                  <FaArrowLeft className="w-5 h-5 text-orange-500" />
                </button>
                <button
                  onClick={nextCategories}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl p-3 rounded-full hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300"
                  aria-label="Next categories"
                >
                  <FaArrowRight className="w-5 h-5 text-orange-500" />
                </button>
              </>
            )}

            {/* Slider Content */}
            <div
              ref={sliderRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-transform duration-300 ease-out"
            >
              {isLoading ? (
                Array.from({ length: itemsCount }).map((_, i) => (
                  <SkeletonCard key={i} isCategory />
                ))
              ) : (
                visibleCategories.map((cat, index) => (
                  <div
                    key={cat._id || index}
                    onClick={handleViewProducts}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="h-48 bg-gradient-to-br from-gray-50 to-white p-6">
                      <img
                        src={cat.images?.url || "/images/placeholder.png"}
                        alt={cat.categoryname}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-gray-900 text-lg mb-3">
                        {cat.categoryname}
                      </h3>
                      <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 group/btn">
                        <span>View Products</span>
                        <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Dots Indicator */}
            {sections.length > itemsCount && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(sections.length / itemsCount) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentCategoryIndex(i * itemsCount)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentCategoryIndex / itemsCount) === i
                      ? "w-6 bg-gradient-to-r from-orange-500 to-amber-500"
                      : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
}
