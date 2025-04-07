import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Navigation() {
  const { activeSection, setActiveSection } = useContext(AppContext);

  return (
    <nav className="hidden md:block w-64 bg-white shadow-soft p-4">
      <div className="mb-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">MENÚ</p>
        <ul>
          <li className="mb-1">
            <button 
              onClick={() => setActiveSection('chat')}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeSection === 'chat' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-background transition'
              }`}
            >
              <span className="material-icons mr-3">chat</span>
              <span className="font-medium">Chat</span>
            </button>
          </li>
          
          <li className="mb-1">
            <button 
              onClick={() => setActiveSection('resources')}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeSection === 'resources' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-background transition'
              }`}
            >
              <span className="material-icons mr-3">library_books</span>
              <span className="font-medium">Recursos</span>
            </button>
          </li>
          
          <li className="mb-1">
            <button 
              onClick={() => setActiveSection('report')}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeSection === 'report' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-background transition'
              }`}
            >
              <span className="material-icons mr-3">report_problem</span>
              <span className="font-medium">Reportar</span>
            </button>
          </li>
          
          <li className="mb-1">
            <button 
              onClick={() => setActiveSection('learn')}
              className={`w-full flex items-center p-3 rounded-lg ${
                activeSection === 'learn' 
                  ? 'bg-primary text-white' 
                  : 'text-foreground hover:bg-background transition'
              }`}
            >
              <span className="material-icons mr-3">school</span>
              <span className="font-medium">Aprender</span>
            </button>
          </li>
        </ul>
      </div>
      
      <div className="mt-auto">
        <div className="p-4 bg-background rounded-lg">
          <h3 className="font-bold text-primary mb-2">¿Necesitas ayuda?</h3>
          <p className="text-sm mb-3">Si necesitas hablar con alguien, estas líneas están disponibles 24/7.</p>
          <div className="text-sm font-medium">
            <div className="flex items-center mb-1">
              <span className="material-icons text-primary mr-2 text-sm">phone</span>
              <span>Línea Nacional: 900 018 018</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
