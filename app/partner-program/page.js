'use client';

import {
  FaQuestionCircle,
  FaHandshake,
  FaPhone,
} from 'react-icons/fa';
import { useRouter } from "next/navigation";

import PartnerSlider from '../components/PartnerSlider';
import WhoCanApply from '../components/ProductPages/Whocanapply';
import AnimatedPartnerButton from "../components/AnimatedPartnerButton";
import PartnerQuickActions from '../components/PartnerQuickActions';
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

export default function Page() {

  const router = useRouter();


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
              className="
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
              className="
          relative px-10 py-4 rounded-full
          border-2 border-orange-500
          text-orange-600 font-semibold text-lg
          hover:bg-orange-500 hover:text-white
          hover:scale-105
          transition-all duration-300
        "
            >
              SI Partner
            </button>

          </div>
        </div>
      </section>



      {/* Who Can Apply */}
      <WhoCanApply />

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <FaQuestionCircle className="text-orange-500" />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-orange-50 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-600">
                Our team is ready to help you get started.
              </p>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2">
              <FaPhone />
              Contact Us
            </button>
          </div>
        </div>
      </section>
      {/* <PartnerQuickActions /> */}

    </div>
  );
}
