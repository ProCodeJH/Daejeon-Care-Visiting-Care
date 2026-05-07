import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: '대전케어 재가복지센터 — 일상에 함께 머무는 시간',
  description:
    '대전 5구 (유성/대덕/중구/동구/서구) 방문요양·방문목욕·방문간호 통합 케어. 가족 같은 곁의 시간.',
  openGraph: {
    title: '대전케어 재가복지센터',
    description: '대전 5구 통합 재가복지 — 방문요양·방문목욕·방문간호',
    locale: 'ko_KR',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
