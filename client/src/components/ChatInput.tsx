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
    <div className="bg-white rounded-xl shadow-lg p-4 sticky bottom-0 md:static border-t border-purple-100 animate-fadeIn">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="flex-grow relative">
          <input 
            ref={inputRef}
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 pl-4 rounded-full border-2 border-purple-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-purple-200 transition-all duration-200" 
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
          />
          {/* Decorative elements */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 hidden">
            <span className="material-icons">mood</span>
          </div>
        </div>
        <button 
          type="submit" 
          className="ml-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? (
            <span className="material-icons animate-spin">sync</span>
          ) : (
            <span className="material-icons">send</span>
          )}
        </button>
      </form>
      <div className="text-xs text-center mt-2 text-gray-400">
        Recuerda que puedes preguntarme cualquier cosa sobre el bullying 💜
      </div>
    </div>
  );
}
