import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Apple touch icon — iOS 홈 화면 추가 시 아이콘.
 * Wave 575: '대' 텍스트 → 자현 PNG 로고 (그린 hand + 주황 어르신 + 코랄 하트).
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const LOGO_DATA_URL = (() => {
  try {
    const buf = readFileSync(join(process.cwd(), 'public', 'logo.png'));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
})();

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
          background: '#FFFFFF',
          borderRadius: 36,
        }}
      >
        {LOGO_DATA_URL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_DATA_URL}
            alt=""
            width={180}
            height={180}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div style={{ fontSize: 88, fontWeight: 800, color: '#1E40AF' }}>대</div>
        )}
      </div>
    ),
    { ...size },
  );
}
