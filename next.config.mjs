/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/locations',
        destination: '/locations/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
