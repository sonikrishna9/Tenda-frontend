'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaStar,
  FaCrown,
  FaGem,
  FaTrophy,
  FaLightbulb,
  FaBriefcase,
  FaMoneyBillWave,
  FaHeadset,
  FaBullhorn,
  FaSeedling
} from 'react-icons/fa';
import { RiSparkling2Fill } from 'react-icons/ri';
import { useEffect, useState, useRef } from 'react';

export default function HomePartnerProgram() {
  const [partnerCount, setPartnerCount] = useState(5000);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const cardRef = useRef(null);

  /* -------------------- 3D TILT -------------------- */
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);

  /* -------------------- FLOATING BG -------------------- */
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  /* -------------------- COUNTER -------------------- */
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPartnerCount((prev) => prev + 1);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  /* -------------------- UPDATED BENEFITS -------------------- */
  const benefits = [
    {
      icon: <FaBriefcase />,
      label: 'Wide Product Portfolio',
      value: 'Diverse Range',
      color: 'from-orange-400 to-amber-400',
      description: 'Extensive and competitive products',
    },
    {
      icon: <FaMoneyBillWave />,
      label: 'Attractive Margins',
      value: 'High Profits',
      color: 'from-emerald-400 to-teal-400',
      description: 'Competitive incentive programs',
    },
    {
      icon: <FaHeadset />,
      label: 'After Sales Support',
      value: '24/7 Help',
      color: 'from-blue-400 to-cyan-400',
      description: 'Sales & technical assistance',
    },
    {
      icon: <FaBullhorn />,
      label: 'Marketing Support',
      value: 'Brand Growth',
      color: 'from-purple-400 to-pink-400',
      description: 'Branding & marketing assistance',
    }
  ];

  /* -------------------- MOUSE EVENTS -------------------- */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left - rect.width / 2;
    const yPos = e.clientY - rect.top - rect.height / 2;

    x.set(xPos * 0.5);
    y.set(yPos * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  /* -------------------- JSX -------------------- */
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Floating orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/10 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute -bottom-20 -left-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-r from-amber-400/20 to-yellow-400/10 rounded-full blur-3xl"
      />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: 'spring' }}
        className="relative"
      >
        <div className="relative backdrop-blur-xl bg-white/90 border rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8 md:mb-10">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl self-start sm:self-auto">
              <FaGem className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Partner Program
              </h2>
              <p className="text-sm text-gray-500 mt-1 sm:mt-2">Grow Your Business with Tenda India</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm">
                <FaLightbulb className="text-amber-500 flex-shrink-0" />
                <span>We work closely with distributors, system integrators, and resellers across India.</span>
              </div>

              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                Join Tenda's authorised partner ecosystem and unlock new growth opportunities with our comprehensive support system.
              </p>

              
            </div>

            {/* Right - Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  whileHover={{ scale: 1.05, y: -4 }}
                  onHoverStart={() => setHoveredBenefit(index)}
                  onHoverEnd={() => setHoveredBenefit(null)}
                  className="relative bg-white/80 border rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div
                        className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${benefit.color}`}
                      >
                        <div className="text-white text-lg sm:text-xl">{benefit.icon}</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                        {benefit.label}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {benefit.description}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredBenefit === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 border-2 border-orange-400 rounded-2xl pointer-events-none"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/partner-program"
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Become a Partner
              <FaArrowRight />
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              Join thousands of successful partners growing with Tenda
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}