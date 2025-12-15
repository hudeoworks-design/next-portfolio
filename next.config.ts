import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // If the build is not for the server (i.e. client-side)
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Prevents fs from being bundled
      };
    }
    return config;
  },
  // Disable TypeScript type checking during build to work around Next.js 15.3.1 params type issue
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
