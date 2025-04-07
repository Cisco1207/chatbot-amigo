interface Resource {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: string;
}

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="message-bubble ml-0 bg-white p-3 rounded-xl rounded-tl-none shadow-soft w-full">
      <div className="border border-neutral-100 rounded-xl p-3 bg-neutral-50">
        <div className="flex items-center mb-2">
          <i className={`${resource.icon} text-secondary text-lg mr-2`}></i>
          <h3 className="font-bold text-neutral-800">{resource.title}</h3>
        </div>
        <p className="text-sm text-neutral-600 mb-2">
          {resource.content}
        </p>
        <button className="mt-3 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary-dark transition-colors w-full">
          Ver guía completa
        </button>
      </div>
    </div>
  );
}
