"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Partner Program", href: "/partner-program" },
    { label: "Products", href: "/all-product" },
    { label: "Blogs", href: "/blogs" },
  ];

  // 🔒 Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      {/* NAVBAR */}
      <div className="h-[72px] flex justify-between items-center px-4 sm:px-6 md:px-12">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-7 sm:h-8 md:h-9 w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                className="text-[#323232] hover:text-orange-500 transition"
              >
                {nav.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/contactus"
              className="bg-orange-500 px-5 py-2 rounded-lg text-white hover:bg-orange-600 transition"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* MOBILE ICON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-gray-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-white z-40"
          >
            <ul className="flex flex-col items-center gap-8 py-10 text-lg font-medium">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={nav.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[#323232] hover:text-orange-500 transition"
                  >
                    {nav.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Link
                  href="/contactus"
                  onClick={() => setIsOpen(false)}
                  className="bg-orange-500 px-8 py-3 rounded-lg text-white hover:bg-orange-600 transition"
                >
                  Contact Us
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
