"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaArrowRight, FaArrowLeft, FaWifi, FaBolt, FaEthernet, FaSignal } from "react-icons/fa";
import { IoMdSpeedometer, IoMdWifi } from "react-icons/io";
import { MdDevices, MdSecurity } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Add this to your global.css or component CSS
const customStyles = `
  .product-swiper .swiper-button-next,
  .product-swiper .swiper-button-prev {
    background: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
  }
  
  .product-swiper .swiper-button-next:hover,
  .product-swiper .swiper-button-prev:hover {
    background: linear-gradient(135deg, #f97316, #ea580c);
    box-shadow: 0 6px 20px rgba(249, 115, 22, 0.3);
  }
  
  .product-swiper .swiper-button-next:after,
  .product-swiper .swiper-button-prev:after {
    font-size: 16px;
    color: #f97316;
    font-weight: bold;
  }
  
  .product-swiper .swiper-button-next:hover:after,
  .product-swiper .swiper-button-prev:hover:after {
    color: white;
  }
  
  .product-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #d1d5db;
    opacity: 1;
    transition: all 0.3s ease;
  }
  
  .product-swiper .swiper-pagination-bullet-active {
    background: #f97316;
    width: 24px;
    border-radius: 12px;
  }
  
  @media (max-width: 768px) {
    .product-swiper .swiper-button-next,
    .product-swiper .swiper-button-prev {
      width: 36px;
      height: 36px;
    }
    
    .product-swiper .swiper-button-next:after,
    .product-swiper .swiper-button-prev:after {
      font-size: 14px;
    }
  }
`;

export default function ProductSwiper() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

  // Fetch ALL products from your API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch ALL products
        const response = await fetch(`${API_BASE_URL}api/product/allproducts`);
        const data = await response.json();
        
        if (data.success && data.allproducts && data.allproducts.length > 0) {
          // Show ALL products
          setProducts(data.allproducts);
        } else {
          toast.error("No products found");
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL]);

  // Handle product click - Navigate to single-product page
  const handleProductClick = (product) => {
    const encodedParent = encodeURIComponent(product.parentCategory);
    const encodedSub = encodeURIComponent(product.subCategory);
    router.push(`/single-product/${encodedParent}/${encodedSub}`);
  };

  // Get exactly 3 USP points
  const getUspPoints = (product) => {
    if (!product.uspPoints || product.uspPoints.length === 0) {
      return [
        "High-speed networking",
        "Multiple device support", 
        "Advanced security features"
      ];
    }
    
    // Take exactly 3 USPs
    return product.uspPoints.slice(0, 3);
  };

  // Get icon for USP point
  const getUspIcon = (usp, index) => {
    if (usp.includes("Mbps") || usp.includes("Gbps") || usp.includes("Speed")) {
      return <IoMdSpeedometer className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    if (usp.includes("Devices") || usp.includes("Connected")) {
      return <MdDevices className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    if (usp.includes("Antenna") || usp.includes("antenna")) {
      return <FaSignal className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    if (usp.includes("Port") || usp.includes("Interface")) {
      return <FaEthernet className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    if (usp.includes("VPN") || usp.includes("Security") || usp.includes("MU-MIMO")) {
      return <MdSecurity className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    if (usp.includes("Wi-Fi")) {
      return <IoMdWifi className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    }
    
    // Default icons based on index
    const defaultIcons = [
      <FaBolt className="w-4 h-4 text-orange-500 flex-shrink-0" />,
      <FaWifi className="w-4 h-4 text-orange-500 flex-shrink-0" />,
      <FaSignal className="w-4 h-4 text-orange-500 flex-shrink-0" />
    ];
    
    return defaultIcons[index % defaultIcons.length];
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border animate-pulse h-[420px]">
                <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If no products found
  if (!loading && products.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Products Available</h3>
          <p className="text-gray-600 mb-8">Check back later for our networking solutions.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{customStyles}</style>
      
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 mb-4">
              <FaWifi className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              All <span className="text-orange-500">Products</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse TENDA's complete range of high-performance networking solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-6"></div>
          </div>

          {/* Swiper Container */}
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="product-swiper pb-12"
            >
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <div 
                    onClick={() => handleProductClick(product)}
                    className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden cursor-pointer h-full min-h-[420px] flex flex-col"
                  >
                    {/* Featured Badge */}
                    {product.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full">
                          <FaWifi size={10} />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Product Image */}
                    <div className="h-48 bg-gradient-to-br from-gray-50 to-white p-6 relative overflow-hidden">
                      <img
                        src={product.images?.[0]?.url || "/images/placeholder.png"}
                        alt={product.title}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">
                          {product.parentCategory || "Networking"}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {product.title}
                      </h3>
                      
                      {/* Subtitle - Full text */}
                      <p className="text-gray-600 text-sm mb-4">
                        {product.subtitle || "High-performance networking solution"}
                      </p>

                      {/* Exactly 3 USP Points */}
                      <div className="space-y-2 mb-6 flex-1">
                        {getUspPoints(product).map((usp, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            {getUspIcon(usp, index)}
                            <span className="text-gray-600 flex-1">{usp}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto">
                        <span>View Details</span>
                        <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl p-3 rounded-full hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300 hidden md:flex items-center justify-center">
              <FaArrowLeft className="w-5 h-5 text-orange-500" />
            </button>
            <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl p-3 rounded-full hover:bg-orange-50 transition-all duration-300 border border-gray-200 hover:border-orange-300 hidden md:flex items-center justify-center">
              <FaArrowRight className="w-5 h-5 text-orange-500" />
            </button>

          </div>

        </div>
      </section>
    </>
  );
}