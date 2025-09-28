import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Impossible de récupérer les projets" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, techStack, link, github, year, category } = body;
    const project = await prisma.project.create({
      data: { title, description, image, techStack, link, github, year, category },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Impossible de créer le projet" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(req: Request) {
  try {
    const body = await req.json(); // doit contenir id, title, description, image
    const project = await prisma.project.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        image: body.image,
        year: body.year,
        category: body.category,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Impossible de mettre à jour le projet" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // id du projet à supprimer
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Projet supprimé" });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Impossible de supprimer le projet" },
      { status: 500 }
    );
  }
}
