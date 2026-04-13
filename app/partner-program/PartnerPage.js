'use client';
import { useRef, useState } from "react";
import {
  FaQuestionCircle,
  FaHandshake,
  FaPhone,
} from 'react-icons/fa';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";


import PartnerSlider from '../components/PartnerSlider';
import WhoCanApply from '../components/ProductPages/Whocanapply';
import AnimatedPartnerButton from "../components/AnimatedPartnerButton";
import PartnerQuickActions from '../components/PartnerQuickActions';
import ProductFAQ from "../products/ProductFAQ";
import EnquiryForm from '../contactus/EnquiryForm';
import FixedContactCard from '../contactus/FixedContactCard';
/* -------------------- DATA -------------------- */

const faqItems = [
  {
    question: 'Is there any joining fee for the partner program?',
    answer:
      'No, joining our partner program is completely free. We believe in growing together and only succeed when our partners succeed.',
  },
  {
    question: 'What kind of training and support do you provide?',
    answer:
      'We provide comprehensive training including product knowledge, technical implementation, sales enablement, and marketing guidance.',
  },
  {
    question: 'How quickly can I start selling TENDA products?',
    answer:
      'Once registered, you can start immediately. Approval usually takes 24–48 hours.',
  },
];



/* -------------------- PAGE -------------------- */

export default function PartnerPage() {

  const router = useRouter();

  const parentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "general",
    priceRange: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://bothook.io/v1/public/triggers/webhooks/d48f4297-66cc-4303-8748-90ad07182868",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          inquiryType: "general",
          priceRange: "",
          message: ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">

      <PartnerSlider />

      {/* Overview */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaHandshake className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Partner With Tenda India
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-10">
            Grow your business by joining the Tenda India Partner Program — a nationwide channel initiative built for distributors, system integrators, IT resellers, retailers, and technology partners who want to expand with reliable, high-performance networking products.
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-10">
            Tenda India offers strong product demand, competitive margins, dedicated support, and collaborative growth opportunities for partners of all sizes.
          </p>

          {/* ================= BEAUTIFUL BUTTONS ================= */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

            {/* Dealer Button */}
            <button
              onClick={() => router.push("/partner-program/dealer")}
              className=" cursor-pointer
          relative px-10 py-4 rounded-full 
          bg-gradient-to-r from-orange-500 to-orange-600
          text-white font-semibold text-lg
          shadow-lg shadow-orange-200
          hover:shadow-orange-300
          hover:scale-105
          transition-all duration-300
          group
        "
            >
              <span className="relative z-10">Dealer / Distributor</span>
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition" />
            </button>

            {/* SI Partner Button */}
            <button
              onClick={() => router.push("/partner-program/sipartner")}
              className=" cursor-pointer
           relative px-10 py-4 rounded-full 
          bg-gradient-to-r from-orange-500 to-orange-600
          text-white font-semibold text-lg
          shadow-lg shadow-orange-200
          hover:shadow-orange-300
          hover:scale-105
          transition-all duration-300
          group
        "
            >
              SI Partner
            </button>

          </div>
        </div>
      </section>



      {/* Who Can Apply */}
      <WhoCanApply />

      <section className="bg-gradient-to-b from-white via-orange-50 to-white py-20 px-4">

        <div className="max-w-7xl mx-auto">

          {/* HEADING */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true }}
            className="text-center mb-16"
          >

            <h2 className="text-4xl font-bold text-orange-600 mb-4">
              Get In Touch
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions about our partner program? Send us a message and our team will get back to you shortly.
            </p>

          </motion.div>

          <div
            ref={parentRef}
            className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12"
          >


            <FixedContactCard parentRef={parentRef} />

            <EnquiryForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              itemVariants={itemVariants}
            />

          </div>

        </div>

      </section>


      {/* <ProductFAQ /> */}
    </div>
  );
}
