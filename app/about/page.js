"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaUsers, 
  FaGlobe, 
  FaLightbulb, 
  FaHandshake, 
  FaShieldAlt,
  FaAward,
  FaChartLine
} from "react-icons/fa";
// import { api } from "../../lib/api";
// import { transformAboutHtml } from "../../lib/transformHtml";

export default function AboutBanner() {
  const [aboutData, setAboutData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    /* ================================
       API LOGIC (COMMENTED – DO NOT REMOVE)
    ================================= */

    // const fetchAboutUs = async () => {
    //   try {
    //     const response = await api.get(
    //       "/static-pages?page_slug=aboutus"
    //     );

    //     if (response?.data?.length > 0) {
    //       const page = response.data[0];
    //       setAboutData(page);

    //       const transformedHtml = transformAboutHtml(
    //         page.page_descriptions
    //       );
    //       setHtmlContent(transformedHtml);
    //     }
    //   } catch (error) {
    //     console.error("Failed to fetch About Us:", error);
    //   }
    // };

    // fetchAboutUs();

    /* ================================
       TEMP DUMMY DATA
    ================================= */

    setAboutData({
      page_name: "About Us",
      image: "/images/about/about-banner.jpg",
    });

    setHtmlContent(`
      <h2>Who We Are</h2>
      <p>
        We are a technology-driven organization focused on delivering reliable,
        scalable, and future-ready networking solutions. Our goal is to simplify
        connectivity for businesses by providing high-performance products
        supported by strong technical expertise.
      </p>

      <h2>Our Journey</h2>
      <p>
        Founded with a vision to bridge innovation and usability, we have grown
        into a trusted name in the networking ecosystem. From small businesses
        to enterprise-grade deployments, our solutions are built for real-world
        performance.
      </p>

      <h2>What We Do</h2>
      <p>
        We specialize in networking products including routers, mesh systems,
        access points, range extenders, and enterprise connectivity solutions.
        Each product is designed to ensure stability, security, and scalability.
      </p>

      <h2>Our Vision</h2>
      <p>
        To become a leading force in the networking industry by empowering
        businesses with next-generation connectivity and long-term technology
        partnerships.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to deliver dependable networking solutions while building
        strong relationships with our partners, dealers, and customers through
        trust, innovation, and support.
      </p>

      <h2>Why Choose Us</h2>
      <ul>
        <li>High-performance and reliable networking products</li>
        <li>Strong dealer & distributor support ecosystem</li>
        <li>Expert technical guidance and training</li>
        <li>Scalable solutions for businesses of all sizes</li>
        <li>Commitment to quality, trust, and innovation</li>
      </ul>

      <h2>Partner-Centric Approach</h2>
      <p>
        We believe growth happens through collaboration. Our partner programs
        are designed to offer competitive advantages, technical enablement, and
        marketing support to help our partners succeed.
      </p>

      <h2>Looking Ahead</h2>
      <p>
        As technology evolves, we continue to innovate and adapt. Our focus
        remains on delivering future-ready networking solutions that keep
        businesses connected, secure, and ahead of the curve.
      </p>
    `);
  }, []);

  if (!aboutData) return null;

  const coreValues = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description: "Pioneering next-gen networking solutions"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Reliability",
      description: "Products built for 24/7 operation"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Partnership",
      description: "Growing together with our dealers"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Excellence",
      description: "Commitment to quality in everything"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: "Global Vision",
      description: "Solutions for worldwide connectivity"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Trust",
      description: "Building lasting relationships"
    }
  ];

  const milestones = [
    { year: "2010", title: "Founded", description: "Started our journey" },
    { year: "2013", title: "First Product Launch", description: "Launched first router series" },
    { year: "2016", title: "Global Expansion", description: "Entered international markets" },
    { year: "2019", title: "500+ Dealers", description: "Expanded dealer network" },
    { year: "2022", title: "WiFi 7 Launch", description: "Pioneered WiFi 7 technology" },
    { year: "2024", title: "Industry Leader", description: "Recognized market leader" }
  ];

  return (
    <>
      {/* =======================
          HERO BANNER
      ======================== */}
      <section className="w-full">
        <div className="relative w-full h-[65vh] md:h-[80vh] flex items-center overflow-hidden">

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />

          {/* Background Image */}
          <img
            src={aboutData.image}
            alt="About Us"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12">
            <div className="max-w-xl">
              <span className="inline-block mb-4 bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-semibold">
                About Our Company
              </span>

              <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
                {aboutData.page_name}
              </h1>

              <p className="mt-6 text-gray-200 text-lg leading-relaxed">
                Building reliable networking solutions that power businesses,
                partners, and communities worldwide.
              </p>

              {/* Breadcrumb */}
              <div className="mt-6 text-white/70 text-sm flex items-center gap-2">
                <span className="hover:text-white cursor-pointer">Home</span>
                <span>/</span>
                <span className="text-white">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          STATS SECTION
      ======================== */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "5000+", label: "Active Partners" },
            { value: "100+", label: "Products Portfolio" },
            { value: "24/7", label: "Support Availability" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl md:text-4xl font-bold text-orange-500">
                {stat.value}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================
          CORE VALUES SECTION
      ======================== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-orange-500">Core Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          TIMELINE SECTION
      ======================== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our <span className="text-orange-500">Journey</span>
          </h2>
          <div className="flex overflow-x-auto pb-6 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex-shrink-0 w-64">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                  <div className="font-bold text-gray-800 mb-1">{milestone.title}</div>
                  <div className="text-gray-600 text-sm">{milestone.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          CONTENT SECTION
      ======================== */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 bg-white rounded-3xl shadow-lg p-8 md:p-14">
          <div
            className="prose prose-lg max-w-none prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:first:mt-0 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:pl-6 prose-li:marker:text-orange-500"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>

    </>
  );
}