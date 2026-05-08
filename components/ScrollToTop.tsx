'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * 위로 가기 버튼 — 긴 페이지에서 어르신 친화.
 * 스크롤 600px+ 시 등장. 좌하단 (FloatingCallButton 우하단과 분리).
 * prefers-reduced-motion 시 instant scroll.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }}
      aria-label="페이지 맨 위로"
      className="fixed bottom-5 left-5 z-50 w-11 h-11 grid place-items-center bg-white/90 hover:bg-white text-[#1B6F4A] hover:text-[#15573A] backdrop-blur-sm shadow-md border border-gray-100 transition-all hover:scale-110"
      style={{ borderRadius: '999px' }}
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </button>
  );
}
