import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatSuggestions() {
  const { sendMessage } = useContext(ChatContext);

  const suggestions = [
    "Sí, pero no me han ayudado",
    "No, me da miedo decirlo",
    "¿Qué puedo hacer yo mismo?"
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {suggestions.map((suggestion, index) => (
        <button 
          key={index}
          onClick={() => sendMessage(suggestion)}
          className="bg-muted hover:bg-background text-foreground py-2 px-4 rounded-full text-sm transition"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
