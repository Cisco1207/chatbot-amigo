import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { v4 as uuidv4 } from "uuid";

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      // Get a new session ID from the server
      fetch("/api/session/new")
        .then(res => res.json())
        .then(data => {
          setSessionId(data.sessionId);
          localStorage.setItem("chatSessionId", data.sessionId);
          
          // Add welcome message and initial quick replies
          if (data.welcomeMessage) {
            setMessages([{
              content: data.welcomeMessage,
              sender: "bot"
            }]);
          }
          
          if (data.quickReplies && Array.isArray(data.quickReplies)) {
            setQuickReplies(data.quickReplies);
          }
        })
        .catch(error => {
          console.error("Error getting session ID:", error);
          // Fallback to client-side generated ID
          const newId = uuidv4();
          setSessionId(newId);
          localStorage.setItem("chatSessionId", newId);
          
          // Add default welcome message and quick replies
          setMessages([{
            content: "¡Hola! Soy tu asistente contra el bullying. ¿En qué puedo ayudarte hoy?",
            sender: "bot"
          }]);
          
          setQuickReplies([
            "¿Qué es el bullying?",
            "Estoy sufriendo bullying",
            "Quiero ayudar a un amigo",
            "Soy testigo de bullying",
            "¿Cómo prevengo el bullying?"
          ]);
        });
    }
  }, []);

  // Fetch messages for existing session
  const { isLoading: isLoadingMessages } = useQuery({
    queryKey: [`/api/chat/${sessionId}`],
    enabled: !!sessionId,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    select: (data: ChatMessage[]) => data,
    onSettled: (data: ChatMessage[] | undefined) => {
      if (data && data.length > 0) {
        setMessages(data);
      } else {
        // Add initial bot message if no messages exist and no welcome message was set
        if (messages.length === 0) {
          setMessages([
            {
              content: "¡Hola! Puedes hablar conmigo sobre cualquier situación de bullying que estés viviendo o viendo. ¿En qué puedo ayudarte hoy?",
              sender: "bot"
            }
          ]);
          
          setQuickReplies([
            "¿Qué es el bullying?",
            "Estoy sufriendo bullying",
            "Quiero ayudar a un amigo",
            "Soy testigo de bullying",
            "¿Cómo prevengo el bullying?"
          ]);
        }
      }
    }
  });

  const messageMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", "/api/chat", {
        sessionId,
        content,
        sender: "user"
      });
      return res.json();
    },
  });

  const sendMessage = useCallback((content: string) => {
    if (!sessionId) return;

    // Optimistically update UI
    const userMessage: ChatMessage = { content, sender: "user" };
    setMessages(prev => [...prev, userMessage]);

    // Send to server
    messageMutation.mutate(content, {
      onSuccess: (data) => {
        if (data.botMessage) {
          setMessages(prev => [...prev, {
            content: data.botMessage.content,
            sender: "bot"
          }]);
          
          // Update quick replies if available
          if (data.quickReplies && Array.isArray(data.quickReplies)) {
            setQuickReplies(data.quickReplies);
          }
        }
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        // Add fallback bot response on error
        setMessages(prev => [...prev, {
          content: "Lo siento, estoy teniendo problemas para responder. Por favor, intenta de nuevo más tarde.",
          sender: "bot"
        }]);
        
        // Set fallback quick replies
        setQuickReplies([
          "¿Puedes intentar otra vez?",
          "¿Qué es el bullying?",
          "Necesito ayuda urgente"
        ]);
      }
    });
  }, [sessionId, messageMutation]);

  // Handle greeting messages (like "hola") client-side for instant response 
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      const greetings = ['hola', 'hello', 'hi', 'hey', 'saludos', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal'];
      const normalizedContent = lastMessage.content.toLowerCase().trim();
      
      const isGreeting = greetings.some(greeting => normalizedContent.startsWith(greeting));
      
      // If it's a simple greeting, immediately show a response before server responds
      if (isGreeting && !messageMutation.isPending) {
        const greetingResponse = "¡Hola! Soy tu asistente contra el bullying. ¿En qué puedo ayudarte hoy?";
        
        // Only add the immediate response if we haven't already added a bot message
        const lastTwoMessages = messages.slice(-2);
        if (!(lastTwoMessages.length > 1 && lastTwoMessages[0].sender === 'user' && lastTwoMessages[1].sender === 'bot')) {
          setMessages(prev => [...prev, {
            content: greetingResponse,
            sender: "bot"
          }]);
        }
      }
    }
  }, [messages, messageMutation.isPending]);

  return (
    <ChatContext.Provider value={{
      messages,
      quickReplies,
      sendMessage,
      isLoading: isLoadingMessages || messageMutation.isPending
    }}>
      {children}
    </ChatContext.Provider>
  );
};
