require('dotenv').config({ path: './env/.env.local' });
require('dotenv').config({ path: './env/.env.production' });
require('dotenv').config({ path: './env/.env.qa' });
require('dotenv').config({ path: './env/.env' });
require('dotenv').config({ path: '.env.production' });
/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },
  images: {
    loader: 'custom',
    loaderFile: './src/util/imageLoader.ts',

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*'
      },
      {
        protocol: 'https',
        hostname: '*'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CONTENT_HOST
      }
    ]
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // 아래를 추가합니다.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};

// default-src 'self': 기본적으로 동일 출처의 리소스만 로드하도록 설정합니다.
// script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app www.googletagmanager.com: 스크립트는 동일 출처, 'unsafe-eval', 'unsafe-inline', giscus.app, www.googletagmanager.com에서 로드할 수 있습니다.
// style-src 'self' 'unsafe-inline': 스타일시트는 동일 출처와 'unsafe-inline'에서 로드할 수 있습니다.
// img-src * blob: data:: 이미지는 모든 출처, blob:, data:에서 로드할 수 있습니다.
// media-src 'none': 미디어 리소스는 로드할 수 없습니다. nft 때문에 모두 혀용
// connect-src *: 모든 출처로의 연결을 허용합니다. nft 때문에 모두 혀용
// font-src 'self': 폰트는 동일 출처에서만 로드할 수 있습니다.
// frame-src giscus.app: 프레임 리소스는 giscus.app에서만 로드할 수 있습니다.

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' www.googletagmanager.com www.google.com  https://consent.cookiebot.com https://consentcdn.cookiebot.com;
  worker-src 'self' blob:; 
  img-src * blob: data:;
  media-src *;
  style-src 'self' 'unsafe-inline';
  connect-src *;
  font-src 'self' data:;
  frame-src www.googletagmanager.com  https://consentcdn.cookiebot.com;
  `;

const securityHeaders = [
  //X-XSS-Protection 오래된 브라우저에서만 효과 있음.
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, '')
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'minewarz',
    project: 'web'
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true
  }
);
