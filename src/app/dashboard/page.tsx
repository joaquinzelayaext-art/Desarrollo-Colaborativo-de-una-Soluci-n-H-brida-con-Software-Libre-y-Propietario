'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RecordItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Cargar registros al iniciar la página
  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/records');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRecords(data);
      }
    } catch (error) {
      console.error('Error cargando registros:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Enviar datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        fetchRecords(); // Recargar la lista
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">Panel de Control</h1>
            <p className="text-slate-400 text-sm">Gestiona los registros de la aplicación híbrida</p>
          </div>
          <Link 
            href="/"
            className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition"
          >
            ← Volver al Inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Nuevo Registro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Título</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Análisis de tráfico DPI"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Descripción</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles del proceso..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition text-sm disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar Registro'}
              </button>
            </form>
          </div>

          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Registros Almacenados</h2>
            
            {records.length === 0 ? (
              <div className="text-center py-12 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <p>No hay registros todavía.</p>
                <p className="text-xs mt-1">Usa el formulario para agregar información a PostgreSQL.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {records.map((record) => (
                  <div key={record.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <h3 className="font-semibold text-blue-400">{record.title}</h3>
                    <p className="text-slate-300 text-sm mt-1">{record.description || 'Sin descripción'}</p>
                    <span className="text-[10px] text-slate-500 mt-2 block">
                      Creado el: {new Date(record.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}