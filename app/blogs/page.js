"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaTags,
  FaArrowRight,
} from "react-icons/fa";

/* ================= BLOG DATA ================= */

const blogPosts = [
  {
    id: 1,
    title: "How WiFi 6 Routers Are Powering Modern Businesses",
    excerpt:
      "WiFi 6 routers deliver higher speeds, better device handling, and lower latency, making them ideal for offices and enterprises.",
    author: "TENDA Networks",
    date: "Mar 15, 2024",
    tags: ["WiFi 6", "Routers", "Enterprise"],
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6b4f1bcd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Choosing the Right Router for SMBs",
    excerpt:
      "From AC routers to Mesh systems, selecting the right networking solution depends on business size and usage.",
    author: "Network Solutions Team",
    date: "Mar 10, 2024",
    tags: ["SMB", "Routers", "WiFi"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mesh WiFi Systems for Seamless Coverage",
    excerpt:
      "Mesh routers eliminate dead zones and provide seamless WiFi coverage across homes and offices.",
    author: "TENDA Tech Team",
    date: "Mar 5, 2024",
    tags: ["Mesh WiFi", "Coverage"],
    image:
      "https://images.unsplash.com/photo-1597764690523-15bea4c581c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Enterprise Networking Solutions Explained",
    excerpt:
      "Enterprise routers and access points help organizations scale securely and efficiently.",
    author: "Enterprise Solutions",
    date: "Feb 28, 2024",
    tags: ["Enterprise", "Networking", "Security"],
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Why Dealers & Distributors Trust TENDA",
    excerpt:
      "High margins, fast logistics, and strong technical support make TENDA a preferred partner.",
    author: "Partner Program",
    date: "Feb 22, 2024",
    tags: ["Dealers", "Distributors"],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Network Security Essentials for Businesses",
    excerpt:
      "Modern routers enhance security with firewalls, VLANs, and encrypted traffic.",
    author: "Security Team",
    date: "Feb 18, 2024",
    tags: ["Network Security", "IT"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ================= COMPONENT ================= */

export default function Allblogs() {
  return (
    <section className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-12 mt-20">
      <div className="max-w-7xl mx-auto">

        {/* GRID */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {blogPosts.map((blog) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition">

                {/* IMAGE */}
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={blog.image}
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600"
                      >
                        <FaTags className="inline mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* META */}
                  <div className="flex justify-between text-gray-500 text-xs mt-auto">
                    <span className="flex items-center">
                      <FaUser className="mr-1" />
                      {blog.author}
                    </span>
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {blog.date}
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="mt-4 flex items-center text-orange-500 font-medium hover:translate-x-1 transition">
                    Read More
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
