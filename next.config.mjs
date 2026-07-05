/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Domínios externos para fotos reais / CDN quando existirem.
    remotePatterns: [],
  },
};

export default nextConfig;
