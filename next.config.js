/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains: ['media.npr.org','loremflickr.com','images.unsplash.com','tailwindui.com'],
  }
}

module.exports = nextConfig
// http://localhost:3000/home/(https:/media.npr.org/assets/img/2019/01/16/fake-post_custom-435acadc6ab1c42433611cde8d472d535266e340-s1600-c85.webp)