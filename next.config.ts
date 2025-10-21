// next.config.ts
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized: true, // disables Next.js image optimization
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
});

export default nextConfig;
