import React, { createContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { getChatbotResponse } from "@/lib/chatLogic";

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
}

interface ChatContextType {
  messages: ChatMessage[];
  quickReplies: string[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
}

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  quickReplies: [],
  sendMessage: () => {},
  isLoading: false
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "¡Hola! Soy tu asistente contra el bullying. Estoy aquí para escucharte, ayudarte y brindarte recursos útiles. ¿En qué puedo ayudarte hoy?",
      sender: "bot"
    }
  ]);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "¿Qué es el bullying?",
    "Estoy sufriendo bullying",
    "Quiero ayudar a un amigo",
    "Soy testigo de bullying",
    "¿Cómo prevengo el bullying?"
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId] = useState<string>(uuidv4());

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = { content, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    
    // Set loading
    setIsLoading(true);

    // Short timeout to simulate processing
    setTimeout(() => {
      // Generate bot response
      const botResponse = getChatbotResponse(content);
      
      // Add bot response
      const botMessage: ChatMessage = { content: botResponse, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
      
      // Update quick replies based on context
      updateQuickReplies(content, botResponse);
      
      // Clear loading state
      setIsLoading(false);
    }, 600);
  };
  
  // Function to update quick replies based on conversation context
  const updateQuickReplies = (userMessage: string, botResponse: string) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    
    // Specific quick replies for different contexts
    if (lowerCaseMsg.includes("bullying físico") || 
        lowerCaseMsg.includes("golpea") || 
        lowerCaseMsg.includes("empuja")) {
      setQuickReplies([
        "¿Debo defenderme físicamente?",
        "¿Cómo puedo evitar estos encuentros?",
        "¿Debo decirle a mis padres?",
        "Tengo miedo de ir a la escuela"
      ]);
    } 
    else if (lowerCaseMsg.includes("cyber") || 
             lowerCaseMsg.includes("internet") || 
             lowerCaseMsg.includes("redes sociales")) {
      setQuickReplies([
        "¿Debo eliminar mis redes sociales?",
        "¿Cómo bloqueo a alguien?",
        "¿Debo reportarlo?",
        "¿Cómo guardo evidencia?"
      ]);
    }
    else if (lowerCaseMsg.includes("amigo") || 
             lowerCaseMsg.includes("ayudar")) {
      setQuickReplies([
        "¿Cómo puedo ayudar sin involucrarme?",
        "¿Debo hablar con un adulto?",
        "Mi amigo no quiere ayuda",
        "¿Qué hago si el bullying es grave?"
      ]);
    }
    else if (lowerCaseMsg.includes("qué es") || 
             lowerCaseMsg.includes("definición")) {
      setQuickReplies([
        "¿Qué tipos de bullying existen?",
        "¿Cómo identifico el bullying?",
        "¿Por qué ocurre el bullying?",
        "¿Puedo sufrir bullying sin darme cuenta?"
      ]);
    }
    else if (lowerCaseMsg.includes("hola") || 
             lowerCaseMsg.includes("saludos") || 
             lowerCaseMsg.includes("buenos días")) {
      setQuickReplies([
        "¿Qué es el bullying?",
        "Estoy sufriendo bullying",
        "Quiero ayudar a un amigo",
        "Soy testigo de bullying",
        "¿Cómo prevengo el bullying?"
      ]);
    }
    else {
      // Default quick replies if no specific context
      setQuickReplies([
        "¿Qué puedo hacer si sufro bullying?",
        "¿Cómo puedo ayudar a un amigo?",
        "¿Qué es el cyberbullying?",
        "Necesito ayuda urgente",
        "¿Puedo hablar con alguien más?"
      ]);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      quickReplies,
      sendMessage,
      isLoading
    }}>
      {children}
    </ChatContext.Provider>
  );
};
