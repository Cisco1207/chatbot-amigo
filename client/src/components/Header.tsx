import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Header() {
  const { toggleHelpModal } = useContext(AppContext);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-90">
      <div className="container mx-auto py-3 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white mr-3 shadow-md">
            <span className="material-icons animate-pulse">child_care</span>
          </div>
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 text-xl font-extrabold tracking-tight">ChatAmigo</h1>
            <span className="text-xs text-slate-500 font-medium">Tu asistente contra el bullying</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleHelpModal}
            className="flex items-center gap-1 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition border border-slate-200 shadow-sm text-sm font-medium"
            aria-label="Ayuda"
          >
            <span className="material-icons text-sm">help_outline</span>
            <span>Ayuda</span>
          </button>
        </div>
      </div>
    </header>
  );
}
