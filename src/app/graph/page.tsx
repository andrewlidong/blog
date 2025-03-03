import GraphView from '@/components/GraphView';

export default function GraphPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Knowledge Graph
      </h1>
      <GraphView />
    </div>
  );
} 