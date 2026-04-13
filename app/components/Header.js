"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCall } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
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

  const searchRef = useRef(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [showPartner, setShowPartner] = useState(false);

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
    { label: "Partner Program", href: "/partner-program", isPartner: true },
    { label: "Blogs", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
  ];


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showSearch]);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const term = value.toLowerCase();

    const results = [];

    allProducts.forEach((item) => {
      // Product match
      if (item.title?.toLowerCase().includes(term)) {
        results.push({
          type: "product",
          title: item.title,
          parentCategory: item.parentCategory,
        });
      }

      // Parent category match
      if (item.parentCategory?.toLowerCase().includes(term)) {
        results.push({
          type: "category",
          title: item.parentCategory,
        });
      }

      // Subcategory match
      if (item.subCategory?.toLowerCase().includes(term)) {
        results.push({
          type: "subcategory",
          title: item.subCategory,
          parentCategory: item.parentCategory,
        });
      }
    });

    // Remove duplicates
    const unique = Array.from(
      new Map(results.map((r) => [r.title + r.type, r])).values()
    );

    setSearchResults(unique.slice(0, 8)); // limit results
  }, [allProducts]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
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
            <img src="/logo.png" alt="Logo" className="h-7 sm:h-7 lg:h-8 w-auto" />
          </Link>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden xl:flex items-center flex-1 justify-center">
          <ul className="flex items-center gap-1 xl:gap-2 font-medium text-gray-700">
            {navLinks.map((nav, index) => (
              <motion.li
                key={nav.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {nav.isPartner ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      setShowPartner(true);
                      setShowProducts(false);
                    }}
                    onMouseLeave={() => setShowPartner(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive(nav.href)
                        ? "text-orange-500 bg-orange-50 font-semibold"
                        : "hover:text-orange-500 hover:bg-gray-50"
                        }`}
                    >
                      {nav.label}
                      <motion.div
                        animate={{ rotate: showPartner ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {showPartner && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[48px] left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-xl shadow-2xl border border-gray-100 z-40 overflow-hidden"
                        >
                          <Link
                            href="/partner-program/sipartner"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                          >
                            SI Partner
                          </Link>

                          <Link
                            href="/partner-program/dealer"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                          >
                            Dealer / Distributor
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : nav.isMega ? (
                  <div className="relative">
                    <button
                      onMouseEnter={() => setShowProducts(true)}
                      className={`flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive(nav.href)
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
                                  className={`relative flex items-center justify-between px-5 py-3.5 border-b border-gray-100 cursor-pointer text-sm transition-all duration-200 ${activeCategory === cat
                                    ? "bg-white text-orange-500 font-medium"
                                    : "text-gray-700 hover:bg-white hover:text-orange-500"
                                    }`}
                                >
                                  <span>{cat}</span>
                                  <FiChevronRight className={`transition-transform duration-200 ${activeCategory === cat ? "text-orange-500" : "text-gray-400"
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
                                  {Object.entries(getSubCategoryCounts(activeCategory)).map(
                                    ([subCategory, count]) => (
                                      <Link
                                        key={subCategory}
                                        href={`/products/${slugify(activeCategory)}/${slugify(subCategory)}`}
                                        onClick={() => setShowProducts(false)}
                                        className="flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                                      >
                                        <span>{subCategory}</span>

                                        <div className="flex items-center gap-2">
                                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                                            {count}
                                          </span>
                                          <FiChevronRight className="text-gray-400" />
                                        </div>
                                      </Link>
                                    )
                                  )}
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
                    className={`px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${isActive(nav.href)
                      ? "text-orange-500 bg-orange-50 font-semibold"
                      : "hover:text-orange-500 hover:bg-gray-50"
                      }`}
                  >
                    {nav.label}
                  </Link>
                )
                }
              </motion.li>
            ))}
          </ul>
        </div>




        {/* Right Side Buttons */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* SEARCH ICON */}
          {/* SMALL SEARCH BAR */}
          <div className="relative hidden md:block">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-orange-400 transition-all">

              <FiSearch className="text-gray-500 mr-2" size={16} />

              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-[140px] md:w-[180px] lg:w-[220px] placeholder-gray-400"
              />
            </div>

            {/* DROPDOWN RESULTS */}
            {searchResults.length > 0 && (
              <div className="absolute top-[110%] left-0 w-full bg-white shadow-xl rounded-lg border border-gray-100 z-50 overflow-hidden">
                {searchResults.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setSearchTerm("");

                      if (item.type === "product") {
                        router.push(
                          `/product/${slugify(item.parentCategory)}/${slugify(item.title)}`
                        );
                      } else if (item.type === "subcategory") {
                        router.push(
                          `/products/${slugify(item.parentCategory)}/${slugify(item.title)}`
                        );
                      } else {
                        router.push(`/products/${slugify(item.title)}`);
                      }
                    }}
                    className="px-4 py-2 text-sm hover:bg-orange-50 cursor-pointer flex justify-between"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-gray-400 capitalize">
                      {item.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Contact Us Button - Hidden on mobile, shows in mobile menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="hidden xl:block"
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
          {/* <motion.div
            whileHover={{ y: -2 }}
            className="hidden lg:block"
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="https://gem.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-32 text-center gap-2 "
            >
              <img
                src="/gem.jpeg"
                alt="GeM Logo"
                className="h-10  w-28 shadow-sm hover:shadow-md rounded-sm"
              />

              
            </Link>
          </motion.div> */}

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
            <div className="max-h-[calc(100vh-72px)] flex flex-col">

              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto">

                {/* Contact */}
                <div className="p-4 border-b border-gray-100">
                  <Link href="/contactus" onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <IoMdCall size={18} />
                    Contact Us
                  </Link>
                </div>

                {/* NAV LINKS */}
                <div className="px-4 py-2">
                  {/* your navLinks map (unchanged) */}
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
                            className="w-full flex items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg"
                          >
                            <span>{nav.label}</span>
                            <FiChevronRight />
                          </button>

                          {mobileActiveCategory === nav.label && (
                            <div className="ml-4">
                              {parentCategories.map((cat) => (
                                <div key={cat}>
                                  <Link
                                    href={`/products/${slugify(cat)}`}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-500"
                                  >
                                    {cat}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={nav.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-3 text-sm text-gray-700 hover:text-orange-500"
                        >
                          {nav.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

              </div>

              {/* FIXED BOTTOM GeM */}
              <div className="p-4 border-t border-gray-100">
                <Link href="https://gem.gov.in/" target="_blank">
                  <img src="/gem.jpeg" className="h-10 w-28 mx-auto" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSearch && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* SEARCH FULL SCREEN */}
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="fixed inset-0 z-50 bg-white flex flex-col"
            >
              {/* TOP BAR */}
              <div className="flex items-center gap-3 p-4 border-b">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                />

                <button
                  onClick={() => setShowSearch(false)}
                  className=" cursor-pointer text-xl text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* RESULTS */}
              <div className="flex-1 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setShowSearch(false);
                        setSearchTerm("");

                        if (item.type === "product") {
                          router.push(
                            `/product/${slugify(item.parentCategory)}/${slugify(item.title)}`
                          );
                        } else if (item.type === "subcategory") {
                          router.push(
                            `/products/${slugify(item.parentCategory)}/${slugify(item.title)}`
                          );
                        } else {
                          router.push(`/products/${slugify(item.title)}`);
                        }
                      }}
                      className="px-6 py-4 border-b hover:bg-orange-50 cursor-pointer flex justify-between"
                    >
                      <span>{item.title}</span>
                      <span className="text-xs text-gray-400 capitalize">
                        {item.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 mt-20">
                    No results found
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}