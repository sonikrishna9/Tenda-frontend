"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaTags,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

export default function Allblogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}api/blog/get-all`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data?.success) {
        setBlogs(data.data);
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
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FaSpinner className="w-10 h-10 text-orange-500 animate-spin mb-4" />
          <p className="text-gray-500">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-12 mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* If no blogs found */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blogs found.</p>
          </div>
        ) : (
          /* GRID */
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition">

                  {/* IMAGE */}
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <img
                      src={blog?.featuredImage?.url}
                      alt={blog.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3 hover:text-orange-500 transition">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* TAGS */}
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600 flex items-center gap-1"
                          >
                            <FaTags />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* META */}
                    <div className="flex justify-between text-gray-500 text-xs mt-auto">
                      <span className="flex items-center gap-1">
                        <FaUser />
                        {blog?.author?.name || "Admin"}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="mt-4 flex items-center text-orange-500 font-medium hover:translate-x-1 transition"
                    >
                      Read More
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}