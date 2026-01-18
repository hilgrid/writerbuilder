import React from 'react';

type Page = 'home' | 'steering-wheel';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center vintage-bg overflow-hidden p-4">
      {/* The Business Card */}
      <div className="cartoon-card-bg w-full max-w-xl px-8 py-12 md:px-16 md:py-20 relative z-20 transform transition-all duration-300 ease-out hover:rotate-2 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-800 font-sans">
            Hilary Gridley
          </h1>
          <h2 className="text-xl md:text-3xl font-medium tracking-widest text-stone-600 uppercase inline-block">
            WRITERBUILDER
          </h2>

          <div className="pt-12 md:pt-24 flex flex-row justify-between items-center w-full text-lg md:text-2xl font-bold tracking-widest text-stone-700 uppercase">
            <span>Have words</span>
            <span>Will Build</span>
          </div>
        </div>

        {/* Card subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:10px_10px]"></div>
      </div>

      {/* Links below card */}
      <div className="flex flex-col space-y-2 mt-8 z-20">
        <a
          href="https://hils.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-800 text-sm hover:text-stone-600 transition-colors"
        >
          Writerbuilder newsletter
        </a>
        <a
          href="https://maven.com/hilary-gridley/ai-powered-people-management"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-800 text-sm hover:text-stone-600 transition-colors"
        >
          Supermanagers course
        </a>
        <button
          onClick={() => onNavigate('steering-wheel')}
          className="text-stone-800 text-sm hover:text-stone-600 transition-colors text-left cursor-pointer"
        >
          AI steering wheel
        </button>
      </div>

    </section>
  );
};

export default Hero;
