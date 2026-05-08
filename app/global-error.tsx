'use client';

import { CONTACT } from '@/lib/contact';

/**
 * global-error.tsx — 루트 layout 자체 크래시 시 마지막 fallback.
 * 자체 <html> + <body> 포함 (layout 대체).
 * 인라인 스타일 only (CSS chunk 로드 안 될 가능성 대비).
 * Wave 417: CONTACT import — single source paradigm (CSS chunk 실패 X JS module OK).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      {/* Wave 434: <head> 필수 — global-error는 layout.tsx 크래시 last-resort. metadata API 미동작.
       * charset 누락 시 한글 mojibake (??), viewport 누락 시 모바일 zoom 버그, title 빈 탭. */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1B6F4A" />
        <title>잠시 문제가 발생했습니다 · {CONTACT.name}</title>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, Pretendard, sans-serif',
          background:
            'radial-gradient(circle at 30% 30%, #1B6F4A 0%, #15573A 50%, #0F3726 100%)',
          color: '#fff',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              opacity: 0.8,
              marginBottom: '16px',
            }}
          >
            CRITICAL ERROR
          </p>
          <h1
            style={{
              fontSize: '40px',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            잠시 문제가
            <br />
            발생했습니다
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '40px', lineHeight: 1.6 }}>
            새로 고침을 시도해 주세요.
            <br />
            계속 안 될 경우 전화 주시면 즉시 도와드립니다.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: '#fff',
                color: '#1B6F4A',
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '16px',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              다시 시도
            </button>
            <a
              href={CONTACT.phoneTel}
              aria-label={`전화 걸기 ${CONTACT.phone}`}
              style={{
                background: '#E63946',
                color: '#fff',
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
                borderRadius: '2px',
                display: 'inline-block',
              }}
            >
              ☎ {CONTACT.phone}
            </a>
          </div>
          {error?.digest && (
            <p style={{ fontSize: '11px', opacity: 0.5, fontFamily: 'monospace' }}>
              참조 번호: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
