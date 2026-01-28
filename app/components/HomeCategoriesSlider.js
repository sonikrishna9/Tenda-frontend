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

export default function HomeCategoriesSlider() {
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [sections, setSections] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsCount, setItemsCount] = useState(4);
    const [isLoading, setIsLoading] = useState(true);

    const autoSlideRef = useRef(null);

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

    /* ------------------ RESPONSIVE ------------------ */
    useEffect(() => {
        const handleResize = () => setItemsCount(getItemsCount());
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    /* ------------------ AUTO SLIDE ------------------ */
    const startAutoSlide = () => {
        stopAutoSlide();
        autoSlideRef.current = setInterval(() => {
            nextSlide();
        }, 2500);
    };

    const stopAutoSlide = () => {
        if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };

    useEffect(() => {
        if (sections.length > itemsCount) startAutoSlide();
        return stopAutoSlide;
    }, [sections, itemsCount]);

    /* ------------------ SLIDE CONTROLS ------------------ */
    const nextSlide = () => {
        if (sections.length <= itemsCount) return;
        setCurrentIndex((prev) =>
            prev + 1 > sections.length - itemsCount ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        if (sections.length <= itemsCount) return;
        setCurrentIndex((prev) =>
            prev === 0 ? sections.length - itemsCount : prev - 1
        );
    };

    const visibleCategories = sections.slice(
        currentIndex,
        currentIndex + itemsCount
    );

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
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Browse Our <span className="text-orange-500">Categories</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore TENDA's comprehensive range of networking solutions
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-4" />
                </div>

                {/* SLIDER */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={stopAutoSlide}
                    onMouseLeave={startAutoSlide}
                >
                    {/* SLIDE BUTTONS (INSIDE SLIDER) */}
                    {sections.length > itemsCount && (
                        <>
                            <button
                                onClick={() => {
                                    prevSlide();
                                    startAutoSlide();
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                           w-11 h-11 rounded-full bg-white shadow-lg border
                           flex items-center justify-center
                           hover:bg-orange-50 hover:scale-110 transition"
                            >
                                <FaArrowLeft className="text-orange-500" />
                            </button>

                            <button
                                onClick={() => {
                                    nextSlide();
                                    startAutoSlide();
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                           w-11 h-11 rounded-full bg-white shadow-lg border
                           flex items-center justify-center
                           hover:bg-orange-50 hover:scale-110 transition"
                            >
                                <FaArrowRight className="text-orange-500" />
                            </button>
                        </>
                    )}

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10">
                        {isLoading
                            ? Array.from({ length: itemsCount }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))
                            : visibleCategories.map((cat) => (
                                <div
                                    key={cat._id}
                                    onClick={() =>
                                        router.push(
                                            `/all-product?category=${encodeURIComponent(cat.categoryname)}`
                                        )
                                    }
                                    className="group relative bg-white rounded-2xl border
                               shadow-md hover:shadow-2xl hover:border-orange-200
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
                                            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {/* HOVER GLOW */}
                                    <div className="absolute inset-0 rounded-2xl
                                    bg-gradient-to-r from-orange-500/10 to-amber-500/10
                                    opacity-0 group-hover:opacity-100
                                    transition-opacity pointer-events-none" />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
