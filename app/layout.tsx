import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';
import { WebVitals } from '@/components/WebVitals';
import { StructuredData } from '@/components/StructuredData';
import { FloatingCallButton } from '@/components/FloatingCallButton';
import { ScrollToTop } from '@/components/ScrollToTop';
import { MotionProvider } from '@/components/MotionProvider';
import { CONTACT } from '@/lib/contact';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${CONTACT.name} — 24시간 상담 ${CONTACT.phone}`,
    template: `%s | ${CONTACT.name}`,
  },
  description: `대전 5구 통합 ${CONTACT.name}. 어르신 댁으로 직접 찾아가는 케어 — 방문요양·방문목욕·방문간호. 24시간 상담 가능 ${CONTACT.phone}.`,
  keywords: [
    '대전 방문요양',
    CONTACT.brand,
    CONTACT.service,
    '재가복지',
    '장기요양',
    '요양보호사',
    '대전 노인 케어',
    '대전 방문목욕',
    '대전 방문간호',
    '장기요양등급',
    '본인부담금 계산기',
  ],
  authors: [{ name: CONTACT.name }],
  applicationName: CONTACT.name,
  creator: CONTACT.name,
  publisher: CONTACT.name,
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    title: CONTACT.name,
    description: `대전 5구 통합 방문요양 — 24시간 상담 가능 ${CONTACT.phone}`,
    url: SITE.url,
    locale: SITE.locale,
    type: 'website',
    siteName: CONTACT.name,
    // Wave 431: openGraph.images 제거 — app/opengraph-image.tsx (브랜디드 1200x630 카드)
    // Next.js 15 auto-attachment 활용. 24시간 배지 + 전화번호 + 도메인 워터마크 carousel 사진보다 전환↑.
  },
  twitter: {
    card: 'summary_large_image',
    title: CONTACT.name,
    description: `24시간 상담 가능 — ${CONTACT.phone}`,
    // Wave 431: 브랜디드 OG 카드 재사용 — twitter-image.tsx 별도 생성 회피, single source of truth.
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    // 자현이 Search Console / 네이버 웹마스터 코드 등록 시 채움
    // google: 'XXXXXXXXXX',
    // other: { 'naver-site-verification': 'XXXXXXXXXX' },
  },
  alternates: {
    canonical: SITE.url,
  },
  category: 'health',
  // Wave 297: iOS Safari PWA 정확 (manifest standalone 무시 → meta 별도).
  // 어르신 자녀 iOS 홈 화면 추가 시 fullscreen + 정체성 status bar.
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: CONTACT.brand,
  },
};

export const viewport = {
  // 정체성 그린 — light/dark prefers-color-scheme 분리 (다크 모드 사용자도 정체성 유지)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E40AF' },
    { media: '(prefers-color-scheme: dark)', color: '#172554' },
  ],
  // 사이트는 라이트 테마 only — 어르신 가독성 우선 (다크 모드 변환 X).
  // Wave 293: 'light' (hint) → 'only light' (강제) — iOS dark mode 사용자 auto-invert 차단.
  // 자현 ChatGPT 5장 hero 이미지 + 정체성 그린/코랄/노랑 정확 보존.
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // iPhone 노치 + 하단 home indicator safe-area 활용
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={SITE.lang}>
      <head>
        {/* Wave 551: print stylesheet CSS vars — body:before 헤더가 CONTACT/SITE 동기화.
         * 자현이 phone/brand/domain 변경 시 인쇄본 자동 갱신 (paradigm 16 single source).
         * Wave 454 XSS escape 패러다임 일관: dangerouslySetInnerHTML 없이 inline style만. */}
        <style>{`:root { --brand-name: "${CONTACT.name}"; --brand-phone: "${CONTACT.phone}"; --brand-domain: "${SITE.domain}"; }`}</style>

        {/* preconnect — Pretendard CDN (font LCP 개선) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Hero 첫 슬라이드 preload — LCP 가속 (나머지 4장은 carousel 회전 시 자연 로드) */}
        <link rel="preload" as="image" href="/hero/hero-1.png" fetchPriority="high" />

        {/* Pretendard Variable preload (font-display: swap 자동).
         * Wave 292: crossOrigin="anonymous" 추가 — preload + @import cache key 일치 (double-fetch 회피).
         * preconnect (line 95)도 anonymous라 일관성. */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          as="style"
          crossOrigin="anonymous"
        />

        {/* speculation rules — 핵심 nav + cross-page recommendation 12 페이지 prerender (즉시 응답).
         * Wave 454: XSS escape (defensive — hardcoded URL 안전하지만 5 JSON-LD 컴포넌트와 일관성). */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: [
                    '/about',
                    '/service',
                    '/contact',
                    '/insurance',
                    '/insurance/cost',
                    '/insurance/grade',
                    '/centers',
                    '/faq',
                    '/jobs',
                    '/process',
                    '/story',
                    '/info',
                  ],
                },
              ],
            }).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body>
        {/* a11y: skip-to-content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#1E40AF] focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:outline-none"
        >
          본문으로 건너뛰기
        </a>
        <StructuredData />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <WebVitals />
          <Header />
          <main id="main-content">{children}</main>
          <ScrollToTop />
          <FloatingCallButton />
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
