import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import ChatInput from "./ChatInput";
import ResourceCard from "../resources/ResourceCard";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
  sessionId: string;
}

interface Resource {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: string;
}

interface ChatAreaProps {
  sessionId: string;
}

export default function ChatArea({ sessionId }: ChatAreaProps) {
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Fetch messages for current session
  const { data: messages, isLoading } = useQuery({
    queryKey: [`/api/sessions/${sessionId}/messages`],
    enabled: !!sessionId
  });

  // Create a welcome message if this is a new session
  const createSessionMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/sessions", {});
    },
    onSuccess: (data) => {
      // Set initial quick replies
      if (data.initialResponse?.quickReplies) {
        setQuickReplies(data.initialResponse.quickReplies);
      }
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${sessionId}/messages`] });
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      return await apiRequest("POST", `/api/sessions/${sessionId}/messages`, { text: message });
    },
    onSuccess: (data) => {
      // Update quick replies and resources from response
      setQuickReplies(data.quickReplies || []);
      setCurrentResource(data.resource || null);
      queryClient.invalidateQueries({ queryKey: [`/api/sessions/${sessionId}/messages`] });
    }
  });

  useEffect(() => {
    // Check if there are no messages and create a new session if needed
    if (sessionId && messages && messages.length === 0) {
      createSessionMutation.mutate();
    }
  }, [sessionId, messages]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Show typing indicator
    setIsTyping(true);
    
    // Send message to the server
    sendMessageMutation.mutate(text, {
      onSettled: () => {
        // Hide typing indicator after response
        setTimeout(() => {
          setIsTyping(false);
        }, 500);
      }
    });
  };

  const handleQuickReplyClick = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="bg-neutral-50 flex-1 flex flex-col p-4 h-full">
      <div className="space-y-4 flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
        {/* Display messages */}
        {isLoading ? (
          <div className="flex justify-center p-4">
            <div className="animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full w-64 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full w-56 mb-2.5"></div>
            </div>
          </div>
        ) : (
          messages?.map((message: Message) => (
            <ChatMessage 
              key={message.id} 
              text={message.text} 
              sender={message.sender} 
            />
          ))
        )}
        
        {/* Display current resource if available */}
        {currentResource && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white">
              <i className="fas fa-robot text-sm"></i>
            </div>
            <div className="ml-2 max-w-md">
              <ResourceCard resource={currentResource} />
            </div>
          </div>
        )}
        
        {/* Display quick replies if available */}
        {quickReplies.length > 0 && (
          <QuickReplies 
            options={quickReplies} 
            onSelect={handleQuickReplyClick} 
          />
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white">
              <i className="fas fa-robot text-sm"></i>
            </div>
            <div className="message-bubble ml-2 bg-white p-3 rounded-xl rounded-tl-none shadow-soft">
              <div className="typing-indicator flex">
                <span className="w-2 h-2 bg-neutral-400 rounded-full mr-1 animate-bounce"></span>
                <span className="w-2 h-2 bg-neutral-400 rounded-full mr-1 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="mt-auto pt-2">
        <ChatInput onSendMessage={handleSendMessage} isDisabled={isTyping} />
        <p className="text-xs text-neutral-500 mt-2 text-center">
          AmigBot es confidencial. No guardamos tus datos personales.
        </p>
      </div>
    </div>
  );
}
