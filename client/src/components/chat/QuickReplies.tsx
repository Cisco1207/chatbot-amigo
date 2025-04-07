interface QuickRepliesProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 ml-10 animate-fade-in">
      {options.map((option, index) => (
        <button
          key={`${option}-${index}`}
          className="option-button bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary font-semibold py-2 px-4 rounded-full text-sm transition-colors"
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
