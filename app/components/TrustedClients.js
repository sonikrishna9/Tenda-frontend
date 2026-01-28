"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { FaCrown, FaPlay, FaStar, FaCheckCircle } from "react-icons/fa";

export default function TrustedClientsSection() {
    const logos = [
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-500x313.png",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
        "https://cdn.iconscout.com/icon/free/png-256/free-twitter-213-569318.png",
        "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
    ];

    const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

    return (
        <section className="bg-gradient-to-b from-white to-orange-50 pt-10 pb-2 overflow-hidden">
            {/* Section Title - Orange Theme */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16 px-4 sm:px-6 lg:px-8"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                    <FaCrown className="text-yellow-300" />
                    <span>TRUSTED BY INDUSTRY LEADERS</span>
                    <FaCrown className="text-yellow-300" />
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
                        Trusted Worldwide
                    </span>
                    <br />
                    <span className="text-gray-800">By Leading Brands</span>
                </h2>

                {/* Subheading */}
                <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                    Join <span className="font-bold text-orange-600">5,000+</span> successful companies
                    who rely on our solutions to drive their business forward
                </p>

                {/* Decorative Line */}
                <div className="relative h-1 max-w-2xl mx-auto mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
                </div>
            </motion.div>

            {/* Marquee Logos - Orange Theme */}
            <div className="mb-20 relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent"></div>

                <div className="relative z-10">
                    <Marquee
                        gradient={false}
                        speed={50}
                        pauseOnHover={true}
                        className="py-8"
                    >
                        {logos.map((logo, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="mx-10"
                            >
                                <div className="group relative">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-300"></div>

                                    {/* Logo Card */}
                                    <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:shadow-orange-200 border border-orange-100">
                                        <img
                                            src={logo}
                                            alt={`Client Logo ${i + 1}`}
                                            className="h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Marquee>
                </div>

                {/* Marquee Title */}
                <div className="text-center mt-10">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
                        FEATURED CLIENTS
                    </p>
                </div>
            </div>

            {/* Full Width Video Section - Orange Theme */}
            <div className="w-full mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    {/* Video Header */}
                    <div className="text-center mb-10 px-4 sm:px-6 lg:px-8">
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-4 rounded-full text-lg font-bold mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <FaPlay className="animate-pulse" />
                            <span>WATCH OUR PRODUCT DEMO</span>
                            <FaStar className="text-yellow-300" />
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            See <span className="text-orange-600">Transformation</span> in Action
                        </h3>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Discover how industry leaders achieve remarkable results with our platform
                        </p>
                    </div>

                    {/* Full Width Video Container */}
                    <div className="relative w-full bg-gradient-to-r from-orange-50 to-orange-100 py-4">
                        {/* Decorative Elements */}


                        <div className="relative max-w-7xl mx-auto px-4">
                            {/* Video Frame */}
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-orange-600/30 blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                                {/* Video */}
                                <div className="relative w-full aspect-video bg-black">
                                    <iframe
                                        src={videoUrl}
                                        title="Product Demo Video"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                {/* Video Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>


        </section>
    );
}