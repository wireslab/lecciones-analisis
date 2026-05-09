'use client';

import { Sandpack } from '@codesandbox/sandpack-react';

interface LessonViewerProps {
  code: string;
}

export default function LessonViewer({ code }: LessonViewerProps) {
  return (
    <div className="w-full h-[600px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
      <Sandpack
        template="react-ts"
        files={{
          '/App.tsx': code,
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          editorHeight: 600,
          showLineNumbers: false,
          showInlineErrors: true,
          externalResources: ['https://cdn.tailwindcss.com'],
        }}
        theme="dark"
      />
    </div>
  );
}
