interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
}

export default function ChatMessage({ content, sender }: ChatMessageProps) {
  if (sender === 'user') {
    return (
      <div className="flex items-start justify-end">
        <div className="bg-secondary text-white p-3 rounded-lg chat-bubble-user max-w-[80%]">
          <p>{content}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center text-foreground ml-2">
          <span className="material-icons text-sm">person</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white mr-2">
        <span className="material-icons text-sm">smart_toy</span>
      </div>
      <div className="bg-primary text-white p-3 rounded-lg chat-bubble-bot max-w-[80%]">
        <p>{content}</p>
      </div>
    </div>
  );
}
