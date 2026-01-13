"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export default function TrustedClientsSection() {


    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",

        // ✅ Replaced problematic logos with working transparent PNGs
        "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-500x313.png",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        "https://cdn.iconscout.com/icon/free/png-256/free-twitter-213-569318.png",
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    ];
    // Simulated video data from backend
    const productVideos = [
        "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "https://www.youtube.com/embed/jNQXAC9IVRw",
        "https://www.youtube.com/embed/tgbNymZ7vqY",
    ];

    const customerVideos = [
        "https://www.youtube.com/embed/ysz5S6PUM-U",
        "https://www.youtube.com/embed/aqz-KE-bpKQ",
        "https://www.youtube.com/embed/kXYiU_JCYtU",
    ];

    const [productIndex, setProductIndex] = useState(0);
    const [customerIndex, setCustomerIndex] = useState(0);

    const nextVideo = (type) => {
        if (type === "product") {
            setProductIndex((prev) => (prev + 1) % productVideos.length);
        } else {
            setCustomerIndex((prev) => (prev + 1) % customerVideos.length);
        }
    };

    const prevVideo = (type) => {
        if (type === "product") {
            setProductIndex(
                (prev) => (prev - 1 + productVideos.length) % productVideos.length
            );
        } else {
            setCustomerIndex(
                (prev) => (prev - 1 + customerVideos.length) % customerVideos.length
            );
        }
    };

    return (
        <section className="bg-white py-16 px-6 md:px-16">
            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Trusted Clients
                </h2>
                <p className="text-gray-500 mt-2">
                    Trusted by leading brands and industries worldwide.
                </p>
                <div className="w-16 h-1 mx-auto mt-3 bg-linear-to-r from-teal-400 to-orange-500 rounded-full"></div>
            </motion.div>

            {/* Marquee Logos */}
            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover={true}
                className="py-6 border-y border-gray-100 bg-white"
            >
                {logos.map((logo, i) => (
                    <motion.img
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        src={logo}
                        alt={`Client Logo ${i + 1}`}
                        className="mx-10 h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                ))}
            </Marquee>

            {/* Video Section */}
            <div className="bg-[#222] py-16 mt-10 rounded-none flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                {/* Product Installed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl w-full md:w-[380px] flex flex-col items-center overflow-hidden shadow-lg"
                >
                    <div className="bg-orange-100 text-[#F0622B] text-center font-medium py-2 w-full">
                        Product Installed
                    </div>
                    <div className="w-full h-[230px] relative">
                        <iframe
                            width="100%"
                            height="230"
                            src={productVideos[productIndex]}
                            title="Product Installed"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-b-2xl"
                        ></iframe>
                    </div>

                    <div className="flex items-center justify-center gap-6 py-4">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => prevVideo("product")}
                            className="border border-[#F0622B] p-2 rounded-full text-[#F0622B] hover:bg-[#F0622B] hover:text-white transition"
                        >
                            <FaArrowLeft size={16} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => nextVideo("product")}
                            className="border border-[#F0622B] p-2 rounded-full text-[#F0622B] hover:bg-[#F0622B] hover:text-white transition"
                        >
                            <FaArrowRight size={16} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Happy Customers */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl w-full md:w-[380px] flex flex-col items-center overflow-hidden shadow-lg"
                >
                    <div className="bg-orange-100 text-[#F0622B] text-center font-medium py-2 w-full">
                        Happy Customers/Partners
                    </div>
                    <div className="w-full h-[230px] relative">
                        <iframe
                            width="100%"
                            height="230"
                            src={customerVideos[customerIndex]}
                            title="Happy Customers/Partners"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-b-2xl"
                        ></iframe>
                    </div>

                    <div className="flex items-center justify-center gap-6 py-4">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => prevVideo("customer")}
                            className="border border-[#F0622B] p-2 rounded-full text-[#F0622B] hover:bg-[#F0622B] hover:text-white transition"
                        >
                            <FaArrowLeft size={16} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            onClick={() => nextVideo("customer")}
                            className="border border-[#F0622B] p-2 rounded-full text-[#F0622B] hover:bg-[#F0622B] hover:text-white transition"
                        >
                            <FaArrowRight size={16} />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
