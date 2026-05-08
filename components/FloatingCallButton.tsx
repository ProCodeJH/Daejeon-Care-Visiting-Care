'use client';

import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

/**
 * Floating call button — 모바일 + 데스크탑 우하단 24시간 상담 즉시.
 * 스크롤 200px+ 시 등장. 자현 정체성 코랄 + 펄스 애니메이션 (절제).
 * prefers-reduced-motion 시 펄스 X.
 */
export function FloatingCallButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        aria-label="닫기"
        onClick={() => setDismissed(true)}
        className="w-7 h-7 grid place-items-center bg-white/90 hover:bg-white text-ink-muted hover:text-ink-primary backdrop-blur-sm shadow-sm transition-all"
        style={{ borderRadius: '999px' }}
      >
        <X size={14} />
      </button>
      <a
        href={CONTACT.phoneTel}
        aria-label={`전화 상담 ${CONTACT.phone}`}
        className="floating-call-btn flex items-center gap-2.5 bg-[#E63946] hover:bg-[#C12A37] text-white px-5 py-3.5 font-bold shadow-lg transition-all hover:scale-105"
        style={{ borderRadius: '999px' }}
      >
        <Phone size={18} className="floating-call-icon" />
        <span className="hidden sm:inline">24시간 상담</span>
        <span className="font-extrabold">{CONTACT.phone}</span>
      </a>
    </div>
  );
}
