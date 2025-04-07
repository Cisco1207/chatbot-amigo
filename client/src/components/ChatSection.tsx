import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "@/context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatSuggestions from "./ChatSuggestions";

export default function ChatSection() {
  const { messages, isLoading } = useContext(ChatContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg p-6 mb-6 border border-purple-200 animate-fadeIn">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white mr-3 shadow-md">
            <span className="material-icons">smart_toy</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">¡Hola! Soy tu ChatAmigo</h2>
            <p className="text-sm text-purple-500">¡Estoy aquí para ayudarte! 🤗</p>
          </div>
        </div>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          Puedes hablar conmigo sobre cualquier situación de bullying. Ya sea que lo estés viviendo o viendo suceder a otros, 
          estoy aquí para escucharte y darte consejos.
        </p>
        
        <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-purple-100">
          <span className="material-icons text-pink-500 mr-3">privacy_tip</span>
          <p className="text-sm text-gray-600">Este chat es <strong>privado y seguro</strong>. No almacenamos tus datos personales. 
          Puedes hablar con confianza.</p>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="mb-6 space-y-2 bg-gradient-to-b from-white to-purple-50 p-5 rounded-2xl max-h-[400px] overflow-y-auto shadow-inner"
      >
        {isLoading && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 h-[200px]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white animate-bounce mb-3">
              <span className="material-icons">chat</span>
            </div>
            <span className="text-purple-500 font-medium">Iniciando conversación...</span>
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
