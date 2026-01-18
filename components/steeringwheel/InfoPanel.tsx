import React, { useState } from 'react';
import { HoverContext } from './types';

interface InfoPanelProps {
  context: HoverContext | null;
  isLocked?: boolean;
  onBack?: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ context, isLocked, onBack }) => {
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  if (!context) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-stone-100/80 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-stone-300">
        <div className="relative mb-8 group">
            <div className="bg-stone-200/80 p-5 rounded-2xl border border-stone-300 relative">
                <svg className="w-8 h-8 text-stone-500 group-hover:text-stone-700 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
            </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight mb-6">
            AI Steering Wheel
        </h2>

        <div className="max-w-md space-y-4">
            <p className="text-stone-600 text-lg leading-relaxed">
              Click any section to copy a prompt like "Make this more concise", then paste it into your AI chat to refine the output.
            </p>
            <p className="text-stone-500 text-sm">
              Start from the center (broad dimensions) and work outward to find the precise adjective you need.
            </p>
        </div>

        
      </div>
    );
  }

  const getColorClass = (base: string) => {
    switch(base) {
        case 'coral': return 'text-[#ee8a82] bg-[#ee8a82]/10 border-[#ee8a82]/30';
        case 'sky': return 'text-[#7c9eb2] bg-[#7c9eb2]/10 border-[#7c9eb2]/30';
        case 'rose': return 'text-[#c97b7b] bg-[#c97b7b]/10 border-[#c97b7b]/30';
        case 'amber': return 'text-[#d4a574] bg-[#d4a574]/10 border-[#d4a574]/30';
        case 'violet': return 'text-[#9b8aa8] bg-[#9b8aa8]/10 border-[#9b8aa8]/30';
        case 'emerald': return 'text-[#7a9e8e] bg-[#7a9e8e]/10 border-[#7a9e8e]/30';
        default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const colorStyles = getColorClass(context.color);

  const handleCopy = async (word: string, e?: React.MouseEvent) => {
    if (e) {
        e.stopPropagation();
    }
    const text = `Make this more ${word.toLowerCase()}`;

    try {
        await navigator.clipboard.writeText(text);
        setCopiedWord(word);
        setTimeout(() => setCopiedWord(null), 2000);
    } catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            setCopiedWord(word);
            setTimeout(() => setCopiedWord(null), 2000);
        } catch (err2) {
            console.error('Copy failed', err2);
        }

        document.body.removeChild(textArea);
    }
  };

  const isTitleActionable = context.type === 'group';
  const isTitleCopied = copiedWord === context.title;

  return (
    <div className="h-full flex flex-col p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-stone-300 bg-stone-100/90 backdrop-blur-sm overflow-y-auto relative">


      {/* Locked Indicator */}
      {isLocked && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-stone-200 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-300">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Locked</span>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 relative z-10 mt-8 lg:mt-0">
        <div className="flex items-center gap-3 mb-4">
            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold tracking-wide border ${colorStyles}`}>
            {context.subtitle}
            </span>
        </div>

        {/* Actionable Title Block */}
        <div
            className={`group flex items-center gap-4 ${isTitleActionable ? 'cursor-pointer' : ''}`}
            onClick={(e) => isTitleActionable && handleCopy(context.title, e)}
            title={isTitleActionable ? "Click to copy prompt" : undefined}
        >
            <h2 className={`text-4xl md:text-5xl font-bold text-stone-800 tracking-tight transition-colors duration-300 ${isTitleActionable ? 'group-hover:text-stone-600' : ''}`}>
              {context.title}
            </h2>

            {/* Main Prompt Button for Title */}
            {isTitleActionable && (
                <div className="transition-all duration-300">
                     <button
                        onClick={(e) => handleCopy(context.title, e)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                        isTitleCopied
                            ? 'bg-[#7a9e8e] text-white'
                            : 'bg-stone-200 text-stone-600 border border-stone-300 hover:bg-stone-300 hover:text-stone-800'
                    }`}>
                        {isTitleCopied ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        <span>{isTitleCopied ? 'Copied' : 'Prompt'}</span>
                    </button>
                </div>
            )}
        </div>

        <div className={`h-1 w-24 rounded-full mt-4 ${colorStyles.split(' ').find(c => c.startsWith('bg')) || 'bg-stone-300'}`} style={{ opacity: 0.6 }} />
      </div>

      <div className="space-y-6 relative z-10">

        {/* Main "Use When" Block */}
        <div className="bg-white/60 p-6 rounded-xl border border-stone-200 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full`} style={{ backgroundColor: context.color === 'coral' ? '#ee8a82' : context.color === 'sky' ? '#7c9eb2' : context.color === 'rose' ? '#c97b7b' : context.color === 'amber' ? '#d4a574' : context.color === 'violet' ? '#9b8aa8' : '#7a9e8e' }} />
            <div className="flex items-start gap-4 relative z-10">
                <div className={`mt-1 p-1.5 rounded-lg ${colorStyles.split(' ').find(c => c.startsWith('bg')) || 'bg-stone-100'}`}>
                    <svg className={`w-5 h-5 ${colorStyles.split(' ').find(c => c.startsWith('text')) || 'text-stone-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h4 className="text-stone-500 font-bold text-xs mb-2 uppercase tracking-widest">Use when the problem is...</h4>
                    <p className="text-stone-700 text-lg leading-relaxed">
                        {context.description}
                    </p>
                </div>
            </div>
        </div>

        {/* Ring 1 & 2 Preview: SubItems */}
        {context.subItems && context.subItems.length > 0 && (
            <div>
                 <h3 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 pl-1">
                    {context.type === 'dimension' ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    )}
                    {context.type === 'dimension' ? 'Strategic Pathways' : 'Available Styles'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {context.subItems.map((item, idx) => (
                        <div key={idx} className="bg-white/40 p-5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-white/60 transition-all duration-300 group">
                            <span className={`block font-bold text-lg mb-2 group-hover:translate-x-1 transition-transform duration-300 ${colorStyles.split(' ').find(c => c.startsWith('text')) || 'text-stone-700'}`}>{item.name}</span>
                            <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Ring 3: Adjectives */}
        {context.details && context.details.length > 0 && (
          <div>
            <div className="mb-5 mt-6 pt-6 border-t border-stone-200">
                <p className="text-stone-500 text-sm">
                  Get more specific than "{context.title.toLowerCase()}" to make your output more...
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {context.details.map((detail, idx) => {
                const isCopied = copiedWord === detail.word;
                return (
                    <div
                        key={idx}
                        onClick={(e) => handleCopy(detail.word, e)}
                        className={`group relative p-5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 cursor-pointer
                            ${isCopied
                                ? 'bg-[#7a9e8e]/10 border-[#7a9e8e]/30'
                                : `bg-white/40 border-stone-200 hover:bg-white/80 hover:border-stone-300 hover:-translate-y-0.5`
                            }
                        `}
                    >
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className={`w-4 h-4 ${colorStyles.split(' ').find(c => c.startsWith('text')) || 'text-stone-500'} opacity-50 group-hover:opacity-100 transition-opacity`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <span className={`font-bold text-xl ${isCopied ? 'text-[#7a9e8e]' : 'text-stone-700 group-hover:text-stone-900'}`}>{detail.word}</span>
                            </div>
                            <p className={`text-base italic pl-6 transition-colors leading-relaxed ${isCopied ? 'text-[#7a9e8e]/80' : 'text-stone-500 group-hover:text-stone-600'}`}>
                                "{detail.usage}"
                            </p>
                        </div>

                        {/* Prompt Button */}
                        <button
                            onClick={(e) => handleCopy(detail.word, e)}
                            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            isCopied
                                ? 'bg-[#7a9e8e] text-white'
                                : 'bg-stone-200 text-stone-500 border border-stone-300 group-hover:bg-stone-300 group-hover:text-stone-700'
                        }`}>
                            {isCopied ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            )}
                            <span>{isCopied ? 'Copied' : 'Prompt'}</span>
                        </button>
                    </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
