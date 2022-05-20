/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: ['cdn.nba.com']
  }
}

module.exports = nextConfig
