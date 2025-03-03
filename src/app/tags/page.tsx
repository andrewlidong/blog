import { getAllNotes } from '@/lib/actions';
import Link from 'next/link';

export default async function TagsPage() {
  const notes = await getAllNotes();
  const tags = Array.from(
    new Set(notes.flatMap((note) => note.tags))
  ).sort();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        All Tags
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map((tag) => {
          const noteCount = notes.filter((note) => note.tags.includes(tag)).length;
          return (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{tag}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {noteCount} {noteCount === 1 ? 'note' : 'notes'}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 