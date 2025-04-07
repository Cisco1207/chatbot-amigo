import ResourceCard from "./ResourceCard";

export default function ResourcesSection() {
  const resources = [
    {
      id: 1,
      title: "Guía para Estudiantes",
      description: "Aprende a identificar el bullying y estrategias para enfrentarlo de manera segura.",
      bgColor: "bg-primary-light",
      icon: "school"
    },
    {
      id: 2,
      title: "Cómo Ser un Buen Aliado",
      description: "Consejos para ayudar a compañeros que están sufriendo bullying de forma segura.",
      bgColor: "bg-secondary-light",
      icon: "people"
    },
    {
      id: 3,
      title: "Actividades en Grupo",
      description: "Actividades para fomentar un ambiente de respeto en el aula y prevenir el bullying.",
      bgColor: "bg-accent-light",
      icon: "groups"
    },
    {
      id: 4,
      title: "Construyendo Amistades Saludables",
      description: "Consejos para crear y mantener relaciones positivas con tus compañeros.",
      bgColor: "bg-primary-light",
      icon: "favorite"
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">Recursos contra el Bullying</h2>
        <p>Aquí encontrarás información útil para entender, prevenir y enfrentar situaciones de bullying.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map(resource => (
          <ResourceCard 
            key={resource.id}
            title={resource.title}
            description={resource.description}
            bgColor={resource.bgColor}
            icon={resource.icon}
          />
        ))}
      </div>
    </div>
  );
}
