import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import mdx from "@next/mdx";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin();

const withMDX = mdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async rewrites() {
    return [
      // 将无前缀路径重写到默认语言路径
      {
        source: '/posts',
        destination: '/en/posts',
      },
      {
        source: '/posts/:slug',
        destination: '/en/posts/:slug',
      },
      {
        source: '/showcase',
        destination: '/en/showcase',
      },
      {
        source: '/pricing',
        destination: '/en/pricing',
      },
      {
        source: '/resources',
        destination: '/en/resources',
      },
      {
        source: '/gpt-oss-tools',
        destination: '/en/gpt-oss-tools',
      },
      {
        source: '/auth/signin',
        destination: '/en/auth/signin',
      },
    ];
  },
  
  async redirects() {
    return [
      // 不要重定向根路径 - 让 next-intl 中间件处理
      // 根路径 / 会被中间件自动处理，根据用户语言显示内容
      
      // 处理需要登录的页面 - 重定向到登录页
      {
        source: '/my-credits',
        destination: '/en/auth/signin',
        permanent: false,
      },
      {
        source: '/my-orders',
        destination: '/en/auth/signin',
        permanent: false,
      },
      {
        source: '/api-keys',
        destination: '/en/auth/signin',
        permanent: false,
      },
      
      // 处理不存在的页面 - 避免404错误
      {
        source: '/forum',
        destination: '/en',
        permanent: false,
      },
      {
        source: '/studio',
        destination: '/en',
        permanent: false,
      },
      {
        source: '/templates',
        destination: '/en',
        permanent: false,
      },
      
      // 处理异常路径
      {
        source: '/undefined',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/undefined/:path*',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/en',
        permanent: true,
      },
      
      // 特定页面重定向
      {
        source: '/zh/gpt-oss-120b',
        destination: '/zh/gpt-oss-tools',
        permanent: true,
      },
    ];
  },
};

// Make sure experimental mdx flag is enabled
const configWithMDX = {
  ...nextConfig,
  experimental: {
    mdxRs: true,
  },
};

export default withBundleAnalyzer(withNextIntl(withMDX(configWithMDX)));
