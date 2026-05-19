"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation } from "lucide-react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface Props {
  address: string;
  title: string;
}

export function KakaoMap({ address, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const [coords, setCoords] = useState<{ lat: string; lng: string } | null>(null);

  useEffect(() => {
    if (!apiKey || !containerRef.current) return;

    function initMap() {
      if (!containerRef.current) return;
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        address,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any, status: any) => {
          if (status !== window.kakao.maps.services.Status.OK) {
            console.warn("[KakaoMap] 주소 변환 실패:", address);
            return;
          }
          const lat = result[0].y;
          const lng = result[0].x;
          setCoords({ lat, lng });

          const position = new window.kakao.maps.LatLng(lat, lng);
          const map = new window.kakao.maps.Map(containerRef.current, {
            center: position,
            level: 1,
          });
          const marker = new window.kakao.maps.Marker({ map, position });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:8px 16px;text-align:center;font-size:14px;font-weight:600;white-space:nowrap;">${title}</div>`,
          });
          infowindow.open(map, marker);
          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
        }
      );
    }

    if (window.kakao?.maps) {
      initMap();
      return;
    }

    if (document.getElementById("kakao-map-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.onload = () => window.kakao.maps.load(initMap);
    script.onerror = () => console.error("[KakaoMap] 스크립트 로드 실패. API 키와 허용 도메인을 확인하세요.");
    document.head.appendChild(script);
  }, [apiKey, address, title]);

  const directionsUrl = coords
    ? `https://map.kakao.com/link/to/${encodeURIComponent(title)},${coords.lat},${coords.lng}`
    : `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

  if (!apiKey) {
    return (
      <div className="mt-4 flex h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-500">지도 준비중</p>
          <p className="mt-1 text-xs text-slate-400">NEXT_PUBLIC_KAKAO_MAP_KEY 설정 필요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div
        ref={containerRef}
        className="h-[400px] w-full overflow-hidden rounded-2xl border border-slate-200/60"
      />
      <div className="mt-2 flex justify-end">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#FEE500] px-4 py-2.5 text-sm font-semibold text-[#3A1D1D] shadow-sm transition hover:brightness-95"
        >
          <Navigation className="h-4 w-4" />
          길찾기
        </a>
      </div>
    </div>
  );
}
