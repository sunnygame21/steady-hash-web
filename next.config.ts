import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true, // 忽略 TypeScript 检查
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略 ESLint 检查
  },
};

export default nextConfig;
