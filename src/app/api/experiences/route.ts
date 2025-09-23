import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les expériences" },
      { status: 500 }
    );
  }
}

// CREATE a new experience
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newExperience = await prisma.experience.create({
      data: {
        type: body.type,
        title: body.title,
        company: body.company,
        location: body.location,
        startDate: body.startDate,
        endDate: body.endDate,
        description: body.description,
        technologies: body.technologies || [],
      },
    });

    return NextResponse.json(newExperience);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de créer l'expérience" },
      { status: 500 }
    );
  }
}

// GET one experience
export async function GET_BY_ID(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: Number(params.id) },
    });

    if (!experience) {
      return NextResponse.json(
        { error: "Expérience non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer l'expérience" },
      { status: 500 }
    );
  }
}

// UPDATE experience
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updatedExperience = await prisma.experience.update({
      where: { id: Number(body.id) },
      data: {
        type: body.type,
        title: body.title,
        company: body.company,
        location: body.location,
        startDate: body.startDate,
        endDate: body.endDate,
        description: body.description,
        technologies: body.technologies || [],
      },
    });

    return NextResponse.json(updatedExperience);
  } catch (error) {
    console.log("==========error===========", error)
    return NextResponse.json(
      { error: "Impossible de mettre à jour l'expérience" },
      { status: 500 }
    );
  }
}

// DELETE experience
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.experience.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ message: "Expérience supprimée avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de supprimer l'expérience" },
      { status: 500 }
    );
  }
}
