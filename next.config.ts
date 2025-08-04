/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
  },
  images: {
    domains: ['techcrunch.com', "github.com"], // Add your allowed image hostnames here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // You can replace this with actual domains
      },
    ],
  },
}

module.exports = nextConfig
