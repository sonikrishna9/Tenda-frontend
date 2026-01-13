'use client';

import { motion } from 'framer-motion';
import {
  FaQuestionCircle,
  FaHandshake,
  FaUsers,
  FaBuilding,
  FaGlobe,
  FaChartLine,
  FaTools,
  FaShieldAlt,
  FaLightbulb,
  FaHeadset,
  FaRocket,
  FaArrowRight,
  FaStar,
  FaCheckCircle,
  FaPhone,
  FaFileAlt,
  FaRegCheckCircle,
} from 'react-icons/fa';
import PartnerSlider from '../components/PartnerSlider';
import WhoCanApply from '../components/ProductPages/Whocanapply';

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

const programSteps = [
  {
    step: '1',
    title: 'Fill Registration Form',
    description: 'Submit your business and contact details online',
    icon: <FaFileAlt className="w-5 h-5" />,
    color: 'from-orange-500 to-amber-400',
  },
  {
    step: '2',
    title: 'Document Verification',
    description: 'Our team verifies your business documents',
    icon: <FaShieldAlt className="w-5 h-5" />,
    color: 'from-orange-500 to-orange-600',
  },
  {
    step: '3',
    title: 'Approval & Start Business',
    description: 'Get approved and start selling TENDA products',
    icon: <FaRocket className="w-5 h-5" />,
    color: 'from-orange-600 to-red-500',
  },
];

const partnerTypes = [
  {
    title: 'Dealers & Distributors',
    icon: <FaChartLine className="w-7 h-7" />,
    description: 'Sell TENDA products through your distribution network',
    features: ['Volume discounts', 'Marketing materials', 'Priority support'],
  },
  {
    title: 'System Integrators',
    icon: <FaTools className="w-7 h-7" />,
    description: 'Deploy TENDA solutions in client projects',
    features: ['Technical training', 'Solution design', 'Certification'],
  },
  {
    title: 'ISPs',
    icon: <FaGlobe className="w-7 h-7" />,
    description: 'Enhance broadband & networking offerings',
    features: ['Bulk pricing', 'Custom solutions', 'Tech collaboration'],
  },
  {
    title: 'IT Companies',
    icon: <FaShieldAlt className="w-7 h-7" />,
    description: 'Expand your service portfolio',
    features: ['Partner portal', 'Sales enablement', 'Joint marketing'],
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
      {/* <section className="py-16 px-4 bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-12 text-gray-900">
            Who Can Apply
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-5 text-orange-600">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <FaRegCheckCircle className="text-green-500 w-4 h-4" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
       */}

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
    </div>
  );
}
