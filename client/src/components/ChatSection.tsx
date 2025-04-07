import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "@/context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatSuggestions from "./ChatSuggestions";

export default function ChatSection() {
  const { messages, isLoading } = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-soft p-4 mb-4">
        <h2 className="text-xl font-bold text-primary mb-2">¡Hola! Soy tu ChatAmigo</h2>
        <p className="mb-4">Estoy aquí para ayudarte con cualquier situación de bullying. Puedes hablar conmigo sobre lo que estás experimentando o presenciando, y te ofreceré consejos e información.</p>
        <div className="flex items-center p-3 bg-background rounded-lg">
          <span className="material-icons text-primary mr-3">privacy_tip</span>
          <p className="text-sm">Este chat es privado y no almacena tus datos personales. Siéntete seguro para hablar.</p>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="mb-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-4">
            <span className="material-icons animate-spin">sync</span>
            <span className="ml-2">Cargando mensajes...</span>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                content={message.content} 
                sender={message.sender}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
        
        {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && (
          <ChatSuggestions />
        )}
      </div>

      <ChatInput />
    </div>
  );
}
