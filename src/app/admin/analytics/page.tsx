"use client";

import { useState, useEffect, useMemo } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Loader2, BarChart2, Download, Eye, Calendar, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";

// recharts는 SSR 불가 → 동적 import
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const AreaChart = dynamic(() => import("recharts").then((m) => m.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then((m) => m.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });

// ─── 타입 ──────────────────────────────────────────────────────────────────

type DayStat = { date: string; count: number };
type Analytics = {
  pageViews: Record<string, DayStat[]>;
  catalogDownloads: DayStat[];
};

const PAGE_LABELS: Record<string, string> = {
  "/": "홈",
  "/company": "회사소개",
  "/resources": "자료실",
  "/cases": "설치사례",
  "/contact": "문의",
};

// ─── 헬퍼 ──────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function datesBefore(days: number): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    set.add(d.toISOString().slice(0, 10));
  }
  return set;
}

function sumArr(arr: DayStat[], dateSet?: Set<string>): number {
  return arr.reduce(
    (acc, d) => acc + (dateSet ? (dateSet.has(d.date) ? d.count : 0) : d.count),
    0
  );
}

function todayCount(arr: DayStat[]): number {
  const t = todayStr();
  return arr.find((d) => d.date === t)?.count ?? 0;
}

function buildSeries(
  pageViews: Record<string, DayStat[]>,
  catalogDownloads: DayStat[],
  days: number
): { date: string; views: number; downloads: number }[] {
  const result: { date: string; views: number; downloads: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const label = `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
    const views = Object.values(pageViews).reduce((acc, arr) => {
      return acc + (arr.find((x) => x.date === date)?.count ?? 0);
    }, 0);
    const downloads = catalogDownloads.find((x) => x.date === date)?.count ?? 0;
    result.push({ date: label, views, downloads });
  }
  return result;
}

// ─── 요약 카드 ──────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  total,
  sub,
  subLabel,
  color,
}: {
  icon: React.ElementType;
  label: string;
  total: number;
  sub: number;
  subLabel: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-slate-900">{total.toLocaleString()}</p>
      <p className="mt-1 text-xs text-slate-400">
        {subLabel} <span className="font-semibold text-slate-600">{sub.toLocaleString()}</span>
      </p>
    </div>
  );
}

// ─── 메인 페이지 ────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [period, setPeriod] = useState<7 | 30 | 90>(30);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => setData(d));
  }, []);

  const stats = useMemo(() => {
    if (!data) return null;
    const periodSet = datesBefore(period);
    const weekSet = datesBefore(7);
    const monthSet = datesBefore(30);

    const allViews: DayStat[] = Object.values(data.pageViews).flat();
    return {
      totalViews: sumArr(allViews),
      todayViews: todayCount(allViews.reduce((acc, d) => {
        const ex = acc.find((x) => x.date === d.date);
        if (ex) ex.count += d.count;
        else acc.push({ ...d });
        return acc;
      }, [] as DayStat[])),
      totalDownloads: sumArr(data.catalogDownloads),
      todayDownloads: todayCount(data.catalogDownloads),
      weekViews: sumArr(allViews, weekSet),
      monthViews: sumArr(allViews, monthSet),
    };
  }, [data, period]);

  const series = useMemo(
    () => (data ? buildSeries(data.pageViews, data.catalogDownloads, period) : []),
    [data, period]
  );

  async function handleReset() {
    if (!confirm("통계 데이터를 모두 초기화할까요? 되돌릴 수 없습니다.")) return;
    setResetting(true);
    await fetch("/api/admin/analytics", { method: "DELETE" });
    const fresh = await fetch("/api/admin/analytics").then((r) => r.json());
    setData(fresh);
    setResetting(false);
  }

  if (!data || !stats) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader title="사이트 통계" />
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader title="사이트 통계" />
      <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">

        {/* 기간 필터 */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">통계 요약</h2>
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {([7, 30, 90] as const).map((d) => (
              <button
                key={d}
                onClick={() => setPeriod(d)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  period === d
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {d === 7 ? "최근 7일" : d === 30 ? "최근 30일" : "최근 90일"}
              </button>
            ))}
          </div>
        </div>

        {/* 요약 카드 4개 */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Eye}
            label="전체 페이지 조회수"
            total={stats.totalViews}
            sub={stats.todayViews}
            subLabel="오늘"
            color="bg-blue-500"
          />
          <StatCard
            icon={Download}
            label="카탈로그 다운로드"
            total={stats.totalDownloads}
            sub={stats.todayDownloads}
            subLabel="오늘"
            color="bg-emerald-500"
          />
          <StatCard
            icon={Calendar}
            label="이번 주 조회수"
            total={stats.weekViews}
            sub={stats.todayViews}
            subLabel="오늘"
            color="bg-violet-500"
          />
          <StatCard
            icon={BarChart2}
            label="이번 달 조회수"
            total={stats.monthViews}
            sub={stats.weekViews}
            subLabel="이번 주"
            color="bg-orange-500"
          />
        </div>

        {/* 페이지별 테이블 */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-bold text-slate-900">페이지별 조회수</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">페이지</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">누적</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">오늘</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500">이번 주</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500">이번 달</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PAGE_LABELS).map(([path, label]) => {
                const arr = data.pageViews[path] ?? [];
                return (
                  <tr key={path} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-700">
                      {label}
                      <span className="ml-1.5 font-mono text-xs text-slate-400">{path}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {sumArr(arr).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {todayCount(arr).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {sumArr(arr, datesBefore(7)).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-right text-slate-600">
                      {sumArr(arr, datesBefore(30)).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 차트 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 페이지 조회수 차트 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-slate-900">
              일별 페이지 조회수 <span className="font-normal text-slate-400">(최근 {period}일)</span>
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={series} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  interval={period === 7 ? 0 : period === 30 ? 4 : 13}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="조회수"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#viewsGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 카탈로그 다운로드 차트 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-slate-900">
              일별 카탈로그 다운로드 <span className="font-normal text-slate-400">(최근 {period}일)</span>
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={series} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  interval={period === 7 ? 0 : period === 30 ? 4 : 13}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  name="다운로드"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#dlGrad)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 데이터 초기화 */}
        <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-800">데이터 초기화</p>
              <p className="mt-0.5 text-xs text-red-600">
                모든 조회수·다운로드 통계가 삭제됩니다. 되돌릴 수 없습니다.
              </p>
            </div>
            <button
              onClick={handleReset}
              disabled={resetting}
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
            >
              {resetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              초기화
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
