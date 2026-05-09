import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
              <BookOpen size={24} />
              <span>Trading Academy</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/new"
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} />
              <span>Nueva Lección</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
