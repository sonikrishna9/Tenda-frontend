"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function EnquiryForm({
  formData,
  handleChange,
  handleSubmit,
  itemVariants
}) {

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {

    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      ) {
        error = "Invalid email address";
      }
    }

    if (name === "phone") {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Enter valid 10 digit mobile number";
      }
    }

    if (name === "priceRange") {
      if (!value) error = "Please select budget range";
    }

    if (name === "message") {
      if (!value.trim()) error = "Message is required";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    handleChange(e);        // parent state update
    validateField(name, value);  // realtime validation
  };

  const onSubmit = (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([name, value]) => {
      validateField(name, value);
    });

    const hasErrors = Object.values(errors).some((e) => e);

    if (!hasErrors) {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur border border-orange-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8"
    >

      <motion.h2
        className="text-2xl font-bold text-gray-900 mb-8"
        variants={itemVariants}
      >
        Send us a Message
      </motion.h2>

      <form onSubmit={onSubmit} className="space-y-6">

        {/* Name */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </motion.div>

        {/* Phone */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            maxLength={10}
            value={formData.phone}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </motion.div>

        {/* Inquiry Type */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Inquiry *
          </label>

          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
          >
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="sales">Sales</option>
            <option value="billing">Billing</option>
            <option value="partnership">Partnership</option>
          </select>
        </motion.div>

        {/* Budget */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range *
          </label>

          <select
            name="priceRange"
            value={formData.priceRange}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none"
          >
            <option value="">Select Budget</option>
            <option value="Less than 1 Lakh">Less than 1 Lakh</option>
            <option value="1 Lakh - 2 Lakh">1 Lakh - 2 Lakh</option>
            <option value="2 Lakh - 3 Lakh">2 Lakh - 3 Lakh</option>
            <option value="3 Lakh - 4 Lakh">3 Lakh - 4 Lakh</option>
            <option value="4 Lakh - 5 Lakh">4 Lakh - 5 Lakh</option>
            <option value="5 Lakh - 10 Lakh">5 Lakh - 10 Lakh</option>
            <option value="Above 10 Lakh">Above 10 Lakh</option>
          </select>

          {errors.priceRange && (
            <p className="text-red-500 text-sm mt-1">{errors.priceRange}</p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>

          <textarea
            rows={6}
            name="message"
            value={formData.message}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition outline-none resize-none"
          />

          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white py-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Send Message
        </motion.button>

      </form>

    </motion.div>
  );
}