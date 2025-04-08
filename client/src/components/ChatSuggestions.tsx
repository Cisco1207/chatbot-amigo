import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

// Map of icons for different question types
const getIconForQuestion = (question: string): string => {
  const normalizedQuestion = question.toLowerCase();
  
  if (normalizedQuestion.includes("bullying físico") || 
      normalizedQuestion.includes("golpea") || 
      normalizedQuestion.includes("empuja")) {
    return "front_hand";
  }
  
  if (normalizedQuestion.includes("bullying") && 
      (normalizedQuestion.includes("qué es") || normalizedQuestion.includes("definición"))) {
    return "help_outline";
  }
  
  if (normalizedQuestion.includes("ayuda") && normalizedQuestion.includes("amigo")) {
    return "diversity_1";
  }
  
  if (normalizedQuestion.includes("testigo") || normalizedQuestion.includes("vi ")) {
    return "visibility";
  }
  
  if (normalizedQuestion.includes("cyberbullying") || 
      normalizedQuestion.includes("internet") || 
      normalizedQuestion.includes("redes")) {
    return "phone_iphone";
  }
  
  if (normalizedQuestion.includes("miedo") || 
      normalizedQuestion.includes("asustado") || 
      normalizedQuestion.includes("ansiedad")) {
    return "psychology";
  }
  
  if (normalizedQuestion.includes("defenderse") || 
      normalizedQuestion.includes("defenderme") || 
      normalizedQuestion.includes("enfrentar")) {
    return "shield";
  }
  
  if (normalizedQuestion.includes("padres") || 
      normalizedQuestion.includes("profesor") || 
      normalizedQuestion.includes("adulto")) {
    return "supervisor_account";
  }
  
  if (normalizedQuestion.includes("sufro") || normalizedQuestion.includes("sufre")) {
    return "sentiment_very_dissatisfied";
  }
  
  if (normalizedQuestion.includes("prevenir") || normalizedQuestion.includes("prevengo")) {
    return "security";
  }
  
  // Default icon if no matches
  return "question_answer";
};

export default function ChatSuggestions() {
  const { sendMessage, quickReplies } = useContext(ChatContext);

  // If no quick replies are available, show default suggestions
  const displayQuickReplies = quickReplies.length > 0 ? quickReplies : [
    "¿Qué es el bullying?",
    "Estoy sufriendo bullying",
    "Quiero ayudar a un amigo",
    "Soy testigo de bullying",
    "¿Cómo puedo prevenir el bullying?"
  ];

  return (
    <div className="py-4 animate-fadeIn">
      <div className="text-xs uppercase text-slate-400 font-semibold mb-3 flex items-center">
        <span className="material-icons text-xs mr-1">tips_and_updates</span>
        Preguntas sugeridas
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {displayQuickReplies.map((question, index) => (
          <button 
            key={index}
            onClick={() => sendMessage(question)}
            className="group bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500 text-slate-700 hover:text-white py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md border border-slate-100 flex items-center justify-start gap-3 text-left"
          >
            <div className="w-8 h-8 bg-blue-100 group-hover:bg-white/20 rounded-lg flex items-center justify-center shrink-0 transition-colors">
              <span className="material-icons text-blue-500 group-hover:text-white text-xl transition-colors">
                {getIconForQuestion(question)}
              </span>
            </div>
            <span>{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
