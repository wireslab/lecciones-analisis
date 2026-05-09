'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { createLesson, updateLesson, deleteLesson } from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface LessonFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    tags: string;
    code: string;
  };
}

export default function LessonForm({ initialData }: LessonFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    tags: initialData?.tags || '',
    code: initialData?.code || '// Pega el código de Gemini aquí\n',
  });

  const extractTitleFromCode = (code: string) => {
    const funcMatch = code.match(/export\s+default\s+function\s+([A-Z][a-zA-Z0-9]+)/);
    const constMatch = code.match(/const\s+([A-Z][a-zA-Z0-9]+)\s*=\s*\(.*\)\s*=>/);
    const name = (funcMatch && funcMatch[1]) || (constMatch && constMatch[1]);
    if (name) {
      return name.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).trim();
    }
    return null;
  };

  const handleCodeChange = (value: string | undefined) => {
    const code = value || '';
    setFormData((prev) => {
      const newData = { ...prev, code };
      if (!prev.title.trim()) {
        const extracted = extractTitleFromCode(code);
        if (extracted) newData.title = extracted;
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateLesson(initialData.id, formData);
      } else {
        await createLesson(formData);
      }
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Error al guardar la lección');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej. Cruce de Medias Móviles"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Categoría</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Ej. Indicadores"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          rows={2}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Breve explicación de la lección..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Etiquetas (separadas por comas)</label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Ej. SMA, EMA, Tendencia"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Código React (Gemini)</label>
        <div className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="typescript"
            theme="vs-dark"
            value={formData.code}
            onChange={handleCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        {initialData ? (
          <button
            type="button"
            onClick={async () => {
              if (confirm('¿Estás seguro de que quieres eliminar esta lección?')) {
                setLoading(true);
                await deleteLesson(initialData.id);
                router.push('/');
                router.refresh();
              }
            }}
            className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Eliminar Lección
          </button>
        ) : (
          <div></div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar Lección' : 'Crear Lección'}
        </button>
      </div>
    </form>
  );
}
