/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://rodoapp:8081/:path*', // Proxy para o backend no rodoapp:8080
      },

    ];
  },
};

export default nextConfig;