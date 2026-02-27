"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCall } from "react-icons/io";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const slugify = (s = "") =>
    s
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const pathname = usePathname();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  /* ================= NAV ================= */
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products", isMega: true },
    { label: "Partner Program", href: "/partner-program" },
    { label: "Blogs", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/product/all-categories`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.allproducts)) {
        setAllProducts(data.allproducts);
        setActiveCategory(data.allproducts[0]?.parentCategory || "");
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setShowProducts(false);
    setIsOpen(false);
  }, [pathname]);

  /* ================= GROUP PRODUCTS ================= */
  const groupedProducts = allProducts.reduce((acc, item) => {
    if (!acc[item.parentCategory]) acc[item.parentCategory] = [];
    acc[item.parentCategory].push(item);
    return acc;
  }, {});

  const parentCategories = Object.keys(groupedProducts);

  /* ================= SUBCATEGORY COUNT ================= */
  const getSubCategoryCounts = (category) => {
    const items = groupedProducts[category] || [];
    return items.reduce((acc, item) => {
      acc[item.subCategory] = (acc[item.subCategory] || 0) + 1;
      return acc;
    }, {});
  };

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-white shadow-sm py-0"
      }`}
    >
      <div className="h-[72px] max-w-[1600px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex-shrink-0"
        >
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-7 sm:h-8 lg:h-9 w-auto" />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex items-center flex-1 justify-center">
          <ul className="flex items-center gap-1 xl:gap-2 font-medium text-gray-700">
            {navLinks.map((nav, index) => (
              <motion.li
                key={nav.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {nav.isMega ? (
                  <div className="relative">
                    <button
                      onMouseEnter={() => setShowProducts(true)}
                      className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${
                        isActive(nav.href)
                          ? "text-orange-500 bg-orange-50 font-semibold"
                          : "hover:text-orange-500 hover:bg-gray-50"
                      }`}
                    >
                      {nav.label}
                      <motion.div
                        animate={{ rotate: showProducts ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown />
                      </motion.div>
                    </button>

                    {/* Mega Menu */}
                    <AnimatePresence>
                      {showProducts && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseLeave={() => setShowProducts(false)}
                          className="absolute left-1/2 -translate-x-1/2 top-[48px] w-[600px] bg-white rounded-xl shadow-2xl border border-gray-100 z-40 overflow-hidden"
                        >
                          <div className="relative flex">
                            {/* Left Category Panel */}
                            <div className="w-[320px] max-h-[480px] overflow-y-auto bg-gray-50">
                              {parentCategories.map((cat) => (
                                <Link
                                  key={cat}
                                  href={`/products/${slugify(cat)}`}
                                  onClick={() => setShowProducts(false)}
                                  onMouseEnter={() => setActiveCategory(cat)}
                                  className={`relative flex items-center justify-between px-5 py-3.5 border-b border-gray-100 cursor-pointer text-sm transition-all duration-200 ${
                                    activeCategory === cat
                                      ? "bg-white text-orange-500 font-medium"
                                      : "text-gray-700 hover:bg-white hover:text-orange-500"
                                  }`}
                                >
                                  <span>{cat}</span>
                                  <FiChevronRight className={`transition-transform duration-200 ${
                                    activeCategory === cat ? "text-orange-500" : "text-gray-400"
                                  }`} />
                                  {activeCategory === cat && (
                                    <motion.span
                                      layoutId="activeCategory"
                                      className="absolute left-0 top-0 h-full w-1 bg-orange-500"
                                    />
                                  )}
                                </Link>
                              ))}
                              <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
                                <Link
                                  href="/products"
                                  onClick={() => setShowProducts(false)}
                                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                  View All Products
                                </Link>
                              </div>
                            </div>

                            {/* Right Subcategory Panel */}
                            {activeCategory && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-[280px] max-h-[480px] overflow-y-auto bg-white"
                              >
                                <div className="px-5 py-3.5 text-sm font-semibold text-gray-900 border-b bg-gray-50/50">
                                  {activeCategory}
                                </div>
                                <div className="divide-y divide-gray-100">
                                  {Object.entries(
                                    getSubCategoryCounts(activeCategory)
                                  ).map(([subCategory, count]) => (
                                    <Link
                                      key={subCategory}
                                      href={`/products/${slugify(activeCategory)}/${slugify(subCategory)}`}
                                      onClick={() => setShowProducts(false)}
                                      className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50/50 transition-all duration-200 group"
                                    >
                                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                                        {subCategory}
                                      </span>
                                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600 transition-all duration-200">
                                        {count}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={nav.href}
                    className={`px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(nav.href)
                        ? "text-orange-500 bg-orange-50 font-semibold"
                        : "hover:text-orange-500 hover:bg-gray-50"
                    }`}
                  >
                    {nav.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Contact Us Button - Hidden on mobile, shows in mobile menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="hidden sm:block"
          >
            <Link
              href="/contactus"
              className="flex items-center justify-center gap-2 px-4 h-10 sm:px-5 sm:h-11 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <IoMdCall size={16} className="sm:size-[18px]" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Contact Us</span>
            </Link>
          </motion.div>

          {/* GeM Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="https://gem.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-900 text-white hover:from-zinc-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden group"
            >
              <motion.img
                src="https://assets-bg.gem.gov.in/resources/images/gem-new-logo-v6.svg"
                alt="GeM Logo"
                className="h-5 sm:h-7 w-auto relative z-10 brightness-0 invert"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              {/* <span className="text-[10px] sm:text-xs font-medium tracking-wide relative z-10">GeM</span> */}
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-white/5"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[72px] left-0 w-full bg-white/95 backdrop-blur-md z-40 overflow-hidden border-t border-gray-100"
          >
            <div className="max-h-[calc(100vh-72px)] overflow-y-auto pb-6">
              {/* Mobile Contact Button - Shows at top of mobile menu */}
              <div className="p-4 border-b border-gray-100">
                <Link
                  href="/contactus"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md"
                >
                  <IoMdCall size={18} />
                  <span className="text-sm font-medium">Contact Us</span>
                </Link>
              </div>

              {/* Mobile Navigation Links */}
              <div className="px-4 py-2">
                {navLinks.map((nav) => (
                  <div key={nav.label}>
                    {nav.isMega ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileActiveCategory(
                              mobileActiveCategory === nav.label ? null : nav.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                        >
                          <span>{nav.label}</span>
                          <motion.div
                            animate={{ rotate: mobileActiveCategory === nav.label ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronRight />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {mobileActiveCategory === nav.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 overflow-hidden"
                            >
                              {parentCategories.map((cat) => (
                                <div key={cat} className="border-l-2 border-gray-100 ml-2">
                                  <Link
                                    href={`/products/${slugify(cat)}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-r-lg transition-all duration-200"
                                  >
                                    {cat}
                                  </Link>
                                  <div className="ml-4">
                                    {Object.entries(getSubCategoryCounts(cat)).map(
                                      ([subCategory, count]) => (
                                        <Link
                                          key={subCategory}
                                          href={`/products/${slugify(cat)}/${slugify(subCategory)}`}
                                          onClick={() => setIsOpen(false)}
                                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-r-lg transition-all duration-200"
                                        >
                                          <span>{subCategory}</span>
                                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                            {count}
                                          </span>
                                        </Link>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))}
                              <Link
                                href="/products"
                                onClick={() => setIsOpen(false)}
                                className="block mx-4 my-3 px-4 py-2.5 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-200"
                              >
                                View All Products
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={nav.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive(nav.href)
                            ? "text-orange-500 bg-orange-50"
                            : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                        }`}
                      >
                        {nav.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}