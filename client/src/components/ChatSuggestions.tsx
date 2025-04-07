import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatSuggestions() {
  const { sendMessage } = useContext(ChatContext);

  // Expanded set of suggestions with emojis
  const suggestions = [
    { text: "Sí, pero no me han ayudado", icon: "🙁" },
    { text: "No, me da miedo decirlo", icon: "😨" },
    { text: "¿Qué puedo hacer yo mismo?", icon: "🤔" },
    { text: "¿Cómo puedo ayudar a un amigo?", icon: "🤝" },
    { text: "Cuéntame más sobre el bullying", icon: "📚" }
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-6 mb-2 animate-fadeIn">
      {suggestions.map((suggestion, index) => (
        <button 
          key={index}
          onClick={() => sendMessage(suggestion.text)}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white py-3 px-5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md flex items-center space-x-2"
        >
          <span className="text-lg">{suggestion.icon}</span>
          <span>{suggestion.text}</span>
        </button>
      ))}
    </div>
  );
}
