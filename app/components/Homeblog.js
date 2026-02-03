"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

/* ================= RESPONSIVE ITEMS COUNT ================= */
const getItemsToShow = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

export default function Homeblog() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [blogdata, setBlogdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);

  /* ================= FETCH BLOGS ================= */
  const getblog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}api/blog/get-all`);
      const data = await res.json();

      if (data?.success) {
        setBlogdata(data.data);
      } else {
        toast.error("Failed to load blogs");
      }
    } catch (error) {
      toast.error("Error while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getblog();
  }, []);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (!blogdata.length) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(intervalRef.current);
  }, [blogdata, itemsToShow]);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= SLIDER LOGIC ================= */
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      (prev + itemsToShow) % blogdata.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      (prev - itemsToShow + blogdata.length) % blogdata.length
    );
  };

  const visibleItems = blogdata.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

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
          className="absolute left-2 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-white border shadow z-20"
        >
          <FaChevronLeft />
        </button>

        {/* NEXT */}
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     w-10 h-10 flex items-center justify-center
                     rounded-full bg-white border shadow z-20"
        >
          <FaChevronRight />
        </button>

        {/* CARDS */}
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <motion.div
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {visibleItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border shadow-sm p-3"
              >
                <img
                  src={item.featuredImage?.url}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <div className="mt-4 px-2 pb-4">
                  <p className="text-sm text-gray-400 mb-1">
                    {item.author?.name}
                  </p>
                  <h3 className="text-gray-800 font-medium text-lg mb-3">
                    {item.title}
                  </h3>

                  <Link href={`/blogs/${item.slug}`}>
                    <button className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600">
                      Read More <FaArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* DOTS */}
        <div className="flex justify-center mt-8 space-x-2">
          {blogdata.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex
                  ? "bg-orange-500"
                  : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
