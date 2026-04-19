"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import ProductCategoriesPage from "../../products/ProductCategoriesPage";
import { normalizeMediaUrlsDeep, resolveAssetUrl } from "@/lib/media";

export default function Productbanner() {
  const params = useParams();
  const slug = useMemo(() => {
    if (!params?.slug) return [];
    return Array.isArray(params.slug) ? params.slug : [params.slug];
  }, [params]);

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= HELPERS ================= */

  const formatTitle = (text = "") =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  /* ================= FETCH LOGIC ================= */

  useEffect(() => {
    let ignore = false;

    const fetchBanner = async () => {
      if (!slug.length) {
        setBanner(null);
        return;
      }

      try {
        setLoading(true);

        const base = process.env.NEXT_PUBLIC_API_BASE_URL;

        const url =
          slug.length === 1
            ? `${base}api/parentcategorybanner/banner/${slug[0]}`
            : `${base}api/subcategory/banner/${slug[0]}/${slug[1]}`;

        const res = await fetch(url);

        // if (!res.ok) throw new Error("Failed to fetch banner");

        const data = await res.json();

        if (!ignore && data?.success) {
          setBanner(normalizeMediaUrlsDeep(data.banner));
        }
      } catch (error) {
        console.error("Banner fetch error:", error);
        if (!ignore) setBanner(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchBanner();

    return () => {
      ignore = true; // prevents state update after unmount
    };
  }, [slug]);

  /* ================= DERIVED VALUES ================= */

  const image =
    resolveAssetUrl(banner?.bannerImage?.url) || "/images/carousel/c1.webp";

  const title =
    banner?.title ||
    formatTitle(slug?.[slug.length - 1] || "Products");

  const subtitle = banner?.subtitle || "";
  const description = banner?.description || "";

  /* ================= RENDER ================= */

  return (
    <>
      <div className="relative w-full h-[70vh] overflow-hidden">
        {/* Background */}
        <img
          src={image}
          alt="Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-6 md:px-16">

          {/* Breadcrumb */}
          <div className="absolute bottom-6 left-6 md:left-16 text-sm text-gray-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>

            <Link href="/products" className="hover:text-white">
              Products
            </Link>

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
            transition={{ duration: 0.6 }}
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

            {/* {description && (
              <div
                className="mt-4 text-gray-200 text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )} */}

            {loading && (
              <div className="mt-6 text-sm text-gray-300">
                Loading banner...
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Suspense fallback={<div className="min-h-[40vh]" />}>
        <ProductCategoriesPage />
      </Suspense>

      {/* ================= ABOUT DESCRIPTION ================= */}
      {description && (
        <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
                About Description
                <span className="block h-1 w-20 bg-gradient-to-r from-orange-500 to-amber-500 mt-3 rounded-full" />
              </h2>
            </div>

            {/* HTML Description Content */}
            <div
              className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: description }}
            />

          </div>
        </section>
      )}

    </>
  );
}
