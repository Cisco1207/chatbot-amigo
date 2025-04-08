import { useState, useContext, useEffect, useRef } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useContext(ChatContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sticky bottom-0 md:static border border-slate-100 animate-fadeIn">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-blue-50/30 rounded-xl pointer-events-none"></div>
      
      <form onSubmit={handleSubmit} className="flex items-center relative">
        <div className="flex-grow relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
            <span className="material-icons text-xl">chat</span>
          </span>
          <input 
            ref={inputRef}
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 pl-12 pr-4 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm text-slate-800" 
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
          />
          {message.trim() && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setMessage("")}
            >
              <span className="material-icons text-sm">cancel</span>
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="ml-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-teal-500 flex items-center justify-center"
          disabled={isLoading || !message.trim()}
          aria-label="Enviar mensaje"
        >
          {isLoading ? (
            <span className="material-icons animate-spin text-xl">sync</span>
          ) : (
            <span className="material-icons text-xl">send</span>
          )}
        </button>
      </form>
      
      <div className="flex items-center justify-center mt-3 text-xs text-slate-500 font-medium">
        <span className="material-icons text-blue-400 mr-1 text-sm">tips_and_updates</span>
        <span>Pregúntame cualquier cosa sobre el bullying</span>
        <span className="ml-1">✌️</span>
      </div>
    </div>
  );
}
