import { useState, FormEvent } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

export default function ChatInput({ onSendMessage, isDisabled = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isDisabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white rounded-xl shadow-soft p-2"
    >
      <button
        type="button"
        className="p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
        title="Añadir archivo"
        disabled={isDisabled}
      >
        <i className="fas fa-paperclip"></i>
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border-none outline-none px-3 py-2 bg-transparent text-neutral-800 placeholder-neutral-400"
        placeholder="Escribe tu mensaje aquí..."
        disabled={isDisabled}
      />
      <button
        type="submit"
        className={`p-2 ${
          isDisabled
            ? "bg-neutral-300 cursor-not-allowed"
            : "bg-primary hover:bg-primary-dark"
        } text-white rounded-lg focus:outline-none transition-colors`}
        disabled={isDisabled}
      >
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
}
