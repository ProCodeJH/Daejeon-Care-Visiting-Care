'use client';

import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

const DISMISS_KEY = 'daejeon-care:floating-call-dismissed';

/**
 * Floating call button — 모바일 + 데스크탑 우하단 24시간 상담 즉시.
 * 스크롤 200px+ 시 등장. 자현 정체성 코랄 + 펄스 애니메이션 (절제).
 * prefers-reduced-motion 시 펄스 X.
 *
 * Wave 438: dismissed 상태 sessionStorage 영속 — 페이지 navigation 시에도 유지
 * (어르신 한 번 닫고 다른 페이지 가도 재등장 X). tab 닫으면 reset (sessionStorage).
 */
export function FloatingCallButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Wave 438: sessionStorage 복원 — 첫 마운트 시 이전 dismiss 상태 적용
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') setDismissed(true);
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {}
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        type="button"
        aria-label="전화 상담 버튼 닫기"
        onClick={handleDismiss}
        className="w-7 h-7 grid place-items-center bg-white/90 hover:bg-white text-ink-muted hover:text-ink-primary backdrop-blur-sm shadow-sm transition-all"
        style={{ borderRadius: '999px' }}
      >
        <X size={14} />
      </button>
      {/* Wave 438: motion-safe:hover:scale-105 — prefers-reduced-motion 시 scale X (어르신 vestibular 보호) */}
      <a
        href={CONTACT.phoneTel}
        aria-label={`전화 상담 ${CONTACT.phone}`}
        className="floating-call-btn flex items-center gap-2.5 bg-[#E63946] hover:bg-[#C12A37] text-white px-5 py-3.5 font-bold shadow-lg transition-all motion-safe:hover:scale-105"
        style={{ borderRadius: '999px' }}
      >
        <Phone size={18} className="floating-call-icon" />
        <span className="hidden sm:inline">24시간 상담</span>
        <span className="font-extrabold">{CONTACT.phone}</span>
      </a>
    </div>
  );
}
