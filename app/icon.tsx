import { ImageResponse } from 'next/og';

/**
 * 동적 favicon + PWA icons (Wave 430).
 * Next.js 15 generateImageMetadata: 단일 파일에서 다중 사이즈 생성.
 *  - small (64×64)  → 브라우저 탭 favicon
 *  - medium (192×192) → Android PWA homescreen
 *  - large (512×512) → Android splash screen + app drawer
 * URL: /icon/small, /icon/medium, /icon/large
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

export default function Icon({ id }: { id: IconId }) {
  // 사이즈별 폰트 비율 — '대' 글자가 정사각 영역 ~56% 차지
  const fontSizeMap: Record<IconId, number> = {
    small: 36,
    medium: 110,
    large: 290,
  };

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
          fontSize: fontSizeMap[id],
          fontWeight: 800,
          letterSpacing: '-0.05em',
        }}
      >
        대
      </div>
    ),
    { ...SIZES[id] },
  );
}
