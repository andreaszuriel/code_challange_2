/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "randomuser.me",
      "hanergy.eu",
      "image.made-in-china.com",
      "www.solarpowerworldonline.com",
      "windcycle.energy",
      "media.dinomarket.com",
      "encrypted-tbn0.gstatic.com",
      "marvel-b1-cdn.bc0a.com",
      "renewablesfirst.co.uk",
      "www.ecosoftenergy.co.uk",
      "backendlessappcontent.com",
      "localhost" 
    ],
  },
};

module.exports = nextConfig;
