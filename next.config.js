/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    WS_HOST: process.env.WS_HOST,
    HOST_INNER: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  serverRuntimeConfig: {
    HOST: process.env.HOST,
    HOST_INNER: process.env.HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
