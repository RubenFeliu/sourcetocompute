/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // Static export for GitHub Pages hosting
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
