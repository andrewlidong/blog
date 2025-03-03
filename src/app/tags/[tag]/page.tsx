import { getAllNotes } from '@/lib/actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const notes = await getAllNotes();
  const taggedNotes = notes.filter((note) => note.tags.includes(tag));

  if (taggedNotes.length === 0) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Notes tagged with #{tag}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taggedNotes.map((note) => (
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
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {new Date(note.date).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 