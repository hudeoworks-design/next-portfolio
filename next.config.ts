// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';
import withMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default withNextIntl(withMDX((nextConfig)));
