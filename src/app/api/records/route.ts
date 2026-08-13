import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST: Crear un nuevo registro
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }

    // Buscamos o creamos un usuario genérico de prueba para asociar el registro
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@hybridtech.com',
          name: 'Administrador',
        },
      });
    }

    // Creamos el registro en la base de datos
    const newRecord = await prisma.record.create({
      data: {
        title,
        description,
        userId: user.id,
      },
    });

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error('Error al guardar el registro:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// GET: Obtener todos los registros
export async function GET() {
  try {
    const records = await prisma.record.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}