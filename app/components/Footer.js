"use client";

import { motion } from "framer-motion";
import {
  FaDribbble,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { SiTrustpilot } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: "WiFi Routers", href: "/products/routers" },
      { label: "Mesh Systems", href: "/products/mesh" },
      { label: "Network Switches", href: "/products/switches" },
      { label: "Security Solutions", href: "/products/security" },
      { label: "Enterprise Solutions", href: "/products/enterprise" },
    ],
    solutions: [
      { label: "Smart Home", href: "/solutions/smart-home" },
      { label: "Small Business", href: "/solutions/business" },
      { label: "Education", href: "/solutions/education" },
      { label: "Hospitality", href: "/solutions/hospitality" },
      { label: "Healthcare", href: "/solutions/healthcare" },
    ],
    support: [
      { label: "Technical Support", href: "/support" },
      { label: "Documentation", href: "/docs" },
      { label: "Downloads", href: "/downloads" },
      { label: "Community Forum", href: "/forum" },
      { label: "Contact Support", href: "/support/contact" },
    ],
    company: [
      { label: "About Tenda", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Press Center", href: "/press" },
      { label: "Investor Relations", href: "/investors" },
    ],
  };

  const certifications = [
    { name: "ISO 9001", icon: "🏆" },
    { name: "FCC Certified", icon: "📡" },
    { name: "CE Approved", icon: "🌍" },
    { name: "RoHS Compliant", icon: "♻️" },
  ];

  const socialMedia = [
    { icon: FaLinkedinIn, label: "LinkedIn", color: "hover:text-[#0077B5]" },
    { icon: FaTwitter, label: "Twitter", color: "hover:text-[#1DA1F2]" },
    { icon: FaInstagram, label: "Instagram", color: "hover:text-[#E4405F]" },
    { icon: FaYoutube, label: "YouTube", color: "hover:text-[#FF0000]" },
    { icon: FaGithub, label: "GitHub", color: "hover:text-white" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #f97316 1px, transparent 1px),
                            linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Glowing orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-amber-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 rounded-full blur-3xl"
      />

      <div className="relative container mx-auto px-6 lg:px-16 xl:px-24 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Logo and Company Info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Enhanced Logo with Image */}
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    {/* Logo glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />

                    {/* Logo container */}
                    <div className="mb-1">
                      <div className="flex items-center gap-2">
                        <div className="relative w-32 h-8">
                          <Image
                            src="/logo.png"  // Your text logo
                            alt="Tenda"
                            width={128}
                            height={32}
                            className="object-contain filter brightness-125"
                          />

                          {/* Optional glow for text logo */}
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div>
                    <p className="text-xs text-gray-400 font-medium tracking-wider">
                      GLOBAL NETWORKING SOLUTIONS
                    </p>
                  </div>
                </div>
              </Link>

              {/* Tagline */}
              <p className="text-gray-400 leading-relaxed max-w-md text-sm">
                Empowering global connectivity through innovative networking
                solutions. Trusted by millions worldwide for reliable, high-performance
                network infrastructure.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group cursor-pointer">
                  <div className="p-2 bg-gray-900/50 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                    <FaMapMarkerAlt className="text-orange-500" />
                  </div>
                  <span className="text-sm">Global Headquarters • Shenzhen, China</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group cursor-pointer">
                  <div className="p-2 bg-gray-900/50 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                    <FaPhone className="text-orange-500" />
                  </div>
                  <span className="text-sm">+86 755 3335 9999</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-colors group cursor-pointer">
                  <div className="p-2 bg-gray-900/50 rounded-lg group-hover:bg-orange-500/10 transition-colors">
                    <FaEnvelope className="text-orange-500" />
                  </div>
                  <span className="text-sm">corporate@tenda.com</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 pt-6">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-800 cursor-default"
                  >
                    <span className="text-sm">{cert.icon}</span>
                    <span className="text-xs font-medium text-gray-300">{cert.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + 0.2 }}
                >
                  <h3 className="text-white font-semibold mb-4 text-lg uppercase tracking-wider">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex items-center text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm"
                        >
                          <span className="w-0 group-hover:w-2 h-px bg-orange-500 mr-0 group-hover:mr-2 transition-all duration-300" />
                          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                            {link.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 p-6 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-lg">
                      <IoIosSend className="text-orange-500 text-xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Stay Updated
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Subscribe to our newsletter for the latest in networking technology and solutions.
                  </p>
                </div>

                <div className="flex-1 w-full max-w-md">
                  <form className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <FaEnvelope className="text-gray-500" />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-2 whitespace-nowrap"
                    >
                      Subscribe
                      <FaArrowRight className="text-sm" />
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent my-12"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
          >
            <span>© {currentYear} Tenda. All Rights Reserved.</span>

            {/* Policy Links */}
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/cookies" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </motion.div>

          {/* Social Media & Trust Indicators */}
          <div className="flex items-center gap-6">
            {/* Trust Indicators */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FaShieldAlt className="text-green-500" />
                <span className="text-sm">Trusted & Secure</span>
              </div>
              <div className="h-4 w-px bg-gray-800" />
              <div className="flex items-center gap-2 text-gray-400">
                <FaGlobe className="text-blue-500" />
                <span className="text-sm">Global Presence</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className={`w-10 h-10 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-6 border-t border-gray-900"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div className="flex flex-wrap items-center gap-4">
              <span>Tenda is a registered trademark.</span>
              <span>All product names, logos, and brands are property of their respective owners.</span>
            </div>
            <div className="flex items-center gap-2">
              <SiTrustpilot className="text-green-500" />
              <span>ISO 9001:2015 Certified Quality Management</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}