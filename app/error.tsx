'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Phone, Home, RefreshCw } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

/**
 * error.tsx — Next.js 15 App Router error boundary.
 * Senior care 적합: 기술 용어 X, 전화 즉시 가능, 부드러운 안내.
 * 404 paradigm 일관 (gradient + 정체성 컬러).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && error?.digest) {
      console.error('[daejeon-care error]', error.digest, error.message);
    }
  }, [error]);

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center text-white px-5 py-20"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, #1E40AF 0%, #1E3A8A 50%, #172554 100%), radial-gradient(circle at 70% 70%, rgba(245,166,35,0.25) 0%, transparent 60%)',
      }}
    >
      {/* Wave 392: role="alert" 즉시 announce + lang="en" 영어 발음 정확 */}
      <div role="alert" className="text-center max-w-xl">
        <p lang="en" className="text-sm font-bold tracking-[0.3em] mb-4 opacity-80">SOMETHING WENT WRONG</p>
        {/* Wave 434: inline textWrap 제거 — globals.css h1-h6 { text-wrap: balance } single source */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
          잠시 문제가
          <br />
          발생했습니다
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
          새로 고침을 시도해 주세요.
          <br className="hidden md:inline" />
          계속 안 될 경우 전화 주시면 즉시 도와드립니다.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {/* Wave 415: type="button" 명시 — default "submit" 방지 (defensive) */}
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2 bg-white text-[#1E40AF] px-7 py-3 font-bold transition-colors hover:bg-gray-100"
            style={{ borderRadius: '2px' }}
          >
            <RefreshCw size={18} />
            다시 시도
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-7 py-3 font-bold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            <Home size={18} />
            홈으로
          </Link>
          <a
            href={CONTACT.phoneTel}
            aria-label={`전화 걸기 ${CONTACT.phone}`}
            className="flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-7 py-3 font-bold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            <Phone size={18} />
            {CONTACT.phone}
          </a>
        </div>

        {error?.digest && (
          <p className="text-xs opacity-50 font-mono">참조 번호: {error.digest}</p>
        )}
      </div>
    </section>
  );
}
