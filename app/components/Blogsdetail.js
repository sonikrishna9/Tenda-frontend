// components/SolarCCTVAd.tsx
import Image from 'next/image';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaShareAlt } from 'react-icons/fa';

export default function SolarCCTVAd() {
  return (
    <>
      {/* HERO SECTION */}
      {/* HERO SECTION */}
      <section
        className="w-full relative h-[60vh] md:h-[75vh] bg-[url('/images/carousel/c1.webp')] bg-cover bg-center bg-no-repeat flex items-center"
      >
        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1c26] via-[#0b1c26]/80 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative z-20 max-w-screen-xl mx-auto w-full px-6 md:px-12">
          <div className="w-full md:w-1/2 py-10">
            <h1 className="text-white text-4xl md:text-6xl font-semibold leading-tight">
              About <br /> Secureye
            </h1>

            <div className="mt-6 text-white/80 text-sm flex items-center gap-2">
              <span className="hover:text-white cursor-pointer">Home</span>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* HERO TEXT CONTENT BELOW IMAGE (Clean Separation) */}
      <div className="w-full bg-white py-12">
        <div className="text-center text-gray-800 max-w-2xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Solar CCTV Camera with 4G SIM Connectivity
          </h1>

          <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-500 mb-6">
            Secureye
          </h2>

          <p className="text-lg md:text-xl font-medium mb-4">
            24×7 Wireless Surveillance — No Electricity, No Wi-Fi Needed.
          </p>

          <p className="text-base md:text-lg opacity-90">
            Designed for remote areas, farmhouses, parking lots, warehouses, and
            construction sites. Get instant alerts & live video anytime, anywhere.
          </p>
        </div>
      </div>

      {/* SHARE SECTION */}
      <div className="px-6 md:px-48 flex flex-col md:flex-row md:justify-between md:items-center gap-3 py-4 border-b border-gray-200">
        <div className="text-gray-700 text-sm md:text-base font-medium">
          Published: Feb 15, 2025
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
            <FaLinkedinIn size={16} />
          </button>

          <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-700 hover:text-white transition-all shadow-sm">
            <FaTwitter size={16} />
          </button>

          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white transition-all shadow-sm">
            <FaShareAlt size={16} />
          </button>
        </div>
      </div>

      {/* ARTICLE SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-10 text-gray-800 leading-relaxed">

        <h2 className="text-3xl font-bold mb-4">Overview</h2>
        <p className="mb-4">
          The Secureye Solar CCTV Camera is designed to deliver continuous and
          reliable surveillance across locations where electricity and Wi-Fi
          connectivity are limited. With solar charging and integrated 4G SIM
          support, this camera ensures uninterrupted monitoring all year long.
        </p>

        <h2 className="text-3xl font-bold mt-8 mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>100% wireless camera with solar-powered battery system</li>
          <li>4G SIM slot for real-time remote monitoring</li>
          <li>Full HD 1080p live stream & recording</li>
          <li>Advanced night vision & AI motion detection</li>
          <li>Two-way audio communication</li>
          <li>Weatherproof (IP66) body for outdoor use</li>
          <li>Supports SD card + Cloud storage</li>
        </ul>

        <h2 className="text-3xl font-bold mt-8 mb-4">Benefits of Solar CCTV</h2>
        <p className="mb-4">
          Solar CCTV systems are ideal for locations where traditional wired
          solutions are difficult or expensive to install. Whether it's a
          farmhouse, warehouse, parking lot, or construction site, solar-powered
          cameras provide cost-efficient, robust, and maintenance-free
          surveillance.
        </p>

        <h2 className="text-3xl font-bold mt-8 mb-4">Ideal For</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Remote rural areas</li>
          <li>Farmhouses & agriculture land</li>
          <li>Highways & tolls</li>
          <li>Parking lots & open grounds</li>
          <li>Construction & mining sites</li>
          <li>Temporary event surveillance</li>
        </ul>

        <h2 className="text-3xl font-bold mt-8 mb-4">Conclusion</h2>
        <p>
          Secureye Solar CCTV Camera is a reliable and advanced solution for
          modern-day surveillance needs. With smart connectivity, long battery
          life, and rugged outdoor performance, it offers complete peace of
          mind—anytime, anywhere.
        </p>
      </section>
    </>
  );
}
