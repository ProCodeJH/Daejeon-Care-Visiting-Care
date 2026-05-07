import { ImageResponse } from 'next/og';

/**
 * Apple touch icon — iOS 홈 화면 추가 시 아이콘.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1B6F4A 0%, #15573A 100%)',
          color: 'white',
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          borderRadius: 36,
        }}
      >
        대
      </div>
    ),
    { ...size },
  );
}
