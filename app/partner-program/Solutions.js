'use client';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaBuilding,
  FaHotel,
  FaUniversity,
  FaWarehouse,
} from 'react-icons/fa';

export default function Solutions() {
  const [active, setActive] = useState(5);

  const handleHover = useCallback((index) => {
    setActive(index);
  }, []);

  const items = [
    {
      title: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Generative AI",
      image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "AR/VR",
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Blockchain",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Metaverse",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Data Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      description:
        "With advanced data analytics, we turn raw information into actionable insights for smarter decision-making.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Networking Solutions
            </span>
            <br />For Every Market Need
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            From home WiFi to enterprise infrastructure, TENDA provides the most comprehensive
            product portfolio in the industry. Maximize your revenue across all customer segments.
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="w-full flex items-center justify-center bg-gradient-to-r from-orange-600 via-orange-500 to-red-400 p-4 rounded-3xl">
          <div className="flex gap-4 w-full max-w-7xl overflow-x-auto md:overflow-hidden md:py-10">

            {items.map((item, index) => {
              const isActive = active === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => handleHover(index)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out shadow-xl
                  ${isActive ? "flex-[3]" : "flex-[1]"}
                  min-w-[140px] h-[420px]`}
                >

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 will-change-transform
                    ${isActive ? "scale-110" : "scale-100"}`}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Title */}
                  <h3 className="absolute top-5 left-5 text-white text-sm md:text-lg font-semibold tracking-wide backdrop-blur-sm bg-white/10 px-3 py-1 rounded-lg">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {isActive && item.description && (
                    <div className="absolute bottom-6 left-5 right-5 text-white text-sm md:text-base leading-relaxed backdrop-blur-md bg-white/10 p-4 rounded-xl">
                      {item.description}
                    </div>
                  )}

                  {/* Border Glow */}
                  <div
                    className={`absolute inset-0 rounded-3xl border transition-all duration-500
                    ${isActive
                        ? "border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        : "border-transparent"
                      }`}
                  />
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}