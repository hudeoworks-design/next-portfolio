import { NextConfig } from 'next/types';
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
import withMDX from '@next/mdx';

const GATSBY_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3001' // Gatsby's default dev port
  : 'https://gatsby-blog-rouge.vercel.app';

const withNextIntl = createNextIntlPlugin();
const nextConfig:NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  serverExternalPackages: ["rehype-pretty-code", "shiki"],
  // outputFileTracingIncludes: {
  //   '/blogs/*': ['./content/**/*'],
  // },
  async rewrites() {
    return {
      // afterFiles ensures these run after internal Next.js routes
      afterFiles: [
        {
          source: '/articles/:path*',
          destination: `${GATSBY_URL}/articles/:path*`,
        },
        // Ensure raw images are served directly from Gatsby's static folder
        {
          source: '/_next/static/:path*',
          destination: `${GATSBY_URL}/_next/static/:path*`,
        },
        // {
        //   source: '/_next/:path*',
        //   destination: `${GATSBY_URL}/_next/:path*`,
        // }
      ],
    }
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default withNextIntl(withMDX()(nextConfig));
