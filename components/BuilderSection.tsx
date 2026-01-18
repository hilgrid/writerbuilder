
import React from 'react';
import { PROJECTS } from '../constants';

const BuilderSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {PROJECTS.map((project) => (
        <div key={project.id} className="group relative">
          <div className="aspect-[4/3] overflow-hidden rounded-sm border border-stone-200">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          
          <div className="mt-6 space-y-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-rose-600 bg-rose-50 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-stone-800">{project.title}</h3>
            <p className="text-stone-600 leading-relaxed">{project.description}</p>
            <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-stone-900 pb-1 mt-4 inline-block hover:text-rose-600 hover:border-rose-600 transition-colors">
              Explore Build
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuilderSection;
