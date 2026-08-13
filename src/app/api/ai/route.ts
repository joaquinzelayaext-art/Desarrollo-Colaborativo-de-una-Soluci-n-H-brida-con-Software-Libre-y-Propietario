import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/aiService";

// GET: Verificar que la API funciona
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "API de IA funcionando correctamente",
  });
}

// POST: Procesar un prompt
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

    const result = await generateResponse(prompt);

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}