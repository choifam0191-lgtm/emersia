import fs from "fs";
import path from "path";
import { unstable_noStore } from "next/cache";

type Partner = { id: string; name: string; logo: string };

const PARTNERS_PATH = path.join(process.cwd(), "src", "data", "partners.json");

function readPartners(): Partner[] {
  try {
    return (JSON.parse(fs.readFileSync(PARTNERS_PATH, "utf-8")).partners as Partner[]) ?? [];
  } catch {
    return [];
  }
}

export function PartnerLogoSlider() {
  unstable_noStore();
  const partners = readPartners();

  if (partners.length === 0) {
    return (
      <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
        <p className="text-sm text-slate-400">등록된 협력사가 없습니다.</p>
      </div>
    );
  }

  // 무한 루프를 위해 2배 복제
  const doubled = [...partners, ...partners];
  // 로고 1개당 약 6초 (최소 15초)
  const duration = Math.max(15, partners.length * 6);

  return (
    <div className="relative overflow-hidden">
      {/* 좌우 페이드 마스크 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent" />

      <style>{`
        @keyframes slide-partners {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .partners-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: slide-partners ${duration}s linear infinite;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="partners-track">
        {doubled.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="mx-8 flex h-14 w-36 flex-shrink-0 items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.logo}
              alt={p.name}
              className="max-h-12 max-w-[136px] object-contain"
              width={136}
              height={48}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
