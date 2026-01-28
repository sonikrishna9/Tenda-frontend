"use client";
import Image from "next/image";
import { FaChevronDown, FaChevronUp, FaSearch, FaFire, FaTags, FaBoxOpen, FaStar, FaAngleRight } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function ProductCategoriesPage() {

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const decodedCategory = selectedCategory
    ? decodeURIComponent(selectedCategory)
    : null;



  const [openCat, setOpenCat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("");

  const sidebarRef = useRef(null);
  const router = useRouter();

  const displaySections = selectedCategory
    ? sections.filter(
      (section) =>
        section.title.toLowerCase() === decodedCategory?.toLowerCase()
    )
    : sections;


  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        const res = await fetch(
          "https://tenda-backend.onrender.com/api/product/allproducts"
        );

        const data = await res.json();
        if (!data.success) return;

        const grouped = {};
        data.allproducts.forEach((item) => {
          if (!grouped[item.parentCategory]) {
            grouped[item.parentCategory] = [];
          }
          grouped[item.parentCategory].push({
            name: item.subCategory,
            img: item.images?.[0]?.url || "/placeholder-product.png",
          });
        });

        setSections(
          Object.keys(grouped).map((cat) => ({
            title: cat,
            products: grouped[cat],
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!decodedCategory || sections.length === 0) return;

    const matched = sections.find(
      (section) =>
        section.title.toLowerCase() === decodedCategory.toLowerCase()
    );

    if (matched) {
      // open sidebar accordion
      setOpenCat(matched.title);

      // highlight category
      setActiveSection(matched.title);

      // auto scroll to right-side section
      setTimeout(() => {
        const el = document.getElementById(
          `section-${matched.title.replace(/\s+/g, "-")}`
        );
        if (el) {
          window.scrollTo({
            top: el.offsetTop - 120,
            behavior: "smooth",
          });
        }
      }, 300);
    }
  }, [decodedCategory, sections]);

  const handleProductClick = (parent, sub) => {
    router.push(
      `/single-product/${encodeURIComponent(parent)}/${encodeURIComponent(sub)}`
    );
  };



  /* ---------------- ACTIVE SECTION OBSERVER ---------------- */
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -80% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id.replace("section-", ""));
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(
        `section-${section.title.replace(/\s+/g, "-")}`
      );
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredCategories = sections.filter((section) => {
    const parentMatch = section.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const subMatch = section.products.some((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return parentMatch || subMatch;
  });

  /* ---------------- SCROLL TO CATEGORY ---------------- */
  const scrollToCategory = (category) => {
    const el = document.getElementById(
      `section-${category.replace(/\s+/g, "-")}`
    );
    if (el) {
      setActiveSection(category);
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: "smooth",
      });
    }
  };



  /* ---------------- LOADER ---------------- */
  if (loading) {
    return (
      <>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-orange-100 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700">
            Loading <span className="text-orange-500">Premium Products</span>...
          </p>
          <p className="text-gray-400 mt-2 text-sm">Just a moment please</p>
        </div>
      </>
    );
  }

  return (
    <>

      <div className="w-full p-4 md:p-6 mt-[4.5rem] max-w-7xl mx-auto">
        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 border border-orange-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <FaFire className="text-2xl text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Premium Collection</h3>
                <p className="text-sm text-gray-600">Explore our curated product categories</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{sections.length}</div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
              <div className="h-8 w-px bg-orange-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {sections.reduce((acc, section) => acc + section.products.length, 0)}
                </div>
                <div className="text-xs text-gray-500">Total Products</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar for Mobile */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-sm"></div>
            <div className="relative bg-white rounded-2xl p-1">
              <div className="flex items-center">
                <FaSearch className="absolute left-5 text-orange-400 text-lg" />
                <input
                  type="search"
                  placeholder="Search categories or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 text-gray-400 hover:text-orange-500"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* ================= SIDEBAR ================= */}
          <aside
            ref={sidebarRef}
            className="lg:col-span-1 bg-white rounded-3xl border border-orange-100 shadow-xl
            sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto"
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  <FaTags className="text-2xl" />
                  <h2 className="text-xl font-bold">Product Categories</h2>
                </div>
                <p className="text-orange-100 text-sm">Browse our premium collection</p>
              </div>
            </div>

            <div className="p-5">
              {/* Desktop Search */}
              <div className="hidden md:block mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-2">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" />
                    <input
                      type="search"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-orange-300"
                    />
                  </div>
                </div>
              </div>

              {/* Categories List */}
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredCategories.map((cat) => (
                    <motion.div
                      key={cat.title}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`rounded-xl overflow-hidden transition-all duration-300 ${activeSection === cat.title
                        ? 'ring-2 ring-orange-400 ring-opacity-50 shadow-md'
                        : 'hover:shadow-md'
                        }`}
                    >
                      <button
                        onClick={() => {
                          setOpenCat(openCat === cat.title ? null : cat.title);
                          scrollToCategory(cat.title);
                        }}
                        className={`w-full flex justify-between items-center px-5 py-4 font-medium text-left transition-all duration-300 ${activeSection === cat.title
                          ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-l-4 border-orange-500'
                          : 'bg-white hover:bg-orange-50 text-gray-800 border-l-4 border-transparent'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${activeSection === cat.title
                            ? 'bg-orange-100 text-orange-600'
                            : 'bg-gray-100 text-gray-600'
                            }`}>
                            <FaBoxOpen />
                          </div>
                          <span className="font-semibold truncate">{cat.title}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs px-2.5 py-1 rounded-full ${activeSection === cat.title
                            ? 'bg-orange-500 text-white'
                            : 'bg-orange-100 text-orange-600'
                            }`}>
                            {cat.products.length}
                          </span>
                          {openCat === cat.title ? (
                            <FaChevronUp className="text-orange-500" />
                          ) : (
                            <FaChevronDown className="text-gray-400" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {openCat === cat.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-gradient-to-b from-orange-50/50 to-transparent border-t border-orange-100"
                          >
                            <div className="p-4 space-y-2">
                              {cat.products.map((p, index) => (
                                <motion.button
                                  key={p.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  onClick={() => {
                                    setOpenCat(openCat === cat.title ? null : cat.title);
                                    scrollToCategory(cat.title);

                                    router.push(
                                      `/all-product?category=${encodeURIComponent(cat.title)}`,
                                      { scroll: false }
                                    );
                                  }}
                                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group flex items-center justify-between"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                                      {p.name}
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200">
                                    →
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}
          <div className="lg:col-span-3">
            {displaySections.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <div className="relative">
                    <FaSearch className="text-4xl text-orange-400" />
                    <div className="absolute -inset-4 bg-orange-200/20 rounded-full blur-xl"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Products Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  We couldn't find any products matching your search. Try different keywords or browse all categories.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all duration-300"
                >
                  View All Products
                </button>
              </div>
            ) : (
              displaySections.map((section) => (
                <section
                  key={section.title}
                  id={`section-${section.title.replace(/\s+/g, "-")}`}
                  className="mb-16 scroll-mt-32"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-10"
                  >
                    <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-orange-400 to-amber-400 rounded-full"></div>
                    <div className="ml-8">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-3xl font-bold text-gray-900">
                          {section.title}
                        </h3>
                        <span className="px-4 py-1.5 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold">
                          {section.products.length} Products
                        </span>
                      </div>
                      <p className="text-gray-600">
                        Discover our premium collection of {section.title.toLowerCase()}
                      </p>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.products.map((product, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() =>
                          handleProductClick(section.title, product.name)
                        }
                        whileHover={{ y: -8, scale: 1.03 }}
                        className="group relative cursor-pointer"
                      >
                        {/* Card Background Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                        {/* Main Card */}
                        <div className="relative bg-white rounded-3xl border-2 border-orange-100 p-6 hover:border-orange-200 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-orange-100">
                          {/* Image Container */}
                          <div className="relative mb-6">
                            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4 overflow-hidden">
                              <Image
                                src={product.img}
                                alt={product.name}
                                width={220}
                                height={180}
                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  e.target.src = "/placeholder-product.png";
                                }}
                              />
                            </div>
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-bl-3xl rounded-tr-3xl flex items-center justify-center">
                              <FaStar className="text-white text-sm" />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="text-center">
                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300 mb-2 line-clamp-2">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500 mb-4">
                              Premium quality products
                            </p>

                            {/* Action Button */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                              <button className="relative w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 transform group-hover:-translate-y-1">
                                Explore Products
                                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                              </button>
                            </div>
                          </div>

                          {/* Hover Effect Border */}
                          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-orange-300 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}