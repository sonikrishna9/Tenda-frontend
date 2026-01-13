const nextConfig = {
  images: {
    remotePatterns: [
      // ✅ Local backend images (keep this)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },

      // ✅ Cloudinary images (ADD THIS)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
