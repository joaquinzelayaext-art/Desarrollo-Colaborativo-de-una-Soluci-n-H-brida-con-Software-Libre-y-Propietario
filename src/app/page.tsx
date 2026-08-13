import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      {/* Navbar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wider text-blue-400">HybridTech App</h1>
        <Link 
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Ir al Dashboard
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <span className="bg-blue-500/10 text-blue-400 text-sm font-semibold px-3 py-1 rounded-full mb-4 border border-blue-500/20">
          Solución Híbrida: Software Libre + Propietario
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Plataforma de Gestión y Procesamiento Inteligente
        </h2>
        <p className="text-slate-400 text-lg md:text-xl mb-8 max-w-2xl">
          Aplicación desarrollada con Next.js, TypeScript y PostgreSQL (Open Source) conectada a servicios seguros en la nube.
        </p>
        <div className="flex gap-4">
          <Link 
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            Comenzar Ahora
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-800 text-slate-500 text-sm">
        Desarrollo Colaborativo - Solución Híbrida 2026
      </footer>
    </div>
  );
}