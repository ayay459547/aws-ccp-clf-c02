import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  reactStrictMode: true,
  assetPrefix: isProd ? "/AWS-CCP-Exam/" : undefined,
};

export default nextConfig;
