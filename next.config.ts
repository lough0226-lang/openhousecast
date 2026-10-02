import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  output: 'standalone',
  // 显式将 tracing 根指向项目根，保证 standalone 入口稳定生成在
  // .next/standalone/server.js（避免被上层工作区目录结构嵌套）。
  outputFileTracingRoot: path.resolve(process.cwd()),
  /* config options here */
  serverExternalPackages: ['coze-coding-dev-sdk'],
  webpack: (config, { dev }) => {
    if (dev && config.cache && config.cache.type === 'filesystem') {
      config.cache.cacheDirectory = path.resolve(
        'node_modules/.cache/next-webpack',
      );
    }
    return config;
  },
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
