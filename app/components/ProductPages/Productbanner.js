"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Productbanner() {

  const params = useParams();
  const slug = params?.slug || [];

  const [current, setCurrent] = useState(0);
  const [banner, setBanner] = useState(null);

  const formatTitle = (text = "") =>
    text
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  /* ================= FETCH ================= */
  useEffect(() => {

    const fetchParent = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/parentcategorybanner/banner/${slug[0]}`
      );
      const data = await res.json();
      if (data?.success) setBanner(data.banner);
    };

    const fetchSub = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/subcategory/banner/${slug[0]}/${slug[1]}`
      );
      const data = await res.json();
      if (data?.success) setBanner(data.banner);
    };

    if (!slug.length) {
      setBanner(null);
    }
    else if (slug.length === 1) {
      fetchParent();
    }
    else {
      fetchSub();
    }

  }, [slug]);

  const image =
    banner?.bannerImage?.url || "/images/carousel/c1.webp";

  const title =
    banner?.title || formatTitle(slug?.[slug.length - 1] || "Products");

  const subtitle =
    banner?.subtitle || "";

  const description =
    banner?.description || "";

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">

      {/* Background Image */}
      <img
        src={image}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-6 md:px-16">

        {/* Breadcrumb */}
        <div className="absolute bottom-6 left-6 md:left-16 text-sm text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white">Products</Link>

          {slug.map((s, i) => (
            <span key={i}>
              <span className="mx-2">/</span>
              {formatTitle(s)}
            </span>
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            {title}
          </h1>

          {subtitle && (
            <h2 className="text-xl md:text-2xl text-orange-400 mt-4">
              {subtitle}
            </h2>
          )}

          {description && (
            <div
              className="mt-4 text-gray-200 text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </motion.div>

      </div>
    </div>
  );
}