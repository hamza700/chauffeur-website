/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-actual-domain.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
