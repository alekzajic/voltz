import { Loader2, AlertCircle } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { useTransformers } from '../hooks/useTransformers';

// Lazy load components
const TransformerTable = lazy(() =>
  import('../features/transformer-table/TransformerTable')
    .then(module => ({ default: module.TransformerTable })));
const VoltageChart = lazy(() =>
  import('../features/voltage-chart/VoltageChart')
    .then(module => ({ default: module.VoltageChart })));

export function Dashboard() {
  const { data: transformers, isLoading, isError, error } = useTransformers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-red-500 gap-4">
        <AlertCircle className="w-12 h-12" />
        <p className="text-xl font-semibold">Error loading data</p>
        <p className="text-gray-500">{error?.message || 'Unknown error occurred.'}</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 w-full">
      <section className="flex-1 w-full lg:w-1/2">
        <ErrorBoundary>
          <Suspense fallback={<div className="h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <VoltageChart transformers={transformers || []} />
          </Suspense>
        </ErrorBoundary>
      </section>

      <section className="flex-1 w-full lg:w-1/2">
        <ErrorBoundary>
          <Suspense fallback={
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
          }>
            <TransformerTable transformers={transformers || []} />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
}
