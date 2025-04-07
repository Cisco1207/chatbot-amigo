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
  sendMessage: (content: string) => void;
  isLoading: boolean;
}

export const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: () => {},
  isLoading: false
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
        })
        .catch(error => {
          console.error("Error getting session ID:", error);
          // Fallback to client-side generated ID
          const newId = uuidv4();
          setSessionId(newId);
          localStorage.setItem("chatSessionId", newId);
        });
    }
  }, []);

  // Fetch messages for existing session
  const { isLoading: isLoadingMessages } = useQuery({
    queryKey: [`/api/chat/${sessionId}`],
    enabled: !!sessionId,
    onSuccess: (data: ChatMessage[]) => {
      if (data && data.length > 0) {
        setMessages(data);
      } else {
        // Add initial bot message if no messages exist
        setMessages([
          {
            content: "¡Hola! Puedes hablar conmigo sobre cualquier situación de bullying que estés viviendo o viendo. ¿En qué puedo ayudarte hoy?",
            sender: "bot"
          }
        ]);
      }
    },
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
        }
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        // Add fallback bot response on error
        setMessages(prev => [...prev, {
          content: "Lo siento, estoy teniendo problemas para responder. Por favor, intenta de nuevo más tarde.",
          sender: "bot"
        }]);
      }
    });
  }, [sessionId, messageMutation]);

  return (
    <ChatContext.Provider value={{
      messages,
      sendMessage,
      isLoading: isLoadingMessages || messageMutation.isPending
    }}>
      {children}
    </ChatContext.Provider>
  );
};
