'use client';

import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

/**
 * Web Share API + clipboard fallback.
 * Senior care use case: 가족이 KakaoTalk/Telegram 단톡에 정보 공유.
 * 모바일 = 네이티브 share sheet, 데스크톱 = 클립보드 복사 + toast.
 */
export function ShareButton({
  title,
  text,
  url,
}: {
  title: string;
  text?: string;
  url?: string;
}) {
  const [state, setState] = useState<'idle' | 'shared' | 'copied' | 'error'>('idle');

  async function handleShare() {
    const shareUrl =
      url ?? (typeof window !== 'undefined' ? window.location.href : '');

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        setState('shared');
        setTimeout(() => setState('idle'), 2000);
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setState('copied');
        setTimeout(() => setState('idle'), 2000);
        return;
      } catch {
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
    }
  }

  const labels: Record<typeof state, { text: string; Icon: typeof Share2 }> = {
    idle: { text: '공유', Icon: Share2 },
    shared: { text: '공유됨', Icon: Check },
    copied: { text: '주소 복사됨', Icon: Check },
    error: { text: '공유 실패', Icon: Copy },
  };
  const { text: label, Icon } = labels[state];

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-600 px-4 py-2 text-sm font-semibold transition-colors"
      style={{ borderRadius: '2px' }}
      aria-label={`${title} 공유하기`}
    >
      <Icon size={16} />
      {label}
      {/* Wave 443: sr-only aria-live region — state 변경 시 screen reader announce.
       * VoiceOver 등 일부 SR은 aria-label fixed 우선 → visible text 변경 무시. 별도 region으로 우회. */}
      <span className="sr-only" aria-live="polite" role="status">
        {state === 'shared' ? '공유되었습니다' : state === 'copied' ? '주소가 복사되었습니다' : state === 'error' ? '공유에 실패했습니다' : ''}
      </span>
    </button>
  );
}
