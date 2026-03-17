"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep"
];

export default function EnquiryForm({
  formData,
  handleChange,
  handleSubmit,
  itemVariants
}) {

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const pathname = usePathname();

  const showPriceRange = pathname.startsWith("/partner-program");

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
      if (!value) {
        error = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        error = "Enter valid 10 digit mobile number";
      }
    }

    if (name === "priceRange") {
      if (!value) error = "Please select budget range";
    }

    if (name === "city") {
      if (!value.trim()) {
        error = "City is required";
      }
    }

    // ✅ ADD THIS
    if (name === "state") {
      if (!value.trim()) {
        error = "State is required";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const onChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/[^\d+]/g, ""); // only numbers + allowed
    }

    handleChange({
      target: { name, value }
    });

    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));

    validateField(name, value);
  };

  const validateAll = () => {
    const newErrors = {};

    Object.entries(formData).forEach(([name, value]) => {
      let error = "";

      if (name === "name" && !value.trim()) {
        error = "Name is required";
      }

      if (name === "email") {
        if (!value.trim()) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email address";
        }
      }

      if (name === "phone") {
        if (!value) {
          error = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = "Enter valid 10 digit mobile number";
        }
      }

      if (name === "priceRange" && showPriceRange && !value) {
        error = "Please select budget range";
      }

      if (name === "city" && !value.trim()) {
        error = "City is required";
      }

      if (name === "state" && !value.trim()) {
        error = "State is required";
      }

      newErrors[name] = error;
    });

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => !e);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const isValid = validateAll();

    if (!isValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    handleSubmit(e);
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

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>

            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500">

              {/* Country Code */}
              <div className="flex items-center gap-2 px-3 bg-gray-100 border-r">
                <span className="text-lg">🇮🇳</span>
                <span className="text-sm font-medium">+91</span>
              </div>

              {/* Input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                maxLength={10}
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 outline-none"
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />

            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>

            <select
              name="state"
              value={formData.state}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select State</option>

              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

        </motion.div>

        {/* Inquiry Type */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Inquiry
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

        {showPriceRange && (
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
        )}

        {/* Message */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
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