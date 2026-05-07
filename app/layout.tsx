import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ScrollProgress } from '@/components/ScrollProgress';

export const metadata: Metadata = {
  title: '대전케어 방문요양센터 — 24시간 상담 042-369-0326',
  description:
    '대전 5구 통합 방문요양센터. 어르신 댁으로 직접 찾아가는 케어 — 방문요양·방문목욕·방문간호. 24시간 상담 가능.',
  keywords: ['대전 방문요양', '방문요양센터', '재가복지', '장기요양', '대전케어', '요양보호사', '대전 노인 케어'],
  authors: [{ name: '대전케어 방문요양센터' }],
  openGraph: {
    title: '대전케어 방문요양센터',
    description: '대전 5구 통합 방문요양 — 24시간 상담 가능 042-369-0326',
    locale: 'ko_KR',
    type: 'website',
    siteName: '대전케어 방문요양센터',
  },
  twitter: {
    card: 'summary_large_image',
    title: '대전케어 방문요양센터',
    description: '24시간 상담 가능 — 042-369-0326',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* DNS prefetch + preconnect — 외부 자산 빠른 로딩 */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.imweb.me" />
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
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
