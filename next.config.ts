// next.config.js
const nextConfig = {
  // Konfigurasi lain yang sudah ada
  reactStrictMode: true,
  swcMinify: true,

  // Tambahkan konfigurasi images
  images: {
    domains: ["randomuser.me"], // Izinkan domain gambar
  },
};

module.exports = nextConfig;