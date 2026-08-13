import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b2e21] via-[#121f17] to-[#080c09] text-zinc-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Barra superior con el nombre grande y limpio */}
      <header className="px-8 py-6 flex justify-between items-center border-b border-[#274431]/40 bg-[#121f17]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20 text-xl">
            H
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">HybridTech App</span>
        </div>
      </header>

      {/* Contenido principal centrado */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-[#1b2e21] text-emerald-300 border border-[#274431] shadow-inner">
          Solución Híbrida: Software Libre + Propietario
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Plataforma de Gestión y Procesamiento Inteligente
        </h1>

        <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed">
          Aplicación desarrollada con Next.js, TypeScript y PostgreSQL (Open Source) conectada a servicios seguros en la nube.
        </p>

        <div className="pt-4">
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-cyan-600/30 transition transform hover:-translate-y-0.5 cursor-pointer text-base border border-cyan-400/30"
          >
            Comenzar Ahora
          </Link>
        </div>
      </main>

      {/* Pie de página sutil */}
      <footer className="py-6 text-center text-xs text-zinc-500 border-t border-[#1b2e21]">
        Desarrollo Colaborativo - 2026
      </footer>
    </div>
  );
}