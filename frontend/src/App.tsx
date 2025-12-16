import { Zap, Loader2, AlertCircle } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTransformers } from './hooks/useTransformers';

// Lazy load components
const TransformerTable = lazy(() => 
  import('./features/transformer-table/TransformerTable')
    .then(module => ({ default: module.TransformerTable })));


function App() {
  const { data: transformers, isLoading, isError, error } = useTransformers();

  // loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // error state
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
     <div className="w-screen min-h-screen bg-background flex flex-col mx-auto font-sans text-gray-900">
      {/* Header */}
      <header className="bg-surface border-b border-gray-200 p-4 sticky top-0 z-10 w-full shadow-sm">
        <div className="flex-row flex items-center gap-3 w-full container mx-auto">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Zap className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            VoltZ
          </h1>
        </div>
      </header>

      {/* main Content */}
       <main className="flex flex-col lg:flex-row gap-8 p-4 lg:p-8 w-full ">

        {/* line chart */}
        <section className="flex-1 w-full lg:w-1/2">
          line chart
        </section>

        {/* table */}
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

     {/* footer */}
      <footer className="bg-surface border-t border-gray-200 p-6 mt-auto">
        <div className="flex-row mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} VoltZ.
        </div>
      </footer>
    </div>
  );
}

export default App;
