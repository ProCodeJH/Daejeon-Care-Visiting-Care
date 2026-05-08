'use client';

import { useRef } from 'react';
import { X } from 'lucide-react';

/**
 * Wave 383: HTML5 <dialog> + showModal() — privacy 요약 in-context preview.
 * 폼 데이터 소실 없이 개인정보 처리 내용 검토 → 폼 복귀.
 *
 * Native a11y:
 * - <dialog>는 implicit role="dialog"
 * - showModal() = focus trap + ESC 닫기 + backdrop click 닫기 (브라우저 native)
 * - dialog::backdrop pseudo로 backdrop 스타일링
 *
 * 브라우저 지원: Chrome 37+/FF 98+/Safari 15.4+ (광범위, fallback 불필요).
 */
export function PrivacyDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="text-brand-600 underline text-xs hover:text-brand-700"
      >
        자세히
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="privacy-dialog-title"
        className="bg-white max-w-md w-full mx-auto p-6 backdrop:bg-black/40"
        style={{ borderRadius: '2px' }}
        onClick={(e) => {
          // backdrop 클릭 시 닫기 (dialog element 자체 클릭 시만 backdrop)
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="privacy-dialog-title" className="font-bold text-ink-primary text-base">
            개인정보 처리 안내
          </h3>
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="w-8 h-8 grid place-items-center hover:bg-gray-100 transition-colors"
            style={{ borderRadius: '999px' }}
          >
            <X size={16} />
          </button>
        </div>
        <ul className="text-sm text-ink-secondary space-y-2 mb-4 pl-5 list-disc">
          <li><strong className="text-ink-primary">수집 항목</strong>: 이름, 연락처, 문의 내용</li>
          <li><strong className="text-ink-primary">이용 목적</strong>: 상담 응대 + 서비스 매칭</li>
          <li><strong className="text-ink-primary">보관 기간</strong>: 상담 종료 후 30일 자동 파기</li>
          <li><strong className="text-ink-primary">제3자 제공</strong>: 없음 (법령 의무 시 예외)</li>
        </ul>
        <p className="text-xs text-ink-muted mb-4">
          전체 처리방침은{' '}
          <a href="/privacy" className="text-brand-600 underline">
            개인정보처리방침
          </a>
          에서 확인하실 수 있습니다.
        </p>
        {/* Wave 446: autoFocus — modal open 시 first focus를 confirm 버튼으로.
         * 어르신이 무의식 Enter 누르면 X close (코드 순서상 first focusable)에 hit해서 콘텐츠 못 보고 닫힘 회피.
         * autoFocus는 closed dialog에서는 발동 안 함 (showModal 시에만). */}
        <button
          type="button"
          autoFocus
          onClick={close}
          className="w-full bg-brand-400 hover:bg-brand-500 text-white py-2 font-semibold transition-colors"
          style={{ borderRadius: '2px' }}
        >
          확인
        </button>
      </dialog>
    </>
  );
}
