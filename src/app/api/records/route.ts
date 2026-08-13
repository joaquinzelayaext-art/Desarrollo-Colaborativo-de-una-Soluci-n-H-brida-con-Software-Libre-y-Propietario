import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { GoogleGenAI } from '@google/genai';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY });

export async function GET() {
  try {
    const records = await prisma.record.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, type } = body;

    let aiResponseText = null;

    if (type === 'ai' && description) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: description,
        });
        aiResponseText = response.text || 'Sin respuesta generada por la IA.';
      } catch (aiError) {
        console.error('Error al generar contenido con Gemini:', aiError);
        aiResponseText = 'Error al conectar con el servicio de Inteligencia Artificial.';
      }
    }

    // Buscamos o creamos un usuario genérico si el esquema lo requiere
    let defaultUser = await prisma.user.findFirst();
    if (!defaultUser) {
      defaultUser = await prisma.user.create({
        data: {
          email: 'usuario@hybridtech.local',
          name: 'Workspace User',
        },
      });
    }

    // Guardar usando únicamente el campo válido 'processedData' que existe en tu esquema
    const newRecord = await prisma.record.create({
      data: {
        title: title || 'Registro sin título',
        description: description || '',
        processedData: aiResponseText,
        userId: defaultUser.id,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}