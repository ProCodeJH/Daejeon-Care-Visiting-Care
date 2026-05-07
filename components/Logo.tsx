/**
 * 대전케어 방문요양센터 공식 로고 SVG.
 * 손바닥 cradle + 어르신 + 하트 = 따뜻한 케어.
 * 색: 녹색(손) + 노란주황(어르신) + 빨강(하트). 자현 정체성 자산.
 */
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
      {/* 로고 마크 */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="대전케어 로고"
        className="shrink-0"
      >
        {/* 손바닥 (cradle 곡선) */}
        <path
          d="M 12 55 Q 12 78 35 82 Q 50 84 65 82 Q 88 78 88 55 Q 88 50 85 50 Q 85 70 60 75 Q 50 76 40 75 Q 15 70 15 50 Q 12 50 12 55 Z"
          fill="#1B6F4A"
        />
        {/* 어르신 몸 */}
        <ellipse cx="50" cy="58" rx="14" ry="16" fill="#F5A623" />
        {/* 어르신 머리 */}
        <circle cx="50" cy="36" r="11" fill="#F5A623" />
        {/* 하트 */}
        <path
          d="M 64 22 Q 64 18 68 18 Q 72 18 72 22 Q 72 18 76 18 Q 80 18 80 22 Q 80 28 72 33 Q 64 28 64 22 Z"
          fill="#E63946"
        />
      </svg>

      {/* 텍스트 */}
      {withText && (
        <div className="leading-[1.05]">
          <p className="font-extrabold text-[15px] md:text-[17px] text-[#1B6F4A]">대전케어</p>
          <p className="font-extrabold text-[13px] md:text-[15px] text-[#E63946]">방문요양센터</p>
        </div>
      )}
    </div>
  );
}
