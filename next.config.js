/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Suppress React version warning
    config.ignoreWarnings = [
      { module: /node_modules\/antd/ },
      { message: /.*React.*version.*/ }
    ];
    return config;
  },
}

module.exports = nextConfig 