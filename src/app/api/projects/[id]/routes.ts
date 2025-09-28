import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET by ID
export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(params.id, 10) },
    });
    if (!project) {
      return NextResponse.json({ error: "Projet non trouvé" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error || "Erreur serveur" }, { status: 500 });
  }
}

// UPDATE by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const updated = await prisma.project.update({
      where: { id: parseInt(params.id, 10) },
      data: body,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

// DELETE by ID
export async function DELETE(
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: parseInt(params.id, 10) },
    });
    return NextResponse.json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
