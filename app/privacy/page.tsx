import { PageHero } from '@/components/PageHero';
import { CONTACT } from '@/lib/contact';

export const metadata = {
  title: '개인정보처리방침',
  description: '대전케어 방문요양센터 개인정보처리방침. 어르신과 가족의 개인정보를 안전하게 보호합니다.',
};

/**
 * 한국 개인정보보호법 (개인정보 보호법 제30조) 의무 항목 포함.
 * 자현이 실제 정보로 placeholder swap.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="개인정보처리방침"
        sub="어르신과 가족의 개인정보를 안전하게 보호합니다"
        crumbs={[{ label: '개인정보처리방침' }]}
      />

      <article className="bg-white py-16">
        <div className="max-w-[800px] mx-auto px-5 prose prose-lg">
          <p className="text-sm text-ink-muted mb-10">
            시행일: 2026년 5월 8일 · 최종 수정: {new Date().toLocaleDateString('ko-KR')}
          </p>

          <Section title="1. 개인정보의 처리 목적">
            <p>대전케어 방문요양센터는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul>
              <li>방문요양/방문목욕/방문간호 서비스 제공</li>
              <li>장기요양 등급 신청 동행 서비스</li>
              <li>본인부담금 산정 및 결제 처리</li>
              <li>서비스 상담 및 문의 응대</li>
              <li>요양보호사 채용 및 인사 관리</li>
            </ul>
          </Section>

          <Section title="2. 처리하는 개인정보 항목">
            <p>다음의 개인정보 항목을 수집·처리합니다:</p>
            <ul>
              <li><strong>필수</strong>: 성명, 생년월일, 연락처, 주소, 장기요양인정번호</li>
              <li><strong>선택</strong>: 이메일, 가족 연락처, 건강 정보 (서비스 제공 시)</li>
              <li><strong>채용 지원</strong>: 자격증 정보, 경력, 희망 근무지</li>
            </ul>
          </Section>

          <Section title="3. 개인정보의 보유 및 이용 기간">
            <p>법령에 따른 보존 기간:</p>
            <ul>
              <li>장기요양 서비스 기록: 5년 (노인장기요양보험법)</li>
              <li>의료 정보: 10년 (의료법)</li>
              <li>채용 지원자 정보: 1년 (개인정보보호법)</li>
              <li>서비스 종료 시 즉시 파기 (보존 기간 경과 후)</li>
            </ul>
          </Section>

          <Section title="4. 개인정보의 제3자 제공">
            <p>다음의 경우에 한해 개인정보를 제3자에게 제공합니다:</p>
            <ul>
              <li>국민건강보험공단 (장기요양보험 청구 목적, 법령 의무)</li>
              <li>요양보호사 (서비스 제공에 필요한 최소한의 정보)</li>
              <li>법령에 따른 제출 요청 시</li>
            </ul>
          </Section>

          <Section title="5. 정보주체의 권리">
            <p>정보주체는 다음의 권리를 행사할 수 있습니다:</p>
            <ul>
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
              <li>가명정보 처리에 대한 거부 요구</li>
            </ul>
            <p>권리 행사 = {CONTACT.phone} 또는 {CONTACT.email}로 연락 주세요.</p>
          </Section>

          <Section title="6. 개인정보 보호 책임자">
            <p className="bg-brand-50 p-5 border-l-4 border-brand-600 not-prose">
              <strong>개인정보 보호 책임자</strong>: {CONTACT.representative}<br />
              <strong>연락처</strong>: {CONTACT.phone}<br />
              <strong>이메일</strong>: {CONTACT.email}<br />
              <strong>주소</strong>: {CONTACT.address}
            </p>
          </Section>

          <Section title="7. 개인정보의 안전성 확보 조치">
            <ul>
              <li>관리적 조치: 개인정보 보호 책임자 지정, 직원 교육</li>
              <li>기술적 조치: 접근 통제, 암호화, 보안 프로그램 설치</li>
              <li>물리적 조치: 출입 통제, 잠금 보관</li>
            </ul>
          </Section>

          <Section title="8. 개인정보 처리방침 변경">
            <p>본 방침은 시행일로부터 적용되며, 법령 및 방침 변경 시 사이트 공지 후 변경합니다.</p>
          </Section>

          <p className="text-xs text-ink-muted mt-10 border-t border-gray-100 pt-6">
            ※ 본 방침은 자현 비즈니스 운영에 맞춰 [대표자명], 정확한 보유 기간, 위탁사 정보 등 자현이 직접 검토 후 swap 부탁드립니다. 법적 자문 권장.
          </p>
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
