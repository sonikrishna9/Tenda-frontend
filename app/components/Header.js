"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  // 🔥 NEW STATES
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const pathname = usePathname();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  /* ================= NAV ORDER ================= */
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/all-product", isMega: true }, // 3rd
    { label: "Partner Program", href: "/partner-program" },
    { label: "Blogs", href: "/blogs" },
  ];

  /* ================= ACTIVE LINK ================= */
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/product/all-categories`);
      const data = await res.json();

      if (data?.success && Array.isArray(data.allproducts)) {
        setAllProducts(data.allproducts);
        setActiveCategory(data.allproducts[0]?.parentCategory);
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

  /* ================= LOCK BODY SCROLL (MOBILE) ================= */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      {/* ================= TOP BAR ================= */}
      <div className="h-[72px] max-w-[1600px] mx-auto flex items-center justify-between px-6">
        {/* LOGO */}
        <Link href="/" className="shrink-0">
          <img src="/logo.png" alt="Logo" className="h-9" />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-800">
          {navLinks.map((nav) =>
            nav.isMega ? (
              /* ================= PRODUCTS (MEGA MENU) ================= */
              <li
                key={nav.label}
                className="relative"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={() => setShowProducts(false)}
              >
                <button
                  className={`flex items-center gap-1 transition ${
                    isActive(nav.href)
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                  }`}
                >
                  {nav.label}
                  <motion.span
                    animate={{ rotate: showProducts ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <FiChevronDown />
                  </motion.span>
                </button>

                {/* ================= FULL WIDTH MEGA MENU ================= */}
                <AnimatePresence>
                  {showProducts && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.25 }}
                      className="
                        fixed
                        left-0
                        top-[72px]
                        w-screen
                        bg-white
                        border-t
                        shadow-2xl
                        z-40
                      "
                    >
                      <div className="max-h-[70vh] overflow-hidden px-8 py-8">
                        <div className="flex">

                          {/* LEFT – PARENT CATEGORIES */}
                          <div className="w-[260px] border-r">
                            {parentCategories.map((cat) => (
                              <div
                                key={cat}
                                onMouseEnter={() => setActiveCategory(cat)}
                                className={`
                                  px-5 py-3 text-sm cursor-pointer border-b
                                  ${
                                    activeCategory === cat
                                      ? "text-orange-500 font-semibold border-l-4 border-orange-500 bg-orange-50"
                                      : "hover:bg-gray-50"
                                  }
                                `}
                              >
                                {cat}
                              </div>
                            ))}
                          </div>

                          {/* RIGHT – PRODUCTS */}
                          <div className="flex-1 px-10 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-3 gap-x-14 gap-y-4">
                              {groupedProducts[activeCategory]?.map((item) => (
                                <Link
                                  key={item._id}
                                  href={`/all-product?category=${encodeURIComponent(
                                    item.parentCategory
                                  )}&product=${encodeURIComponent(
                                    item.subCategory
                                  )}`}
                                  className="text-sm text-gray-700 hover:text-orange-500 border-b pb-1"
                                >
                                  {item.subCategory}
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className={`transition ${
                    isActive(nav.href)
                      ? "text-orange-500 font-semibold"
                      : "hover:text-orange-500"
                  }`}
                >
                  {nav.label}
                </Link>
              </li>
            )
          )}

          {/* CONTACT */}
          <li>
            <Link
              href="/contactus"
              className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-gray-700"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-white z-40"
          >
            <ul className="flex flex-col items-center gap-6 py-10 text-lg font-medium">
              {navLinks.map((nav) => (
                <Link
                  key={nav.label}
                  href={nav.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-500"
                >
                  {nav.label}
                </Link>
              ))}
              <Link
                href="/contactus"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600"
              >
                Contact Us
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
