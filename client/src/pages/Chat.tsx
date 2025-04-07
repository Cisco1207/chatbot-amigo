import { useEffect } from "react";
import ChatArea from "@/components/chat/ChatArea";

interface ChatProps {
  sessionId: string;
}

export default function Chat({ sessionId }: ChatProps) {
  useEffect(() => {
    document.title = "AmigBot - Chat";
  }, []);

  return (
    <div className="h-full flex flex-col">
      <ChatArea sessionId={sessionId} />
    </div>
  );
}
