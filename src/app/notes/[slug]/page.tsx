import { getNoteBySlug } from '@/lib/actions';
import NoteView from '@/components/NoteView';
import { notFound } from 'next/navigation';

interface NotePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <NoteView note={note} />
    </div>
  );
} 