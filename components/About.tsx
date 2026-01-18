import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center vintage-bg overflow-hidden p-4">
      <div className="max-w-2xl w-full z-20">
        <Link to="/" className="text-stone-800 text-base hover:text-stone-600 hover:underline transition-colors mb-8 inline-block">
          &larr; Back
        </Link>

        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-stone-800 uppercase mb-6">Experience</h2>
          <ul className="space-y-3 text-stone-800 text-lg">
            <li>former head of core product & AI at WHOOP</li>
            <li>prev @ dropbox, big health, nike, dosomething.org</li>
            <li>former open water scuba instructor</li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest text-stone-800 uppercase mb-6">Features</h2>
          <ul className="space-y-3 text-stone-800 text-lg">
            <li>
              <a href="https://www.lennysnewsletter.com/p/how-to-become-a-supermanager-with" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">How to be a supermanager with AI</a> on Lenny's Newsletter
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=xDMkkOC-EhI" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">Be a better manager with CustomGPTs</a> on How I AI
            </li>
            <li>
              <a href="https://www.lennysnewsletter.com/p/how-to-build-a-team-that-can-take-a-punch" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">Build teams that can take a punch</a> on Lenny's Podcast
            </li>
            <li>
              <a href="https://www.businessinsider.com/how-to-make-ai-daily-habit-work-days-gpt-whoop-2025-6" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">How a WHOOP product leader made AI a habit for her team</a> on Business Insider
            </li>
            <li>
              <a href="https://hbr.org/2025/08/research-the-hidden-penalty-of-using-ai-at-work" target="_blank" rel="noopener noreferrer" className="hover:text-stone-600 hover:underline transition-colors">Research: The Hidden Penalty of Using AI at Work</a> on HBR
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
