import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  reactStrictMode: true,
  assetPrefix: isProd ? "/aws-ccp-clf-c02/" : undefined,
};

export default nextConfig;
