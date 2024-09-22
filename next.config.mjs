/** @type {import('next').NextConfig} */
const nextConfig = {images : {
    domains : ['images.pexels.com','images.unsplash.com', 'assets.aceternity.com', 'res.cloudinary.com']
},
eslint : {
    ignoreDuringBuilds : true
}};

export default nextConfig;
