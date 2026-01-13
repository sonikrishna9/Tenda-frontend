"use client";

import { motion } from "framer-motion";
import DistributorSlider from "./DistributorSlider";
import {
    FaChartLine,
    FaHeadset,
    FaShieldAlt,
    FaTruck,
    FaUsers,
    FaQuestionCircle,
    FaPhone,
    FaNetworkWired,
    FaBroadcastTower,
} from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineBusiness } from "react-icons/md";
import Steps from "../steps";
import Testimonial from "../Testimonial";
import Solutions from "../Solutions";

export default function DistrubutorPage() {
    const benefits = [
        {
            icon: <FaNetworkWired className="text-3xl" />,
            title: "Enterprise Portfolio",
            description:
                "Access complete enterprise-grade routers, switches, access points, and wireless solutions.",
        },
        {
            icon: <MdOutlineAttachMoney className="text-3xl" />,
            title: "High Margin Model",
            description:
                "Project-based pricing and bulk order benefits for long-term profitability.",
        },
        {
            icon: <FaHeadset className="text-3xl" />,
            title: "Pre & Post Sales Support",
            description:
                "Dedicated technical assistance for design, deployment, and maintenance.",
        },
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: "Enterprise Warranty",
            description:
                "Extended warranty, RMA support, and priority resolution for enterprise clients.",
        },
        {
            icon: <FaBroadcastTower className="text-3xl" />,
            title: "ISP & Outdoor Solutions",
            description:
                "High-performance wireless & outdoor networking solutions for ISPs.",
        },
        {
            icon: <FaTruck className="text-3xl" />,
            title: "Project Logistics",
            description:
                "Reliable supply chain support for large-scale and multi-location projects.",
        },
    ];


    const faqItems = [
        {
            question: "Who can apply for SI / ISP partnership?",
            answer:
                "System Integrators, ISPs, network consultants, and enterprise solution providers can apply.",
        },
        {
            question: "Do you provide solution design support?",
            answer:
                "Yes, we offer network design, architecture planning, and deployment guidance.",
        },
        {
            question: "Is there a minimum project commitment?",
            answer:
                "Project requirements vary. Our team will discuss suitable engagement models with you.",
        },
    ];

    return (
        <>
            {/* Slider */}
            <DistributorSlider />

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
                        <span className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                            SI & ISP Partner Program
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Partner with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                            TENDA
                        </span>
                        <br /> as a System Integrator / ISP
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                        Deliver scalable, secure, and high-performance networking solutions
                        with TENDA’s enterprise-grade portfolio and expert support.
                    </p>

                    {/* <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 hover:-translate-y-1">
              Apply as SI / ISP
            </button>
            <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300">
              Download Portfolio
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
                            { value: "1000+", label: "Enterprise Partners" },
                            { value: "50+", label: "Countries Covered" },
                            { value: "24/7", label: "Technical Support" },
                            { value: "10Gb+", label: "Enterprise Solutions" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                    {stat.value}
                                </div>
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
                        Why Choose <span className="text-orange-600">TENDA</span>?
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Built for enterprise networks, ISPs, and large-scale deployments
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
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-blue-50 flex items-center justify-center text-orange-600 mb-6 group-hover:from-orange-600 group-hover:to-blue-600 group-hover:text-white transition-all duration-300">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">
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

            {/* Testimonial */}
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
                                    <FaQuestionCircle className="text-orange-600" />
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-orange-50 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">
                                Need enterprise assistance?
                            </h3>
                            <p className="text-gray-600">
                                Our SI & ISP support team is here to help.
                            </p>
                        </div>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2">
                            <FaPhone />
                            Contact Enterprise Team
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
