"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { api } from "../../lib/api";

export default function HomeFaq({ slug }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [faqData, setfaqData] = useState(null);

  useEffect(() => {
    const fetchfaq = async () => {
      try {
        const response = await api.get(
          `faq?page_name=${slug}`
        );

        if (response?.data?.length > 0) {
          const page = response.data[0];
          setfaqData(page);


        }
      } catch (error) {
        console.error("Failed to fetch About Us:", error);
      }
    };

    fetchfaq();
  }, []);

  if (!faqData) return null;

  // const faqs = [
  //   {
  //     question: "What does Nexus IO offer ?",
  //     answer:
  //       "Secureye offers a variety of security solutions, including CCTV cameras, IP cameras, biometric attendance systems, access control devices, smart locks, hotel locks, video door phones, and wireless security systems. These products are designed to cater to both residential and commercial security needs.",
  //   },
  //   {
  //     question: "How Can Nexus IO Improve Security for Businesses and Homes ?",
  //     answer:
  //       "Nexus IO integrates advanced surveillance and control systems that ensure maximum safety, real-time monitoring, and easy management through smart technology.",
  //   },
  //   {
  //     question: "How Can I Get Started with Nexus IO ?",
  //     answer:
  //       "You can contact our support team or fill out the inquiry form to get personalized assistance in selecting and setting up your desired security solutions.",
  //   },
  //   {
  //     question: "Can it Integrate with Existing Systems ?",
  //     answer:
  //       "Yes, Nexus IO is designed to integrate seamlessly with most existing security infrastructures, minimizing disruption while upgrading capabilities.",
  //   },
  //   {
  //     question: "How can I become a dealer ?",
  //     answer:
  //       "Simply reach out to our partnership team to learn about dealer opportunities, benefits, and the onboarding process.",
  //   },
  // ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Have a Question ?
          </h2>
          <p className="text-gray-500 mb-6">
            Check out the most common questions our customers asked. Still have
            questions? Contact Us
          </p>

          <div className="h-[2px] w-12 bg-gradient-to-r from-orange-400 to-teal-400 mb-8"></div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            We follow a clear process to help you out
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            We’ve streamlined our process to make securing your property and
            upgrading your network a hassle-free experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="tel:18001200231"
              className="flex items-center gap-3 bg-orange-100 text-orange-600 border border-orange-200 rounded-lg px-5 py-3 font-medium hover:bg-orange-200 transition"
            >
              <FaPhoneAlt /> 1800 1200 231
            </a>

            <a
              href="mailto:nexusinfo@gmail.com"
              className="flex items-center gap-3 bg-orange-500 text-white rounded-lg px-5 py-3 font-medium hover:bg-orange-600 transition"
            >
              <FaEnvelope /> nexusinfo@gmail.com
            </a>
          </div>
        </div>

        {/* RIGHT SIDE (FAQ) */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex justify-between items-center text-left px-5 py-4 font-medium text-gray-700 ${activeIndex === index ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <span>{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-4 text-gray-600 text-sm leading-relaxed bg-gray-50"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
