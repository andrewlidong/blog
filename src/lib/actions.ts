'use server';

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'src/content/notes');

export interface Note {
  slug: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  links: string[];
}

export async function getAllNotes(): Promise<Note[]> {
  const fileNames = await fs.readdir(notesDirectory);
  const notes = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(notesDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Extract links from content ([[link]] format)
        const links = content.match(/\[\[(.*?)\]\]/g)?.map(link => 
          link.replace(/[\[\]]/g, '')
        ) || [];

        // Convert markdown links to Next.js links
        const processedContent = content.replace(
          /\[\[(.*?)\]\]/g,
          (match, slug) => `[${slug}](/notes/${slug})`
        );

        return {
          slug,
          title: data.title || slug,
          content: processedContent,
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          links,
        };
      })
  );

  return notes.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getNoteBySlug(slug: string): Promise<Note | null> {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract links from content
    const links = content.match(/\[\[(.*?)\]\]/g)?.map(link => 
      link.replace(/[\[\]]/g, '')
    ) || [];

    // Convert markdown links to Next.js links
    const processedContent = content.replace(
      /\[\[(.*?)\]\]/g,
      (match, slug) => `[${slug}](/notes/${slug})`
    );

    return {
      slug,
      title: data.title || slug,
      content: processedContent,
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      links,
    };
  } catch (error) {
    console.error(`Error reading note ${slug}:`, error);
    return null;
  }
} 