import fs from "fs";
import path from "path";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  kakao: string;
};

export type HeroData = {
  eyebrow: string;
  headline: string;
  subtext: string;
  supportText: string;
};

export type ProblemCard = {
  title: string;
  desc: string;
  alert: boolean;
};

export type ProblemData = {
  eyebrow: string;
  title: string;
  cards: ProblemCard[];
};

export type SolutionData = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ApplicationCard = {
  title: string;
  desc: string;
};

export type ApplicationData = {
  eyebrow: string;
  title: string;
  cards: ApplicationCard[];
};

export type ProcessStep = {
  title: string;
  desc: string;
};

export type ProcessData = {
  eyebrow: string;
  title: string;
  steps: ProcessStep[];
};

export type HomeData = {
  hero: HeroData;
  problem: ProblemData;
  solution: SolutionData;
  application: ApplicationData;
  process: ProcessData;
};

export type CompanyHeroData = {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
};

export type CompanyClientsData = {
  eyebrow: string;
  title: string;
  note: string;
};

export type CompanyData = {
  hero: CompanyHeroData;
  clients: CompanyClientsData;
};

export type CtaData = {
  eyebrow: string;
  headline: string;
  subtext: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ResourceCardData = {
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  download: string | null;
  ready: boolean;
};

export type ResourcesData = {
  hero: {
    eyebrow: string;
    headline: string;
    subtext: string;
  };
  cards: ResourceCardData[];
};

export type SiteContent = {
  contact: ContactInfo;
  home: HomeData;
  company: CompanyData;
  cta: CtaData;
  faq: FaqItem[];
  resources: ResourcesData;
};

// ─── Accessor ─────────────────────────────────────────────────────────────────

// cache() memoizes per-request so multiple server components don't re-read the file.
// noStore() opts out of the Next.js static render cache so changes take effect
// on the next request after revalidatePath() is called by the admin API.
export const getContent = cache((): SiteContent => {
  noStore();
  const filePath = path.join(process.cwd(), "src", "data", "content.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteContent;
});
