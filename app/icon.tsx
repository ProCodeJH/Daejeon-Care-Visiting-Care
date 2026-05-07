import { ImageResponse } from 'next/og';

/**
 * 동적 favicon — 자현 로고 모티브 (손바닥 cradle + 어르신 + 하트).
 * Next.js 15 native: app/icon.tsx → /icon (모든 사이즈 자동).
 */
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1B6F4A',
          color: 'white',
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: '-0.05em',
        }}
      >
        대
      </div>
    ),
    { ...size },
  );
}
