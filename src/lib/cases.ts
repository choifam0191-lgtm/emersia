import fs from "fs";
import path from "path";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";

export type CaseDetail = {
  overview: string;
  problem: string;
  installConfig: string;
  operation: string;
  outcome: string;
};

export type Case = {
  slug: string;
  tags: string[];
  siteType: string;
  title: string;
  purpose: string;
  setup: string;
  features: string;
  effect: string;
  mainImage: string;
  gallery: string[];
  detail: CaseDetail;
};

export const getAllCases = cache((): Case[] => {
  noStore();
  const filePath = path.join(process.cwd(), "src", "data", "cases.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return (JSON.parse(raw) as { cases: Case[] }).cases;
});

export function getCaseBySlug(slug: string): Case | undefined {
  return getAllCases().find((c) => c.slug === slug);
}
