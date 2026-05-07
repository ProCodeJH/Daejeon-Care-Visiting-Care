/**
 * Section title block — 두손누리 패턴: "| EYEBROW" + 제목 + sub.
 * 모든 섹션 통일 사용.
 */
import type { ReactNode } from 'react';

export function SectionBlock({
  eyebrow,
  title,
  sub,
  align = 'center',
  className = '',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  children?: ReactNode;
}) {
  const al = align === 'center' ? 'text-center' : 'text-left';
  return (
    <div className={`${al} ${className}`}>
      {eyebrow && (
        <p className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3">
          | {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-4 leading-snug">
        {title}
      </h2>
      {sub && (
        <div className={`text-ink-secondary md:text-lg leading-relaxed ${al === 'text-center' ? 'max-w-3xl mx-auto' : ''}`}>
          {sub}
        </div>
      )}
      {children}
    </div>
  );
}
