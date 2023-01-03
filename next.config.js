/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['countryflagsapi.com', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
