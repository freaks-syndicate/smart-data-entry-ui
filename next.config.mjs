/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'e7.pngegg.com',
          },
        ],
      },
};

export default nextConfig;
