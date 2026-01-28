"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Partner Program", href: "/partner-program" },
    { label: "Products", href: "/all-product" },
    { label: "Blogs", href: "/blogs" },
  ];

  /* 🔒 Lock body scroll WITHOUT layout shift */
  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      {/* NAVBAR */}
      <div
        className="
          h-[72px]
          max-w-[1600px] mx-auto
          flex items-center justify-between
          px-4 sm:px-6 md:px-8 lg:px-12
        "
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-7 sm:h-8 md:h-9 lg:h-10 w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul
          className="
            hidden md:flex items-center
            gap-5 lg:gap-7 xl:gap-8
            text-gray-700 font-medium
          "
        >
          {navLinks.map((nav) => (
            <li key={nav.href}>
              <Link
                href={nav.href}
                aria-current={isActive(nav.href) ? "page" : undefined}
                className={`transition whitespace-nowrap ${isActive(nav.href)
                    ? "text-orange-500 font-semibold"
                    : "text-[#323232] hover:text-orange-500"
                  }`}
              >
                {nav.label}
              </Link>
            </li>
          ))}

          <li className="ml-1">
            <Link
              href="/contactus"
              className={`px-5 py-2 rounded-lg transition whitespace-nowrap ${isActive("/contactus")
                  ? "bg-orange-600 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* MOBILE ICON */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            md:hidden
            text-3xl
            text-gray-700
            focus:outline-none
            focus:ring-2 focus:ring-orange-400
            rounded
            p-1
          "
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
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
            className="
              md:hidden
              fixed
              top-[72px]
              left-0
              w-full
              h-[calc(100dvh-72px)]
              bg-white
              z-40
              overflow-y-auto overflow-x-hidden            "
          >
            <ul className="flex flex-col items-center gap-6 py-10 text-lg font-medium">
              {navLinks.map((nav, index) => (
                <motion.li
                  key={nav.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    href={nav.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(nav.href) ? "page" : undefined}
                    className={`transition ${isActive(nav.href)
                        ? "text-orange-500 font-semibold"
                        : "text-[#323232] hover:text-orange-500"
                      }`}
                  >
                    {nav.label}
                  </Link>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
              >
                <Link
                  href="/contactus"
                  onClick={() => setIsOpen(false)}
                  className={`px-8 py-3 rounded-lg transition ${isActive("/contactus")
                      ? "bg-orange-600 text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
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
