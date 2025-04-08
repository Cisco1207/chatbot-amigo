import { useEffect } from "react";
import Report from "@/pages/Report";

interface ReportPageProps {
  sessionId: string;
}

export default function ReportPage({ sessionId }: ReportPageProps) {
  useEffect(() => {
    // Establecer el título de la página
    document.title = "AmigBot - Reportar Bullying";
  }, []);

  return (
    <div className="w-full h-full">
      <Report sessionId={sessionId} />
    </div>
  );
}