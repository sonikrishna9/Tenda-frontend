"use client";
import React, { useEffect, useState } from "react";
import { FiFileText, FiPlay, FiDownload } from "react-icons/fi";

const ProductSupport = ({
    videos = [],
    quickstartpdfs = [],
    downloadpdfs = [],
    onVideoClick,
    onPdfClick,
}) => {
    const tabs = [
        { id: "quickstart", label: "Quick Start" },
        { id: "videos", label: "Videos" },
        { id: "downloads", label: "Downloads" },
    ];

    const [activeTab, setActiveTab] = useState("quickstart");
    const [activeVideo, setActiveVideo] = useState(null);


    /* ---------------- SCROLL + ACTIVE TAB ---------------- */
    useEffect(() => {
        const handleScroll = () => {
            for (let tab of tabs) {
                const section = document.getElementById(tab.id);
                if (!section) continue;

                const rect = section.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) {
                    setActiveTab(tab.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <>
            {/* ================= STICKY TABS ================= */}
            <div className="sticky top-[72px] z-40 bg-white border-b">
                <div className="flex justify-center gap-2 md:gap-4 py-3 px-3 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => scrollToSection(tab.id)}
                            className={`px-4 md:px-6 py-2 rounded-md text-sm font-medium transition
                ${activeTab === tab.id
                                    ? "bg-orange-500 text-white shadow"
                                    : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                                }
              `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="py-12 px-4 md:px-8">
                {/* HEADER */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                            Product Support & Resources
                        </span>
                    </h2>
                    <p className="text-gray-600">
                        Find tutorials, documentation, and downloads
                    </p>
                </div>

                {/* ================= QUICK START ================= */}
                <section id="quickstart" className="scroll-mt-32 mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
                        Quick Start
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quickstartpdfs.map((pdf, i) => (
                            <div
                                key={i}
                                onClick={() => onPdfClick(pdf)}
                                className="bg-gray-100 rounded-2xl p-8 text-center cursor-pointer
                hover:shadow-lg transition flex flex-col items-center"
                            >
                                <FiFileText className="text-orange-500 text-5xl mb-4" />
                                <p className="text-gray-800 font-medium text-sm line-clamp-2">
                                    {decodeURIComponent(pdf.url.split("/").pop())}
                                </p>
                                <span className="text-orange-500 text-sm mt-3">
                                    View Detail →
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= VIDEOS ================= */}
                <section id="videos" className="scroll-mt-32 mb-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
                        Videos
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, i) => {
                            const fileName = decodeURIComponent(video.url.split("/").pop());

                            return (
                                <div
                                    key={i}
                                    onClick={() => setActiveVideo(video)}
                                    className="bg-gray-100 rounded-2xl overflow-hidden cursor-pointer
          hover:shadow-xl transition"
                                >
                                    {/* VIDEO THUMBNAIL */}
                                    <div className="relative h-48 bg-gray-300">
                                        <video
                                            src={video.url}
                                            className="w-full h-full object-cover"
                                            preload="metadata"
                                            muted
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center">
                                                <FiPlay className="text-gray-800 text-2xl ml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <div className="p-4 font-medium text-gray-800 text-sm line-clamp-2">
                                        {fileName}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ================= VIDEO PREVIEW MODAL ================= */}
                {activeVideo && (
                    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
                        <div className="relative bg-black rounded-xl w-full max-w-4xl">

                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute -top-4 -right-4 bg-white text-black
                                rounded-full w-10 h-10 flex items-center justify-center
                                shadow-lg hover:scale-110 transition"
                            >
                                ✕
                            </button>

                            {/* VIDEO PLAYER */}
                            <video
                                src={activeVideo.url}
                                controls
                                autoPlay
                                className="w-full max-h-[70vh] rounded-xl"
                            />
                        </div>
                    </div>
                )}


                {/* ================= DOWNLOADS ================= */}
                <section id="downloads" className="scroll-mt-32 py-16 bg-gray-50">
                    <h3 className="text-2xl md:text-3xl font-semibold text-center mb-10">
                        Downloads
                    </h3>

                    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] border-collapse">
                                {/* TABLE HEADER */}
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-6 text-left text-sm font-semibold text-gray-900">
                                            Title
                                        </th>
                                        <th className="p-6 text-center text-sm font-semibold text-gray-900 w-[120px]">
                                            #
                                        </th>
                                    </tr>
                                </thead>

                                {/* TABLE BODY */}
                                <tbody>
                                    {downloadpdfs.map((pdf, i) => {
                                        const fileName = decodeURIComponent(
                                            pdf.url.split("/").pop()
                                        );

                                        return (
                                            <tr
                                                key={i}
                                                className="border-b last:border-b-0 hover:bg-gray-50 transition"
                                            >
                                                {/* TITLE + ICON */}
                                                <td className="p-6">
                                                    <div
                                                        onClick={() => window.open(pdf.url, "_blank")}
                                                        className="flex items-center gap-3 text-blue-600 text-sm cursor-pointer hover:underline"
                                                    >
                                                        <FiFileText className="text-blue-500 text-lg flex-shrink-0" />
                                                        <span className="break-all">{fileName}</span>
                                                    </div>
                                                </td>

                                                {/* DOWNLOAD ICON (DIRECT DOWNLOAD) */}
                                                <td className="p-6 text-center">
                                                    <a
                                                        href={pdf.url}
                                                        download
                                                        className="inline-block"
                                                    >
                                                        <FiDownload className="text-orange-500 text-xl cursor-pointer hover:scale-110 transition" />
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>



            </div>
        </>
    );
};

export default ProductSupport;
