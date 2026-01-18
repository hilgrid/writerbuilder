
import React from 'react';
import { WRITING_PIECES } from '../constants';

const WriterSection: React.FC = () => {
  return (
    <div className="space-y-16">
      {WRITING_PIECES.map((piece) => (
        <div key={piece.id} className="flex flex-col md:flex-row md:items-start gap-8 border-b border-stone-200 pb-16 last:border-0 group">
          <div className="md:w-1/4">
            <span className="text-xs uppercase font-bold tracking-tighter text-stone-400 mb-2 block">{piece.category} — {piece.date}</span>
          </div>
          <div className="md:w-3/4 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-stone-900 group-hover:text-rose-600 transition-colors cursor-pointer">
              {piece.title}
            </h3>
            <p className="text-lg text-stone-600 leading-relaxed max-w-3xl">
              {piece.excerpt}
            </p>
            <button className="inline-flex items-center text-sm font-bold uppercase tracking-widest group">
              Read Piece
              <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WriterSection;
