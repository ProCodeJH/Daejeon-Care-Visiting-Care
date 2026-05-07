'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, FileText, Calculator, Users } from 'lucide-react';

const ACTIONS = [
  {
    href: '/contact',
    icon: Phone,
    label: '무료 상담',
    sub: '평일 09-18시',
    accent: 'sage' as const,
  },
  {
    href: '/grade',
    icon: FileText,
    label: '등급 신청 도움',
    sub: '공단 동행',
    accent: 'terra' as const,
  },
  {
    href: '/cost',
    icon: Calculator,
    label: '비용 시뮬',
    sub: '본인부담률 즉시',
    accent: 'warm' as const,
  },
  {
    href: '/managers',
    icon: Users,
    label: '매니저 매칭',
    sub: '90+ 자격 매니저',
    accent: 'sage' as const,
  },
];

const ACCENT_BG = {
  sage: 'bg-sage-50 hover:bg-sage-200/60 text-sage-700',
  terra: 'bg-terra-50 hover:bg-terra-200/60 text-terra-700',
  warm: 'bg-warm-50 hover:bg-warm-200/60 text-warm-700',
};

/**
 * UPMC Quick Actions 4-strip 패턴.
 * 사용자 의도 분기 방지 — 4개 핵심 액션 즉시.
 */
export function QuickActionsStrip() {
  return (
    <section className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={a.href}
                className={`block ${ACCENT_BG[a.accent]} px-4 py-5 rounded-2xl transition-colors text-center group`}
              >
                <Icon size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-sm md:text-base">{a.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{a.sub}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
