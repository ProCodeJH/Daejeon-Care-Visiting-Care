import Link from 'next/link';
import { Phone, Home, Search } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export const metadata = {
  title: '페이지를 찾을 수 없습니다',
  description: `대전케어 방문요양센터 — 24시간 상담 ${CONTACT.phone}`,
};

/**
 * 404 — 자현 정체성 + 부드러운 안내 (어르신 혼란 X).
 */
export default function NotFound() {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center text-white px-5 py-20"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, #1B6F4A 0%, #15573A 50%, #0F3726 100%), radial-gradient(circle at 70% 70%, rgba(230,57,70,0.3) 0%, transparent 60%)',
      }}
    >
      <div className="text-center max-w-xl">
        {/* Wave 392: lang="en" 영어 발음 정확 (TTS) */}
        <p lang="en" className="text-sm font-bold tracking-[0.3em] mb-4 opacity-80">404 NOT FOUND</p>
        {/* Wave 434: inline textWrap 제거 — globals.css h1-h6 { text-wrap: balance } single source */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight">
          페이지를
          <br />
          찾을 수 없습니다
        </h1>
        <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
          요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.
          <br className="hidden md:inline" />
          궁금한 점이 있으시면 언제든 전화 주세요.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-[#1B6F4A] px-7 py-3 font-bold transition-colors hover:bg-gray-100"
            style={{ borderRadius: '2px' }}
          >
            <Home size={18} />홈으로
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

        {/* Wave 392: <nav> landmark — 자주 찾는 페이지 navigation 그룹 */}
        <nav aria-label="자주 찾는 페이지" className="border-t border-white/20 pt-6">
          <p className="text-xs opacity-70 mb-3 flex items-center justify-center gap-2">
            <Search size={12} />자주 찾는 페이지
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <Link href="/about" className="opacity-90 hover:opacity-100 underline-offset-4 hover:underline">인사말</Link>
            <Link href="/service" className="opacity-90 hover:opacity-100 underline-offset-4 hover:underline">서비스 소개</Link>
            <Link href="/insurance/cost" className="opacity-90 hover:opacity-100 underline-offset-4 hover:underline">본인부담금 계산기</Link>
            <Link href="/contact" className="opacity-90 hover:opacity-100 underline-offset-4 hover:underline">상담 문의</Link>
            <Link href="/faq" className="opacity-90 hover:opacity-100 underline-offset-4 hover:underline">자주 묻는 질문</Link>
          </div>
        </nav>
      </div>
    </section>
  );
}
