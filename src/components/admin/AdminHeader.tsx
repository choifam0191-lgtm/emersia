import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function AdminHeader({
  title,
  backHref = "/admin/dashboard",
}: {
  title: string;
  backHref?: string;
}) {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              영우테크 관리자
            </p>
            <h1 className="text-lg font-extrabold text-slate-900">{title}</h1>
          </div>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
