import type { Config } from 'tailwindcss';

/**
 * 두손누리 분석 + daejeon-care brand:
 * - 따뜻한 베이지/페이퍼 베이스 (canvas: #FAF7F2)
 * - sage green (강조 1차) / terra orange (강조 2차) / warm beige
 * - 한국어 sans-serif 우선 (Pretendard)
 */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          canvas: '#FAF7F2',
          paper: '#F4EFE6',
          vellum: '#EBE3D4',
          night: '#1A1814',
        },
        ink_legacy: {
          primary: '#2A2520',
          secondary: '#5C544A',
          muted: '#9A9085',
          inverse: '#FAF7F2',
        },
        // 두손누리 진짜 시그니처 그린 #61b05a (Playwright 추출)
        brand: {
          50: '#EBF5E9',
          100: '#D1E8CD',
          200: '#A3D199',
          300: '#7ABE6F',
          400: '#61B05A', // primary
          500: '#4F9D48',
          600: '#3F8439',
          700: '#34692F',
          800: '#264E22',
          900: '#1A3618',
        },
        sage: {
          50: '#EBF5E9',
          200: '#A3D199',
          500: '#61B05A', // 두손누리 매칭
          700: '#34692F',
          900: '#1A3618',
        },
        ink: {
          primary: '#212121', // rgb(33, 33, 33) - 두손누리 텍스트
          secondary: '#444444', // rgb(68, 68, 68)
          muted: '#757575', // rgb(117, 117, 117)
          inverse: '#FFFFFF',
          deepest: '#2B2B2B', // 두손누리 dark BG rgb(43, 43, 43)
          black: '#000000',
        },
        terra: {
          50: '#FBF1EB',
          200: '#EFD3BF',
          500: '#C97B4F',
          700: '#9A5837',
          900: '#5A3220',
        },
        warm: {
          50: '#FCF6E8',
          200: '#F2D9A8',
          500: '#D4A65F',
          700: '#9C7838',
          900: '#5C461F',
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
