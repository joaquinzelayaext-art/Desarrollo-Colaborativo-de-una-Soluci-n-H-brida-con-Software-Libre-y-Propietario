import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/aiService";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "El prompt es obligatorio" },
        { status: 400 }
      );
    }

    const aiResult = await generateResponse(prompt);
    const respuestaIA = aiResult.response;

    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@hybridtech.com',
          name: 'Administrador',
        },
      });
    }

    // Guardamos la consulta y la respuesta en la base de datos como un registro
    const newRecord = await prisma.record.create({
      data: {
        title: `Consulta IA: ${prompt.slice(0, 30)}...`,
        description: prompt,
        processedData: respuestaIA,
        userId: user.id,
      },
    });

    // Devolvemos tanto la respuesta como el ID para la redirección
    return NextResponse.json({ 
      response: respuestaIA, 
      recordId: newRecord.id 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la IA" },
      { status: 500 }
    );
  }
}