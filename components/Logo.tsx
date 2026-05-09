/**
 * 대전케어 방문요양센터 공식 로고.
 * 손바닥 cradle + 어르신 + 하트 = 따뜻한 케어.
 * 색: 녹색(손) + 주황(어르신) + 코랄(하트). 자현 정체성 자산.
 *
 * Wave 575: SVG hand-crafted → 자현 ChatGPT 생성 PNG로 교체.
 *   원본: public/logo.png (배경 투명 PNG, 정사각 비례)
 *   Header LCP critical → priority + width/height 명시.
 *
 * Wave 537: aria-label + 로고 텍스트 brand → CONTACT.brand/service derived.
 */
import Image from 'next/image';
import { CONTACT } from '@/lib/contact';

export function Logo({
  size = 40,
  withText = true,
  className = '',
}: {
  size?: number;
  withText?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 로고 마크 — 텍스트 동반 시 alt 빈 문자열 (decorative, SR 중복 회피),
       * 아이콘 only 시 alt에 brand name (의미 전달). */}
      <Image
        src="/logo.png"
        width={size}
        height={size}
        alt={withText ? '' : `${CONTACT.name} 로고`}
        priority
        className="shrink-0 select-none"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />

      {/* 텍스트 */}
      {withText && (
        <div className="leading-[1.05]">
          <p className="font-extrabold text-[15px] md:text-[17px] text-[#1B6F4A]">{CONTACT.brand}</p>
          <p className="font-extrabold text-[13px] md:text-[15px] text-[#E63946]">{CONTACT.service}</p>
        </div>
      )}
    </div>
  );
}
