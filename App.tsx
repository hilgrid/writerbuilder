import React, { useState } from 'react';
import Hero from './components/Hero';
import { SteeringWheelPage } from './components/steeringwheel/SteeringWheelPage';

type Page = 'home' | 'steering-wheel';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900">
      {currentPage === 'home' && (
        <main>
          <div id="home">
            <Hero onNavigate={navigateTo} />
          </div>
        </main>
      )}

      {currentPage === 'steering-wheel' && (
        <SteeringWheelPage onBack={() => navigateTo('home')} />
      )}
    </div>
  );
};

export default App;
