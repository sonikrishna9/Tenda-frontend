"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaPlay,
  FaUsers,
  FaGlobe,
  FaLightbulb,
  FaHandshake,
  FaShieldAlt,
  FaAward,
  FaChartLine,
  FaNetworkWired,
  FaCrown,
  FaStar,
  FaTrophy,
  FaHeart,
  FaChevronRight,
  FaChevronLeft,
  FaQuoteLeft,
  FaQuoteRight,
  FaBoxOpen,
  FaLayerGroup,
  FaCertificate,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosRocket, IoMdGlobe, IoMdTrendingUp } from "react-icons/io";

export default function AboutBanner() {
  const [aboutData, setAboutData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [activeMilestone, setActiveMilestone] = useState(2);
  const [play, setPlay] = useState(false);


  useEffect(() => {
    setAboutData({
      page_name: "About TENDA Networking",
      image: "/images/carousel/sliderp1.jpg",
    });

    setHtmlContent(`
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-orange-50 to-amber-50 p-8 rounded-2xl border border-orange-100">
          <h2>Who We Are</h2>
          <p class="text-lg">
            TENDA is a global leader in networking solutions, dedicated to creating reliable, 
            high-performance products that connect people, businesses, and communities worldwide. 
            With over a decade of expertise, we've become synonymous with innovation, quality, 
            and exceptional support in the networking industry.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h2>Our Vision</h2>
            <p>
              To create a world where seamless connectivity empowers every individual and organization 
              to achieve their fullest potential. We envision a future where distance and barriers 
              disappear through reliable, high-speed networking solutions.
            </p>
          </div>
          <div>
            <h2>Our Mission</h2>
            <p>
              To deliver cutting-edge networking technology that's accessible, reliable, and 
              easy to use. We're committed to empowering our partners and customers with solutions 
              that drive growth, efficiency, and innovation in an increasingly connected world.
            </p>
          </div>
        </div>

        <div class="bg-gradient-to-r from-orange-500/10 to-amber-500/10 p-8 rounded-2xl">
          <h2>Why Choose TENDA</h2>
          <ul class="grid md:grid-cols-2 gap-4">
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>Industry-leading Wi-Fi 6/7 technology</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>Global presence with local support</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>24/7 technical support and training</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>Robust dealer and partner ecosystem</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>Enterprise-grade security features</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-orange-500 font-bold">✓</span>
              <span>Continuous innovation and R&D</span>
            </li>
          </ul>
        </div>

        <div>
          <h2>Our Commitment</h2>
          <p>
            At TENDA, we're not just selling networking products; we're building relationships. 
            Our commitment extends beyond the point of sale through comprehensive support, 
            regular firmware updates, and ongoing training programs for our partners.
          </p>
        </div>

        <div class="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 rounded-2xl">
          <h2 class="text-white">Looking Ahead</h2>
          <p class="text-white/90">
            As technology evolves, so do we. We're continuously researching and developing 
            next-generation networking solutions to stay ahead of the curve. Our focus remains 
            on creating products that are not just advanced, but also intuitive and accessible 
            to everyone.
          </p>
        </div>
      </div>
    `);
  }, []);

  if (!aboutData) return null;


  return (
    <>
      {/* =======================
          HERO BANNER
      ======================== */}
      <section className="relative w-full overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-amber-500/10" />
        <div className="absolute inset-0 bg-[url('/images/about/pattern.svg')] opacity-5" />

        {/* Main Banner */}
        <div className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent" />
            <img
              src={aboutData.image || "/images/about/about-banner.jpg"}
              alt="About Us"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-8 h-8 bg-orange-500/30 rounded-full animate-pulse" />
          <div className="absolute bottom-40 right-32 w-12 h-12 bg-amber-500/20 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-20 w-6 h-6 bg-orange-400/40 rounded-full animate-pulse" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20"
          >
            <div className="max-w-xl sm:max-w-2xl">
             
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-2xl my-4 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6"
              >
                Connecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">World</span> Through Innovation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl sm:max-w-2xl"
              >
                For over a decade, TENDA has been at the forefront of networking technology,
                delivering reliable, high-performance solutions that power businesses,
                connect communities, and enable digital transformation worldwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mt-10"
              >
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2">
                  <span>Explore Our Products</span>
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>

              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                One Of The Leading Brands In Industry Since Last 20 Years <br />
                In The Field Of Security Products
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                Secureye has been revolutionizing security and surveillance for 20 years,
                providing top-quality CCTV Cameras and security solutions that meet the
                highest standards of innovation and reliability.
              </p>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Our offerings include a wide range of advanced products, from high-definition
                CCTV cameras to biometric attendance machines and access control systems.
                With pioneering achievements such as introducing the AHD camera in India
                and launching the PHOENIX &amp; PELICAN series, Secureye remains at the cutting
                edge of technology. Our ISO9001 certification and global recognition highlight
                our commitment to quality. Trusted by elite clients including the Indian Army,
                Banks and major hospitals, Secureye delivers unmatched security solutions
                tailored to your needs. Choose Secureye for a secure future.
              </p>
            </div>

            {/* RIGHT BADGE */}
            <div className="flex justify-start lg:justify-end">
              <img
                src="/images/about/lion.png"
                alt="Make in India"
                className="w-40 sm:w-48 md:w-56 object-contain"
              />
            </div>

          </div>
        </div>
      </section>


      <section className="w-full bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TEXT */}
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-600 leading-relaxed">
              Atmanirbhar Bharat is a call for self reliance
              <br className="hidden sm:block" />
              for both national and global good
            </h2>
          </div>

          {/* VIDEO */}
          <div className="flex justify-center">
            <div className="relative w-[90%] max-w-none aspect-video rounded-xl overflow-hidden shadow-lg">

              {!play ? (
                <>
                  {/* Thumbnail */}
                  <img
                    src="/images/about/videoa1.png"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() => setPlay(true)}
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                    >
                      <FaPlay className="text-white text-xl sm:text-2xl ml-1" />
                    </button>
                  </div>
                </>
              ) : (
                <video
                  src="/images/about/videoa1.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              )}

            </div>
          </div>

        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                Advancing Security, Ensuring Future Safety
              </h2>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Mission
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Our mission is to engage and retain customers by providing exceptional
                  security solutions that build trust and loyalty. We are dedicated to
                  delivering high-quality, reliable products and services.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Vision
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  To be the industry standard for security solutions, admired for our
                  innovation, sustainability, and business performance. Secureye is
                  committed to making a positive impact through advanced technology
                  and responsible practices.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">

                {/* ORANGE BORDER */}
                <div className="absolute inset-0 rounded-full border-4 border-orange-500" />

                {/* IMAGE */}
                <img
                  src="/images/about/t.png"
                  alt="Family Security"
                  className="w-full h-full object-cover rounded-full p-2"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="w-full bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center text-white max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              20 Years Of Excellence
            </h2>
            <p className="text-white/90 text-sm md:text-base">
              With 20 years of expertise, Secureye delivers top-tier security solutions
              including advanced CCTV cameras, biometric attendance systems, Smart Locks,
              and access controls for comprehensive safety.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card */}
            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md">
              <FaUsers className="text-4xl text-black" />
              <p className="text-sm font-medium">25000+ Happy Clients</p>
            </div>

            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md 
           transition-all duration-300 ease-out
           hover:-translate-y-2 hover:shadow-xl hover:scale-[1.03]"
            >
              <FaBoxOpen className="text-4xl text-black" />
              <p className="text-sm font-medium">500+ Products</p>
            </div>

            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md 
           transition-all duration-300 ease-out
           hover:-translate-y-2 hover:shadow-xl hover:scale-[1.03]"
            >
              <FaLayerGroup className="text-4xl text-black" />
              <p className="text-sm font-medium">20000+ Projects</p>
            </div>

            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md 
           transition-all duration-300 ease-out
           hover:-translate-y-2 hover:shadow-xl hover:scale-[1.03]"
            >
              <FaCertificate className="text-4xl text-black" />
              <p className="text-sm font-medium">100+ Certificates</p>
            </div>

            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md 
           transition-all duration-300 ease-out
           hover:-translate-y-2 hover:shadow-xl hover:scale-[1.03]"
            >
              <FaMapMarkerAlt className="text-4xl text-black" />
              <p className="text-sm font-medium">24 Branches Pan India</p>
            </div>

            <div className="bg-white rounded-xl p-8 flex flex-col gap-4 shadow-md 
           transition-all duration-300 ease-out
           hover:-translate-y-2 hover:shadow-xl hover:scale-[1.03]"
            >
              <FaCheckCircle className="text-4xl text-black" />
              <p className="text-sm font-medium">Available on GEM</p>
            </div>

          </div>
        </div>
      </section>


      {/* =======================
    CERTIFICATIONS SECTION
======================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">Certifications</span>
            </h2>
            <p className="text-gray-600 text-lg">
              ISO, BIS, ROHS, CE, and FCC certified for top security solutions.
            </p>
            <div className="w-28 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6" />
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "/images/about/a1.jpg",
              "/images/about/a2.jpg",
              "/images/about/a3.jpg",
              "/images/about/a4.jpg",
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Certification ${index + 1}`}
                  className="max-h-[260px] w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}