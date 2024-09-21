import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'],
  },
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },
}

export default nextConfig