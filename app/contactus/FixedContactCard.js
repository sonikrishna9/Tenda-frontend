"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function FixedContactCard({ parentRef }) {

  const leftRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const pathname = usePathname();

  const isPartnerPage = pathname.startsWith("/partner-program");

  useEffect(() => {

    const handleScroll = () => {

      if (!parentRef.current || !leftRef.current) return;

      const parent = parentRef.current;
      const card = leftRef.current;

      const parentRect = parent.getBoundingClientRect();
      const cardHeight = card.offsetHeight;

      const parentTop = parentRect.top;
      const parentBottom = parentRect.bottom;

      if (window.innerWidth < 1024) {
        setIsFixed(false);
        setIsBottom(false);
        return;
      }

      if (parentTop <= 0) {

        if (parentBottom <= cardHeight + 20) {
          setIsFixed(false);
          setIsBottom(true);
        } else {
          setIsFixed(true);
          setIsBottom(false);
        }

      } else {
        setIsFixed(false);
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (
    <div className="relative">

      <div
        ref={leftRef}
        className={`
        transition-all duration-300
        ${isFixed ? "lg:fixed lg:top-24 lg:w-[420px]" : ""}
        ${isBottom ? "lg:absolute lg:bottom-0 lg:w-[420px]" : ""}
        `}
      >

        <motion.div className="bg-[#F64D00] text-white rounded-2xl shadow-xl p-8">

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4">
            {isPartnerPage ? "Become a Registered Partner" : "Have A Question?"}
          </h2>

          <p className="text-white/90 mb-8 leading-relaxed">
            {isPartnerPage
              ? "Join our partner program and unlock exclusive business opportunities, better margins, and dedicated support. Let's grow together."
              : "Check out the most common questions our customers asked. Still have questions? Contact our customer support."
            }
          </p>

          {/* Call Button */}
          <a
            href="tel:18001022366"
            className="flex items-center justify-between bg-black text-white rounded-full px-6 py-4 mb-4 hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📞</span>
              <span className="text-sm opacity-80">
                {isPartnerPage ? "Talk to Sales" : "Call Us"}
              </span>
            </div>

            <span className="font-semibold">+91 8000 2000 56</span>
          </a>

          {/* Email Button */}
          <a
            href="mailto:info@secureye.com"
            className="flex items-center justify-between border border-white/70 text-white rounded-full px-6 py-4 hover:bg-white hover:text-[#FF5A2C] transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">✉️</span>
              <span className="text-sm opacity-80">Email Us</span>
            </div>

            <span className="font-semibold">sales@tendaindia.com</span>
          </a>

        </motion.div>

      </div>

    </div>
  );
}