import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecordDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const record = await prisma.record.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!record) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Cabecera con botón de retorno */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Detalle del Registro
          </h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow hover:opacity-90 transition-opacity"
          >
            ← Volver al Panel
          </Link>
        </div>

        {/* Tarjeta principal de contenido */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 md:p-8 shadow-xl">
          {/* TÍTULO */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">
              Título
            </span>
            <h2 className="text-xl md:text-2xl font-semibold mt-1 text-white">
              {record.title}
            </h2>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">
              Descripción
            </span>
            <div className="mt-2 p-4 bg-black/40 rounded-lg border border-neutral-800 text-neutral-300 whitespace-pre-wrap">
              {record.description}
            </div>
          </div>

          {/* DATOS PROCESADOS / IA: Solo se muestra si processedData tiene contenido */}
          {record.processedData && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-green-400 tracking-wider uppercase mb-2">
                DATOS PROCESADOS / IA
              </h3>
              <div className="p-4 bg-black/40 rounded-lg border border-green-900/40 text-green-300 whitespace-pre-wrap font-mono text-sm">
                {record.processedData}
              </div>
            </div>
          )}

          {/* METADATOS (Fecha y Creador) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
            <div>
              <span className="block uppercase tracking-wider text-neutral-500 mb-1">
                Fecha de creación
              </span>
              {new Date(record.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="block uppercase tracking-wider text-neutral-500 mb-1">
                Creado por
              </span>
              {record.user?.name || 'Administrador'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}