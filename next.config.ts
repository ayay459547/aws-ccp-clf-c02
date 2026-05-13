import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  reactStrictMode: true,
  // 移除或註解掉 assetPrefix，因為現在使用獨立子網域了
  // assetPrefix: isProd ? "/aws-ccp-clf-c02/" : undefined,

  // 如果你有用到 images 或是其他路徑，通常也不需要 basePath 了
  // basePath: isProd ? "/aws-ccp-clf-c02" : undefined,
};

export default nextConfig;
