"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function VideoShowcaseSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}api/videos/partner`);
      const data = await res.json();

      if (data?.success) {
        setVideos(data?.data?.videos || []);
      }
    } catch (error) {
      console.error("Failed to fetch videos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const titles = [
    "Project Accomplished",
    "Our Happy Partners",
  ];

  return (
    <section className="w-full bg-[#eef3f2] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {loading ? (
          <p className="text-center text-gray-500">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-center text-gray-500">No videos available</p>
        ) : videos.length <= 2 ? (

          /* ✅ NORMAL GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 justify-items-center">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
                title={titles[index] || `Video ${index + 1}`}
                videoUrl={video}
              />
            ))}
          </div>

        ) : (

          /* 🔥 SLIDER MODE */
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index}>
                <VideoCard
                  title={titles[index] || `Video ${index + 1}`}
                  videoUrl={video}
                />
              </SwiperSlide>
            ))}
          </Swiper>

        )}

      </div>
    </section>
  );
}

/* ---------------- VIDEO CARD ---------------- */

const VideoCard = ({ title, videoUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-[560px] mx-auto">

      <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
        {title}
      </h2>

      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

    </div>
  );
};