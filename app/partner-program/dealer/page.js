"use client";

import { motion } from "framer-motion";
import DealerSlider from "./DealerSlider";
import {
    FaCheckCircle, FaChartLine, FaHeadset, FaShieldAlt, FaTruck, FaUsers, FaQuestionCircle,
    FaPhone
} from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineInventory } from "react-icons/md";
import Steps from "../steps";
import Testimonial from "../Testimonial";
import Solutions from "../Solutions";

export default function DealerPage() {
    const benefits = [
        {
            icon: <MdOutlineAttachMoney className="text-3xl" />,
            title: "Competitive Pricing",
            description: "Attractive margins and volume-based discounts to maximize your profitability"
        },
        {
            icon: <FaChartLine className="text-3xl" />,
            title: "Growth Support",
            description: "Marketing materials and sales tools to help you expand your customer base"
        },
        {
            icon: <FaHeadset className="text-3xl" />,
            title: "Dedicated Support",
            description: "Priority technical and sales support from our expert team"
        },
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Warranty & RMA",
            description: "Comprehensive warranty coverage and streamlined return process"
        },
        {
            icon: <MdOutlineInventory className="text-3xl" />,
            title: "Product Training",
            description: "Regular training sessions on new products and technologies"
        },
        {
            icon: <FaTruck className="text-3xl" />,
            title: "Logistics Support",
            description: "Efficient inventory management and timely delivery systems"
        }
    ];

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


    const requirements = [
        "Valid business registration and tax documents",
        "Retail space or established online presence",
        "Minimum initial order commitment",
        "Technical knowledge of networking products",
        "Customer service capabilities",
        "Market development plan"
    ];


    return (
        <>
            {/* Slider */}
            <DealerSlider />

            {/* -------- Hero Section -------- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />

                <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                            Partner Program
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Become an Authorized <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            TENDA Dealer
                        </span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                        Join India's fastest-growing networking brand. Access premium products,
                        competitive pricing, and comprehensive support to grow your business.
                    </p>

                    {/* <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-1">
                            Apply Now
                        </button>
                        <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300">
                            Download Brochure
                        </button>
                    </motion.div> */}

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    >
                        {[
                            { value: "5000+", label: "Active Dealers" },
                            { value: "95%", label: "Satisfaction Rate" },
                            { value: "48H", label: "Avg. Support Time" },
                            { value: "₹50L+", label: "Annual Revenue Potential" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* -------- Benefits Section -------- */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Why Partner With <span className="text-orange-500">TENDA?</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        We provide everything you need to succeed in the networking business
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 group hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-orange-500 mb-6 group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white transition-all duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* -------- Process Section -------- */}
            <Steps />

            {/* Testimonail */}

            <Testimonial />

            {/* Solutions */}
            <Solutions />

            {/* -------- FAQ Section -------- */}
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

        </>
    );
}