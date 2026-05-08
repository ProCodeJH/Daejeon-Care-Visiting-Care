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
  images: {
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
