"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function HomeCategoriesSlider() {

    const slugify = (s) => s?.toLowerCase().trim().replace(/\s+/g, "-");

    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /* ------------------ FETCH CATEGORIES ------------------ */
    const fetchCategories = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}api/parentcategory/getall`);
            const data = await res.json();
            if (data?.success) setSections(data.parentcategory || []);
        } catch {
            toast.error("Failed to load categories");
        } finally {
            setIsLoading(false);
        }
    }, [API_BASE_URL]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    /* ------------------ SKELETON ------------------ */
    const SkeletonCard = () => (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 h-[280px] animate-pulse">
            <div className="h-3/5 bg-gray-200" />
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-10 bg-gray-200 rounded-full" />
            </div>
        </div>
    );

    return (
        <section className="py-20 my-10 bg-gradient-to-b from-orange-50/40 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Product <span className="text-orange-500">Categories</span>
                        </h2>
                        <h4 className="text-gray-700 text-xl">
                            Explore Our Networking Solutions
                        </h4>
                        <p className="text-gray-600">
                            Discover a complete range of networking products designed for homes, SMBs, enterprises, and outdoor deployments.
                        </p>
                    </div>
                </div>



                {/* SLIDER */}
                <div className="relative">

                    <button
                        className="cat-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 
  bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
  hover:bg-orange-500 hover:text-white transition"
                    >
                        ‹
                    </button>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: ".cat-prev",
                            nextEl: ".cat-next",
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={sections.length > 4}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                    >

                        {isLoading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <SwiperSlide key={i}>
                                    <SkeletonCard />
                                </SwiperSlide>
                            ))
                            : sections.map((cat) => (
                                <SwiperSlide key={cat._id}>
                                    <div
                                        onClick={() =>
                                            router.push(`/products/${slugify(cat.categoryname)}`)
                                        }
                                        className="group relative my-2 bg-white rounded-2xl border
                                        shadow-md  hover:border-black 
                                        transition-all duration-300 cursor-pointer
                                        hover:-translate-y-2 overflow-hidden"
                                    >
                                        {/* IMAGE */}
                                        <div className="h-48 p-6 bg-gradient-to-br from-gray-50 to-white">
                                            <img
                                                src={cat.images?.url || "/images/placeholder.png"}
                                                alt={cat.categoryname}
                                                className="w-full h-full object-contain
                                                transition-transform duration-500
                                                group-hover:scale-110"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-6 text-center">
                                            <h3 className="font-bold text-gray-900 text-lg mb-4">
                                                {cat.categoryname}
                                            </h3>

                                            <button
                                                className="inline-flex items-center gap-2 px-6 py-2.5
                                                bg-gradient-to-r from-orange-500 to-amber-500
                                                text-white font-semibold rounded-full
                                                shadow hover:shadow-orange-300
                                                transition-all duration-300"
                                            >
                                                View Products
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    <button
                        className="cat-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 
  bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center 
  hover:bg-orange-500 hover:text-white transition"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}