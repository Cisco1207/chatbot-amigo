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
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-slate-100 animate-fadeIn relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-teal-50 rounded-bl-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50 to-teal-100 rounded-tr-full opacity-70"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white mr-4 shadow-lg transform rotate-3">
              <span className="material-icons text-2xl">sentiment_satisfied_alt</span>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text tracking-tight">¡Hola! Soy tu ChatAmigo</h2>
              <div className="flex items-center text-slate-500 mt-1">
                <span className="text-sm">¡Estoy aquí para ayudarte! </span>
                <span className="material-icons text-amber-400 ml-1 text-sm animate-bounce">favorite</span>
              </div>
            </div>
          </div>
          
          <p className="mb-5 text-slate-700 leading-relaxed relative z-10 text-lg">
            Puedes hablar conmigo sobre cualquier situación de bullying. Ya sea que lo estés viviendo o viendo suceder a otros, 
            estoy aquí para escucharte y darte consejos.
          </p>
          
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-sm border border-blue-100">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="material-icons text-blue-500">security</span>
            </div>
            <div>
              <p className="text-sm text-slate-700">Este chat es <strong>completamente privado</strong>. No almacenamos tus datos personales.</p>
              <p className="text-xs text-slate-500 mt-1">Puedes hablar con total confianza.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="mb-6 space-y-3 bg-white p-5 rounded-2xl max-h-[450px] overflow-y-auto shadow-md border border-slate-100 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 left-0 h-6 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 left-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>
        
        {isLoading && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 h-[280px]">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-lg mb-4 animate-pulse">
                <span className="material-icons text-2xl">chat</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-white text-xs animate-bounce">
                <span className="material-icons text-xs">bolt</span>
              </div>
            </div>
            <span className="text-blue-600 font-medium mb-2">Iniciando conversación...</span>
            <span className="text-slate-400 text-sm text-center max-w-[220px]">Estoy preparando todo para ayudarte con cualquier situación</span>
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
