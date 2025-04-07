import { ReactNode } from "react";

interface LearnCardProps {
  title: string;
  content: ReactNode;
  borderColor: string;
}

export default function LearnCard({ title, content, borderColor }: LearnCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className={`p-4 border-l-4 ${borderColor}`}>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        {content}
      </div>
    </div>
  );
}
