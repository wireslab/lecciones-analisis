import { getLessonById } from '@/lib/actions';
import LessonViewer from '@/components/LessonViewer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Link href="/" className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1 mb-2">
            <ChevronLeft size={16} />
            Volver al catálogo
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-0.5 rounded text-xs font-medium">
              {lesson.category}
            </span>
            {lesson.tags.split(',').map((tag) => (
              <span key={tag} className="flex items-center gap-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded text-xs">
                <Tag size={10} />
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/lesson/${lesson.id}/edit`}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Edit size={16} />
          Editar
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LessonViewer code={lesson.code} />
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Acerca de esta lección</h2>
            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              {lesson.description || 'Sin descripción.'}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Detalles</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Creado</span>
                <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Última actualización</span>
                <span>{new Date(lesson.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
