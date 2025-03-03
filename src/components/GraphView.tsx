'use client';

// GraphView component for visualizing note connections
import { useCallback, useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { getAllNotes } from '@/lib/actions';
import { useRouter } from 'next/navigation';

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-gray-600 dark:text-gray-400">Loading graph...</div>
    </div>
  ),
});

interface Node {
  id: string;
  name: string;
  val: number;
  color: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  color: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export default function GraphView() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Update dimensions when window size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const loadedNotes = await getAllNotes();

        // Create a map of valid note slugs
        const validSlugs = new Set(loadedNotes.map(note => note.slug));

        // Generate nodes from notes
        const nodes: Node[] = loadedNotes.map((note, index) => ({
          id: note.slug,
          name: note.title,
          val: 1,
          color: '#4ecdc4',
          group: index % 3, // Group nodes for better visualization
        }));

        // Generate links from note connections
        const links: Link[] = loadedNotes.flatMap((note) =>
          note.links
            .filter(link => validSlugs.has(link)) // Only include links to existing notes
            .map((link) => ({
              source: note.slug,
              target: link,
              color: '#666',
            }))
        );

        setGraphData({ nodes, links });
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleNodeClick = useCallback((node: { id?: string }) => {
    if (node.id) {
      router.push(`/notes/${node.id}`);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-gray-600 dark:text-gray-400">Loading graph...</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-[600px] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkColor="color"
        onNodeClick={handleNodeClick}
        nodeRelSize={6}
        linkWidth={1}
        backgroundColor="#ffffff"
        width={dimensions.width}
        height={dimensions.height}
        d3Force={[
          ['charge', -100],
          ['center', null],
          ['link', null],
          ['collision', 30],
          ['x', null],
          ['y', null]
        ]}
      />
    </div>
  );
} 