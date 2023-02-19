/** @type {import('next').NextConfig} */
const nextConfig = {
  settings: {
    cors: {
      enabled: true,
      // headers: '*', 
      origin: ["http://localhost", 'https://foo.example'],
    },
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['media.npr.org', 'loremflickr.com', 'images.unsplash.com', 'tailwindui.com',"localhost","127.0.0.1"],
  }
}

module.exports = nextConfig
// http://localhost:3000/home/(https:/media.npr.org/assets/img/2019/01/16/fake-post_custom-435acadc6ab1c42433611cde8d472d535266e340-s1600-c85.webp)