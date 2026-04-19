"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdCall } from "react-icons/io";
import { FiSearch, FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

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
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobilePartnerOpen, setMobilePartnerOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products", isMega: true },
    { label: "Partner Program", href: "/partner-program", isPartner: true },
    { label: "Blogs", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
  ];

  const closeDesktopMenus = useCallback(() => {
    setShowProducts(false);
    setShowPartner(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setMobileProductsOpen(false);
    setMobilePartnerOpen(false);
    setMobileActiveCategory(null);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navigateFromSearch = useCallback(
    (item) => {
      setSearchTerm("");
      setSearchResults([]);
      closeDesktopMenus();
      closeMobileMenu();

      if (item.type === "product") {
        router.push(
          `/product/${slugify(item.parentCategory)}/${slugify(item.title)}`
        );
        return;
      }

      if (item.type === "subcategory") {
        router.push(
          `/products/${slugify(item.parentCategory)}/${slugify(item.title)}`
        );
        return;
      }

      router.push(`/products/${slugify(item.title)}`);
    },
    [closeDesktopMenus, closeMobileMenu, router]
  );

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);

      if (!value.trim()) {
        setSearchResults([]);
        return;
      }

      const term = value.toLowerCase();
      const results = [];

      allProducts.forEach((item) => {
        if (item.title?.toLowerCase().includes(term)) {
          results.push({
            type: "product",
            title: item.title,
            parentCategory: item.parentCategory,
          });
        }

        if (item.parentCategory?.toLowerCase().includes(term)) {
          results.push({
            type: "category",
            title: item.parentCategory,
          });
        }

        if (item.subCategory?.toLowerCase().includes(term)) {
          results.push({
            type: "subcategory",
            title: item.subCategory,
            parentCategory: item.parentCategory,
          });
        }
      });

      const unique = Array.from(
        new Map(results.map((item) => [`${item.type}-${item.title}`, item])).values()
      );

      setSearchResults(unique.slice(0, 8));
    },
    [allProducts]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      if (!API_BASE_URL) return;

      try {
        const response = await fetch(`${API_BASE_URL}api/product/all-categories`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (data?.success && Array.isArray(data.allproducts)) {
          setAllProducts(data.allproducts);
          setActiveCategory((prev) => prev || data.allproducts[0]?.parentCategory || "");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch products", error);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [API_BASE_URL]);

  useEffect(() => {
    closeDesktopMenus();
    closeMobileMenu();
  }, [pathname, closeDesktopMenus, closeMobileMenu]);

  useEffect(() => {
    const isMobileMenuActive =
      isOpen && typeof window !== "undefined" && window.innerWidth < 1024;

    document.body.style.overflow = isMobileMenuActive ? "hidden" : "";
    document.documentElement.style.overflow = isMobileMenuActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [closeMobileMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const groupedProducts = allProducts.reduce((acc, item) => {
    if (!acc[item.parentCategory]) acc[item.parentCategory] = [];
    acc[item.parentCategory].push(item);
    return acc;
  }, {});

  const parentCategories = Object.keys(groupedProducts);

  const getSubCategoryCounts = (category) => {
    const items = groupedProducts[category] || [];

    return items.reduce((acc, item) => {
      acc[item.subCategory] = (acc[item.subCategory] || 0) + 1;
      return acc;
    }, {});
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, type: "spring", stiffness: 110, damping: 18 }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/92 py-2 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-white/96 py-0 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 320, damping: 18 }}
          className="flex shrink-0 items-center"
        >
          <Link href="/" aria-label="Tenda Home">
            <Image
              src="/logo.png"
              alt="Tenda"
              width={120}
              height={36}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>
        </motion.div>

        <div className="hidden min-w-0 flex-1 items-center justify-center px-2 lg:flex xl:px-4">
          <ul className="flex items-center gap-0.5 whitespace-nowrap text-[13px] font-medium text-gray-700 xl:gap-1.5 xl:text-[14px] 2xl:gap-2 2xl:text-[15px]">
            {navLinks.map((nav, index) => (
              <motion.li
                key={nav.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
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
                      className={`flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-200 xl:px-4 ${
                        isActive(nav.href)
                          ? "bg-orange-50 font-semibold text-orange-500"
                          : "hover:bg-gray-50 hover:text-orange-500"
                      }`}
                    >
                      {nav.label}
                      <motion.span
                        animate={{ rotate: showPartner ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <FiChevronDown />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {showPartner && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-[calc(100%+12px)] w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
                        >
                          <Link
                            href="/partner-program/sipartner"
                            className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                          >
                            SI Partner
                          </Link>
                          <Link
                            href="/partner-program/dealer"
                            className="block px-4 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                          >
                            Dealer / Distributor
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : nav.isMega ? (
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      setShowProducts(true);
                      setShowPartner(false);
                    }}
                    onMouseLeave={() => setShowProducts(false)}
                  >
                    <button
                      className={`flex items-center gap-1 whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-200 xl:px-4 ${
                        isActive(nav.href)
                          ? "bg-orange-50 font-semibold text-orange-500"
                          : "hover:bg-gray-50 hover:text-orange-500"
                      }`}
                    >
                      {nav.label}
                      <motion.span
                        animate={{ rotate: showProducts ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <FiChevronDown />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {showProducts && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-[calc(100%+12px)] w-[min(92vw,760px)] -translate-x-1/2 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
                        >
                          <div className="flex max-h-[520px]">
                            <div className="w-[46%] overflow-y-auto bg-gray-50">
                              {parentCategories.map((cat) => (
                                <Link
                                  key={cat}
                                  href={`/products/${slugify(cat)}`}
                                  onMouseEnter={() => setActiveCategory(cat)}
                                  className={`relative flex items-center justify-between border-b border-gray-100 px-5 py-4 text-sm transition ${
                                    activeCategory === cat
                                      ? "bg-white font-medium text-orange-500"
                                      : "text-gray-700 hover:bg-white hover:text-orange-500"
                                  }`}
                                >
                                  <span>{cat}</span>
                                  <FiChevronRight
                                    className={
                                      activeCategory === cat
                                        ? "text-orange-500"
                                        : "text-gray-400"
                                    }
                                  />
                                  {activeCategory === cat && (
                                    <motion.span
                                      layoutId="desktop-active-category"
                                      className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-orange-500"
                                    />
                                  )}
                                </Link>
                              ))}

                              <div className="p-4">
                                <Link
                                  href="/products"
                                  className="block rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-600"
                                >
                                  View All Products
                                </Link>
                              </div>
                            </div>

                            <div className="w-[54%] overflow-y-auto bg-white">
                              <div className="border-b bg-gray-50/70 px-5 py-4 text-sm font-semibold text-gray-900">
                                {activeCategory || "Browse products"}
                              </div>

                              <div className="divide-y divide-gray-100">
                                {activeCategory &&
                                  Object.entries(getSubCategoryCounts(activeCategory)).map(
                                    ([subCategory, count]) => (
                                      <Link
                                        key={subCategory}
                                        href={`/products/${slugify(activeCategory)}/${slugify(subCategory)}`}
                                        className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                                      >
                                        <span>{subCategory}</span>
                                        <div className="flex items-center gap-2">
                                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                                            {count}
                                          </span>
                                          <FiChevronRight className="text-gray-400" />
                                        </div>
                                      </Link>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={nav.href}
                    className={`whitespace-nowrap rounded-xl px-3 py-2 transition-all duration-200 xl:px-4 ${
                      isActive(nav.href)
                        ? "bg-orange-50 font-semibold text-orange-500"
                        : "hover:bg-gray-50 hover:text-orange-500"
                    }`}
                  >
                    {nav.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div ref={searchRef} className="relative hidden shrink-0 xl:block">
            <div className="flex items-center rounded-xl bg-gray-100 px-3 py-2 transition focus-within:ring-2 focus-within:ring-orange-400">
              <FiSearch className="mr-2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => handleSearch(event.target.value)}
                className="w-[160px] bg-transparent text-sm outline-none placeholder:text-gray-400 2xl:w-[220px]"
              />
            </div>

            {!!searchResults.length && (
              <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                {searchResults.map((item, index) => (
                  <button
                    key={`${item.type}-${item.title}-${index}`}
                    onClick={() => navigateFromSearch(item)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-orange-50"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs capitalize text-gray-400">{item.type}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="hidden lg:block"
          >
            <Link
              href="/contactus"
              className="flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-3 text-[13px] font-medium text-white shadow-md transition hover:from-orange-600 hover:to-orange-700 hover:shadow-lg xl:px-4 xl:text-sm"
            >
              <IoMdCall size={16} />
              <span className="whitespace-nowrap">Contact Us</span>
            </Link>
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-xl p-2 text-2xl text-gray-800 transition hover:bg-gray-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed left-0 top-[72px] z-40 h-[calc(100dvh-72px)] w-full overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-100 p-4">
                <div className="mb-4 flex items-center rounded-xl bg-gray-100 px-3 py-3 focus-within:ring-2 focus-within:ring-orange-400">
                  <FiSearch className="mr-2 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="Search products, categories..."
                    value={searchTerm}
                    onChange={(event) => handleSearch(event.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                  />
                </div>

                {!!searchResults.length && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                    {searchResults.map((item, index) => (
                      <button
                        key={`${item.type}-${item.title}-${index}`}
                        onClick={() => navigateFromSearch(item)}
                        className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left text-sm last:border-b-0"
                      >
                        <span>{item.title}</span>
                        <span className="text-xs capitalize text-gray-400">
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <Link
                  href="/contactus"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-medium text-white"
                >
                  <IoMdCall size={18} />
                  Contact Us
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3">
                {navLinks.map((nav) => (
                  <div key={nav.label} className="border-b border-gray-100 py-1">
                    {nav.isMega ? (
                      <>
                        <button
                          onClick={() => {
                            setMobileProductsOpen((prev) => !prev);
                            setMobilePartnerOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                        >
                          <span>{nav.label}</span>
                          <motion.span
                            animate={{ rotate: mobileProductsOpen ? 90 : 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <FiChevronRight />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              <Link
                                href="/products"
                                onClick={closeMobileMenu}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-orange-600"
                              >
                                View All Products
                              </Link>

                              {parentCategories.map((cat) => {
                                const isExpanded = mobileActiveCategory === cat;
                                return (
                                  <div key={cat} className="mb-1">
                                    <button
                                      onClick={() =>
                                        setMobileActiveCategory((prev) =>
                                          prev === cat ? null : cat
                                        )
                                      }
                                      className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                                    >
                                      <span>{cat}</span>
                                      <motion.span
                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.18 }}
                                      >
                                        <FiChevronRight />
                                      </motion.span>
                                    </button>

                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          className="overflow-hidden pl-4"
                                        >
                                          <Link
                                            href={`/products/${slugify(cat)}`}
                                            onClick={closeMobileMenu}
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-orange-600"
                                          >
                                            View {cat}
                                          </Link>

                                          {Object.keys(getSubCategoryCounts(cat)).map(
                                            (subCategory) => (
                                              <Link
                                                key={subCategory}
                                                href={`/products/${slugify(cat)}/${slugify(subCategory)}`}
                                                onClick={closeMobileMenu}
                                                className="block rounded-lg px-4 py-2 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
                                              >
                                                {subCategory}
                                              </Link>
                                            )
                                          )}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : nav.isPartner ? (
                      <>
                        <button
                          onClick={() => {
                            setMobilePartnerOpen((prev) => !prev);
                            setMobileProductsOpen(false);
                            setMobileActiveCategory(null);
                          }}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-500"
                        >
                          <span>{nav.label}</span>
                          <motion.span
                            animate={{ rotate: mobilePartnerOpen ? 90 : 0 }}
                            transition={{ duration: 0.18 }}
                          >
                            <FiChevronRight />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {mobilePartnerOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pl-3"
                            >
                              <Link
                                href="/partner-program"
                                onClick={closeMobileMenu}
                                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-orange-600"
                              >
                                Partner Program Overview
                              </Link>
                              <Link
                                href="/partner-program/sipartner"
                                onClick={closeMobileMenu}
                                className="block rounded-xl px-4 py-2.5 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
                              >
                                SI Partner
                              </Link>
                              <Link
                                href="/partner-program/dealer"
                                onClick={closeMobileMenu}
                                className="block rounded-xl px-4 py-2.5 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-orange-500"
                              >
                                Dealer / Distributor
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={nav.href}
                        onClick={closeMobileMenu}
                        className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                          isActive(nav.href)
                            ? "bg-orange-50 text-orange-500"
                            : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                        }`}
                      >
                        {nav.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4">
                <Link
                  href="https://gem.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mx-auto block w-fit"
                >
                  <Image
                    src="/gem.jpeg"
                    alt="GeM"
                    width={112}
                    height={40}
                    className="h-10 w-28 rounded-sm"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}
