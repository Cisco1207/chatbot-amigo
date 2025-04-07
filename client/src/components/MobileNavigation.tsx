import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function MobileNavigation() {
  const { activeSection, setActiveSection } = useContext(AppContext);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-soft flex justify-around p-2 z-10">
      <button 
        onClick={() => setActiveSection('chat')}
        className={`flex flex-col items-center py-1 px-3 ${
          activeSection === 'chat' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <span className="material-icons">chat</span>
        <span className="text-xs mt-1">Chat</span>
      </button>
      
      <button 
        onClick={() => setActiveSection('resources')}
        className={`flex flex-col items-center py-1 px-3 ${
          activeSection === 'resources' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <span className="material-icons">library_books</span>
        <span className="text-xs mt-1">Recursos</span>
      </button>
      
      <button 
        onClick={() => setActiveSection('report')}
        className={`flex flex-col items-center py-1 px-3 ${
          activeSection === 'report' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <span className="material-icons">report_problem</span>
        <span className="text-xs mt-1">Reportar</span>
      </button>
      
      <button 
        onClick={() => setActiveSection('learn')}
        className={`flex flex-col items-center py-1 px-3 ${
          activeSection === 'learn' ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <span className="material-icons">school</span>
        <span className="text-xs mt-1">Aprender</span>
      </button>
    </nav>
  );
}
