"use client";

import { useEffect } from "react";

export function PageViewTracker({ pagePath }: { pagePath: string }) {
  useEffect(() => {
    const key = `pv:${pagePath}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pagePath }),
    }).catch(() => {});
  }, [pagePath]);

  return null;
}
