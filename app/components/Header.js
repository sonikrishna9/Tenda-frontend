"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

  const slugify = (s = "") => encodeURIComponent(s.trim());


  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

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
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      {/* ================= TOP BAR ================= */}
      <div className="h-[72px] max-w-[1600px] mx-auto flex items-center justify-between px-6">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-9" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-800">
          {navLinks.map((nav) =>
            nav.isMega ? (
              <li key={nav.label} className="relative">
                <button
                  onMouseEnter={() => setShowProducts(true)}
                  className={`flex items-center gap-1 ${isActive(nav.href)
                    ? "text-orange-500 font-semibold"
                    : "hover:text-orange-500"
                    }`}
                >
                  {nav.label}
                  <FiChevronDown
                    className={`transition ${showProducts ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* ================= DESKTOP DROPDOWN ================= */}
                <AnimatePresence>
                  {showProducts && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setShowProducts(false)}
                      className="
                        absolute
                        left-1/2
                        -translate-x-1/2
                        top-[48px]
                        w-[560px]
                        bg-white
                        border
                        shadow-xl
                        z-40
                        overflow-visible
                      "
                    >
                      <div className="relative flex">
                        {/* LEFT CATEGORY PANEL */}
                        <div className="w-[300px] max-h-[453px] overflow-y-auto border-r">
                          {parentCategories.map((cat) => (
                            <Link
                              key={cat}
                              href={`/products/${slugify(cat)}`}
                              onClick={() => setShowProducts(false)}
                              onMouseEnter={() => setActiveCategory(cat)}
                              className="relative flex items-center justify-between px-6 py-3 border-b cursor-pointer text-sm block"
                            >
                              <span
                                className={
                                  activeCategory === cat
                                    ? "font-semibold text-gray-900"
                                    : "text-gray-700"
                                }
                              >
                                {cat}
                              </span>

                              <FiChevronRight className="text-gray-400" />

                              {activeCategory === cat && (
                                <span className="absolute right-0 top-0 h-full w-[3px] bg-orange-500" />
                              )}
                            </Link>
                          ))}
                          <div className="border-t p-3 bg-white">
                            <Link
                              href="/products"
                              className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition"
                            >
                              Show All Products
                            </Link>
                          </div>
                        </div>

                        {/* RIGHT SUBCATEGORY PANEL */}
                        {activeCategory && (
                          <div className="w-[260px] max-h-[453px] overflow-y-auto bg-white">
                            <div className="px-5 py-3 text-sm font-semibold border-b">
                              {activeCategory}
                            </div>

                            {Object.entries(
                              getSubCategoryCounts(activeCategory)
                            ).map(([subCategory, count]) => (
                              <Link
                                key={subCategory}
                                href={`/products/${slugify(activeCategory)}/${slugify(subCategory)}`}
                                onClick={() => setShowProducts(false)}
                                className="flex justify-between px-5 py-2 text-sm text-gray-700 border-b hover:text-orange-500"
                              >
                                <span>{subCategory}</span>
                                <span className="text-xs text-gray-400">
                                  ({count})
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className={
                    isActive(nav.href)
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                  }
                >
                  {nav.label}
                </Link>
              </li>
            )
          )}

          <li>
            <Link
              href="/contactus"
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ================= MOBILE PRODUCTS MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] left-0 w-full max-h-[calc(100vh-72px)] bg-white z-40 overflow-y-auto"
          >
            <div className="px-4 py-4 text-sm font-semibold border-b">
              All Solutions
            </div>

            {parentCategories.map((cat) => (
              <div key={cat} className="border-b">
                <button
                  onClick={() =>
                    setMobileActiveCategory(
                      mobileActiveCategory === cat ? null : cat
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 text-left text-sm"
                >
                  <span className="font-medium">{cat}</span>
                  <FiChevronRight
                    className={`transition ${mobileActiveCategory === cat ? "rotate-90" : ""
                      }`}
                  />
                </button>

                <Link
                  href={`/products/${slugify(cat)}`}
                  onClick={() => setIsOpen(false)}
                  className="block px-6 py-2 text-sm border-t bg-white font-medium"
                >
                  View all {cat}
                </Link>


                {mobileActiveCategory === cat && (
                  <div className="bg-gray-50">
                    {Object.entries(getSubCategoryCounts(cat)).map(
                      ([subCategory, count]) => (
                        <Link
                          key={subCategory}
                          href={`/products/${slugify(cat)}/${slugify(subCategory)}`}
                          onClick={() => setIsOpen(false)}
                          className="flex justify-between px-6 py-2 text-sm border-t"
                        >
                          <span>{subCategory}</span>
                          <span className="text-xs text-gray-400">
                            ({count})
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
