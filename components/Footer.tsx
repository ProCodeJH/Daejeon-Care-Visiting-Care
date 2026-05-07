/**
 * 두손누리 Footer 1:1 — 주소 / TEL / 사업자정보 한 줄 layout.
 * 자현 정보는 placeholder (실제 정보로 swap).
 */
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Brand */}
          <div>
            <p className="font-bold text-lg text-ink-primary mb-1">대전케어 방문요양센터</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              대전광역시 [구] [동] [도로명주소], [건물명] [층호]
              <br />
              TEL. <span className="font-medium text-ink-secondary">042-XXX-XXXX</span>
              {' · '}
              FAX. <span className="font-medium text-ink-secondary">042-XXX-XXXX</span>
              <br />
              개인정보책임관리자: [대표자명]
              {' · '}
              이메일:{' '}
              <span className="font-medium text-ink-secondary">contact@daejeoncare.co.kr</span>
            </p>
          </div>

          {/* 사업자 정보 */}
          <div className="text-sm text-ink-muted text-left md:text-right space-y-1">
            <p>사업자등록번호: [번호]</p>
            <p>장기요양기관 지정번호: [번호]</p>
            <p>대표자: [대표자명]</p>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-ink-muted">
            COPYRIGHT © 대전케어 방문요양센터 ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-muted">
            <a href="/privacy" className="hover:text-brand-400">개인정보처리방침</a>
            <a href="/terms" className="hover:text-brand-400">이용약관</a>
            <a href="/sitemap" className="hover:text-brand-400">사이트맵</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
