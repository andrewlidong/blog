/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [], // Add any image domains you might use
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 