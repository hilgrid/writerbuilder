import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import { SteeringWheelPage } from './components/steeringwheel/SteeringWheelPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900">
      <Routes>
        <Route path="/" element={
          <main>
            <div id="home">
              <Hero />
            </div>
          </main>
        } />
        <Route path="/steeringwheel" element={<SteeringWheelPage />} />
      </Routes>
    </div>
  );
};

export default App;
