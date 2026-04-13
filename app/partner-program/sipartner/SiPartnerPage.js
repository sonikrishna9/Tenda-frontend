"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    FaChartLine,
    FaHeadset,
    FaShieldAlt,
    FaTruck,
    FaCheck,
    FaUsers,
    FaQuestionCircle,
    FaPhone,
    FaNetworkWired,
    FaBroadcastTower,
} from "react-icons/fa";
import { MdOutlineAttachMoney, MdOutlineBusiness } from "react-icons/md";
import Steps from "../steps";
import VideoShowcaseSection from "../VideoCard";
import ProductFAQ from "../../products/ProductFAQ"
import Solutions from "../Solutions";
import SipartnerSlider from "./SipartnerSlider";
import FixedContactCard from "@/app/contactus/FixedContactCard";
import EnquiryForm from "@/app/contactus/EnquiryForm";


export default function SiPartnerPage() {

    const parentRef = useRef(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [videos, setvideos] = useState()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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
                    body: JSON.stringify({
                        ...formData,
                        mobile: formData.phone
                    })
                }
            );

            if (response.ok) {
                setShowSuccess(true);

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    inquiryType: "general",
                    priceRange: "",
                    message: ""
                });
            }

        } catch (err) {
            console.error(err);
        }
    };


    const scrollToForm = () => {
        parentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

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
            <SipartnerSlider />

            {/* -------- Hero Section -------- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50" />

                <div className="relative max-w-6xl mx-auto px-4 py-16 md:pb-24 text-center md:pt-10">
                    {/* <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <span className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                            SI & ISP Partner Program
                        </span>
                    </motion.div> */}

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Partner with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                            TENDA
                        </span>
                        <br /> as a System Integrator / ISP
                    </h1>

                    {/* ================= BEAUTIFUL BUTTONS ================= */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pb-4">

                        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                            Deliver scalable, secure, and high-performance networking solutions
                            with TENDA’s enterprise-grade portfolio and expert support.
                        </p>

                        {/* SI Partner Button */}

                    </div>

                    <button
                        onClick={scrollToForm}
                        className=" cursor-pointer
                          relative px-6 py-3 rounded-full 
                         bg-gradient-to-r from-orange-500 to-orange-600
                         text-white font-semibold text-lg
                         shadow-lg shadow-orange-200
                         hover:shadow-orange-300
                         hover:scale-105
                         transition-all duration-300
                         group
                       "
                    >
                        Become an Authorized  SI Partner
                    </button>



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
            <div className="max-w-7xl mx-auto px-4 pb-10 pt-14">
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
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-7">


                {/* SI Partner Button */}
                <button
                    onClick={scrollToForm}
                    className=" cursor-pointer
                          relative px-6 py-3 rounded-full 
                         bg-gradient-to-r from-orange-500 to-orange-600
                         text-white font-semibold text-lg
                         shadow-lg shadow-orange-200
                         hover:shadow-orange-300
                         hover:scale-105
                         transition-all duration-300
                         group
                       "
                >
                    Contact Us
                </button>

            </div>
            <Steps />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pb-8">


                {/* SI Partner Button */}
                <button
                    onClick={scrollToForm}
                    className=" cursor-pointer
                          relative px-6 py-3 rounded-full 
                         bg-gradient-to-r from-orange-500 to-orange-600
                         text-white font-semibold text-lg
                         shadow-lg shadow-orange-200
                         hover:shadow-orange-300
                         hover:scale-105
                         transition-all duration-300
                         group
                       "
                >
                    Contact Us
                </button>

            </div>

            <VideoShowcaseSection />


            <Solutions />

            <section className="bg-gradient-to-b from-white via-orange-50 to-white py-20 px-4">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-orange-600 mb-4">
                            Get In Touch
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Have questions about our SI / ISP partner program? Send us a message and our team will reach out shortly.
                        </p>
                    </div>

                    <div
                        ref={parentRef}
                        className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12"
                    >
                        <FixedContactCard parentRef={parentRef} />

                        <EnquiryForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>

                </div>
            </section>

            {/* <ProductFAQ /> */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">

                        <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
                            <FaCheck />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Message Sent!
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Our enterprise team will contact you shortly.
                        </p>

                        <button
                            onClick={() => setShowSuccess(false)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}
        </>
    );
}
