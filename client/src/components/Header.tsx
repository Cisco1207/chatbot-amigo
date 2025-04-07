import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function Header() {
  const { toggleHelpModal } = useContext(AppContext);

  return (
    <header className="bg-primary shadow-soft">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center text-white mr-3">
            <span className="material-icons">forum</span>
          </div>
          <h1 className="text-white text-xl font-bold">ChatAmigo</h1>
        </div>
        <button 
          onClick={toggleHelpModal}
          className="text-white p-2 rounded-full hover:bg-primary-dark transition"
          aria-label="Ayuda"
        >
          <span className="material-icons">help_outline</span>
        </button>
      </div>
    </header>
  );
}
