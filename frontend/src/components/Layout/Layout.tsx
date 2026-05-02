import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { clsx } from 'clsx';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutGrid },
    { path: '/cards', label: 'Cards', icon: TableIcon },
  ]

  return (
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
          <nav className="flex gap-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="bg-surface border-t border-gray-200 p-6 mt-auto">
        <div className="flex-row mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} VoltZ.
        </div>
      </footer>
    </div>
  );
}
