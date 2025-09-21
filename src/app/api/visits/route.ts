import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all visits (optionnel)
export async function GET() {
  const visits = await prisma.visit.findMany();
  return NextResponse.json(visits);
}

// POST new visit
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const visit = await prisma.visit.create({ data: { ip } });
  return NextResponse.json(visit);
}
