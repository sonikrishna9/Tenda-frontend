'use client';

import {
  FaQuestionCircle,
  FaHandshake,
  FaPhone,
} from 'react-icons/fa';
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
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white via-orange-50 to-white">

      <PartnerSlider />

      {/* Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaHandshake className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Partner Program Overview
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Grow faster with TENDA through technical training, marketing support, and dedicated partner success.
          </p>
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
      <PartnerQuickActions />

    </div>
  );
}
