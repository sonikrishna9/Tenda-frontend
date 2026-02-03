"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const VideoCard = ({ title, videoId }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 w-full max-w-[560px]">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
        {title}
      </h2>

      {/* Video */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-5">
        <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
          <FiChevronLeft />
        </button>
        <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-black transition">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default function VideoShowcaseSection() {
  return (
    <section className="w-full bg-[#eef3f2] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 justify-items-center">
          
          <VideoCard
            title="Product Installed"
            videoId="dQw4w9WgXcQ"   // Dummy Video
          />

          <VideoCard
            title="Happy Partners / Customers"
            videoId="9bZkp7q19f0"   // Dummy Video
          />

        </div>
      </div>
    </section>
  );
}
