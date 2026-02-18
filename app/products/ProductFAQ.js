"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaWifi, FaShieldAlt, FaCogs, FaUsers, FaSignal, FaMobileAlt } from "react-icons/fa";

const faqCategories = [
  {
    id: "general",
    name: "General",
    icon: <FaQuestionCircle className="w-5 h-5" />,
    questions: [
      {
        question: "What makes TENDA routers different from other brands?",
        answer: "TENDA routers feature advanced Wi-Fi 6/7 technology, superior antenna design for extended coverage, enterprise-grade security features, and user-friendly management through our mobile app. Our products are specifically optimized for high-density environments and offer excellent value for money."
      },
      {
        question: "How do I choose the right router for my needs?",
        answer: "Consider your internet speed, house/apartment size, number of connected devices, and specific needs (gaming, streaming, work from home). For small apartments: AC5 or N301. For medium/large homes: RX12 Pro or MX12 mesh system. For offices/enterprises: W18E or W30E models."
      },
      {
        question: "What is the warranty period for TENDA products?",
        answer: "All TENDA networking products come with a standard 2-year manufacturer warranty. Enterprise-grade products have extended warranty options available. Contact our support for warranty claims and service."
      }
    ]
  },
  {
    id: "technical",
    name: "Technical",
    icon: <FaWifi className="w-5 h-5" />,
    questions: [
      {
        question: "What is the difference between Wi-Fi 5, Wi-Fi 6, and Wi-Fi 7?",
        answer: "Wi-Fi 5 (802.11ac) offers speeds up to 3.5 Gbps. Wi-Fi 6 (802.11ax) provides faster speeds (up to 9.6 Gbps), better performance in crowded areas, and improved battery life for devices. Wi-Fi 7 (802.11be) is the latest standard with even higher speeds (up to 46 Gbps), lower latency, and better efficiency for 8K streaming, VR, and gaming."
      },
      {
        question: "How many devices can connect to a TENDA router simultaneously?",
        answer: "Most TENDA routers support 30-40 devices simultaneously. Enterprise models like W30E support 60+ devices. Mesh systems like MX15 Pro can handle 65+ devices. The actual number depends on bandwidth usage per device."
      },
      {
        question: "What is MU-MIMO technology?",
        answer: "MU-MIMO (Multi-User, Multiple-Input, Multiple-Output) allows a router to communicate with multiple devices at the same time, rather than sequentially. This significantly improves network efficiency and reduces lag when multiple devices are connected."
      },
      {
        question: "How do range extenders work with existing routers?",
        answer: "Range extenders amplify your existing Wi-Fi signal to cover dead zones. TENDA extenders like A23 and A33 create a seamless extended network with the same SSID and password, allowing devices to automatically connect to the strongest signal."
      }
    ]
  },
  {
    id: "setup",
    name: "Setup & Installation",
    icon: <FaCogs className="w-5 h-5" />,
    questions: [
      {
        question: "How do I set up my TENDA router?",
        answer: "1. Connect router to modem using Ethernet cable. 2. Power on the router. 3. Connect to router's Wi-Fi network. 4. Open browser and visit setup.tenda.com or 192.168.0.1. 5. Follow the guided setup wizard. 6. Alternatively, use the TENDA Wi-Fi app for mobile setup."
      },
      {
        question: "Can I use TENDA routers with my existing ISP?",
        answer: "Yes, TENDA routers are compatible with all major ISPs including Comcast, Spectrum, Verizon, AT&T, and others worldwide. They support PPPoE, Dynamic IP, and Static IP connection types."
      },
      {
        question: "How do I create a mesh network with TENDA products?",
        answer: "Purchase a TENDA mesh system (MX12, MX15 Pro, etc.). Set up the main router normally. Then add satellite nodes by pressing the WPS button on both devices or using the TENDA Wi-Fi app for automatic pairing. Place nodes strategically for optimal coverage."
      }
    ]
  },
  {
    id: "security",
    name: "Security",
    icon: <FaShieldAlt className="w-5 h-5" />,
    questions: [
      {
        question: "What security features do TENDA routers include?",
        answer: "All TENDA routers include: WPA3 encryption, built-in firewall, VPN server/client support, parental controls, guest network isolation, MAC address filtering, and DoS attack protection. Enterprise models add advanced security features like captive portals and user management."
      },
      {
        question: "How do I set up parental controls?",
        answer: "Access router settings via web interface or TENDA Wi-Fi app. Navigate to Parental Controls section. You can: 1. Set internet access schedules. 2. Block specific websites. 3. Limit bandwidth for specific devices. 4. Pause internet access remotely."
      },
      {
        question: "Is my data safe with TENDA routers?",
        answer: "Yes. TENDA routers use enterprise-grade encryption and do not collect personal browsing data. All data transmitted through the router is encrypted. Regular firmware updates ensure security vulnerabilities are patched promptly."
      }
    ]
  }
];

export default function ProductFAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleQuestion = (questionId) => {
    setOpenQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-6">
            <FaQuestionCircle className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Find answers to common questions about TENDA networking products and solutions
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6"></div>
        </div>

        {/* FAQ Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-50"
              }`}
            >
              <span className={activeCategory === category.id ? "text-white" : "text-orange-500"}>
                {category.icon}
              </span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-b border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                  <div className="text-white">
                    {currentCategory?.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{currentCategory?.name} Questions</h3>
                  <p className="text-gray-600 text-sm">Browse common questions about {currentCategory?.name.toLowerCase()} topics</p>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="divide-y divide-orange-100">
              {currentCategory?.questions.map((item, index) => {
                const questionId = `${currentCategory.id}-${index}`;
                const isOpen = openQuestions.includes(questionId);

                return (
                  <div key={index} className="transition-all duration-300">
                    <button
                      onClick={() => toggleQuestion(questionId)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-orange-50 transition-colors duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-orange-500 font-bold text-sm">Q</span>
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.question}</h4>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {isOpen ? (
                          <FaChevronUp className="w-5 h-5 text-orange-500" />
                        ) : (
                          <FaChevronDown className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-5 ml-14">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">A</span>
                          </div>
                          <div>
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            {index === 0 && currentCategory.id === "setup" && (
                              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-sm text-gray-700 font-medium mb-2">💡 Pro Tip:</p>
                                <p className="text-sm text-gray-600">
                                  Download the TENDA Wi-Fi app for the easiest setup experience. 
                                  Available on iOS App Store and Google Play Store.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Category Footer */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 border-t border-orange-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-gray-700 font-medium">Need more help?</p>
                  <p className="text-gray-600 text-sm">Can't find the answer you're looking for?</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 text-sm">
                    Contact Support
                  </button>
                  <button className="px-5 py-2 bg-white text-orange-500 font-semibold rounded-full border border-orange-200 hover:bg-orange-50 transition-all duration-300 text-sm">
                    Download Manuals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center mb-4">
              <FaMobileAlt className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Mobile App Support</h4>
            <p className="text-gray-600 text-sm mb-3">Manage your network on the go with our mobile app</p>
            <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
              Download App →
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center mb-4">
              <FaUsers className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Community Forum</h4>
            <p className="text-gray-600 text-sm mb-3">Connect with other TENDA users and experts</p>
            <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
              Join Community →
            </button>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center mb-4">
              <FaSignal className="w-6 h-6 text-orange-500" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Technical Documentation</h4>
            <p className="text-gray-600 text-sm mb-3">Detailed specs, manuals, and troubleshooting guides</p>
            <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
              View Docs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}