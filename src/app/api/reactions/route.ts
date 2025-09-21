import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all reactions
export async function GET() {
  const reactions = await prisma.reaction.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(reactions);
}

// POST new reaction
export async function POST(req: Request) {
  const body = await req.json(); // ex: { type: "like" }
  const reaction = await prisma.reaction.create({ data: { type: body.type } });
  return NextResponse.json(reaction);
}
