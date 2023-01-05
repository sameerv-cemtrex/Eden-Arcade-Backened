
/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,

  trailingSlash: true,
  crossOrigin: 'anonymous',
  eslint: {
    ignoreDuringBuilds: true,
  }
}
module.exports = nextConfig
