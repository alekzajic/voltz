import { Zap, Loader2 } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Dashboard } from './pages/Dashboard';

// Lazy load components
const TransformerCards = lazy(() =>
  import('./features/transformer-cards/TransformerCards')
    .then(module => ({ default: module.TransformerCards })));

function App() {
  return (
    <BrowserRouter>
      <div className="w-screen min-h-screen bg-background flex flex-col mx-auto font-sans text-gray-900">
        <header className="bg-surface border-b border-gray-200 p-4 sticky top-0 z-10 w-full shadow-sm">
          <div className="flex-row flex items-center justify-between w-full container mx-auto">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                VoltZ
              </h1>
            </div>
            <nav className="flex gap-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/cards"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                Cards
              </NavLink>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/cards"
            element={
              <ErrorBoundary>
                <Suspense fallback={
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                }>
                  <TransformerCards />
                </Suspense>
              </ErrorBoundary>
            }
          />
        </Routes>

        <footer className="bg-surface border-t border-gray-200 p-6 mt-auto">
          <div className="flex-row mx-auto text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} VoltZ.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
