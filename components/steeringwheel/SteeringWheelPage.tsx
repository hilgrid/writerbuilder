import React, { useState, useEffect } from 'react';
import { SteeringWheel } from './SteeringWheel';
import { InfoPanel } from './InfoPanel';
import { HoverContext } from './types';

interface SteeringWheelPageProps {
  onBack: () => void;
}

export const SteeringWheelPage: React.FC<SteeringWheelPageProps> = ({ onBack }) => {
  const [hoverContext, setHoverContext] = useState<HoverContext | null>(null);
  const [selectedContext, setSelectedContext] = useState<HoverContext | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });

  // Handle responsive resizing for the wheel
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const size = isMobile
        ? Math.min(window.innerWidth - 20, 600)
        : Math.min(window.innerWidth * 0.65, 900);

      setDimensions({ width: size, height: size });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWheelClick = (context: HoverContext) => {
    if (selectedContext?.title === context.title && selectedContext?.type === context.type) {
      setSelectedContext(null);
    } else {
      setSelectedContext(context);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedContext(null);
  };

  const activeContext = hoverContext || selectedContext;
  const isLocked = !hoverContext && !!selectedContext;

  return (
    <div className="min-h-screen w-full text-stone-800 overflow-hidden relative font-sans selection:bg-rose-200 selection:text-rose-900" style={{ backgroundColor: '#faf6f1', display: 'flex', flexDirection: 'row' }}>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Main Visualization Area */}
      <main
        className="relative z-10 flex items-center justify-center p-4 overflow-hidden"
        style={{ flex: 1 }}
        onClick={handleBackgroundClick}
      >
        <div className="relative animate-fadeInScale transition-transform duration-500 ease-out">
          <SteeringWheel
            onHover={setHoverContext}
            onClick={handleWheelClick}
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>

        {/* Footer Credit */}
        <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none px-4 pt-8">
          <p className="text-stone-500 text-xs md:text-sm tracking-wide font-light">
            made by adjective aficionado hilary gridley.{' '}
            <a
              href="https://hils.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto text-stone-700 hover:text-stone-900 underline decoration-stone-400/50 hover:decoration-stone-600 underline-offset-4 transition-all"
            >
              subscribe to my newsletter for free tools.
            </a>
          </p>
        </div>
      </main>

      {/* Right Sidebar (Panel) */}
      <aside className="relative z-20 shadow-2xl" style={{ width: '400px', height: '100vh' }}>
        <InfoPanel context={activeContext} isLocked={isLocked} onBack={onBack} />
      </aside>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SteeringWheelPage;
