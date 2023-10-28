/** @type {import('next').NextConfig} */

// for contentLayer
const { withContentlayer } = require('next-contentlayer')
module.exports = withContentlayer({
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    // Enable modern image formats
    formats: ["image/avif", "image/webp"],
  },
}) // nextConfig直接丟到withContentlayer的{}裡