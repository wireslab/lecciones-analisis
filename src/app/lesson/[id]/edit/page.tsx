import { getLessonById } from '@/lib/actions';
import LessonForm from '@/components/LessonForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EditLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <Link href={`/lesson/${lesson.id}`} className="text-sm text-indigo-600 hover:text-indigo-500 flex items-center gap-1 mb-2">
          <ChevronLeft size={16} />
          Volver a la lección
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Editar Lección</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Actualiza el contenido o el código de la lección "{lesson.title}".
        </p>
      </div>
      <LessonForm initialData={lesson} />
    </div>
  );
}
