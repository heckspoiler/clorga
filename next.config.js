/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // your existing Next.js config
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
