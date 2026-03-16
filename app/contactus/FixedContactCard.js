"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

export default function FixedContactCard({ parentRef }) {

  const leftRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

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

        <motion.div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <FiPhone className="text-orange-500" />
              <a href="tel:+918000200056">
                +91 8000 2000 56
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FiMail className="text-orange-500" />
              <a href="mailto:sales@tendaindia.com">
                sales@tendaindia.com
              </a>
            </div>

            <div className="flex items-start gap-4">
              <FiMapPin className="text-orange-500" />
              <p>
                Plot 03, Sector 138, Noida<br/>
                Uttar Pradesh - 201305
              </p>
            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}