"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiArrowRight,
    FiDownload,
    FiMapPin,
    FiMessageCircle,
} from "react-icons/fi";
import HaveQuestion from "../components/Haveaquestion";

export default function ProductDisplay() {
    const images = [
        "/images/products/whocanapply/p1.png",
        "/images/products/whocanapply/p2.png",
        "/images/products/whocanapply/p3.png",
        "/images/products/whocanapply/p4.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [activetab, setactivetab] = useState("parameter");
    const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

    const tabs = [
        { id: "parameter", label: "Parameter" },
        { id: "feature", label: "Feature" },
        { id: "support", label: "Support" },
    ];


    // Handle arrows
    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="w-full flex flex-col md:flex-row gap-10 p-5 md:p-10 mt-[5rem]">
                {/* Left Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center">

                    {/* Main Image */}
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt="product"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-3/4 rounded-xl shadow-md"
                    />

                    {/* Slider Thumbnails */}
                    <div className="flex items-center gap-3 mt-5">
                        <button
                            onClick={handlePrev}
                            className="p-2 rounded-full border hover:bg-gray-100"
                        >
                            <FiArrowLeft />
                        </button>

                        <div className="flex gap-3">
                            {images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`w-16 h-16 rounded-md border cursor-pointer overflow-hidden 
                  ${currentIndex === i ? "ring-2 ring-orange-500" : "hover:scale-105"} 
                  transition`}
                                    onClick={() => setCurrentIndex(i)}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full border hover:bg-gray-100"
                        >
                            <FiArrowRight />
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="bg-black text-white px-3 py-1 rounded text-sm">
                            Model No. SWC300
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold mt-3">
                            AX3000 Dual Band Gigabit Wi-Fi6 Enterprise Wireless Router
                        </h2>

                        <p className="text-gray-600 mt-2 text-sm md:text-base">
                            W30E supports the new generation of Wi-Fi 6 technology, wireless rate up to 3000Mbps, 160MHz large bandwidth.
                        </p>

                        {/* Features */}
                        <div className="mt-5 space-y-2">
                            {[1, 2, 3, 4, 5, 6].map((f) => (
                                <div key={f} className="flex items-start gap-2">
                                    <span className="text-orange-500 text-xl">•</span>
                                    <p className="text-gray-700 text-sm md:text-base">
                                        Sample feature description {f}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-6">
                            <button className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-md">
                                <FiDownload /> Download Datasheet
                            </button>

                            <button className="flex items-center gap-2 bg-gray-200 text-gray-800 px-5 py-2 rounded-md">
                                <FiMapPin /> Where to Buy ?
                            </button>

                            <button className="flex items-center gap-2 bg-white border px-5 py-2 rounded-md">
                                <FiMessageCircle /> Enquiry
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tabs Section */}
            
            <div className="lg:ml-6 flex gap-6 justify-end w-1/5 my-4">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setactivetab(tab.id)}
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <span
                            className={`text-base ${activetab === tab.id ? "text-zinc-700 font-semibold" : "text-zinc-500"
                                }`}
                        >
                            {tab.label}
                        </span>

                        {/* Gradient underline only for activetab tab */}
                        {activetab === tab.id && (
                            <div className="w-20 h-[3px] mt-1 bg-gradient-to-r from-[#7DD8D0] to-[#F0622B] rounded-full"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className=" bg-[#0A0907] h-[90%] rounded-b-[2rem] pb-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-xl md:text-2xl font-bold text-center pt-14"
                >
                    <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
                        Enjoy blazing-fast Wi-Fi7 BE5100 <br /> throughout your home
                    </span>
                    <p className="text-zinc-100 text-sm font-light mt-4">
                        Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps. The unique Multi-Link Operation <br /> technology of Wi-Fi 7, dual-band simultaneous transmission is possible with Wi-Fi 7 terminal devices，the <br /> network speed is faster than the BE3600 and the network latency is lower.
                    </p>
                </motion.h2>

                <img src="/images/products/whocanapply/mainbgbanner.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />

                <div className={`flex justify-center ${viewDetailsOpen ? "hidden" : "block"}`} onClick={() => { setViewDetailsOpen(true) }}>
                    <button
                        className="text-white px-6 py-3 rounded-md transition flex"
                        style={{
                            background:
                                "linear-gradient(90deg, #612F1B 0%, rgba(254,129,81,0.8) 51.92%, #612F1B 100%)",
                        }}
                    >
                        View Details
                    </button>
                </div>

                {
                    viewDetailsOpen && (
                        <div className="view-details-open-tab ">
                            <img src="/images/featuretab/4.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-xl font-bold text-center pt-14"
                            >
                                <p className="text-zinc-100 text-sm font-light mt-4">
                                    Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps. The unique Multi-Link Operation <br /> technology of Wi-Fi 7, dual-band simultaneous transmission is possible with Wi-Fi 7 terminal devices，the <br /> network speed is faster than the BE3600 and the network latency is lower.
                                </p>
                            </motion.h2>
                            <img src="/images/featuretab/5.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                            <img src="/images/featuretab/6.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-xl font-bold text-center pt-14"
                            >
                                <p className="text-zinc-100 text-sm font-light mt-4">
                                    Broadband is 2000Mbps, 2.5G port connected to optical modem speed test.<br />
                                    The data is based on the speed measurement at close-range using the Wi-Fi7 mobile terminal with MLO turned on.
                                    <br />All data comes from Tenda Labs, actual speeds may vary depending on devices and environment.Recommend using the ISP APP to perform network speed tests.                        </p>
                            </motion.h2>
                            <div className="flex gap-2 w-4/5 mx-auto py-6">
                                <div className="w-1/2">
                                    <img src="/images/featuretab/7.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-xl md:text-xl font-bold text-left pt-14"
                                    >
                                        <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
                                            Wi-Fi 7 gaming latency <br />reduced by 50%
                                        </span>
                                        <p className="text-zinc-100 text-sm font-light mt-4">
                                            Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps. The unique Multi-Link Operation <br /> technology of Wi-Fi 7, dual-band simultaneous transmission is possible with Wi-Fi 7 terminal devices，the <br /> network speed is faster than the BE3600 and the network latency is lower.
                                        </p>
                                    </motion.h2>
                                </div>
                                <div className="w-1/2 ">
                                    <img src="/images/featuretab/8.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="text-xl md:text-xl font-bold text-left pt-14"
                                    >
                                        <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
                                            Wi-Fi 7 wireless throughput <br /> increased by 6.6%
                                        </span>
                                        <p className="text-zinc-100 text-sm font-light mt-4">
                                            Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps. The unique Multi-Link Operation <br /> technology of Wi-Fi 7, dual-band simultaneous transmission is possible with Wi-Fi 7 terminal devices，the <br /> network speed is faster than the BE3600 and the network latency is lower.
                                        </p>
                                    </motion.h2>
                                </div>
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-xl md:text-2xl font-bold text-center pt-14"
                            >
                                <span className="bg-linear-to-r from-[#7DD8D0] to-[#F0622B] bg-clip-text text-transparent">
                                    Innovative intelligent five-antenna <br /> Better signal coverage across layers                        </span>
                                <p className="text-zinc-100 text-sm font-light mt-4 w-3/5 mx-auto">
                                    Tenda innovates five-antenna AI positioning algorithm design, the location of the Internet terminal can be sensed, better coverage than four-antenna. One of them is a dedicated cross-layer antenna, Wi-Fi cross-layer coverage has stronger penetration. With 5 independent external FEMs, the three nodes Wi-Fi coverage without blind spots, beyond traditional four-antenna Mesh Wi-Fi.                        </p>
                            </motion.h2>
                            <img src="/images/featuretab/9.png" alt="mainbannerimg" className="h-[55%] w-4/5 mx-auto" />
                        </div>
                    )
                }

            </div>

            <HaveQuestion />
        </>
    );
}
