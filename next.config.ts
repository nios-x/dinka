// next.config.js or next.config.ts (if using TypeScript)

import { hostname } from "os";

const nextConfig = {
  images: {
    unoptimized: true, // disables Next.js image optimization for all external URLs
  },
};

module.exports = nextConfig;
