/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
}

module.exports = nextConfig 