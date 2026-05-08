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
    '대전케어',
    '방문요양센터',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: CONTACT.name,
    description: `24시간 상담 가능 — ${CONTACT.phone}`,
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
};

export const viewport = {
  // 정체성 그린 — light/dark prefers-color-scheme 분리 (다크 모드 사용자도 정체성 유지)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1B6F4A' },
    { media: '(prefers-color-scheme: dark)', color: '#0F3726' },
  ],
  // 사이트는 라이트 테마 only — 어르신 가독성 우선 (다크 모드 변환 X)
  colorScheme: 'light',
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
        {/* preconnect — Pretendard CDN (font LCP 개선) */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Pretendard Variable preload (font-display: swap 자동) */}
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          as="style"
        />

        {/* speculation rules — 핵심 nav + cross-page recommendation 12 페이지 prerender (즉시 응답) */}
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
            }),
          }}
        />
      </head>
      <body>
        {/* a11y: skip-to-content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#1B6F4A] focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:outline-none"
        >
          본문으로 건너뛰기
        </a>
        <StructuredData />
        <SmoothScroll />
        <ScrollProgress />
        <WebVitals />
        <Header />
        <main id="main-content">{children}</main>
        <ScrollToTop />
        <FloatingCallButton />
        <Footer />
      </body>
    </html>
  );
}
