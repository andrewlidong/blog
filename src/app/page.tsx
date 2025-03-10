import Link from 'next/link';
import { getAllNotes } from '@/lib/actions';
import Search from '@/components/Search';

export default async function Home() {
  const notes = await getAllNotes();

  return (
    <div className="p-8">
      {/* Search bar */}
      <div className="mb-8">
        <Search notes={notes} />
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Link
            key={note.slug}
            href={`/notes/${note.slug}`}
            className="block p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {note.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {note.content.replace(/[#*`]/g, '').slice(0, 150)}...
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{new Date(note.date).toLocaleDateString()}</span>
              {note.tags.length > 0 && (
                <span className="flex gap-1">
                  {note.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
