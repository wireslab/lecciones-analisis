'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Tag, Calendar, ChevronRight, X } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string;
  createdAt: Date;
}

interface LessonListProps {
  initialLessons: any[];
}

export default function LessonList({ initialLessons }: LessonListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(initialLessons.map(l => l.category));
    return Array.from(cats).sort();
  }, [initialLessons]);

  const filteredLessons = useMemo(() => {
    return initialLessons.filter(lesson => {
      const matchesSearch = 
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lesson.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        lesson.tags.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory ? lesson.category === selectedCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [initialLessons, searchTerm, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por título, etiquetas o contenido..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === null 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredLessons.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Search className="text-slate-400" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">No se encontraron lecciones</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Prueba con otros términos de búsqueda o categorías.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-indigo-200 dark:hover:border-indigo-900"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {lesson.category}
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {lesson.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 h-10">
                {lesson.description || 'Sin descripción disponible.'}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800 text-xs text-slate-400">
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {lesson.tags.split(',').slice(0, 2).map((tag: string) => (
                    <span key={tag} className="flex items-center gap-0.5 truncate">
                      <Tag size={10} />
                      {tag.trim()}
                    </span>
                  ))}
                  {lesson.tags.split(',').length > 2 && (
                    <span>+{lesson.tags.split(',').length - 2}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{new Date(lesson.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
