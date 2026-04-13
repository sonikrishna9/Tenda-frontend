"use client";

import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { toast } from "react-hot-toast";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export default function Homeblog() {
  const [blogdata, setBlogdata] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center md:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          In The <strong className="text-orange-600 font-semibold">News</strong>
        </h2>
        <p className="text-gray-500 mt-2">
          Stay updated with the latest from Tenda India:
        </p>
        <div className="h-[2px] w-16 bg-gradient-to-r from-orange-400 to-teal-400 mt-3 mx-auto md:mx-0" />
      </div>

      {/* SLIDER */}
      <div className="max-w-7xl mx-auto relative">
        {/* PREV */}
        <button className="blog-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
          ‹
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".blog-prev",
            nextEl: ".blog-next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={blogdata.length > 3}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={i}>
                <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
              </SwiperSlide>
            ))
            : blogdata.map((item) => (

              <SwiperSlide key={item._id}>
                <div className="bg-white rounded-xl border shadow-sm p-3">
                  <Link href={`/blogs/${item.slug}`} className="cursor-pointer">
                    <img
                      src={item.featuredImage?.url}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    <div className="mt-4 px-2 pb-4">

                      <h3 className="text-gray-800 font-medium text-lg mb-3 line-clamp-2">
                        {item.title}
                      </h3>


                      <button className="flex items-center gap-2 bg-orange-500 text-white text-sm px-4 py-2 rounded-md hover:bg-orange-600">
                        Read More <FaArrowRight size={12} />
                      </button>

                    </div>

                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* NEXT */}
        <button className="blog-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 
          bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center">
          ›
        </button>
      </div>
    </section >
  );
}