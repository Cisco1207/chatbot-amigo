import { useEffect } from "react";
import Learn from "@/pages/Learn";

export default function LearnPage() {
  useEffect(() => {
    // Establecer el título de la página
    document.title = "AmigBot - Aprender";
  }, []);

  return (
    <div className="w-full h-full">
      <Learn />
    </div>
  );
}