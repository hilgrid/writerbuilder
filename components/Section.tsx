
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="py-24 md:py-40 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="mb-20 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-1 bg-rose-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 uppercase">
              {title}
            </h2>
          </div>
          <p className="text-xl text-stone-500 max-w-2xl font-light italic">
            "{subtitle}"
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
