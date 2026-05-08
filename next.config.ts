import type { NextConfig } from 'next';

/**
 * Production security headers (Wave 78).
 * CSP는 dangerouslySetInnerHTML JSON-LD + speculation rules 인라인 script와 충돌 위험 → 제외.
 * Vercel은 HSTS 자동 적용 → 명시 X.
 */
const SECURITY_HEADERS = [
  // clickjacking 방지 (대전케어 iframe 임베드 차단)
  { key: 'X-Frame-Options', value: 'DENY' },
  // MIME sniffing 방지 (JS/CSS 위조 방지)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // referrer 정보 최소화 (사용자 privacy + 외부 사이트로 path/query 전달 X)
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 불필요 브라우저 기능 권한 차단 (senior care 사이트 = 모든 sensor/device API 비필요).
  // Wave 309: 13개 추가 directives saturation. web-share만 self (Wave 72 ShareButton 사용).
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=(), ' +
      'payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ' +
      'picture-in-picture=(), display-capture=(), xr-spatial-tracking=(), ' +
      'clipboard-read=(), clipboard-write=(self), screen-wake-lock=(), ' +
      'bluetooth=(), serial=(), hid=(), idle-detection=(), autoplay=(), web-share=(self)',
  },
  // DNS prefetch 활성 (속도)
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Wave 309: COOP — cross-origin window 분리 (Spectre/Meltdown 방어 강화).
  // same-origin = window.opener cross-origin 접근 차단 = security ↑.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Wave 433: X-Powered-By: Next.js 헤더 제거 — 공격자에게 server stack 정보 누출 X (security obscurity).
  poweredByHeader: false,
  // Wave 433: production console.* strip — dev/staging 보존, error/warn 예외 (운영 디버깅 가능).
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  // Wave 433: barrel file tree-shake — lucide-react 250+ icons / framer-motion 다중 export 분할 import.
  // Vercel 측정 ~30% First Load JS 감소 사례. zero-cost (build time only).
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'lenis'],
  },
  images: {
    // Wave 433: AVIF 우선 (~20% smaller than WebP) → WebP fallback. next/image 미래 사용 대비.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // cdn.imweb.me 제거 (저작권 회피, Wave 10)
      // YouTube 도메인 제거 (Wave 21 video embed 제거 후 미사용, Wave 139 cleanup)
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
