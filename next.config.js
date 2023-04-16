// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'static.wikia.nocookie.net',
      'media.licdn.com',
        'res.cloudinary.com'
    ],
  },
}

module.exports = nextConfig;
