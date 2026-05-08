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
  // 불필요 브라우저 기능 권한 차단 (senior care 사이트 = 카메라/마이크/지오 X)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
  },
  // DNS prefetch 활성 (속도)
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // cdn.imweb.me 제거 (저작권 회피, Wave 10)
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
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
