import { getLessons } from '@/lib/actions';
import LessonList from '@/components/LessonList';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const lessons = await getLessons();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Catálogo de Lecciones</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
            Aprende conceptos de análisis técnico con explicaciones interactivas.
          </p>
        </div>
      </div>

      <LessonList initialLessons={lessons} />
    </div>
  );
}
