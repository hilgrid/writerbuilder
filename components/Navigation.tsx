
import React from 'react';
import { SectionType } from '../types';

interface NavigationProps {
  activeSection: SectionType;
  onNavigate: (id: SectionType) => void;
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavigate, isScrolled }) => {
  const navItems: { label: string; id: SectionType }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Builder', id: 'builder' },
    { label: 'Writer', id: 'writer' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-stone-900 py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')}
          className={`text-xl font-bold tracking-tighter uppercase transition-colors ${isScrolled ? 'text-white' : 'text-stone-800'}`}
        >
          HG <span className="text-xs font-normal opacity-60">WRITERBUILDER</span>
        </button>

        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-all hover:opacity-100 ${
                  activeSection === item.id 
                    ? (isScrolled ? 'text-rose-400' : 'text-stone-900 border-b-2 border-stone-900') 
                    : (isScrolled ? 'text-stone-400' : 'text-stone-600')
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
