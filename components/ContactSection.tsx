
import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="space-y-8">
        <p className="text-2xl text-stone-700 font-light leading-relaxed">
          Whether you have a complex system to build or a story that needs structural integrity, I'm ready to collaborate. 
        </p>
        
        <div className="space-y-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-stone-400">Email</span>
            <p className="text-xl font-bold text-stone-900">hello@hilarygridley.com</p>
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-stone-400">Social</span>
            <div className="flex space-x-6 mt-2">
              <a href="#" className="font-bold uppercase tracking-widest text-sm hover:text-rose-600 transition-colors">Twitter</a>
              <a href="#" className="font-bold uppercase tracking-widest text-sm hover:text-rose-600 transition-colors">GitHub</a>
              <a href="#" className="font-bold uppercase tracking-widest text-sm hover:text-rose-600 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full bg-stone-100 border-b-2 border-stone-200 p-4 focus:outline-none focus:border-rose-500 transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-stone-100 border-b-2 border-stone-200 p-4 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
        <textarea 
          placeholder="Message" 
          rows={4}
          className="w-full bg-stone-100 border-b-2 border-stone-200 p-4 focus:outline-none focus:border-rose-500 transition-colors"
        ></textarea>
        <button className="bg-stone-900 text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-rose-600 transition-all transform hover:-translate-y-1">
          Send Brief
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
