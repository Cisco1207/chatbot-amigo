interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
}

export default function ChatMessage({ content, sender }: ChatMessageProps) {
  if (sender === 'user') {
    return (
      <div className="flex items-start justify-end mb-4 animate-fadeIn group">
        <div className="max-w-[80%]">
          <div className="flex justify-end mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-slate-400 mr-2">Tú</span>
          </div>
          <div className="flex items-start">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-4 rounded-2xl rounded-tr-none chat-bubble-user shadow-md relative">
              <div className="absolute inset-0 bg-white opacity-10 rounded-2xl rounded-tr-none"></div>
              <p className="leading-relaxed relative z-10">{content}</p>
              <div className="absolute right-1 bottom-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-xs text-white/70">✓✓</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex-shrink-0 flex items-center justify-center text-white ml-2 shadow-md transform rotate-3">
              <span className="material-icons">person</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start mb-5 animate-fadeIn group">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-green-400 flex-shrink-0 flex items-center justify-center text-white mr-2 shadow-md transform -rotate-3">
        <span className="material-icons">smart_toy</span>
      </div>
      <div className="max-w-[80%]">
        <div className="flex mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs text-slate-400 ml-2">ChatAmigo</span>
        </div>
        <div className="bg-gradient-to-r from-teal-500 to-green-400 text-white p-4 rounded-2xl rounded-tl-none chat-bubble-bot shadow-md relative">
          <div className="absolute inset-0 bg-white opacity-10 rounded-2xl rounded-tl-none"></div>
          <p className="leading-relaxed relative z-10">{content}</p>
        </div>
      </div>
    </div>
  );
}
