import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function HelpModal() {
  const { toggleHelpModal } = useContext(AppContext);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleHelpModal();
      }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">¿Cómo usar ChatAmigo?</h2>
          <button 
            onClick={toggleHelpModal} 
            className="text-muted-foreground hover:text-foreground"
            aria-label="Cerrar"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-primary mb-1">Chat</h3>
            <p className="text-sm">Conversa con ChatAmigo sobre situaciones de bullying. Puedes hacer preguntas o compartir experiencias para recibir consejos.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-primary mb-1">Recursos</h3>
            <p className="text-sm">Explora artículos y guías útiles sobre cómo prevenir y enfrentar el bullying.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-primary mb-1">Reportar</h3>
            <p className="text-sm">Informa de manera segura y confidencial sobre situaciones de bullying que estés experimentando o presenciando.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-primary mb-1">Aprender</h3>
            <p className="text-sm">Infórmate sobre los diferentes tipos de bullying, cómo identificarlos y cómo actuar.</p>
          </div>
        </div>
        
        <div className="mt-6 bg-background p-3 rounded-lg">
          <p className="text-sm font-medium">¿Emergencia?</p>
          <p className="text-sm">Si tú o alguien que conoces está en peligro inmediato, contacta a un adulto de confianza o llama a la línea de emergencia: <span className="font-medium">900 018 018</span></p>
        </div>
      </div>
    </div>
  );
}
