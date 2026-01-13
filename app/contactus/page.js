"use client";
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const page = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={itemVariants}
                    >
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Get In Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Left Side - Sticky Address Section */}
                        <motion.div
                            className="lg:sticky lg:top-8 h-fit"
                            style={{ scale, opacity }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                                whileHover={{ y: -5 }}
                            >
                                <motion.h2
                                    className="text-2xl font-bold text-gray-900 mb-6"
                                    variants={itemVariants}
                                >
                                    Contact Information
                                </motion.h2>

                                <div className="space-y-6">
                                    {/* Address */}
                                    <motion.div
                                        className="flex items-start space-x-4"
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
                                            <p className="text-gray-600">
                                                123 Business Avenue<br />
                                                Suite 100<br />
                                                San Francisco, CA 94107
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        className="flex items-start space-x-4"
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                            <p className="text-gray-600">+1 (555) 987-6543</p>
                                        </div>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        className="flex items-start space-x-4"
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
                                            <p className="text-gray-600">info@company.com</p>
                                            <p className="text-gray-600">support@company.com</p>
                                        </div>
                                    </motion.div>

                                    {/* Business Hours */}
                                    <motion.div
                                        className="flex items-start space-x-4"
                                        variants={itemVariants}
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 9:00 AM - 6:00 PM<br />
                                                Saturday: 10:00 AM - 4:00 PM<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Social Media */}
                                <motion.div
                                    className="mt-8 pt-6 border-t border-gray-200"
                                    variants={itemVariants}
                                >
                                    <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social, index) => (
                                            <motion.a
                                                key={social}
                                                href="#"
                                                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span className="font-semibold text-sm">{social[0]}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl p-8"
                            variants={formVariants}
                        >
                            <motion.h2
                                className="text-2xl font-bold text-gray-900 mb-6"
                                variants={itemVariants}
                            >
                                Send us a Message
                            </motion.h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name and Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your full name"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your email"
                                        />
                                    </motion.div>
                                </div>

                                {/* Phone and Subject */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter your phone number"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                            placeholder="Enter subject"
                                        />
                                    </motion.div>
                                </div>

                                {/* Inquiry Type */}
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Type of Inquiry *
                                    </label>
                                    <select
                                        id="inquiryType"
                                        name="inquiryType"
                                        required
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="sales">Sales</option>
                                        <option value="billing">Billing</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                </motion.div>

                                {/* Message */}
                                <motion.div variants={itemVariants}>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-orange-700 hover:to-orange-800 focus:ring-4 focus:ring-orange-200 transition-all duration-200"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    variants={itemVariants}
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default page;