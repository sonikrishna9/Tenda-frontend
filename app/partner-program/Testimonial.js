'use client';

import { motion } from 'framer-motion';
import { FaPlay, FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Testimonial() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef([]);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Owner',
      company: 'NetOne Solutions, Mumbai',
      location: 'Mumbai, Maharashtra',
      duration: 'Partner since 2020',
      quote: 'TENDA’s dealer program transformed our business. Within 2 years, our networking segment grew by 300%. The support team is always available, and margins are truly competitive.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      stats: { growth: '300%', revenue: '₹85L', satisfaction: '98%' }
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Director',
      company: 'Smart Connect',
      location: 'Bangalore, Karnataka',
      duration: 'Partner since 2019',
      quote: 'The product training sessions are exceptional. TENDA’s technical team helped us understand complex networking solutions, making us confident in recommending products to enterprise clients.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d7?w-400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      stats: { growth: '250%', revenue: '₹1.2Cr', satisfaction: '96%' }
    },
    {
      id: 3,
      name: 'Vikram Singh',
      role: 'Managing Partner',
      company: 'TechEdge Networks',
      location: 'Delhi NCR',
      duration: 'Partner since 2018',
      quote: 'Logistics and delivery have been flawless. We never face stockouts, and the RMA process is the quickest in the industry. TENDA truly values its dealer partners.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      stats: { growth: '400%', revenue: '₹2.1Cr', satisfaction: '99%' }
    },
    {
      id: 4,
      name: 'Anjali Patel',
      role: 'CEO',
      company: 'ConnectPro Solutions',
      location: 'Ahmedabad, Gujarat',
      duration: 'Partner since 2021',
      quote: 'As a woman entrepreneur in tech, I felt fully supported by TENDA. Their inclusive dealer program and personalized mentorship helped me establish a successful networking business.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      stats: { growth: '350%', revenue: '₹65L', satisfaction: '97%' }
    },
    {
      id: 5,
      name: 'Sanjay Reddy',
      role: 'Founder',
      company: 'Southern Networks',
      location: 'Hyderabad, Telangana',
      duration: 'Partner since 2017',
      quote: 'TENDA’s product quality and brand reputation make selling effortless. Customers trust the brand, and repeat business accounts for 70% of our revenue.',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      stats: { growth: '280%', revenue: '₹1.8Cr', satisfaction: '95%' }
    },
    {
      id: 6,
      name: 'Meera Krishnan',
      role: 'Partner',
      company: 'Kerala Net Solutions',
      location: 'Kochi, Kerala',
      duration: 'Partner since 2022',
      quote: 'The marketing collateral and sales enablement tools provided by TENDA helped us penetrate the competitive Kerala market effectively. Excellent co-branding opportunities.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      videoThumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      stats: { growth: '220%', revenue: '₹45L', satisfaction: '98%' }
    }
  ];

  const handlePlayVideo = (id, videoUrl) => {
    if (activeVideo === id) {
      setActiveVideo(null);
    } else {
      setActiveVideo(id);
      
      // Auto-play the video when clicked
      const videoElement = document.getElementById(`video-${id}`);
      if (videoElement) {
        videoElement.play().catch(e => console.log('Autoplay prevented:', e));
      }
    }
  };

  const handleVideoEnd = (id) => {
    setActiveVideo(null);
  };

  return (
    <section className="pt-6 pb-14 bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaStar className="text-orange-500" />
            <span>Trusted by 5000+ Dealers Nationwide</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Success Stories from Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              Dealer Partners
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Hear how TENDA dealership transformed businesses across India. Real stories, real growth.
          </p>
        </motion.div>

       
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-orange-200"
            >
              <div className="p-8">
                {/* Header with avatar and info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-orange-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-white text-xs" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(testimonial.rating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : testimonial.rating % 1 !== 0 && i === Math.floor(testimonial.rating)
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">{testimonial.rating}/5</span>
                        </div>
                      </div>
                      <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                        {testimonial.duration}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <span className="flex items-center gap-1">
                        📍 {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <div className="text-6xl text-orange-100 absolute -top-6 -left-2 opacity-50">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed pl-8 relative z-10">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                      <div className="text-2xl font-bold text-gray-800">{value}</div>
                      <div className="text-xs text-gray-500 capitalize mt-1">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Video Section */}
                <div className="relative rounded-xl overflow-hidden">
                  {activeVideo === testimonial.id ? (
                    <div className="relative pt-[56.25%]">
                      <video
                        id={`video-${testimonial.id}`}
                        src={testimonial.videoUrl}
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                        onEnded={() => handleVideoEnd(testimonial.id)}
                      />
                    </div>
                  ) : (
                    <div
                      className="relative cursor-pointer group/video"
                      onClick={() => handlePlayVideo(testimonial.id, testimonial.videoUrl)}
                    >
                      <div className="pt-[56.25%] relative overflow-hidden rounded-xl">
                        <img
                          src={testimonial.videoThumbnail}
                          alt="Testimonial video thumbnail"
                          className="absolute top-0 left-0 w-full h-full object-cover group-hover/video:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center group-hover/video:scale-110 transition-transform duration-300 shadow-2xl">
                            <FaPlay className="text-white text-2xl ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-sm font-semibold">Watch Success Story</div>
                          <div className="text-xs opacity-90">Click to play video testimonial</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}