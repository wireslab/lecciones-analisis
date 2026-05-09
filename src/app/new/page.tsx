import LessonForm from '@/components/LessonForm';

export default function NewLessonPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Nueva Lección</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Pega el código generado por Gemini para crear una nueva lección interactiva.
        </p>
      </div>
      <LessonForm />
    </div>
  );
}
