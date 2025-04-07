interface ChatMessageProps {
  text: string;
  sender: "user" | "bot";
}

export default function ChatMessage({ text, sender }: ChatMessageProps) {
  if (sender === "user") {
    return (
      <div className="flex items-start justify-end">
        <div className="message-bubble mr-2 bg-primary text-white p-3 rounded-xl rounded-tr-none shadow-soft max-w-[80%]">
          <p>{text}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent flex-shrink-0 flex items-center justify-center">
          <i className="fas fa-user text-sm text-white"></i>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white">
        <i className="fas fa-robot text-sm"></i>
      </div>
      <div className="message-bubble ml-2 bg-white p-3 rounded-xl rounded-tl-none shadow-soft max-w-[80%]">
        <p className="text-neutral-800">{text}</p>
      </div>
    </div>
  );
}
