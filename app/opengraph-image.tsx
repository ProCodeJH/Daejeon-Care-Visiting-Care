import { ImageResponse } from 'next/og';

/**
 * OpenGraph image — 카톡/페북/트위터 공유 시 미리보기 썸네일.
 * 정체성 색 + 한글 카피 + 24시간 + 대표번호.
 */
export const alt = '대전케어 방문요양센터 — 24시간 상담 042-369-0326';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAF8 60%, #EBF5E9 100%)',
          padding: '80px 90px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* 좌상단 24시간 배지 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#1B6F4A',
            color: 'white',
            padding: '10px 20px',
            fontSize: 26,
            fontWeight: 700,
            alignSelf: 'flex-start',
            borderRadius: 4,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              background: '#E63946',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            ♥
          </div>
          24시간 상담 가능
        </div>

        {/* 메인 카피 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 60,
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#1B6F4A',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            대전케어
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#E63946',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            방문요양센터
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#444444',
              marginTop: 18,
              letterSpacing: '-0.01em',
            }}
          >
            부모님의 손발이 되어드리겠습니다
          </div>
        </div>

        {/* 우하단 대표번호 */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            right: 90,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: '#E63946',
            color: 'white',
            padding: '18px 30px',
            fontSize: 38,
            fontWeight: 800,
            borderRadius: 4,
          }}
        >
          ☎ 042-369-0326
        </div>

        {/* 좌하단 도메인 */}
        <div
          style={{
            position: 'absolute',
            bottom: 95,
            left: 90,
            fontSize: 22,
            fontWeight: 500,
            color: '#757575',
          }}
        >
          대전케어방문요양.kr
        </div>
      </div>
    ),
    { ...size },
  );
}
