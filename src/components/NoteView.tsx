'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Note } from '@/lib/actions';

// Dynamically import ReactMarkdown to avoid SSR issues
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => <div>Loading content...</div>,
});

interface NoteViewProps {
  note: Note;
}

export default function NoteView({ note }: NoteViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {note.title}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        {note.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Last updated: {new Date(note.date).toLocaleDateString()}
      </div>

      <div className="mt-8">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>

      {note.links.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Related Notes
          </h2>
          <ul className="space-y-2">
            {note.links.map((link) => (
              <li key={link}>
                <Link
                  href={`/notes/${link}`}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
} 