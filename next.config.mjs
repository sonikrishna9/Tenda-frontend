const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/";

let apiRemotePattern = null;

try {
  const parsedApiUrl = new URL(apiBaseUrl);

  apiRemotePattern = {
    protocol: parsedApiUrl.protocol.replace(":", ""),
    hostname: parsedApiUrl.hostname,
    pathname: "/uploads/**",
  };

  if (parsedApiUrl.port) {
    apiRemotePattern.port = parsedApiUrl.port;
  }
} catch (error) {
  apiRemotePattern = null;
}

const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      ...(apiRemotePattern ? [apiRemotePattern] : []),
    ],
  },
};

export default nextConfig;
