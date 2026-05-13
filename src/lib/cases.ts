import casesData from "@/data/cases.json";

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

export function getAllCases(): Case[] {
  return casesData.cases as Case[];
}

export function getCaseBySlug(slug: string): Case | undefined {
  return (casesData.cases as Case[]).find((c) => c.slug === slug);
}
