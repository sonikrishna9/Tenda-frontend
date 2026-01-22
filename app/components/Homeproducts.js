"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

/* ------------------ RESPONSIVE ITEMS COUNT ------------------ */
const getItemsCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1280) return 4;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

export default function Homeproducts() {
  const router = useRouter();

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);
  const [itemsCount, setItemsCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const sliderRef = useRef(null);

  /* ------------------ FETCH FEATURED PRODUCTS ------------------ */
  const fetchFeaturedProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}api/product/featuredproducts`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.featuredProducts)) {
        setProducts(
          data.featuredProducts.map((item) => ({
            name: item.title,
            img: item.images?.[0]?.url || "/images/placeholder.png",
            category: item.subCategory || "",
            link: "/all-product",
          }))
        );
      }
    } catch {
      toast.error("Failed to load featured products");
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  /* ------------------ FETCH CATEGORIES ------------------ */
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/parentcategory/getall`);
      const data = await res.json();
      if (data?.success) setSections(data.parentcategory || []);
    } catch {
      toast.error("Failed to load categories");
    }
  }, [API_BASE_URL]);

  /* ------------------ RESPONSIVE OPTIMIZATION ------------------ */
  useEffect(() => {
    const handleResize = () => {
      setItemsCount(getItemsCount());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ------------------ FETCH DATA ------------------ */
  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, [fetchFeaturedProducts, fetchCategories]);

  /* ------------------ SLIDER CONTROLS ------------------ */
  const nextProducts = () => {
    if (products.length <= itemsCount) return;
    setCurrentProductIndex((prev) => (prev + 1) % (products.length - itemsCount + 1));
  };

  const prevProducts = () => {
    if (products.length <= itemsCount) return;
    setCurrentProductIndex((prev) =>
      prev === 0 ? (products.length - itemsCount) : prev - 1
    );
  };

  const nextCategories = () => {
    if (sections.length <= itemsCount) return;
    setCurrentCategoryIndex((prev) => (prev + 1) % (sections.length - itemsCount + 1));
  };

  const prevCategories = () => {
    if (sections.length <= itemsCount) return;
    setCurrentCategoryIndex((prev) =>
      prev === 0 ? (sections.length - itemsCount) : prev - 1
    );
  };

  /* ------------------ VISIBLE ITEMS ------------------ */
  const visibleProducts = products.slice(currentProductIndex, currentProductIndex + itemsCount);
  const visibleCategories = sections.slice(currentCategoryIndex, currentCategoryIndex + itemsCount);

  /* ------------------ CLICK HANDLERS ------------------ */
  const handleViewProducts = (category) => {
    router.push(`/all-product?category=${encodeURIComponent(category)}`);
  };


  const handleProductClick = () => {
    router.push("/all-product");
  };

  /* ------------------ SKELETON LOADER ------------------ */
  const SkeletonCard = ({ isCategory = false }) => (
    <div className={`bg-white rounded-2xl shadow-lg border overflow-hidden animate-pulse ${isCategory ? 'h-[280px]' : 'h-[320px]'
      }`}>
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
                    onClick={() => handleViewProducts(cat.categoryname)}
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

      {/* ---------------- FEATURED PRODUCTS SLIDER ---------------- */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured <span className="text-orange-500">Products</span>
              </h2>
              <p className="text-gray-600">
                Discover our most popular networking solutions
              </p>
            </div>

            {products.length > itemsCount && (
              <div className="flex gap-3">
                <button
                  onClick={prevProducts}
                  className="p-3 rounded-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow"
                  aria-label="Previous products"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600 hover:text-orange-500" />
                </button>
                <button
                  onClick={nextProducts}
                  className="p-3 rounded-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow"
                  aria-label="Next products"
                >
                  <FaArrowRight className="w-5 h-5 text-gray-600 hover:text-orange-500" />
                </button>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: itemsCount }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : (
              visibleProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={handleProductClick}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full">
                      Featured
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-white p-6">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">
                        {product.category || "Networking"}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-2">
                      <span>More Details</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Progress Indicator */}
          {products.length > itemsCount && (
            <div className="mt-10 flex items-center justify-center">
              <div className="w-full max-w-md bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentProductIndex + itemsCount) * 100) / products.length}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}