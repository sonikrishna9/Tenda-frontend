"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaHome,
  FaAngleRight,
  FaFolderOpen,
  FaFolder,
  FaLayerGroup
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ProductCategoriesPage() {

  const slugify = (s = "") => encodeURIComponent(s.trim());

  const router = useRouter();
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug
    : params?.slug
      ? [params.slug]
      : [];

  const formatName = (s) => decodeURIComponent(s || "");


  const capitalizeWords = (s = "") =>
    s.replace(/\b\w/g, (c) => c.toUpperCase());



  const category = slug[0] ? formatName(slug[0]) : null;
  const subcategory = slug[1] ? formatName(slug[1]) : null;



  // const searchParams = useSearchParams();

  // const categoryParam = searchParams.get("category");
  // const subcategoryParam = searchParams.get("subcategory");

  // const category = categoryParam ? decodeURIComponent(categoryParam) : null;
  // const subcategory = subcategoryParam
  //   ? decodeURIComponent(subcategoryParam)
  //   : null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openParent, setOpenParent] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [search, setSearch] = useState("");

  const subcategoryRefs = useRef({});
  const productsGridRef = useRef(null);
  const sidebarScrollRef = useRef(null);

  const sidebarRef = useRef(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/product/allproducts`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const text = await res.text();

        // 🔥 IMPORTANT: Empty response guard
        if (!text) {
          throw new Error("Empty response from API");
        }

        const data = JSON.parse(text);

        if (data?.success && Array.isArray(data.allproducts)) {
          setProducts(data.allproducts);
        } else {
          console.error("Invalid API structure:", data);
        }

      } catch (error) {
        console.error("❌ Product fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Initialize open states based on URL params
  useEffect(() => {
    if (!products.length) return;

    let realParent = null;
    let realSub = null;

    // find matching parent from products
    for (const p of products) {
      if (
        category &&
        p.parentCategory.toLowerCase() === category.toLowerCase()
      ) {
        realParent = p.parentCategory;
      }

      if (
        subcategory &&
        p.subCategory.toLowerCase() === subcategory.toLowerCase()
      ) {
        realSub = p.subCategory;
        realParent = p.parentCategory;
      }
    }

    if (realParent) setOpenParent(realParent);
    if (realSub) setOpenSub(realSub);

  }, [category, subcategory, products]);

  /* ================= GROUP DATA ================= */
  const grouped = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.parentCategory]) map[p.parentCategory] = {};
      if (!map[p.parentCategory][p.subCategory])
        map[p.parentCategory][p.subCategory] = [];
      map[p.parentCategory][p.subCategory].push(p);
    });
    return map;
  }, [products]);

  useEffect(() => {
    // Case: subcategory exists but category is missing
    if (subcategory && !category && products.length > 0) {
      const matchedProduct = products.find(
        (p) => p.subCategory === subcategory
      );

      if (matchedProduct) {
        const parent = matchedProduct.parentCategory;

        // Open correct parent & subcategory
        setOpenParent(parent);
        setOpenSub(subcategory);

        // Update URL to keep it consistent
        router.replace(`/products/${slugify(parent)}/${slugify(subcategory)}`, { scroll: false })

        // Scroll subcategory into view
        setTimeout(() => {
          const element = subcategoryRefs.current[subcategory];
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      }
    }
  }, [subcategory, category, products, router]);

  useEffect(() => {
    const sidebar = sidebarScrollRef.current;
    if (!sidebar) return;

    const saved = sessionStorage.getItem("sidebarScroll");
    if (saved) sidebar.scrollTop = Number(saved);

    const handleScroll = () => {
      sessionStorage.setItem("sidebarScroll", sidebar.scrollTop);
    };

    sidebar.addEventListener("scroll", handleScroll);
    return () => sidebar.removeEventListener("scroll", handleScroll);
  }, []);



  /* ================= RIGHT SIDE FILTER ================= */
  const visibleProducts = useMemo(() => {
    if (!category && !subcategory) return products;

    if (category && !subcategory) {
      return products.filter(
        (p) =>
          p.parentCategory.toLowerCase() === category.toLowerCase()
      );
    }

    return products.filter(
      (p) =>
        p.parentCategory.toLowerCase() === category.toLowerCase() &&
        p.subCategory.toLowerCase() === subcategory.toLowerCase()
    );
  }, [products, category, subcategory]);


  /* ================= ENHANCED BREADCRUMB ================= */
  const Breadcrumb = () => {
    const handleHomeClick = () => {
      router.push("/products", { scroll: false });
      setOpenParent(null);
      setOpenSub(null);
      // Scroll to top when going to all products

    };

    return (
      <nav className="mb-8">
        <div className="flex flex-col gap-4">
          <div>
            <ol className="flex flex-wrap items-center gap-3 text-base md:text-lg font-medium">
              <li className="flex items-center gap-2">
                <button
                  onClick={handleHomeClick}
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
                >
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FaHome className="text-orange-500" />
                  </div>
                  <span className="font-medium">All Products</span>
                </button>
              </li>

              {category && (
                <>
                  <FaAngleRight className="text-gray-400" />
                  <li>
                    <button
                      onClick={() => {
                        router.push(`/products/${slugify(category)}`, { scroll: false });
                        setOpenParent(category);
                        setOpenSub(null);
                        // Scroll to top

                      }}
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <FaLayerGroup className="text-gray-600" />
                      </div>
                      <span className="font-semibold">
                        {capitalizeWords(category)}
                      </span>
                    </button>
                  </li>
                </>
              )}

              {subcategory && (
                <>
                  <FaAngleRight className="text-gray-400" />
                  <li>
                    <button
                      onClick={() => {
                        router.push(`/products/${slugify(category)}/${slugify(subcategory)}`, { scroll: false });
                        setOpenParent(category);
                        setOpenSub(subcategory);
                        // Scroll to top

                      }}
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors duration-300"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <FaFolderOpen className="text-orange-500" />
                      </div>
                      <span className="font-semibold">
                        {capitalizeWords(subcategory)}
                      </span>
                    </button>
                  </li>
                </>
              )}
            </ol>

            {/* Page Title */}
            <div className="mt-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                {subcategory
                  ? capitalizeWords(subcategory)
                  : category
                    ? capitalizeWords(category)
                    : "All Products"}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-gray-600">
                  {subcategory
                    ? `${subcategory} products`
                    : category
                      ? `${category} collection`
                      : "Explore our product catalog"
                  }
                </p>
                {visibleProducts.length > 0 && (
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                    {visibleProducts.length} {visibleProducts.length === 1 ? "Product" : "Products"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  /* ================= HANDLE SUBCATEGORY CLICK ================= */
  const handleSubcategoryClick = (parent, sub) => {
    setOpenParent(parent);   // ensure parent stays open
    setOpenSub(sub);         // ALWAYS select subcategory
    setTimeout(() => {
      const el = subcategoryRefs.current[sub];
      if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 100);

    router.push(`/products/${slugify(parent)}/${slugify(sub)}`, { scroll: false });
  };


  /* ================= HANDLE PRODUCT CLICK ================= */
  const handleProductClick = (product) => {
    if (!product?.parentCategory || !product?.title) return;

    router.push(
      `/product/${slugify(product.parentCategory)}/${slugify(product.title)}`,
      { scroll: false }
    );

  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-[4.5rem]">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="lg:col-span-1">
            <div
              ref={sidebarRef}
              className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 
              overflow-hidden overflow-x-hidden"
              style={{ maxHeight: "calc(100vh - 6rem)" }}
            >

              {/* HEADER */}
              <div className="p-4 border-b border-gray-100 bg-orange-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white rounded-lg">
                    <FaFolderOpen className="text-orange-500 text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">PRODUCT CATEGORIES</h2>
                    <p className="text-xs text-gray-600">Browse product categories</p>
                  </div>
                </div>

                {/* SEARCH */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* CATEGORIES LIST */}
              <div
                ref={sidebarScrollRef}
                className="p-4 overflow-y-auto overflow-x-hidden"
                style={{ maxHeight: 'calc(100vh - 18rem)' }}>
                <div className="space-y-1">
                  {Object.entries(grouped)
                    .filter(([parent, subs]) => {
                      if (!search) return true;

                      const s = search.toLowerCase();

                      // parent match
                      if (parent.toLowerCase().includes(s)) return true;

                      // subcategory OR product match
                      return Object.entries(subs).some(([sub, items]) => {
                        if (sub.toLowerCase().includes(s)) return true;

                        return items.some(p =>
                          p.title.toLowerCase().includes(s)
                        );
                      });
                    })
                    .map(([parent, subs]) => (
                      <div key={parent} className="mb-1">

                        {/* PARENT CATEGORY BUTTON */}
                        <button
                          onClick={() => {
                            setOpenParent(parent);
                            setOpenSub(null);
                            router.push(`/products/${slugify(parent)}`, { scroll: false });
                          }}
                          className={`w-full flex justify-between items-center px-3 py-3 text-sm font-medium rounded-lg transition-all ${openParent === parent
                            ? "bg-orange-500 text-white"
                            : "hover:bg-gray-50 text-gray-700 border border-gray-100"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            {openParent === parent ? (
                              <FaFolderOpen className="text-white" />
                            ) : (
                              <FaFolder className="text-gray-400" />
                            )}
                            <span className="truncate text-left">{parent}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${openParent === parent
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600"
                              }`}>
                              {Object.values(grouped[parent]).flat().length}
                            </span>
                            {openParent === parent ? (
                              <FaChevronUp className="text-xs" />
                            ) : (
                              <FaChevronDown className="text-gray-400 text-xs" />
                            )}
                          </div>
                        </button>

                        {/* SUBCATEGORIES DROPDOWN */}
                        <AnimatePresence>
                          {openParent === parent && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, y: -10 }}
                              animate={{ height: "auto", opacity: 1, y: 0 }}
                              exit={{ height: 0, opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2 ml-3 pl-3 border-l-2 border-orange-200"
                            >
                              {Object.entries(grouped[parent]).map(
                                ([sub, items]) => (
                                  <div
                                    key={sub}
                                    className="mb-2"
                                    ref={(el) => subcategoryRefs.current[sub] = el}
                                  >
                                    {/* SUBCATEGORY HEADER */}
                                    <button
                                      onClick={() => handleSubcategoryClick(parent, sub)}
                                      className={`w-full flex justify-between items-center px-4 py-2.5 text-sm rounded-lg transition-all border ${openSub === sub
                                        ? "bg-orange-50 border-orange-200 text-orange-700"
                                        : "hover:bg-gray-50 border-gray-100 text-gray-700"
                                        }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <FaFolder className={`text-xs ${openSub === sub
                                          ? "text-orange-600"
                                          : "text-gray-400"
                                          }`} />
                                        <span className="truncate text-left">{sub}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${openSub === sub
                                          ? "bg-orange-100 text-orange-700"
                                          : "bg-gray-100 text-gray-600"
                                          }`}>
                                          {items.length}
                                        </span>
                                        <FaChevronDown className={`text-xs transition-transform ${openSub === sub ? "rotate-180" : ""
                                          }`} />
                                      </div>
                                    </button>

                                    {/* PRODUCT LIST DROPDOWN */}
                                    {/* PRODUCT LIST REMOVED — only keep spacing for animation */}
                                    <AnimatePresence>
                                      {openSub === sub && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 8, opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: 0.15 }}
                                          className="mt-1 ml-4 pl-3 border-l border-gray-200"
                                        />
                                      )}
                                    </AnimatePresence>
                                  </div>
                                )
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}

                  {/* No Results State */}
                  {Object.keys(grouped).filter((parent) =>
                    parent.toLowerCase().includes(search.toLowerCase())
                  ).length === 0 && (
                      <div className="text-center py-8 px-4">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                          <FaSearch className="text-xl text-gray-400" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">No categories found</h3>
                        <p className="text-sm text-gray-500">Try a different search term</p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT PRODUCTS ================= */}
          <section ref={productsGridRef} className="lg:col-span-3">
            {/* Products Grid */}
            {visibleProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleProducts.map((p) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      y: -4
                    }}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(p)}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-orange-300 hover:shadow-lg">
                      {/* Image Container */}
                      <div className="h-56 sm:h-60 relative overflow-hidden bg-gray-50">
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                            {p.parentCategory}
                          </span>
                        </div>

                        {/* Main Image */}
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="relative w-full h-full">
                            <Image
                              src={p.images?.[0]?.url || "/placeholder-product.png"}
                              alt={p.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain transition-transform duration-500 group-hover:scale-105"
                              priority={false}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                            {p.subCategory}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                          {p.title}
                        </h3>

                        {p.subtitle && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {p.subtitle}
                          </p>
                        )}

                        {/* View Product Button */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">View Details</span>
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300">
                              <FaAngleRight className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-orange-50 rounded-full flex items-center justify-center">
                  <FaSearch className="text-3xl text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No products found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {category || subcategory
                    ? `No products available in "${subcategory || category}".`
                    : "No products are currently available."
                  }
                </p>
                <button
                  onClick={() => {
                    router.push("/products", { scroll: false });
                    setOpenParent(null);
                    setOpenSub(null);
                  }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-all duration-300"
                >
                  <FaHome />
                  View All Products
                </button>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}