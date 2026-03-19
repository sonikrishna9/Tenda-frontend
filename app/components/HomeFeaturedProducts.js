"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function HomeFeaturedProducts() {

  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const slugify = (s = "") =>
    s
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")        // spaces → -
      .replace(/[^\w-]+/g, "")     // remove special chars
      .replace(/--+/g, "-");       // remove double --


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/product/featuredproducts`);
      const data = await res.json();
      if (data?.success) setProducts(data.featuredProducts || []);
    } catch {
      toast.error("Failed to load featured products");
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-orange-500">Products</span>
          </h2>

          <h4 className="text-gray-700 text-xl mt-1">
            India’s Most Trusted Networking Devices
          </h4>

          <p className="text-gray-600 mt-1">
            Our best-selling products are chosen by professionals and consumers alike for their performance, durability, and ease of use.
          </p>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[280px] bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (

          <div className="relative">

            {/* LEFT ARROW */}
            <button
              className="featured-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 
              bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
              hover:bg-orange-500 hover:text-white transition"
            >
              ‹
            </button>

            {/* RIGHT ARROW */}
            <button
              className="featured-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 
              bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
              hover:bg-orange-500 hover:text-white transition"
            >
              ›
            </button>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".featured-prev",
                nextEl: ".featured-next",
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={products.length > 4}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!px-2 !pb-6"
            >

              {products.map((p) => (
                <SwiperSlide key={p._id || p.title}>

                  <div
                    onClick={() =>
                      router.push(`/product/${slugify(p.parentCategory)}/${slugify(p.title)}`)
                    }
                    className="group h-full bg-white rounded-2xl border border-gray-200 
hover:border-black shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer 
flex flex-col"
                  >

                    {/* IMAGE */}
                    <div className="h-44 flex items-center justify-center p-6">
                      <img
                        src={p.images?.[0]?.url || "/images/placeholder.png"}
                        alt={p.title}
                        className="max-h-full object-contain group-hover:scale-105 transition"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="px-6 pb-6 mt-auto">

                      <h3 className="font-semibold text-gray-800 text-sm mb-4">
                        {p.title}
                      </h3>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/product/${slugify(p.parentCategory)}/${slugify(p.title)}`);
                        }}
                        className="w-full py-2.5 rounded-full 
                        bg-gradient-to-r from-orange-500 to-orange-600
                        hover:from-orange-600 hover:to-orange-700
                        text-white font-medium text-sm transition"
                      >
                        More Details
                      </button>

                    </div>

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
