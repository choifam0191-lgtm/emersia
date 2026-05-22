import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILES = {
  catalog: path.join(process.cwd(), "public", "catalog", "catalog-2026.pdf"),
  proposal: path.join(process.cwd(), "public", "3S_propo.pdf"),
};

export async function GET() {
  return NextResponse.json({
    catalog: fs.existsSync(FILES.catalog),
    proposal: fs.existsSync(FILES.proposal),
  });
}
