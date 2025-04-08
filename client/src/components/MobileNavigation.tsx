import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Link, useLocation } from "wouter";

export default function MobileNavigation() {
  const { activeSection, setActiveSection } = useContext(AppContext);
  const [location] = useLocation();

  return (
    <nav className="md:hidden py-2 px-1 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="flex justify-around items-center">
        <Link href="/">
          <a 
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              activeSection === 'chat' || location === '/'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
            onClick={() => setActiveSection('chat')}
          >
            <div className={`rounded-full p-1.5 ${activeSection === 'chat' || location === '/' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">forum</span>
            </div>
            <span className="text-xs font-medium mt-1">Chat</span>
            {(activeSection === 'chat' || location === '/') && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <button 
          onClick={() => setActiveSection('resources')}
          className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
            activeSection === 'resources' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className={`rounded-full p-1.5 ${activeSection === 'resources' ? 'bg-blue-100' : ''}`}>
            <span className="material-icons text-xl">auto_stories</span>
          </div>
          <span className="text-xs font-medium mt-1">Recursos</span>
          {activeSection === 'resources' && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
          )}
        </button>
        
        <Link href="/reportar">
          <a
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              location === '/reportar'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`rounded-full p-1.5 ${location === '/reportar' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">report_problem</span>
            </div>
            <span className="text-xs font-medium mt-1">Reportar</span>
            {location === '/reportar' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <button 
          onClick={() => setActiveSection('learn')}
          className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
            activeSection === 'learn' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <div className={`rounded-full p-1.5 ${activeSection === 'learn' ? 'bg-blue-100' : ''}`}>
            <span className="material-icons text-xl">school</span>
          </div>
          <span className="text-xs font-medium mt-1">Aprender</span>
          {activeSection === 'learn' && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
          )}
        </button>
      </div>
    </nav>
  );
}
