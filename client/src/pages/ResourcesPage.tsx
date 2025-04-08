import { useEffect } from "react";
import Resources from "@/pages/Resources";

export default function ResourcesPage() {
  useEffect(() => {
    // Establecer el título de la página
    document.title = "AmigBot - Recursos";
  }, []);

  return (
    <div className="w-full h-full">
      <Resources />
    </div>
  );
}