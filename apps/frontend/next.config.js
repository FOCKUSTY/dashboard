/** @type {import('next').NextConfig}  */

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["default", "en", "ru", "fe"],
    defaultLocale: "default"
  },
  images: {
    domains: ["cdn.discordapp.com"]
  }
};

module.exports = nextConfig;
