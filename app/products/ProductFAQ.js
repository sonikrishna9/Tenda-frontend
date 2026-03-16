"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaPhoneAlt, FaEnvelope, FaHeadset } from "react-icons/fa";

const faqData = [
  {
    question: "What products does tenda offer?",
    answer:
      "tenda offers IP cameras, DVRs, NVRs, biometric systems, access control systems, and networking solutions for residential and commercial security needs."
  },
  {
    question: "Is tenda a Made in India brand?",
    answer:
      "Yes, tenda is a proudly Made in India brand delivering high-quality security solutions tailored for Indian customers since 2005."
  },
  {
    question: "How can I purchase tenda products?",
    answer:
      "Purchase through authorized distributors, online platforms like Amazon and Flipkart, or contact our sales team directly for bulk orders."
  },
  {
    question: "What is the warranty period on tenda products?",
    answer:
      "Most tenda products come with a 1-year standard warranty. Selected products have extendaed warranty options available at the time of purchase."
  },
  {
    question: "Do you provide installation services?",
    answer:
      "Yes, we have a pan-India network of authorized installers who can help with professional installation of your security systems."
  },
  {
    question: "How can I download software or firmware updates?",
    answer:
      "Visit our official website support section at support.tenda.com to download the latest firmware, software, and product manuals."
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy on unopened products. For defective items, we provide replacement or repair under warranty terms."
  },
  {
    question: "Do you offer technical support after purchase?",
    answer:
      "Absolutely! All customers get lifetime technical support via phone, email, and chat. Our support team is available Monday to Saturday."
  }
];

export default function HaveQuestionFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const leftRef = useRef(null);
  const parentRef = useRef(null);

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

        if (parentBottom <= cardHeight + 120) {

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

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-400 font-semibold text-sm tracking-wider uppercase mb-3 block">
            Get Answers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about tenda products and services
          </p>
        </div>

        <div
          ref={parentRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative"
        >

          {/* ================= LEFT CONTACT PANEL (STICKY) ================= */}
          <div className="relative">

            <div
              ref={leftRef}
              className={`
      transition-all duration-300
      ${isFixed ? "lg:fixed lg:top-28 lg:w-[380px]" : ""}
      ${isBottom ? "lg:absolute lg:bottom-0 lg:w-[380px]" : ""}
    `}
            >

              {/* YOUR EXISTING DESIGN SAME */}
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl shadow-xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="p-8">
                  <div className="inline-flex bg-white/20 rounded-full p-3 mb-6">
                    <FaHeadset className="text-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    Still have questions?
                  </h3>

                  <p className="text-orange-100 leading-relaxed">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                </div>

                {/* Contact Options */}
                <div className="bg-white/10 backdrop-blur-sm px-8 py-6 flex-1">

                  {/* Phone */}
                  <a
                    href="tel:18001022366"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl px-5 py-4 transition-all group"
                  >
                    <div className="bg-orange-400 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <FaPhoneAlt className="text-white text-sm" />
                    </div>

                    <div>
                      <p className="text-xs text-orange-200 mb-1">
                        Call us toll-free
                      </p>
                      <p className="font-semibold">
                        +91 8000200056
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@tenda.com"
                    className="flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl px-5 py-4 transition-all group mt-4"
                  >
                    <div className="bg-orange-400 p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <FaEnvelope className="text-white text-sm" />
                    </div>

                    <div>
                      <p className="text-xs text-orange-200 mb-1">
                        Email us anytime
                      </p>
                      <p className="font-semibold">
                        sales@tendaindia.com
                      </p>
                    </div>
                  </a>

                </div>

              </div>

            </div>

          </div>
          {/* ================= RIGHT FAQ LIST ================= */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqData.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white rounded-xl border transition-all ${isOpen
                      ? 'border-orange-400 shadow-lg'
                      : 'border-gray-200 hover:border-orange-200 hover:shadow-md'
                      }`}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="w-full flex justify-between items-center px-6 py-5 text-left"
                    >
                      <span className="text-gray-800 font-semibold text-base pr-8">
                        {item.question}
                      </span>

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-orange-400' : 'bg-gray-100'
                        }`}>
                        <FaChevronDown
                          className={`text-xs transition-all ${isOpen ? 'text-white rotate-180' : 'text-gray-500'
                            }`}
                        />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t border-orange-100 pt-4"></div>
                            <p className="text-gray-600 text-base leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-gray-700">
                <span className="font-semibold text-orange-600">Quick help?</span> Our team typically responds within 1 hour
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}