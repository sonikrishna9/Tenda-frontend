'use client';

import { motion } from 'framer-motion';
import {
  FaWifi,
  FaNetworkWired,
  FaBroadcastTower,
  FaServer,
  FaShieldAlt,
  FaChartLine,
  FaHome,
  FaBuilding,
  FaHotel,
  FaUniversity,
  FaWarehouse,
  FaCloud,
} from 'react-icons/fa';
import { MdOutlineSecurity, MdOutlineSpeed, MdOutlineAttachMoney } from 'react-icons/md';

export default function Solutions() {
  
  const marketSegments = [
    { icon: <FaHome />, name: 'Home Users', size: '45% Market', color: 'bg-blue-100 text-blue-600' },
    { icon: <FaBuilding />, name: 'Small Business', size: '25% Market', color: 'bg-green-100 text-green-600' },
    { icon: <FaUniversity />, name: 'Education', size: '12% Market', color: 'bg-purple-100 text-purple-600' },
    { icon: <FaHotel />, name: 'Hospitality', size: '8% Market', color: 'bg-amber-100 text-amber-600' },
    { icon: <FaWarehouse />, name: 'Industrial', size: '10% Market', color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <section className=" bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MdOutlineAttachMoney className="text-lg" />
            <span>High-Profit Solutions Portfolio</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Networking Solutions</span>
            <br />For Every Market Need
          </h1>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            From home WiFi to enterprise infrastructure, TENDA provides the most comprehensive 
            product portfolio in the industry. Maximize your revenue across all customer segments.
          </p>
        </motion.div>

        {/* Market Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Target Market Segments
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {marketSegments.map((segment, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-6 py-3 rounded-full ${segment.color} border border-transparent hover:border-current transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <div className="text-xl">{segment.icon}</div>
                <div className="text-center">
                  <div className="font-semibold">{segment.name}</div>
                  <div className="text-sm opacity-80">{segment.size}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        
        {/* Performance Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-red-500/20 to-transparent rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">200+</div>
                <div className="text-gray-300">Product Models</div>
                <div className="text-sm text-gray-400 mt-1">Wideest portfolio in industry</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">40%</div>
                <div className="text-gray-300">Higher Margins</div>
                <div className="text-sm text-gray-400 mt-1">Than industry average</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-gray-300">Availability</div>
                <div className="text-sm text-gray-400 mt-1">Never miss a sale</div>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-700 text-center">
              <h4 className="text-xl font-bold mb-4">Why TENDA Solutions Sell Faster?</h4>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: <MdOutlineSecurity />, text: 'Proven Reliability' },
                  { icon: <MdOutlineSpeed />, text: 'Easy Installation' },
                  { icon: <MdOutlineAttachMoney />, text: 'Best Price-Performance' },
                  { icon: <FaChartLine />, text: 'Strong Brand Value' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <div className="text-orange-400">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}