"use client";

import { useState } from "react";
import { FaWifi, FaBolt, FaShieldAlt, FaUsers, FaCogs, FaChartLine } from "react-icons/fa";
import { IoMdSpeedometer, IoMdGlobe } from "react-icons/io";
import { MdDevices, MdSecurity, MdSignalWifi4Bar } from "react-icons/md";
import { RiRouterLine } from "react-icons/ri";

const features = [
  {
    icon: <IoMdSpeedometer className="w-6 h-6" />,
    title: "High-Speed Connectivity",
    description: "Experience blazing-fast internet speeds with our advanced Wi-Fi 6/7 technology, perfect for streaming, gaming, and large file transfers."
  },
  {
    icon: <MdSignalWifi4Bar className="w-6 h-6" />,
    title: "Extended Coverage",
    description: "Eliminate dead zones with powerful antennas and mesh technology that covers every corner of your home or office."
  },
  {
    icon: <MdDevices className="w-6 h-6" />,
    title: "Multi-Device Support",
    description: "Connect dozens of devices simultaneously without compromising speed or performance."
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Advanced Security",
    description: "Built-in firewall, VPN support, and parental controls to keep your network safe and secure."
  },
  {
    icon: <RiRouterLine className="w-6 h-6" />,
    title: "Enterprise-Grade Performance",
    description: "Business-class routers with advanced features for SMEs, offices, and demanding networking environments."
  },
  {
    icon: <FaCogs className="w-6 h-6" />,
    title: "Easy Setup & Management",
    description: "User-friendly mobile app and web interface for easy installation and network management."
  }
];

const productCategories = [
  {
    name: "Wi-Fi 7 Routers",
    description: "Latest generation routers with cutting-edge technology",
    count: "2+ Models",
    color: "from-orange-500 to-amber-500"
  },
  {
    name: "Wi-Fi 6 Routers",
    description: "High-performance routers for modern homes",
    count: "5+ Models",
    color: "from-orange-400 to-yellow-500"
  },
  {
    name: "Mesh Systems",
    description: "Whole-home coverage solutions",
    count: "4+ Models",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Range Extenders",
    description: "Extend your existing network coverage",
    count: "4+ Models",
    color: "from-yellow-500 to-orange-400"
  }
];

export default function ProductContent() {
  const [activeTab, setActiveTab] = useState("features");

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <FaWifi className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-orange-500">TENDA</span> Networking?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Discover superior networking solutions designed for speed, reliability, and seamless connectivity
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("features")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "features"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-50"
            }`}
          >
            Key Features
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "categories"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-50"
            }`}
          >
            Product Categories
          </button>
          <button
            onClick={() => setActiveTab("technology")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "technology"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-50"
            }`}
          >
            Technology
          </button>
        </div>

        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-orange-500">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`h-3 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-sm font-semibold rounded-full">
                      {category.count}
                    </span>
                    <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
                      View All →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technology Tab */}
        {activeTab === "technology" && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Advanced Networking Technology</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <FaBolt className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Wi-Fi 6/7 Technology</h4>
                      <p className="text-gray-600">Latest wireless standards for faster speeds and better efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <MdSecurity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">MU-MIMO & OFDMA</h4>
                      <p className="text-gray-600">Simultaneous data streaming to multiple devices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <IoMdGlobe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">IPv6 Support</h4>
                      <p className="text-gray-600">Future-proof networking with the latest internet protocol</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Performance Highlights</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Speed Performance</span>
                      <span className="text-sm font-bold text-orange-600">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Coverage Range</span>
                      <span className="text-sm font-bold text-orange-600">90%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Device Capacity</span>
                      <span className="text-sm font-bold text-orange-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Security Features</span>
                      <span className="text-sm font-bold text-orange-600">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Upgrade Your Network?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Experience the difference with TENDA's high-performance networking solutions. 
              Perfect for homes, offices, and enterprise environments.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300">
                Shop All Products
              </button>
              <button className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-full border border-orange-200 hover:bg-orange-50 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}