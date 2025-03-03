'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/lib/actions';
import Link from 'next/link';

interface SearchProps {
  notes: Note[];
}

export default function Search({ notes }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Note[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = notes.filter((note) => {
      const searchContent = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
      return searchContent.includes(query.toLowerCase());
    });

    setResults(searchResults);
  }, [query, notes]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search notes..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {results.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {note.content.slice(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 