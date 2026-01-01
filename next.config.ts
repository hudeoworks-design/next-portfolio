import { NextConfig } from 'next/types';
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
import withMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin();
const nextConfig:NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  cacheComponents: true,
  bundlePagesRouterDependencies: true, 
  serverExternalPackages: ["rehype-pretty-code", "shiki"],
  outputFileTracingIncludes: {
    '/blogs/*': ['./content/**/*'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  outputFileTracingIncludes: {
    '/blogs/*': ['./content/**/*'],
  },
};

export default withNextIntl(withMDX()(nextConfig));
