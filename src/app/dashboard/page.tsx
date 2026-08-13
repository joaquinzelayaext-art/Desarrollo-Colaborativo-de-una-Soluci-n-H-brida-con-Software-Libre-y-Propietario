'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';

interface RecordItem {
  id: string;
  title: string;
  description: string;
  aiResponse?: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para el formulario manual
  const [manualTitle, setManualTitle] = useState('');
  const [manualDescription, setManualDescription] = useState('');

  // Estados para el asistente de IA
  const [aiPrompt, setAiPrompt] = useState('');

  const fetchRecords = async () => {
    try {
      const res = await fetch('/api/records');
      const data = await res.json();
      if (res.ok) {
        setRecords(data);
      }
    } catch (err) {
      console.error('Error al cargar registros:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Manejador para guardar registro manual
  const handleManualSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: manualTitle, description: manualDescription, type: 'manual' }),
      });

      if (res.ok) {
        setManualTitle('');
        setManualDescription('');
        fetchRecords();
      }
    } catch (err) {
      console.error('Error al guardar registro manual:', err);
    }
  };

  // Manejador para la consulta con IA
  const handleAiSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: `Consulta IA: ${aiPrompt.slice(0, 25)}...`, description: aiPrompt, type: 'ai' }),
      });

      if (res.ok) {
        setAiPrompt('');
        fetchRecords();
      }
    } catch (err) {
      console.error('Error al procesar consulta con IA:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#122017] via-[#0a110c] to-[#040705] text-zinc-100 selection:bg-emerald-500 selection:text-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Principal */}
        <header className="flex justify-between items-center bg-[#0e1711] border border-[#1b2e21] rounded-2xl px-6 py-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20 text-xl">
              H
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">HybridTech Workspace</h1>
              <p className="text-xs text-emerald-400">Solución Híbrida Inteligente</p>
            </div>
          </div>
          <Link 
            href="/"
            className="text-xs font-bold px-5 py-2.5 rounded-xl bg-gradient-to-l from-cyan-600 via-blue-600 to-white text-white shadow-lg shadow-cyan-600/30 hover:opacity-95 transition border border-cyan-400/30"
          >
            ← Volver al Inicio
          </Link>
        </header>

        {/* Sección Superior: 3 Tarjetas (Registro Manual, Asistente IA, Estado del Sistema) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tarjeta 1: Registro Manual */}
          <div className="bg-[#0b130e] border border-[#1b2e21] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-sm">✏️</span>
                <h2 className="font-bold text-white text-base">Registro Manual</h2>
              </div>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Título del Registro</label>
                  <input 
                    type="text"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    placeholder="Ej. Arquitectura de Base de Datos"
                    className="w-full bg-[#050806] border border-[#1d3224] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Descripción o Notas</label>
                  <textarea 
                    rows={3}
                    value={manualDescription}
                    onChange={(e) => setManualDescription(e.target.value)}
                    placeholder="Agrega detalles relevantes..."
                    className="w-full bg-[#050806] border border-[#1d3224] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:opacity-95 transition cursor-pointer"
                >
                  Guardar Registro
                </button>
              </form>
            </div>
          </div>

          {/* Tarjeta 2: Asistente Inteligente IA */}
          <div className="bg-[#0b130e] border border-[#1b2e21] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 text-sm">🤖</span>
                <h2 className="font-bold text-white text-base">Asistente Inteligente IA</h2>
              </div>
              <form onSubmit={handleAiSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Pregunta o Prompt</label>
                  <textarea 
                    rows={5}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ej. Explícame cómo estructurar una API REST segura..."
                    className="w-full bg-[#050806] border border-[#1d3224] rounded-xl px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 hover:opacity-95 transition cursor-pointer"
                >
                  Consultar y Registrar IA
                </button>
              </form>
            </div>
          </div>

          {/* Tarjeta 3: Estado del Sistema Híbrido */}
          <div className="bg-[#0b130e] border border-[#1b2e21] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="font-bold text-white text-base">Estado del Sistema Híbrido</h2>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                El sistema se comunica con bases de datos PostgreSQL en Neon y el SDK oficial de Google Generative AI en tiempo real.
              </p>
              <div className="space-y-2 pt-2 border-t border-[#1b2e21] text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Base de Datos:</span>
                  <span className="text-emerald-400 font-semibold">Conectado (Neon)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Modelo IA:</span>
                  <span className="text-cyan-400 font-semibold">Gemini Activo</span>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-[#1b2e21] text-[10px] text-zinc-600 text-right">
              Desarrollo Colaborativo - 2026
            </div>
          </div>

        </div>

        {/* Sección Inferior: Registros y Consultas Almacenadas */}
        <div className="bg-[#0b130e] border border-[#1b2e21] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#1b2e21] pb-4">
            <h2 className="font-bold text-white text-base">Registros y Consultas Almacenadas</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-900/40">
              {records.length} registros
            </span>
          </div>

          {loading ? (
            <p className="text-center text-zinc-500 py-10 animate-pulse text-sm">Cargando registros...</p>
          ) : records.length === 0 ? (
            <p className="text-center text-zinc-500 py-10 text-sm">No hay registros almacenados todavía.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {records.map((record) => {
                const dateObj = new Date(record.createdAt);
                const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()} - ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

                return (
                  <div 
                    key={record.id}
                    className="bg-[#050806] border border-[#152319] rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-emerald-900/50 transition"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-cyan-400 text-sm sm:text-base">{record.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-1">{record.description || 'Sin descripción'}</p>
                      <span className="block text-[11px] text-zinc-600 font-mono pt-1">{formattedDate}</span>
                    </div>

                    <Link 
                      href={`/dashboard/${record.id}`}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition shrink-0 flex items-center gap-1"
                    >
                      Ver detalle →
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}