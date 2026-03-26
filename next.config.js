/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024, // 128MB for pages with large data
  },
}

module.exports = nextConfig
