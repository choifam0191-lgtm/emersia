import { LogoutButton } from "@/components/admin/LogoutButton";
import { FileText, Building2, Images, HelpCircle, Mail, BookOpen } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "홈 문구",
    description: "Hero, 문제점, 솔루션, 적용현장, 도입절차 문구 수정",
    icon: FileText,
    href: "/admin/content/home",
    status: "준비 중",
  },
  {
    title: "회사소개 문구",
    description: "회사 소개 텍스트 및 연락처 수정",
    icon: Building2,
    href: "/admin/content/company",
    status: "준비 중",
  },
  {
    title: "설치사례 관리",
    description: "사례 추가·수정·삭제, 사진 업로드",
    icon: Images,
    href: "/admin/cases",
    status: "준비 중",
  },
  {
    title: "자료실 관리",
    description: "카탈로그, 제안서, FAQ 카드 수정",
    icon: BookOpen,
    href: "/admin/content/resources",
    status: "준비 중",
  },
  {
    title: "FAQ 관리",
    description: "자주 묻는 질문 추가·수정·삭제",
    icon: HelpCircle,
    href: "/admin/content/faq",
    status: "준비 중",
  },
  {
    title: "문의 수신 현황",
    description: "폼 문의 내역 확인 (메일 연동)",
    icon: Mail,
    href: "/admin/inquiries",
    status: "준비 중",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 헤더 */}
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

      {/* 본문 */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-6 text-sm text-slate-500">
          관리할 항목을 선택하세요. 각 항목은 저장 즉시 사이트에 반영됩니다.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.href}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="mt-1 text-sm text-slate-500">{s.description}</p>
                <span className="mt-3 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                  {s.status}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm font-semibold text-blue-800">운영 안내</p>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• 문구 수정 기능은 다음 단계에서 순차적으로 활성화됩니다.</li>
            <li>• 이 페이지 URL은 외부에 공유하지 마세요: <code className="font-mono">/admin</code></li>
            <li>• 세션은 8시간 후 자동 만료됩니다.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
