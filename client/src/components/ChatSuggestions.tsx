import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

export default function ChatSuggestions() {
  const { sendMessage } = useContext(ChatContext);

  // Expanded set of suggestions with emojis
  const suggestions = [
    { text: "Sí, pero no me han ayudado", icon: "sentiment_dissatisfied" },
    { text: "No, me da miedo decirlo", icon: "psychology" },
    { text: "¿Qué puedo hacer yo mismo?", icon: "self_improvement" },
    { text: "¿Cómo puedo ayudar a un amigo?", icon: "diversity_1" },
    { text: "Cuéntame más sobre el bullying", icon: "menu_book" }
  ];

  return (
    <div className="py-4 animate-fadeIn">
      <div className="text-xs uppercase text-slate-400 font-semibold mb-3 flex items-center">
        <span className="material-icons text-xs mr-1">menu</span>
        Preguntas sugeridas
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <button 
            key={index}
            onClick={() => sendMessage(suggestion.text)}
            className="group bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 text-slate-700 hover:text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-start gap-3 text-left"
          >
            <div className="w-8 h-8 bg-blue-100 group-hover:bg-white/20 rounded-lg flex items-center justify-center shrink-0 transition-colors">
              <span className="material-icons text-blue-500 group-hover:text-white text-xl transition-colors">{suggestion.icon}</span>
            </div>
            <span>{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
