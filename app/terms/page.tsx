import { PageHero } from '@/components/PageHero';
import { CONTACT } from '@/lib/contact';

export const metadata = {
  title: '이용약관',
  description: `${CONTACT.name} 서비스 이용약관.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        bg="/page-hero/page-hero-5.png"
        title="이용약관"
        sub="대전케어 방문요양 서비스 이용약관"
        crumbs={[{ label: '이용약관' }]}
      />

      <article className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-5">
          {/* Wave 393: <time> semantic 시행일 */}
          <p className="text-sm text-ink-muted mb-10">
            시행일: <time dateTime="2026-05-08">2026년 5월 8일</time>
          </p>

          <Section title="제1조 (목적)">
            <p>본 약관은 대전케어 방문요양센터(이하 "센터")가 제공하는 방문요양/방문목욕/방문간호 서비스 이용에 관한 사항을 규정합니다.</p>
          </Section>

          <Section title="제2조 (정의)">
            <ul>
              <li><strong>이용자</strong>: 본 서비스를 이용하는 어르신 및 가족</li>
              <li><strong>요양보호사</strong>: 자격을 갖춘 매니저</li>
              <li><strong>서비스</strong>: 노인장기요양보험에 따른 재가복지 서비스</li>
            </ul>
          </Section>

          <Section title="제3조 (서비스 신청 및 계약)">
            <ul>
              <li>이용자는 등급판정 후 센터에 서비스 신청</li>
              <li>센터의 사회복지사가 사전 조사 및 상담</li>
              <li>서비스 제공 계약서 작성 후 서비스 시작</li>
            </ul>
          </Section>

          <Section title="제4조 (서비스 내용)">
            <ul>
              <li>방문요양: 신체활동/일상생활/개인활동/정서 지원</li>
              <li>방문목욕: 어르신 댁에서의 목욕 케어</li>
              <li>방문간호: 의료 케어가 일상 안으로</li>
              <li>장기요양 등급 신청 동행 서비스</li>
            </ul>
          </Section>

          <Section title="제5조 (이용 요금)">
            <ul>
              <li>국민건강보험공단 85% 지원, 본인부담 15% (일반 대상자)</li>
              <li>감경 대상자: 9% / 6%</li>
              <li>기초수급자: 0% (전액 면제)</li>
              <li>매월 25일 자동 청구</li>
            </ul>
          </Section>

          <Section title="제6조 (서비스 변경 및 해지)">
            <ul>
              <li>서비스 시간/내용 변경 = 사전 협의 후 새 계약서</li>
              <li>해지 = 7일 전 서면 통보</li>
              <li>긴급한 사정 시 즉시 협의</li>
            </ul>
          </Section>

          <Section title="제7조 (요양보호사 변경)">
            <p>어르신 또는 가족이 매니저 변경을 요청할 경우 즉시 새 매니저로 배정합니다. 어르신 마음에 드실 때까지 교체 가능합니다.</p>
          </Section>

          <Section title="제8조 (책임)">
            <ul>
              <li>센터는 서비스 제공 중 발생할 수 있는 사고에 대비해 보험에 가입</li>
              <li>고의 또는 중과실로 인한 손해는 손해배상</li>
              <li>천재지변 등 불가항력은 면책</li>
            </ul>
          </Section>

          <Section title="제9조 (분쟁 해결)">
            <p>본 약관과 관련된 분쟁은 대전지방법원을 관할 법원으로 합니다.</p>
          </Section>

          <Section title="제10조 (문의)">
            {/* Wave 393: <address> + tel:/mailto: 링크 (Wave 354 패턴 saturation pass) */}
            <address className="bg-brand-50 p-5 border-l-4 border-brand-600 not-italic not-prose">
              <strong>대전케어 방문요양센터</strong><br />
              연락처:{' '}
              <a href={CONTACT.phoneTel} className="font-bold hover:underline text-brand-600">
                {CONTACT.phone}
              </a>{' '}
              (24시간 상담)<br />
              이메일:{' '}
              <a href={CONTACT.emailMailto} className="hover:underline text-brand-600">
                {CONTACT.email}
              </a>
              <br />
              주소: {CONTACT.address}
            </address>
          </Section>

          {/* Wave 393: <small> semantic disclaimer */}
          <small className="block text-xs text-ink-muted mt-10 border-t border-gray-100 pt-6">
            <span aria-hidden="true">※</span> 본 약관은 표준 안이며 자현 비즈니스 운영에 맞춰 정확한 조건 검토 후 swap 부탁드립니다.
          </small>
        </div>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-ink-primary mb-4 mt-8">{title}</h2>
      <div className="text-ink-secondary leading-relaxed">{children}</div>
    </div>
  );
}
