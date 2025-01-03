/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'], // Add uploadthing domain
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 