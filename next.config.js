/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'countryflagsapi.com',
      'firebasestorage.googleapis.com',
      'i.imgur.com',
    ],
  },
};

module.exports = nextConfig;
