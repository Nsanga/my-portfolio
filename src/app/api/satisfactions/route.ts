import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all satisfactions
export async function GET() {
  const satisfactions = await prisma.satisfaction.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(satisfactions);
}

// POST new satisfaction
export async function POST(req: Request) {
  const body = await req.json(); // ex: { rating: 90 }
  const satisfaction = await prisma.satisfaction.create({ data: { rating: body.rating } });
  return NextResponse.json(satisfaction);
}
