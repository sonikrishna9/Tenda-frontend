"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";


const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}api/news/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await res.json();

        if (data?.success) {
          setNews(data.data);
        } else {
          setError("News not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-orange-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Error state
  if (error || !news) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {error || "News Not Found"}
        </h2>
        <p className="text-gray-600 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/news"
          className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
        >
          <span>←</span> Back to News
        </Link>
      </div>
    );
  }

  const readTime = Math.ceil(
    (news?.description?.split(" ")?.length || 0) / 200
  );

  const formattedDate = new Date(news.publishedDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="min-h-screen bg-white mt-10">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
          {/* Category */}
          {news.category && (
            <span className="inline-block text-sm font-medium text-orange-600 mb-4">
              {news.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {news.bannerImage?.url && (
        <div className="max-w-5xl mx-auto px-4 -mt-8 mb-12">
          <div className="rounded-xl overflow-hidden">
            <img
              src={news.bannerImage.url}
              alt={news.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Location */}
        {news.location && (
          <div className="flex items-center gap-2 text-gray-600 mb-8 pb-6 border-b border-gray-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">{news.location}</span>
          </div>
        )}

        {/* Description */}
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">
            {news.description}
          </p>
        </div>

        {/* Image Gallery */}
        {/* {news.images?.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {news.images.map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={img.url}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-medium text-gray-900">{news.author}</p>
            </div> */}

            <Link
              href="/news"
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
            >
              <span><IoArrowBack /></span> Back to all news
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}