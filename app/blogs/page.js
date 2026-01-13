"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaTags,
  FaArrowRight,
  FaStar,
  FaFire,
  FaThumbsUp,
  FaRegComment,
  FaShare,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { HiSun } from "react-icons/hi";

/* ================= BLOG DATA ================= */

const blogPosts = [
  {
    id: 1,
    title: "How WiFi 6 Routers Are Powering Modern Businesses",
    excerpt:
      "WiFi 6 routers deliver higher speeds, better device handling, and lower latency, making them ideal for offices and enterprises.",
    author: "TENDA Networks",
    date: "Mar 15, 2024",
    readTime: "6 min read",
    category: "Networking",
    tags: ["WiFi 6", "Routers", "Enterprise"],
    likes: 84,
    comments: 21,
    featured: true,
    trending: true,
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
    readTime: "5 min read",
    category: "Business",
    tags: ["SMB", "Routers", "WiFi"],
    likes: 63,
    comments: 14,
    featured: true,
    trending: false,
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
    readTime: "4 min read",
    category: "WiFi",
    tags: ["Mesh WiFi", "Coverage"],
    likes: 49,
    comments: 9,
    featured: false,
    trending: true,
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
    readTime: "7 min read",
    category: "Enterprise",
    tags: ["Enterprise", "Networking", "Security"],
    likes: 96,
    comments: 27,
    featured: true,
    trending: false,
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
    readTime: "5 min read",
    category: "Partners",
    tags: ["Dealers", "Distributors"],
    likes: 58,
    comments: 11,
    featured: false,
    trending: false,
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
    readTime: "6 min read",
    category: "Security",
    tags: ["Network Security", "IT"],
    likes: 76,
    comments: 19,
    featured: false,
    trending: true,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
  },
];

const categories = ["All", "Networking", "Business", "WiFi", "Enterprise", "Partners", "Security"];
const trendingTags = ["WiFi 6", "Routers", "Enterprise", "Mesh WiFi", "Networking"];

/* ================= COMPONENT ================= */

export default function Allblogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogPosts);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((b) => b.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(term) ||
          b.excerpt.toLowerCase().includes(term) ||
          b.tags.some((t) => t.toLowerCase().includes(term))
      );
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 p-4 md:p-8 mt-20">
      {/* ================= BLOG LIST ================= */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onMouseEnter={() => setHoveredCard(blog.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden h-full">

              {/* ✅ BLOG IMAGE (ADDED – DESIGN SAFE) */}
              <div className="w-full h-48 bg-gray-700 overflow-hidden">
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

              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 hover:text-orange-400 transition">
                  {blog.title}
                </h2>

                <p className="text-gray-400 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300"
                    >
                      <FaTags className="inline mr-1" /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-gray-400 text-sm">
                  <span className="flex items-center">
                    <FaUser className="mr-1" /> {blog.author}
                  </span>
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" /> {blog.date}
                  </span>
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="mt-5 flex items-center text-orange-400 font-medium"
                >
                  Read More
                  <FaArrowRight className="ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </main>
    </div>
  );
}
