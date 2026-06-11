'use client';

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  Camera,
  ClipboardCopy,
  FileText,
  Image as ImageIcon,
  LockKeyhole,
  Megaphone,
  MessageSquareQuote,
  Save,
  Trash2,
  Upload,
  type LucideIcon,
} from 'lucide-react';
import {
  fetchAdminContent,
  makeAdminId,
  removeAdminRecord,
  saveAdminNotice,
  saveAdminReview,
  saveAdminStory,
  STORY_CATEGORIES,
  todayISO,
  type AdminNotice,
  type AdminReview,
  type AdminStory,
} from '@/lib/admin-content';
import { CONTACT } from '@/lib/contact';

type Tab = 'review' | 'story' | 'notice';

const STORY_FORM_CATEGORIES = STORY_CATEGORIES.filter((category) => category !== '전체');

const emptyReview = () => ({
  author: '보호자 OOO 님',
  tag: '방문요양',
  rating: 5,
  date: todayISO().slice(0, 7).replace('-', '.'),
  text: '',
  image: '',
});

const emptyStory = () => ({
  title: '',
  excerpt: '',
  body: '',
  cat: `${CONTACT.brand} 이야기`,
  date: todayISO(),
  thumbnail: '',
});

const emptyNotice = () => ({
  title: '',
  body: '',
  author: '센터장',
  date: todayISO(),
  pinned: true,
});

async function readImage(file: File) {
  if (file.size > 2_500_000) {
    throw new Error('2.5MB 이하 이미지만 업로드할 수 있습니다.');
  }

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('이미지를 읽지 못했습니다.'));
    reader.readAsDataURL(file);
  });
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-xs font-bold tracking-[0.12em] text-slate-500">
      {children}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-slate-200 bg-white px-4 py-3 text-sm text-ink-primary outline-none transition focus:border-brand-500 ${props.className ?? ''}`}
      style={{ borderRadius: '4px' }}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-32 w-full resize-y border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-ink-primary outline-none transition focus:border-brand-500 ${props.className ?? ''}`}
      style={{ borderRadius: '4px' }}
    />
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-slate-200 bg-white px-4 py-3 text-sm text-ink-primary outline-none transition focus:border-brand-500 ${props.className ?? ''}`}
      style={{ borderRadius: '4px' }}
    />
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('review');
  const [adminToken, setAdminToken] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [review, setReview] = useState(emptyReview);
  const [story, setStory] = useState(emptyStory);
  const [notice, setNotice] = useState(emptyNotice);
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [stories, setStories] = useState<AdminStory[]>([]);
  const [notices, setNotices] = useState<AdminNotice[]>([]);
  const [status, setStatus] = useState('');

  const allCount = reviews.length + stories.length + notices.length;

  const backupPayload = useMemo(
    () =>
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          reviews,
          stories,
          notices,
        },
        null,
        2,
      ),
    [notices, reviews, stories],
  );

  function applySnapshot(snapshot: {
    reviews: AdminReview[];
    stories: AdminStory[];
    notices: AdminNotice[];
  }) {
    setReviews(snapshot.reviews);
    setStories(snapshot.stories);
    setNotices(snapshot.notices);
  }

  async function refresh() {
    applySnapshot(await fetchAdminContent());
  }

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem('daejeoncare.admin.token');
    if (savedToken) {
      setAdminToken(savedToken);
      setPasswordInput(savedToken);
      setAuthenticated(true);
    }
    void refresh();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = passwordInput.trim();
    if (!token) {
      setStatus('관리자 비밀번호를 입력하세요.');
      return;
    }
    try {
      const response = await fetch('/api/admin-content?admin=check', {
        headers: { 'x-admin-token': token },
        cache: 'no-store',
      });
      if (response.status === 401) {
        setStatus('관리자 비밀번호가 올바르지 않습니다.');
        return;
      }
      if (!response.ok) {
        setStatus('관리자 인증을 확인하지 못했습니다.');
        return;
      }
    } catch {
      setStatus('관리자 인증을 확인하지 못했습니다.');
      return;
    }
    window.sessionStorage.setItem('daejeoncare.admin.token', token);
    setAdminToken(token);
    setAuthenticated(true);
    setStatus('관리자 모드로 전환되었습니다.');
  }

  function handleLogout() {
    window.sessionStorage.removeItem('daejeoncare.admin.token');
    setAdminToken('');
    setPasswordInput('');
    setAuthenticated(false);
    setStatus('관리자 모드를 종료했습니다.');
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'review' | 'story',
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const image = await readImage(file);
      if (field === 'review') setReview((value) => ({ ...value, image }));
      if (field === 'story') setStory((value) => ({ ...value, thumbnail: image }));
      setStatus('이미지가 업로드되었습니다.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.');
    }
  }

  async function saveReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = new Date().toISOString();
    if (!authenticated) {
      setStatus('관리자 로그인 후 저장할 수 있습니다.');
      return;
    }
    try {
      const snapshot = await saveAdminReview({
        id: makeAdminId('review'),
        author: review.author.trim(),
        tag: review.tag.trim(),
        rating: review.rating,
        date: review.date.trim(),
        text: review.text.trim(),
        image: review.image || undefined,
        createdAt: now,
        updatedAt: now,
      }, adminToken);
      setReview(emptyReview());
      applySnapshot(snapshot);
      setStatus('고객의 목소리가 저장되었습니다.');
    } catch {
      setStatus('관리자 비밀번호가 올바르지 않습니다.');
    }
  }

  async function saveStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = new Date().toISOString();
    if (!authenticated) {
      setStatus('관리자 로그인 후 저장할 수 있습니다.');
      return;
    }
    try {
      const snapshot = await saveAdminStory({
        id: makeAdminId('story'),
        source: 'admin',
        title: story.title.trim(),
        excerpt: story.excerpt.trim(),
        body: story.body.trim(),
        cat: story.cat,
        date: story.date,
        isNotice: story.cat === '공지',
        thumbnail: story.thumbnail || undefined,
        createdAt: now,
        updatedAt: now,
      }, adminToken);
      setStory(emptyStory());
      applySnapshot(snapshot);
      setStatus('대전케어 이야기가 저장되었습니다.');
    } catch {
      setStatus('관리자 비밀번호가 올바르지 않습니다.');
    }
  }

  async function saveNotice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const now = new Date().toISOString();
    if (!authenticated) {
      setStatus('관리자 로그인 후 저장할 수 있습니다.');
      return;
    }
    try {
      const snapshot = await saveAdminNotice({
        id: makeAdminId('notice'),
        source: 'admin',
        title: notice.title.trim(),
        body: notice.body.trim(),
        author: notice.author.trim(),
        date: notice.date,
        views: 0,
        pinned: notice.pinned,
        createdAt: now,
        updatedAt: now,
      }, adminToken);
      setNotice(emptyNotice());
      applySnapshot(snapshot);
      setStatus('공지사항이 저장되었습니다.');
    } catch {
      setStatus('관리자 비밀번호가 올바르지 않습니다.');
    }
  }

  async function copyBackup() {
    try {
      await navigator.clipboard.writeText(backupPayload);
      setStatus('백업 JSON을 복사했습니다.');
    } catch {
      setStatus('브라우저가 복사를 허용하지 않았습니다.');
    }
  }

  async function removeRecord(kind: 'reviews' | 'stories' | 'notices', id: string) {
    if (!authenticated) {
      setStatus('관리자 로그인 후 삭제할 수 있습니다.');
      return;
    }
    try {
      applySnapshot(await removeAdminRecord(kind, id, adminToken));
      setStatus('게시물이 삭제되었습니다.');
    } catch {
      setStatus('관리자 비밀번호가 올바르지 않습니다.');
    }
  }

  const tabs: Array<{ id: Tab; label: string; Icon: LucideIcon; count: number }> = [
    { id: 'review', label: '고객 후기', Icon: MessageSquareQuote, count: reviews.length },
    { id: 'story', label: '이야기', Icon: FileText, count: stories.length },
    { id: 'notice', label: '공지', Icon: Megaphone, count: notices.length },
  ];

  return (
    <main className="min-h-screen bg-[#F6F8FB]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-10">
          <p lang="en" className="mb-3 text-xs font-bold tracking-[0.22em] text-brand-600">
            ADMIN DESK
          </p>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.01em] text-ink-primary md:text-5xl">
                {CONTACT.brand} 콘텐츠 관리
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary md:text-base">
                센터장이 후기, 현장 이야기, 공지사항을 작성하고 사진을 올리는 관리 화면입니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {authenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#E63946] hover:text-[#E63946]"
                  style={{ borderRadius: '4px' }}
                >
                  로그아웃
                </button>
              )}
              {authenticated && (
                <button
                  type="button"
                  onClick={copyBackup}
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-brand-500 hover:text-brand-700"
                  style={{ borderRadius: '4px' }}
                >
                  <ClipboardCopy size={16} />
                  백업 복사
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-8">
        {!authenticated && (
          <form
            onSubmit={handleLogin}
            className="mb-6 grid gap-3 border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]"
          >
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-xs font-bold tracking-[0.12em] text-slate-500">
                ADMIN PASSWORD
              </label>
              <input
                id="admin-password"
                type="password"
                value={passwordInput}
                onChange={(event) => setPasswordInput(event.target.value)}
                placeholder="관리자 비밀번호"
                className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-ink-primary outline-none transition focus:border-brand-500"
                style={{ borderRadius: '4px' }}
              />
            </div>
            <button
              type="submit"
              className="self-end bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
              style={{ borderRadius: '4px' }}
            >
              관리자 로그인
            </button>
          </form>
        )}

        {status && (
          <div className="mb-5 border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-800" role="status">
            {status}
          </div>
        )}

        {authenticated ? (
          <>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="관리 메뉴">
            {tabs.map(({ id, label, Icon, count }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold transition ${
                  tab === id
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-700'
                }`}
                style={{ borderRadius: '4px' }}
              >
                <Icon size={16} />
                {label}
                <span className={tab === id ? 'text-brand-200' : 'text-slate-400'}>{count}</span>
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-500">관리자 작성 콘텐츠 {allCount}건</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            {tab === 'review' && (
              <form onSubmit={saveReview} className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <MessageSquareQuote className="text-brand-600" size={22} />
                  <div>
                    <h2 className="text-xl font-extrabold text-ink-primary">고객의 목소리 작성</h2>
                    <p className="text-sm text-slate-500">홈 화면 REVIEWS 영역에 바로 반영됩니다.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel htmlFor="review-author">작성자</FieldLabel>
                    <TextInput
                      id="review-author"
                      value={review.author}
                      onChange={(event) => setReview((value) => ({ ...value, author: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="review-tag">서비스 태그</FieldLabel>
                    <TextInput
                      id="review-tag"
                      value={review.tag}
                      onChange={(event) => setReview((value) => ({ ...value, tag: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="review-date">작성 월</FieldLabel>
                    <TextInput
                      id="review-date"
                      value={review.date}
                      placeholder="2026.06"
                      onChange={(event) => setReview((value) => ({ ...value, date: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="review-rating">평점 {review.rating}</FieldLabel>
                    <input
                      id="review-rating"
                      type="range"
                      min={1}
                      max={5}
                      value={review.rating}
                      onChange={(event) => setReview((value) => ({ ...value, rating: Number(event.target.value) }))}
                      className="h-12 w-full accent-brand-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="review-text">후기 내용</FieldLabel>
                  <TextArea
                    id="review-text"
                    value={review.text}
                    onChange={(event) => setReview((value) => ({ ...value, text: event.target.value }))}
                    placeholder="상담, 방문, 매니저 매칭 경험을 구체적으로 작성하세요."
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-[220px,1fr]">
                  <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-slate-300 bg-slate-50 text-center text-sm font-bold text-slate-600 transition hover:border-brand-500 hover:text-brand-700">
                    <Upload size={22} />
                    사진 업로드
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => handleImageUpload(event, 'review')}
                    />
                  </label>
                  <div className="overflow-hidden border border-slate-200 bg-slate-50">
                    {review.image ? (
                      <img src={review.image} alt="" className="h-36 w-full object-cover" />
                    ) : (
                      <div className="grid h-36 place-items-center text-slate-400">
                        <Camera size={28} />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
                  style={{ borderRadius: '4px' }}
                >
                  <Save size={16} />
                  후기 저장
                </button>
              </form>
            )}

            {tab === 'story' && (
              <form onSubmit={saveStory} className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <FileText className="text-brand-600" size={22} />
                  <div>
                    <h2 className="text-xl font-extrabold text-ink-primary">이야기 작성</h2>
                    <p className="text-sm text-slate-500">대전케어 이야기, 일상, 현장 이야기, 공지 카테고리를 생성합니다.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel htmlFor="story-title">제목</FieldLabel>
                    <TextInput
                      id="story-title"
                      value={story.title}
                      onChange={(event) => setStory((value) => ({ ...value, title: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="story-cat">카테고리</FieldLabel>
                    <SelectInput
                      id="story-cat"
                      value={story.cat}
                      onChange={(event) => setStory((value) => ({ ...value, cat: event.target.value }))}
                    >
                      {STORY_FORM_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="story-date">작성일</FieldLabel>
                    <TextInput
                      id="story-date"
                      type="date"
                      value={story.date}
                      onChange={(event) => setStory((value) => ({ ...value, date: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="story-excerpt">요약</FieldLabel>
                    <TextInput
                      id="story-excerpt"
                      value={story.excerpt}
                      onChange={(event) => setStory((value) => ({ ...value, excerpt: event.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FieldLabel htmlFor="story-body">본문</FieldLabel>
                  <TextArea
                    id="story-body"
                    value={story.body}
                    onChange={(event) => setStory((value) => ({ ...value, body: event.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-[220px,1fr]">
                  <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-slate-300 bg-slate-50 text-center text-sm font-bold text-slate-600 transition hover:border-brand-500 hover:text-brand-700">
                    <Upload size={22} />
                    대표 사진 업로드
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) => handleImageUpload(event, 'story')}
                    />
                  </label>
                  <div className="overflow-hidden border border-slate-200 bg-slate-50">
                    {story.thumbnail ? (
                      <img src={story.thumbnail} alt="" className="h-40 w-full object-cover" />
                    ) : (
                      <div className="grid h-40 place-items-center text-slate-400">
                        <ImageIcon size={30} />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
                  style={{ borderRadius: '4px' }}
                >
                  <Save size={16} />
                  이야기 저장
                </button>
              </form>
            )}

            {tab === 'notice' && (
              <form onSubmit={saveNotice} className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <Megaphone className="text-brand-600" size={22} />
                  <div>
                    <h2 className="text-xl font-extrabold text-ink-primary">공지사항 작성</h2>
                    <p className="text-sm text-slate-500">공지사항 목록과 상세 페이지에 반영됩니다.</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <FieldLabel htmlFor="notice-title">제목</FieldLabel>
                    <TextInput
                      id="notice-title"
                      value={notice.title}
                      onChange={(event) => setNotice((value) => ({ ...value, title: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="notice-author">작성자</FieldLabel>
                    <TextInput
                      id="notice-author"
                      value={notice.author}
                      onChange={(event) => setNotice((value) => ({ ...value, author: event.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel htmlFor="notice-date">작성일</FieldLabel>
                    <TextInput
                      id="notice-date"
                      type="date"
                      value={notice.date}
                      onChange={(event) => setNotice((value) => ({ ...value, date: event.target.value }))}
                      required
                    />
                  </div>
                </div>
                <label className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={notice.pinned}
                    onChange={(event) => setNotice((value) => ({ ...value, pinned: event.target.checked }))}
                    className="h-4 w-4 accent-brand-600"
                  />
                  상단 공지로 표시
                </label>
                <div className="space-y-2">
                  <FieldLabel htmlFor="notice-body">본문</FieldLabel>
                  <TextArea
                    id="notice-body"
                    value={notice.body}
                    onChange={(event) => setNotice((value) => ({ ...value, body: event.target.value }))}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
                  style={{ borderRadius: '4px' }}
                >
                  <Save size={16} />
                  공지 저장
                </button>
              </form>
            )}
          </div>

          <aside className="border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-extrabold tracking-[0.12em] text-slate-500">RECENT CONTENT</h2>
            <div className="space-y-3">
              {reviews.slice(0, 3).map((item) => (
                <div key={item.id} className="border border-slate-100 p-3">
                  <div className="flex items-start gap-3">
                    {item.image ? (
                      <img src={item.image} alt="" className="h-12 w-12 object-cover" />
                    ) : (
                      <div className="grid h-12 w-12 place-items-center bg-slate-100 text-slate-400">
                        <MessageSquareQuote size={18} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-bold text-ink-primary">{item.author}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">{item.text}</p>
                    </div>
                    <button type="button" onClick={() => removeRecord('reviews', item.id)} aria-label="후기 삭제" className="text-slate-400 hover:text-[#E63946]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {stories.slice(0, 3).map((item) => (
                <div key={item.id} className="border border-slate-100 p-3">
                  <div className="flex items-start gap-3">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt="" className="h-12 w-12 object-cover" />
                    ) : (
                      <div className="grid h-12 w-12 place-items-center bg-slate-100 text-slate-400">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-bold text-ink-primary">{item.title}</p>
                      <p className="text-xs text-brand-700">{item.cat}</p>
                    </div>
                    <button type="button" onClick={() => removeRecord('stories', item.id)} aria-label="이야기 삭제" className="text-slate-400 hover:text-[#E63946]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {notices.slice(0, 3).map((item) => (
                <div key={item.id} className="border border-slate-100 p-3">
                  <div className="flex items-start gap-3">
                    <div className="grid h-12 w-12 place-items-center bg-slate-100 text-slate-400">
                      <Megaphone size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-bold text-ink-primary">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                    <button type="button" onClick={() => removeRecord('notices', item.id)} aria-label="공지 삭제" className="text-slate-400 hover:text-[#E63946]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {allCount === 0 && (
                <div className="grid min-h-40 place-items-center border border-dashed border-slate-200 text-center text-sm text-slate-500">
                  아직 관리자 작성 콘텐츠가 없습니다.
                </div>
              )}
            </div>
          </aside>
        </div>
          </>
        ) : (
          <div className="grid min-h-72 place-items-center border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <div>
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center bg-slate-950 text-white" style={{ borderRadius: '4px' }}>
                <LockKeyhole size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-ink-primary">관리자 로그인 필요</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                콘텐츠 작성, 사진 업로드, 백업 복사는 관리자 인증 후 사용할 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
