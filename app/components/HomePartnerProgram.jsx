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
  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerCount((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  /* -------------------- BENEFITS -------------------- */
  const benefits = [
    {
      icon: <FaUsers />,
      label: 'Global Network',
      value: '5,000+',
      color: 'from-orange-400 to-amber-400',
      description: 'Active partners worldwide',
    },
    {
      icon: <FaChartLine />,
      label: 'Revenue Growth',
      value: '↑ 47%',
      color: 'from-emerald-400 to-teal-400',
      description: 'Average partner increase',
    },
    {
      icon: <FaStar />,
      label: 'Satisfaction',
      value: '98%',
      color: 'from-purple-400 to-pink-400',
      description: 'Partner happiness rate',
    },
    {
      icon: <FaCrown />,
      label: 'Elite Tier',
      value: 'Premium',
      color: 'from-amber-400 to-yellow-400',
      description: 'Exclusive benefits',
    },
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
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
      {/* Floating orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-orange-400/20 to-amber-400/10 rounded-full blur-3xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-yellow-400/10 rounded-full blur-3xl"
      />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, type: 'spring' }}
        className="relative"
      >
        <div className="relative backdrop-blur-xl bg-white/90 border rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl">
              <FaGem className="text-white w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Partner Program
              </h2>
              <p className="text-sm text-gray-500">ELEVATE YOUR BUSINESS</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full mb-6">
                <FaLightbulb className="text-amber-500" />
                <span className="text-sm">Transform Your Business Journey</span>
              </div>

              <p className="text-lg text-gray-700 mb-6">
                Join an elite partner ecosystem designed for scale, innovation,
                and long-term revenue growth.
              </p>
            </div>

            {/* Right */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.label}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredBenefit(index)}
                  onHoverEnd={() => setHoveredBenefit(null)}
                  className="relative bg-white/80 border rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${benefit.color}`}
                    >
                      <div className="text-white text-xl">{benefit.icon}</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {benefit.label === 'Global Network'
                        ? `${partnerCount.toLocaleString()}+`
                        : benefit.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {benefit.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/partner-program"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
            >
              Become a Partner
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
