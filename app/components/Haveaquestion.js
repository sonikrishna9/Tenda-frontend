"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { 
  FaQuestionCircle, 
  FaPaperPlane, 
  FaComments, 
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaHeadset,
  FaFileAlt
} from "react-icons/fa";

export default function HaveQuestion() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Add your form submission logic here
        }, 1500);
    };

    return (
        <div className="w-full px-5 md:px-10 lg:px-20 py-16 mt-10 bg-gradient-to-b from-white to-orange-50/30">
            {/* Top Title Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <FaQuestionCircle className="text-orange-500" />
                    <span>Get Instant Help</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Have a <span className="text-orange-500">Question</span> ?
                </h2>
                
                <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
                    Check out the most common questions our customers asked. 
                    Still have questions?{" "}
                    <button className="text-orange-500 font-semibold hover:text-orange-600 inline-flex items-center gap-1 transition-all group">
                        Contact Us
                        <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </button>
                </p>

                {/* Animated Underline Accent */}
                <motion.div 
                    className="mt-4 w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto"
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-6xl mx-auto">
                
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100">
                        <div className="flex items-start gap-4">
                            <div className="bg-orange-100 p-3 rounded-lg">
                                <FaComments className="text-orange-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    We follow a clear process to help you out
                                </h3>
                                <p className="text-gray-600 mt-4 leading-relaxed">
                                    We've streamlined our process to make securing your property 
                                    and upgrading your network a hassle-free experience. Our 
                                    team is dedicated to providing timely solutions.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-4">
                        {[
                            { icon: <FaHeadset />, text: "24/7 Customer Support" },
                            { icon: <FaFileAlt />, text: "Expert Consultation" },
                            { icon: <FaClock />, text: "Quick Response Time" },
                            { icon: <FaCheckCircle />, text: "Detailed Solution Guide" }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="flex items-center gap-4 bg-white p-4 rounded-xl border border-orange-50 hover:border-orange-100 transition-colors"
                            >
                                <div className="text-orange-500 text-lg">
                                    {benefit.icon}
                                </div>
                                <span className="text-gray-700 font-medium">{benefit.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Form Box */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="bg-gradient-to-br from-white to-orange-50 border-2 border-orange-100 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-500 p-2 rounded-lg">
                                <FaPaperPlane className="text-white text-lg" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Send Your Inquiry</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Grid Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    { label: "Full Name", type: "text", placeholder: "John Doe" },
                                    { label: "Phone", type: "tel", placeholder: "+1 (555) 123-4567" },
                                    { label: "Email", type: "email", placeholder: "john@example.com" },
                                    { label: "City", type: "text", placeholder: "New York" }
                                ].map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-gray-700 mb-2 font-medium text-sm">
                                            {field.label} <span className="text-orange-500">*</span>
                                        </label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Single Inputs */}
                            <div className="mt-5">
                                <label className="block text-gray-700 mb-2 font-medium text-sm">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                                    placeholder="1"
                                />
                            </div>

                            <div className="mt-5">
                                <label className="block text-gray-700 mb-2 font-medium text-sm">
                                    Other Details
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                                    placeholder="Please provide any additional details about your inquiry..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-sm hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Submit Inquiry
                                        </>
                                    )}
                                </button>
                                
                                <p className="text-gray-500 text-xs text-center mt-4">
                                    By submitting, you agree to our terms and privacy policy.
                                </p>
                            </div>
                        </form>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-3 -right-3 w-20 h-20 bg-orange-200/20 rounded-full blur-xl -z-10" />
                    <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-orange-300/10 rounded-full blur-xl -z-10" />
                </motion.div>
            </div>

            {/* Bottom Note */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 text-center"
            >
                <div className="inline-flex items-center gap-2 text-gray-600 text-sm bg-white px-6 py-3 rounded-full shadow-sm">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    Typically respond within 2-4 business hours
                </div>
            </motion.div>
        </div>
    );
}