import React from 'react';
import Dashboard from './ui/modules/Dashboard/Dashboard';
import { OnboardingProvider } from './ui/modules/OnboardingProvider/OnboardingProvider';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingProvider>
        <Dashboard />
      </OnboardingProvider>
    </div>
  );
};

export default App;
