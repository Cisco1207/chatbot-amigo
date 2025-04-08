import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const { activeSection, setActiveSection } = useContext(AppContext);
  const [location] = useLocation();

  return (
    <nav className="hidden md:block w-72 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100 shadow-lg p-5 overflow-hidden">
      <div className="mb-8">
        <div className="text-sm font-semibold text-slate-500 mb-4 ml-2 tracking-wide">NAVEGACIÓN</div>
        <ul className="space-y-2">
          <li>
            <Link href="/">
              <a
                onClick={() => setActiveSection('chat')}
                className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 ${
                  activeSection === 'chat' || location === '/'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <span className={`material-icons mr-3 ${activeSection === 'chat' ? 'animate-pulse' : ''}`}>forum</span>
                <span className="font-medium">Chat</span>
                {(activeSection === 'chat' || location === '/') && <span className="ml-auto text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">Activo</span>}
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/recursos">
              <a
                className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 ${
                  location === '/recursos'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <span className="material-icons mr-3">auto_stories</span>
                <span className="font-medium">Recursos</span>
                {location === '/recursos' && <span className="ml-auto text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">Activo</span>}
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/reportar">
              <a
                className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 ${
                  location === '/reportar'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <span className="material-icons mr-3">report_problem</span>
                <span className="font-medium">Reportar</span>
                {location === '/reportar' && <span className="ml-auto text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">Activo</span>}
              </a>
            </Link>
          </li>
          
          <li>
            <Link href="/aprender">
              <a
                className={`w-full flex items-center p-3.5 rounded-xl transition-all duration-300 ${
                  location === '/aprender'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md transform scale-105' 
                    : 'text-slate-700 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <span className="material-icons mr-3">school</span>
                <span className="font-medium">Aprender</span>
                {location === '/aprender' && <span className="ml-auto text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full">Activo</span>}
              </a>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mt-6">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 shadow-sm">
          <div className="flex items-center mb-3">
            <span className="material-icons text-blue-500 mr-2">support_agent</span>
            <h3 className="font-bold text-slate-800">¿Necesitas ayuda?</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">Si necesitas hablar con alguien, estas líneas están disponibles 24/7.</p>
          <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
            <span className="material-icons text-teal-500 mr-2 text-sm">phone</span>
            <span className="text-sm font-medium text-slate-700">900 018 018</span>
            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">24/7</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
