import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ReportSection() {
  const { toast } = useToast();
  const [reportData, setReportData] = useState({
    reportType: "",
    location: "",
    description: "",
    name: ""
  });

  const reportMutation = useMutation({
    mutationFn: async (data: typeof reportData) => {
      const res = await apiRequest("POST", "/api/reports", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Reporte enviado",
        description: "Gracias por tu reporte. Un equipo de profesionales lo revisará.",
        variant: "default",
      });
      // Reset form
      setReportData({
        reportType: "",
        location: "",
        description: "",
        name: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Error al enviar reporte",
        description: "Por favor, intenta de nuevo más tarde.",
        variant: "destructive",
      });
      console.error("Error submitting report:", error);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setReportData(prev => ({
      ...prev,
      [id.replace('report-', '')]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportMutation.mutate(reportData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">Reportar una Situación</h2>
        <p className="mb-4">Si estás experimentando o presenciando una situación de bullying, puedes reportarla aquí. Tu información será tratada con confidencialidad.</p>
        <div className="flex items-center p-3 bg-background rounded-lg">
          <span className="material-icons text-primary mr-3">privacy_tip</span>
          <p className="text-sm">Este formulario es privado. No necesitas incluir tu nombre si no lo deseas.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-4">
        <form id="report-form" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="report-reportType" className="block text-sm font-medium mb-1">Tipo de situación</label>
            <select 
              id="report-reportType" 
              value={reportData.reportType}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-input rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Selecciona una opción</option>
              <option value="verbal">Bullying verbal (insultos, burlas)</option>
              <option value="physical">Bullying físico (golpes, empujones)</option>
              <option value="social">Bullying social (exclusión, rumores)</option>
              <option value="cyber">Cyberbullying (mensajes, redes sociales)</option>
              <option value="other">Otro tipo</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="report-location" className="block text-sm font-medium mb-1">¿Dónde ocurre?</label>
            <select 
              id="report-location" 
              value={reportData.location}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-input rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">Selecciona una opción</option>
              <option value="classroom">En el aula</option>
              <option value="playground">En el patio/recreo</option>
              <option value="hallways">En los pasillos</option>
              <option value="online">En internet/redes sociales</option>
              <option value="other">Otro lugar</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="report-description" className="block text-sm font-medium mb-1">Describe la situación</label>
            <textarea 
              id="report-description" 
              rows={4} 
              value={reportData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-input rounded-lg focus:outline-none focus:border-primary"
              placeholder="Cuéntanos qué está pasando..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="report-name" className="block text-sm font-medium mb-1">¿Quieres compartir tu nombre? (opcional)</label>
            <input 
              type="text" 
              id="report-name" 
              value={reportData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-input rounded-lg focus:outline-none focus:border-primary"
              placeholder="Tu nombre (opcional)"
            />
          </div>
          
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="bg-destructive text-white py-2 px-6 rounded-lg hover:bg-destructive/90 transition flex items-center"
              disabled={reportMutation.isPending}
            >
              {reportMutation.isPending ? (
                <>
                  <span className="material-icons animate-spin mr-2">sync</span>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span className="material-icons mr-2">send</span>
                  <span>Enviar Reporte</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
