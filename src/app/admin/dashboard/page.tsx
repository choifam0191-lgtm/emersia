import { LogoutButton } from "@/components/admin/LogoutButton";
import { FileText, Building2, Images, HelpCircle, Mail, BookOpen } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "홈 문구",
    description: "Hero, 문제점, 솔루션, 적용현장, 도입절차 문구 수정",
    icon: FileText,
    href: "/admin/content/home",
    active: true,
  },
  {
    title: "회사소개 / 연락처",
    description: "회사 소개 텍스트, 연락처(전화·이메일·카카오) 수정",
    icon: Building2,
    href: "/admin/content/company",
    active: true,
  },
  {
    title: "자료실 / CTA",
    description: "카탈로그·제안서 카드 및 공통 CTA 문구 수정",
    icon: BookOpen,
    href: "/admin/content/resources",
    active: true,
  },
  {
    title: "FAQ 관리",
    description: "자주 묻는 질문 추가·수정·삭제",
    icon: HelpCircle,
    href: "/admin/content/faq",
    active: true,
  },
  {
    title: "설치사례 사진 관리",
    description: "각 사례별 대표 이미지 및 갤러리 사진 업로드·삭제",
    icon: Images,
    href: "/admin/cases",
    active: true,
  },
  {
    title: "문의 수신 현황",
    description: "폼 문의 내역 확인 (메일 연동)",
    icon: Mail,
    href: "/admin/inquiries",
    active: false,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              영우테크
            </p>
            <h1 className="text-lg font-extrabold text-slate-900">관리자 대시보드</h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-6 text-sm text-slate-500">
          관리할 항목을 선택하세요. 저장 즉시 사이트에 반영됩니다.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon;
            const card = (
              <div
                className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                  s.active
                    ? "border-slate-200 hover:border-blue-200 hover:shadow-md"
                    : "border-slate-100 opacity-60"
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                    s.active ? "bg-blue-50" : "bg-slate-100"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${s.active ? "text-blue-600" : "text-slate-400"}`} />
                </div>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                <span
                  className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    s.active
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {s.active ? "편집" : "준비 중"}
                </span>
              </div>
            );

            return s.active ? (
              <Link key={s.href} href={s.href}>
                {card}
              </Link>
            ) : (
              <div key={s.href}>{card}</div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-800">운영 안내</p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• 이 페이지 URL은 외부에 공유하지 마세요: <code className="font-mono">/admin</code></li>
            <li>• 세션은 8시간 후 자동 만료됩니다.</li>
            <li>• 문구 저장 후 브라우저에서 새로고침하면 반영된 내용을 확인할 수 있습니다.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
