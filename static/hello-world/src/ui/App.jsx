import React from 'react';
import Dashboard from './modules/Dashboard/Dashboard';
import '../output.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-3xl font-bold text-center">CareerMap</h1>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        <Dashboard />
      </main>

      <footer className="text-center text-gray-400 text-sm mt-10 mb-4">
        Built with Forge | CareerMap © 2025
      </footer>
    </div>
  );
};

export default App;

