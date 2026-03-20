"use client";

import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: "Routers", href: "/products/router" },
      { label: "Mesh Router", href: "/products/mesh-router" },
      { label: "Range Extender", href: "/products/range-extender" },
      { label: "Access Points", href: "/products/access-point" },
      { label: "USB Adaptor", href: "/products/usb-adaptor" },
      { label: "Network Switch", href: "/products/network-switch" },
      { label: "POE Switch", href: "/products/poe-switch" },
      { label: "POE Injector", href: "/products/poe-injector" },
    ],
    company: [
      { label: "About Tenda", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Partner Program", href: "/partner-program" },
      { label: "Blogs", href: "/blogs" },
      { label: "Gallery", href: "/gallery" },
    ],
    support: [
      { label: "Contact Support", href: "/contactus" },
    ],
  };

  const socialMedia = [
    { icon: FaLinkedinIn, color: "hover:text-[#0077B5]" },
    { icon: FaTwitter, color: "hover:text-[#1DA1F2]" },
    { icon: FaInstagram, color: "hover:text-[#E4405F]" },
    { icon: FaYoutube, color: "hover:text-[#FF0000]" },
    { icon: FaGithub, color: "hover:text-white" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">

      {/* BACKGROUND (UNCHANGED) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900" />

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #f97316 1px, transparent 1px),
                              linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT SECTION */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-32 h-8">
                <Image src="/logo.png" alt="Tenda" fill className="object-contain" />
              </div>
              {/* <span className="text-sm text-gray-400">Tenda India</span> */}
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering high-quality networking solutions designed for Indian homes and businesses.
              From everyday connectivity to enterprise networking, Tenda helps India stay connected.
            </p>

            {/* FULL ADDRESS */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-orange-500 mt-1" />
                <span className="text-sm">
                  Plot 03, Sector 138, Noida, Uttar Pradesh - 201305
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-orange-500" />
                <span className="text-sm">+91 8000200056</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaEnvelope className="text-orange-500" />
                <span className="text-sm">sales@tendaindia.com</span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-8">

            {/* LINKS + REACH US */}
            <div className="flex flex-col md:flex-row justify-between gap-12">

              {/* LINKS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category}>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                      {category}
                    </h3>

                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-gray-400 hover:text-orange-400 text-sm transition"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* REACH US (RIGHT FIXED) */}
              <div className="flex flex-col items-start md:items-center md:text-right">
                <h3 className="text-white font-semibold mb-6 text-lg">
                  Reach Us
                </h3>

                <div className="flex flex-col gap-4 w-full md:w-auto">

                  <a
                    href="tel:18001022366"
                    className="flex items-center justify-between bg-orange-600 px-6 py-4 rounded-full font-semibold hover:bg-orange-500 transition"
                  >
                    <span className="flex items-center gap-3 mr-3">
                      <FaPhone />
                    </span>
                    <span>+91 8000 2000 56</span>
                  </a>

                  <a
                    href="mailto:sales@tendaindia.com"
                    className="flex items-center justify-center gap-3 border border-gray-500 px-6 py-4 rounded-full hover:border-orange-500 transition"
                  >
                    <FaEnvelope />
                    sales@tendaindia.com
                  </a>
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gray-800 my-12" />

            {/* BOTTOM */}
            {/* BOTTOM */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">

              {/* LEFT */}
              <span>© {currentYear} Tenda. All Rights Reserved.</span>

              {/* CENTER / POLICY LINKS */}
              <div className="flex items-center gap-5 flex-wrap justify-center">
                <Link href="/privacy-policy" className="hover:text-orange-400 transition">
                  Privacy Policy
                </Link>

                
              </div>

              {/* RIGHT SOCIAL */}
              <div className="flex gap-4">
                {socialMedia.map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`w-10 h-10 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-lg ${social.color}`}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}