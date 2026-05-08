import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';
import { WebVitals } from '@/components/WebVitals';

const SITE = 'https://대전케어방문요양.kr';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: '대전케어 방문요양센터 — 24시간 상담 042-369-0326',
    template: '%s | 대전케어 방문요양센터',
  },
  description:
    '대전 5구 통합 방문요양센터. 어르신 댁으로 직접 찾아가는 케어 — 방문요양·방문목욕·방문간호. 24시간 상담 가능 042-369-0326.',
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
  authors: [{ name: '대전케어 방문요양센터' }],
  applicationName: '대전케어 방문요양센터',
  creator: '대전케어 방문요양센터',
  publisher: '대전케어 방문요양센터',
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    title: '대전케어 방문요양센터',
    description: '대전 5구 통합 방문요양 — 24시간 상담 가능 042-369-0326',
    url: SITE,
    locale: 'ko_KR',
    type: 'website',
    siteName: '대전케어 방문요양센터',
  },
  twitter: {
    card: 'summary_large_image',
    title: '대전케어 방문요양센터',
    description: '24시간 상담 가능 — 042-369-0326',
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
    canonical: SITE,
  },
  category: 'health',
};

export const viewport = {
  themeColor: '#1B6F4A', // 자현 정체성 그린
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* DNS prefetch + preconnect — 외부 자산 빠른 로딩 */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        {/* speculation rules — 메인 nav 페이지 prerender */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: ['/about', '/service', '/contact', '/insurance', '/faq'],
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
        <SmoothScroll />
        <ScrollProgress />
        <WebVitals />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
