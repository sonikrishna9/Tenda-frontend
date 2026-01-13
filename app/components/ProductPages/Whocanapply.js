"use client";
import { motion } from "framer-motion";
import { FaHome, FaChartLine, FaDollarSign, FaHeadset, FaHeart, FaRegEdit } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineRateReview } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const leftVariant = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const rightVariant = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const floatVariant = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.3 } },
};

const cardHover = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const productVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const data = [
  {
    title: "IT & Networking Product Resellers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply1.jpg",
  },
  {
    title: "Distributors & Wholesalers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply2.png",
  },
  {
    title: "System Integrators",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply3.jpg",
  },
  {
    title: "Networking Solutions Providers",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply4.jpg",
  },
  {
    title: "E-Commerce & Retail Partners",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/products/whocanapply/apply4.jpg",
  },
];

const items = [
  { icon: <FaHome size={26} />, label: "High Quality Products" },
  { icon: <FaChartLine size={26} />, label: "Strong Market Reputation" },
  { icon: <FaDollarSign size={26} />, label: "Attractive Margins" },
  { icon: <FaHeadset size={26} />, label: "Marketing & Technical Support" },
  { icon: <FaHeart size={26} />, label: "Nationwide Distribution Network" },
];

const products = [
  { img: "/images/products/whocanapply/p1.png", name: "Dummy Product 1" },
  { img: "/images/products/whocanapply/p2.png", name: "Dummy Product 2" },
  { img: "/images/products/whocanapply/p3.png", name: "Dummy Product 3" },
  { img: "/images/products/whocanapply/p4.png", name: "Dummy Product 4" },
  { img: "/images/products/whocanapply/p5.png", name: "Dummy Product 4" },
  { img: "/images/products/whocanapply/p1.png", name: "Dummy Product 4" },
  { img: "/images/products/whocanapply/p2.png", name: "Dummy Product 4" },
  { img: "/images/products/whocanapply/p3.png", name: "Dummy Product 4" },
];

export default function WhoCanApply() {
  return (
    <>
      <div className="py-14 px-4 md:px-12 lg:px-16 text-center">

        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[26px] md:text-[30px] font-semibold mb-4"
          style={{
            background: "linear-gradient(90deg, #47d8dd, #eb5b32)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Enjoy blazing–fast Wi-Fi7 BE5100<br />
          throughout your home
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[#666] max-w-[760px] mx-auto leading-[1.7] mb-12 text-[15px]"
        >
          Adopt the Wi-Fi 7 technology, dual-band concurrent rate up to 5011Mbps.
          The unique Multi-Link Operation technology of Wi-Fi 7, dual-band
          simultaneous transmission is possible with Wi-Fi 7 terminal devices,
          the network speed is faster than the BE3600 and the network latency is lower.
        </motion.p>

        {/* ICON SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          lg:grid-cols-5 
          gap-10 
          justify-items-center
        "
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              {/* ICON CIRCLE */}
              <div
                className="w-[70px] h-[70px] flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(255, 138, 101, 0.18)", // peach background (soft)
                }}
              >
                <div
                  className="text-[#ff845a]"
                  style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
                >
                  {item.icon}
                </div>
              </div>

              {/* LABEL */}
              <p className="text-[#555] text-[14.5px] max-w-[130px] leading-[1.4] font-medium">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="container py-5">

        {/* UPDATED HEADING -- EXACTLY LIKE SECOND IMAGE */}
        <div className="mb-8 ml-[8%]">
          <h2 className="fw-bold text-[28px] text-[#2d2d2d] mb-2">
            Who Can Apply ?
          </h2>

          <p className="text-[#6f6f6f] max-w-[420px] leading-[1.6] mb-3">
            Designed for partners ready to deliver trusted security solutions.
          </p>

          <div
            className="h-[3px] w-[55px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #47d8dd, #eb5b32)",
            }}
          ></div>
        </div>

        {/* LIST SECTION */}
        <div className="flex flex-col gap-12 px-3 lg:px-16">
          {data.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={isEven ? rightVariant : leftVariant}
                whileHover="hover"
                className={`
                flex flex-col items-center text-center w-full gap-5 mx-auto
                md:flex-row md:text-left md:gap-6
                ${isEven ? "md:flex-row-reverse" : ""}
                lg:max-w-[650px]
                ${isEven ? "lg:mr-0 lg:ml-auto" : "lg:ml-0 lg:mr-auto"}
              `}
              >
                {/* Floating Image */}
                <motion.div
                  variants={floatVariant}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="w-[90px] h-[90px] p-[4px] rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(120deg, #eb5b32, #47d8dd)",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="bg-white rounded-[14px] p-5 w-full max-w-[430px] shadow-md border-2"
                  style={{
                    borderImage: "linear-gradient(120deg, #eb5b32, #47d8dd) 1",
                    borderImageSlice: 1,
                  }}
                >
                  <h6 className="fw-bold mb-1 text-[16px] text-[#333]">
                    {item.title}
                  </h6>
                  <p className="text-muted text-[14px] leading-[1.5] mb-0">
                    {item.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="w-full">

        {/* How It Works Section */}
        <section className="py-12 px-4 md:px-8 pb-2">
          <h2 className="text-3xl font-bold">How it Works ?</h2>
          <p className="text-gray-500 mt-1">
            Step-by-step collaboration designed for efficiency and trust.
          </p>

          <div className="bg-[#1b1b1b] mt-10 rounded-lg py-10 px-4 flex flex-col md:flex-row 
                        justify-between items-center gap-6">

            {/* Step 1 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                1
              </div>
              <FaRegEdit className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Partner Registration Form</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Fill out the partner registration form and wait for review.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                2
              </div>
              <MdOutlineRateReview className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Application Form Review</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Our team will review your application and update status.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center bg-white shadow-md rounded-xl 
                          p-6 w-full md:w-1/3"
            >
              <div className="w-10 h-10 bg-orange-400 flex justify-center items-center 
                            text-white font-bold rounded-full mb-4">
                3
              </div>
              <IoMdCheckmarkCircleOutline className="text-orange-400 text-4xl mb-2" />
              <h3 className="font-semibold text-lg">Approval and Access</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Get full access to pricing, marketing materials, and support.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Category Section */}
        <section className="py-12 px-4 md:px-12">
          <h2 className="text-3xl font-bold">Product Category</h2>
          <p className="text-gray-500 mt-1">
            Explore our dummy product collection.
          </p>

          <div className="mt-10">
            <Swiper
              slidesPerView={1.2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2.3 },
                1024: { slidesPerView: 4 },
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
            >
              {products.map((item, index) => (
                <SwiperSlide key={index} className="pb-2">
                  <motion.div
                    variants={productVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="bg-white border-2 border-zinc-100 rounded-xl shadow-lg p-6 flex flex-col items-center"
                  >
                    <img
                      src={item.img}
                      className="h-32 object-contain mb-4"
                      alt="dummy"
                    />

                    <button className="border border-orange-400 text-orange-500 
                                     rounded-lg px-4 py-2 hover:bg-orange-50 mt-2">
                      {item.name}
                    </button>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/all-product" className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500">
              View More
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
