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
  FaChartLine,
  FaNetworkWired,
  FaCrown,
  FaStar,
  FaTrophy,
  FaHeart,
  FaChevronRight,
  FaChevronLeft,
  FaPlay,
  FaQuoteLeft,
  FaQuoteRight
} from "react-icons/fa";
import { IoIosRocket, IoMdGlobe, IoMdTrendingUp } from "react-icons/io";

export default function AboutBanner() {
  const [aboutData, setAboutData] = useState(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [activeMilestone, setActiveMilestone] = useState(2);

  useEffect(() => {
    setAboutData({
      page_name: "About TENDA Networking",
      image: "/images/about/about-banner.jpg",
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

  const coreValues = [
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Innovation",
      description: "Pioneering next-gen networking with cutting-edge technology",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Reliability",
      description: "Products engineered for 24/7 performance and stability",
      gradient: "from-orange-400 to-yellow-500"
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Partnership",
      description: "Growing together with our global network of partners",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Excellence",
      description: "Uncompromising quality in design and manufacturing",
      gradient: "from-yellow-500 to-orange-400"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: "Global Reach",
      description: "Connecting communities across continents",
      gradient: "from-orange-600 to-red-500"
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Trust",
      description: "Building lasting relationships through integrity",
      gradient: "from-red-500 to-orange-500"
    }
  ];

  const milestones = [
    { year: "2010", title: "Foundation", description: "TENDA established with vision for better connectivity" },
    { year: "2013", title: "First Innovation", description: "Launched groundbreaking router series" },
    { year: "2016", title: "Global Expansion", description: "Expanded to 50+ countries worldwide" },
    { year: "2019", title: "Network Growth", description: "5000+ active partners and dealers" },
    { year: "2022", title: "Wi-Fi 7 Era", description: "Pioneered advanced Wi-Fi 7 technology" },
    { year: "2024", title: "Market Leader", description: "Recognized as industry innovation leader" }
  ];

  const achievements = [
    { icon: <FaAward />, value: "15+", label: "Industry Awards", description: "Recognized for excellence" },
    { icon: <IoMdGlobe />, value: "80+", label: "Countries", description: "Global presence" },
    { icon: <FaNetworkWired />, value: "5000+", label: "Partners", description: "Worldwide network" },
    { icon: <IoMdTrendingUp />, value: "10M+", label: "Products", description: "Satisfied users" }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "IT Director, TechCorp",
      text: "TENDA's enterprise solutions transformed our network infrastructure. The reliability and support are unmatched.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Network Engineer",
      text: "Their Wi-Fi 6 routers deliver consistent performance across our entire campus. Truly enterprise-grade.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, Connect Solutions",
      text: "As a partner, the training and support from TENDA have been exceptional. Great products, even better partnership.",
      rating: 5
    }
  ];

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
        <div className="relative min-h-[90vh] flex items-center">
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
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm text-orange-300 rounded-full text-sm font-semibold border border-orange-500/30"
              >
                <FaStar className="w-3 h-3" />
                Our Story & Vision
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6"
              >
                Connecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">World</span> Through Innovation
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl"
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
                <button className="group px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
                  <FaPlay className="w-4 h-4" />
                  <span>Watch Our Story</span>
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

      {/* =======================
          ACHIEVEMENTS SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Numbers That <span className="text-orange-500">Speak</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our journey in numbers – milestones that reflect our commitment to excellence
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-lg border border-orange-100 p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-orange-500 text-xl">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.value}</div>
                <div className="font-semibold text-gray-800 mb-1">{achievement.label}</div>
                <div className="text-sm text-gray-600">{achievement.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          CORE VALUES SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded-full text-sm font-semibold">
              <FaHeart className="w-4 h-4" />
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Core <span className="text-orange-500">Values</span> That Guide Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles shape everything we do – from product design to partner relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl shadow-xl border border-orange-100 p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="text-orange-500">
                      {value.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          TIMELINE SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded-full text-sm font-semibold">
              <IoIosRocket className="w-4 h-4" />
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Milestones of <span className="text-orange-500">Innovation</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A decade of breakthroughs, growth, and technological advancement
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-orange-500" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'justify-end pr-1/2' : 'justify-start pl-1/2'}`}
                >
                  <div 
                    onClick={() => setActiveMilestone(index)}
                    className={`relative w-80 cursor-pointer group ${activeMilestone === index ? 'scale-105' : ''}`}
                  >
                    {/* Year Badge */}
                    <div className={`absolute ${index % 2 === 0 ? '-right-6' : '-left-6'} top-1/2 transform -translate-y-1/2 z-10`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${activeMilestone === index ? 'bg-gradient-to-r from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 scale-110' : 'bg-gradient-to-r from-orange-400 to-amber-400'}`}>
                        {milestone.year}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`bg-white rounded-2xl shadow-lg border-2 ${activeMilestone === index ? 'border-orange-300 shadow-xl' : 'border-orange-100'} p-6 transition-all duration-300 group-hover:shadow-xl group-hover:border-orange-200`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 flex items-center justify-center">
                          <FaTrophy className="text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =======================
          CONTENT SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full blur-xl" />
            
            {/* Content Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Our Story & Vision</h2>
                <p className="text-white/80 mt-2">Discover what drives us and where we're headed</p>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12">
                <div 
                  className="prose prose-lg max-w-none 
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:first:mt-0
                    prose-h2:border-l-4 prose-h2:border-orange-500 prose-h2:pl-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                    prose-ul:pl-6 prose-li:marker:text-orange-500 prose-li:text-gray-700
                    prose-strong:text-orange-600
                    prose-a:text-orange-500 hover:prose-a:text-orange-600"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =======================
          TESTIMONIALS SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded-full text-sm font-semibold">
              <FaQuoteLeft className="w-4 h-4" />
              Voices of Trust
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-orange-500">Industry Leaders</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See what our partners and customers say about working with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative bg-white rounded-2xl shadow-lg border border-orange-100 p-8 hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Icon */}
                <FaQuoteLeft className="absolute top-6 left-6 text-orange-500/20 text-4xl" />
                <FaQuoteRight className="absolute bottom-6 right-6 text-orange-500/20 text-4xl" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg italic mb-8">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 flex items-center justify-center">
                    <span className="text-orange-500 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================
          CTA SECTION
      ======================== */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <FaCrown className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Growing Network
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Become part of TENDA's success story. Whether as a partner, dealer, or customer, 
              let's build the future of connectivity together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="group px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <span>Become a Partner</span>
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white hover:bg-white/10 transition-all duration-300">
                <span>Contact Our Team</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}