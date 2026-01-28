"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function HomeFeaturedProducts() {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsCount, setItemsCount] = useState(4);
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
    const handleResize = () => setItemsCount(getItemsCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const visible = products.slice(currentIndex, currentIndex + itemsCount);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured <span className="text-orange-500">Products</span>
            </h2>
            <p className="text-gray-600">
              Discover our most popular networking solutions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: itemsCount }).map((_, i) => (
                <div key={i} className="h-[320px] bg-gray-200 animate-pulse rounded-2xl" />
              ))
            : visible.map((p, i) => (
                <div
                  key={i}
                  onClick={() =>
                    router.push(`/single-product/${p.parentCategory}/${p.subCategory}`)
                  }
                  className="group bg-white rounded-2xl shadow-lg border hover:shadow-xl transition cursor-pointer"
                >
                  <div className="h-48 p-6">
                    <img src={p.images?.[0]?.url} className="w-full h-full object-contain" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold">{p.title}</h3>
                    <button className="mt-4 w-full py-2 bg-orange-500 text-white rounded-full">
                      More Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
