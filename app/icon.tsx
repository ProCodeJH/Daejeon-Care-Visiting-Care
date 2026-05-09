import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * 동적 favicon + PWA icons (Wave 430 → Wave 575: 자현 PNG 로고로 교체).
 * Next.js 15 generateImageMetadata: 단일 파일에서 다중 사이즈 생성.
 *  - small (64×64)  → 브라우저 탭 favicon
 *  - medium (192×192) → Android PWA homescreen
 *  - large (512×512) → Android splash screen + app drawer
 * URL: /icon/small, /icon/medium, /icon/large
 *
 * Wave 575: '대' 텍스트 favicon → 자현 ChatGPT 생성 PNG (손바닥 + 어르신 + 하트).
 *   build 시점에 public/logo.png를 base64로 read → ImageResponse <img> render.
 */
export const contentType = 'image/png';

const SIZES = {
  small: { width: 64, height: 64 },
  medium: { width: 192, height: 192 },
  large: { width: 512, height: 512 },
} as const;

type IconId = keyof typeof SIZES;

export function generateImageMetadata() {
  return [
    { id: 'small' as const, size: SIZES.small, contentType },
    { id: 'medium' as const, size: SIZES.medium, contentType },
    { id: 'large' as const, size: SIZES.large, contentType },
  ];
}

// build 시점에 한 번 read (각 size 호출마다 반복 X)
const LOGO_DATA_URL = (() => {
  try {
    const buf = readFileSync(join(process.cwd(), 'public', 'logo.png'));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return '';
  }
})();

export default function Icon({ id }: { id: IconId }) {
  const { width, height } = SIZES[id];
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
        }}
      >
        {LOGO_DATA_URL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_DATA_URL}
            alt=""
            width={width}
            height={height}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div style={{ fontSize: width * 0.55, fontWeight: 800, color: '#1E40AF' }}>대</div>
        )}
      </div>
    ),
    { ...SIZES[id] },
  );
}
