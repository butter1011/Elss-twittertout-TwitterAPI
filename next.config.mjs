// /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  images : { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'flowbite.s3.amazonaws.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'icons8.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '**',
      },
    ],
  } 
}

export default nextConfig;
