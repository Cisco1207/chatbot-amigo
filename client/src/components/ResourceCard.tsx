interface ResourceCardProps {
  title: string;
  description: string;
  bgColor: string;
  icon: string;
}

export default function ResourceCard({ title, description, bgColor, icon }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className={`h-40 ${bgColor} relative flex items-center justify-center`}>
        <span className="material-icons text-white text-6xl">{icon}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-foreground mb-3">{description}</p>
        <button className="text-primary font-medium flex items-center text-sm hover:underline">
          <span>Leer más</span>
          <span className="material-icons text-sm ml-1">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
