"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import FixedContactCard from "./FixedContactCard";
import EnquiryForm from "./EnquiryForm";

export default function Page() {

    const parentRef = useRef(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        inquiryType: "general",
        city: "",
        state: "",
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
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        mobile: `+91${formData.phone}`
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
                    city: "",
                    state: "",
                    priceRange: "",
                    message: ""
                });

            }

        } catch (error) {
            console.error("Submit Error:", error);
        }
    };

    return (
        <>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4 sm:px-6 lg:px-8">

                <div className="max-w-7xl mx-auto">

                    {/* ORIGINAL HEADER (unchanged) */}
                    <motion.div className="text-center mb-16">

                        <h1 className="text-4xl font-bold text-orange-500 mb-4">
                            Get In Touch
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>

                    </motion.div>

                    <div
                        ref={parentRef}
                        className=" grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 pb-4 relative"
                    >

                        <FixedContactCard parentRef={parentRef} />

                        <EnquiryForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />

                    </div>

                </div>

            </div>
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">

                        <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Message Sent!
                        </h3>

                        <p className="text-gray-600 mb-6">
                            Thank you for contacting us. Our team will reach out to you shortly.
                        </p>

                        <button
                            onClick={() => setShowSuccess(false)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Close
                        </button>

                    </div>

                </div>
            )}
        </>

    );
}