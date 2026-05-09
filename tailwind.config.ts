import type { Config } from 'tailwindcss';

/**
 * 두손누리 분석 + daejeon-care brand:
 * - 따뜻한 베이지/페이퍼 베이스 (canvas: #FAF7F2)
 * - sage green (강조 1차) / terra orange (강조 2차) / warm beige
 * - 한국어 sans-serif 우선 (Pretendard)
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  // Wave 456: darkMode 'class' 명시 — 이 사이트는 light only (globals.css colorScheme: 'only light').
  // default 'media'는 prefers-color-scheme: dark 시 dark variant 자동 활성 → light-only 의도 위반.
  // 'class'로 변경하면 .dark class 명시 시에만 dark variant 활성 (이 사이트는 사용 안 함 = 안전).
  darkMode: 'class',
  future: {
    // Wave 289: hover: modifier에 자동 @media (hover: hover) wrap.
    // mobile 터치 디바이스 hover ghost (탭 후 hover state 잔존) 회피.
    // senior care 가족 모바일 use case 핵심 — Wave 208 mobile audit paradigm 확장.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        surface: {
          canvas: '#FAF7F2',
          paper: '#F4EFE6',
          vellum: '#EBE3D4',
          night: '#1A1814',
        },
        // 대전케어 UI 블루 (의료 신뢰). 자현 정체성 그린 #1E40AF / 코랄 #E63946 / 노랑 #F5A623는 inline style로 직접 사용.
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA', // primary
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        ink: {
          primary: '#212121',
          secondary: '#444444',
          muted: '#757575',
          inverse: '#FFFFFF',
          deepest: '#2B2B2B',
          black: '#000000',
        },
      },
      fontFamily: {
        // 두손누리 폰트 stack (Playwright 추출): KoPubDotum primary + Apple SD Gothic Neo + Malgun Gothic
        sans: [
          'Pretendard', // CDN-loaded
          '"Apple SD Gothic Neo"',
          '"Malgun Gothic"',
          '"Nanum Gothic"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
        latin: [
          'Montserrat', // 두손누리 영문 폰트
          'Pretendard',
          'sans-serif',
        ],
        serif: ['"Noto Serif KR"', 'RIDIBatang', 'serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
