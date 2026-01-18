
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 py-20 text-stone-400">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-2">Hilary Gridley</h2>
          <p className="uppercase tracking-[0.5em] text-xs font-bold opacity-50">Have words Will Build</p>
        </div>
        
        <div className="w-16 h-px bg-stone-800 mx-auto my-8"></div>
        
        <p className="text-sm font-light">
          &copy; {new Date().getFullYear()} Hilary Gridley. Engineered with Acme tools.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
