/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    R2_ENDPOINT: process.env.R2_ENDPOINT,
    R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
    R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_R2_ENDPOINT: process.env.NEXT_PUBLIC_R2_ENDPOINT,
  },
}

module.exports = nextConfig
