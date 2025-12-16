import { Zap } from 'lucide-react';


function App() {

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
       <main>

        content

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
