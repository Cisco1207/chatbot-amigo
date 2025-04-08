interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
}

export default function ChatMessage({ content, sender }: ChatMessageProps) {
  if (sender === 'user') {
    return (
      <div className="flex items-start justify-end mb-4 animate-fadeIn">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl rounded-tr-none chat-bubble-user max-w-[80%] shadow-lg">
          <p className="leading-relaxed">{content}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white ml-2 shadow-md">
          <span className="material-icons">face</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start mb-4 animate-fadeIn">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex-shrink-0 flex items-center justify-center text-white mr-2 shadow-md">
        <span className="material-icons">smart_toy</span>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-2xl rounded-tl-none chat-bubble-bot max-w-[80%] shadow-lg">
        <p className="leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
