import { useState, useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, isLoading } = useContext(ChatContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-3 sticky bottom-0 md:static">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 rounded-lg border border-input focus:outline-none focus:border-primary" 
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="ml-2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? (
            <span className="material-icons animate-spin">sync</span>
          ) : (
            <span className="material-icons">send</span>
          )}
        </button>
      </form>
    </div>
  );
}
