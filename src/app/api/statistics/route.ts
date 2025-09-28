import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const visitorsCount = await prisma.visit.count();
    const projectsCount = await prisma.project.count();
    const reactionsCount = await prisma.reaction.count();
    const satisfactionAvgObj = await prisma.satisfaction.aggregate({
      _avg: { rating: true }
    });
    const satisfactionAvg = Math.round(satisfactionAvgObj._avg.rating || 0);

    const stats = [
      { label: "Visiteurs", value: visitorsCount, suffix: "+" },
      { label: "Projets", value: projectsCount, suffix: "+" },
      { label: "Satisfaction", value: satisfactionAvg, suffix: "%" },
      { label: "Réactions", value: reactionsCount, suffix: "+" },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error || "Impossible de récupérer les statistiques" }, { status: 500 });
  }
}
