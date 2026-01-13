"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaWifi,
  FaNetworkWired,
  FaSignal,
  FaBroadcastTower,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { RxArrowTopRight } from "react-icons/rx";

/* ------------------ SECTIONS SOURCE ------------------ */

const sections = [
  {
    title: "AC Routers",
    image: "/images/products/whocanapply/p1.png",
    icon: <FaWifi size={36} color="#F0622B" />,
    products: [
      {
        name: "AC5",
        img: "/images/products/whocanapply/p1.png",
        link: "https://www.tendacn.com/in/product/AC5V3",
      },
      {
        name: "AC10",
        img: "/images/products/whocanapply/p1.png",
        link: "https://www.tendacn.com/product/ac10v3.html",
      },
    ],
  },
  {
    title: "Enterprise Routers",
    image: "/images/products/whocanapply/p2.png",
    icon: <FaNetworkWired size={36} color="#F0622B" />,
    products: [
      {
        name: "W18E",
        img: "/images/products/whocanapply/p2.png",
        link: "https://www.tendacn.com/in/product/W18EV2.html",
      },
      {
        name: "W50E",
        img: "/images/products/whocanapply/p2.png",
        link: "https://www.tendacn.com/product/W50E",
      },
    ],
  },
  {
    title: "WiFi 6 Routers",
    image: "/images/products/whocanapply/p4.png",
    icon: <FaSignal size={36} color="#F0622B" />,
    products: [
      {
        name: "RX2 Pro",
        img: "/images/products/whocanapply/p4.png",
        link: "https://www.tendacn.com/product/rx2pro",
      },
      {
        name: "RX27 Pro",
        img: "/images/products/whocanapply/p4.png",
        link: "https://www.tendacn.com/product/rx27pro",
      },
    ],
  },
  {
    title: "Access Points",
    image: "/images/products/whocanapply/p8.png",
    icon: <FaBroadcastTower size={36} color="#F0622B" />,
    products: [
      {
        name: "I24",
        img: "/images/products/whocanapply/p8.png",
        link: "https://www.tendacn.com/product/i24",
      },
      {
        name: "I26",
        img: "/images/products/whocanapply/p8.png",
        link: "https://www.tendacn.com/product/i26.html",
      },
    ],
  },
];

/* ------------------ HELPERS ------------------ */

const allProducts = sections.flatMap((section) =>
  section.products.map((product) => ({
    ...product,
    category: section.title,
  }))
);

const getRandomProducts = (arr, count = 6) =>
  [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

const getItemsCount = () => {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth >= 1024) return 4; // desktop
  if (window.innerWidth >= 768) return 2; // tablet
  return 1; // mobile
};

/* ------------------ COMPONENT ------------------ */

export default function Homeproducts() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [itemsCount, setItemsCount] = useState(4);

  useEffect(() => {
    const updateCount = () => {
      setItemsCount(getItemsCount());
    };

    updateCount();
    window.addEventListener("resize", updateCount);

    setProducts(getRandomProducts(allProducts, 6));

    return () => window.removeEventListener("resize", updateCount);
  }, []);

  if (!products.length) return null;

  const nextSlide = () =>
    setCurrent((p) => (p + itemsCount) % products.length);

  const prevSlide = () =>
    setCurrent((p) => (p - itemsCount + products.length) % products.length);

  const visibleProducts = products.slice(
    current,
    current + itemsCount
  );

  const itemsToShow =
    visibleProducts.length < itemsCount
      ? [
          ...visibleProducts,
          ...products.slice(0, itemsCount - visibleProducts.length),
        ]
      : visibleProducts;

  return (
    <>
      {/* ---------------- BROWSE CATEGORIES ---------------- */}
      <section className="py-12 px-6 md:px-12 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold"
        >
          <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
            Browse Categories
          </span>
        </motion.h2>

        <p className="text-gray-500 mt-2">
          Explore TENDA networking product categories
        </p>

        <div className="w-32 h-[2px] mx-auto mt-2 bg-linear-to-r from-[#7DD8D0] to-[#F0622B]" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {sections.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-xl shadow-md border flex flex-col items-center justify-center bg-white hover:shadow-lg h-[220px]"
            >
              {index === 0 ? (
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-[65%] object-contain"
                />
              ) : (
                <div className="flex items-center justify-center bg-[#FFF5EF] w-16 h-16 rounded-full mb-3">
                  {cat.icon}
                </div>
              )}

              <h3 className="font-semibold text-gray-800">
                {cat.title}
              </h3>

              {index === 0 && (
                <button className="bg-[#F0622B] text-white text-sm mt-2 px-4 py-1.5 rounded-full">
                  View Products
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED PRODUCTS ---------------- */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Products
            </h2>
            <p className="text-gray-500">
              Popular TENDA networking solutions
            </p>
            <div className="w-32 h-[2px] bg-linear-to-r from-[#7DD8D0] to-[#F0622B] mt-2" />
          </div>

          <div className="flex gap-3">
            <button onClick={prevSlide} className="p-2 border rounded-full">
              <FaArrowLeft />
            </button>
            <button onClick={nextSlide} className="p-2 border rounded-full">
              <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence>
            {itemsToShow.map((product) => (
              <motion.a
                key={product.name}
                href={product.link}
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative bg-white border shadow-md rounded-xl overflow-hidden"
              >
                <div className="absolute top-3 right-3 bg-[#F0622B] text-white p-1 rounded-full">
                  <RxArrowTopRight size={18} />
                </div>

                <img
                  src={product.img}
                  className="w-full h-48 object-contain"
                />

                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <button className="bg-[#F0622B] text-white mt-4 px-4 py-2 rounded-full text-sm">
                    More Details
                  </button>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
