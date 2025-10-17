import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = (searchParams.get("id") || "ABCD1234567").toUpperCase();
  const now = new Date();
  const delay = Math.floor(Math.random() * 12) + 4;
  const eta = new Date(now.getTime() + (delay + 36) * 3600 * 1000);
  return NextResponse.json({
    containerId: id,
    plannedEtaUtc: new Date(now.getTime() + 36 * 3600 * 1000).toISOString(),
    predictedEtaUtc: eta.toISOString(),
    delayHours: delay,
    risk: delay > 12 ? "High" : delay > 6 ? "Medium" : "Low",
    reason: delay > 12 ? "Port congestion + weather delays" : "Slight deviation from route ETA"
  });
}