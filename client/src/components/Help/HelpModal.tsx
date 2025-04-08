import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function HelpModal() {
  const { showHelpModal, toggleHelpModal } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Dialog open={showHelpModal} onOpenChange={toggleHelpModal}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-primary text-center text-xl flex items-center justify-center">
            <span className="material-icons mr-2">help_center</span>
            Centro de Ayuda
          </DialogTitle>
          <DialogDescription className="text-center">
            Encuentra respuestas a tus preguntas sobre cómo usar AmigBot
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="recursos">Recursos</TabsTrigger>
            <TabsTrigger value="reportar">Reportar</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[400px] pr-4">
            <TabsContent value="general">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Qué es AmigBot?</h3>
                  <p className="text-gray-700">
                    AmigBot es una plataforma diseñada para ayudar a los estudiantes a prevenir y abordar situaciones de bullying. Ofrece recursos educativos, un chat de apoyo y herramientas para reportar incidentes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Cómo puedo navegar por la aplicación?</h3>
                  <p className="text-gray-700">
                    Puedes usar los iconos de navegación ubicados a la izquierda (en escritorio) o en la parte inferior (en dispositivos móviles) para moverte entre las diferentes secciones: Chat, Recursos, Reportar y Aprender.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Es seguro y confidencial?</h3>
                  <p className="text-gray-700">
                    Sí, AmigBot está diseñado para ser completamente seguro y confidencial. No almacenamos información personal sin tu consentimiento y todos los reportes se manejan con la máxima confidencialidad.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Para qué sirve crear una cuenta?</h3>
                  <p className="text-gray-700">
                    Crear una cuenta te permite guardar tus conversaciones con AmigBot, acceder a recursos exclusivos, recibir notificaciones sobre nuevos contenidos y participar en la comunidad.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Cómo funciona el chat?</h3>
                  <p className="text-gray-700">
                    Puedes escribir mensajes en el chat para conversar con AmigBot. El sistema está diseñado para proporcionar apoyo emocional, consejos y recursos relacionados con situaciones de bullying.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Con quién estoy hablando?</h3>
                  <p className="text-gray-700">
                    Estás hablando con un sistema automatizado diseñado para proporcionar información y apoyo. No es una persona real, pero está programado para ser amigable y útil.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Qué puedo preguntar?</h3>
                  <p className="text-gray-700">
                    Puedes hacer preguntas sobre bullying, cómo prevenirlo, cómo actuar si eres testigo o víctima, o cualquier tema relacionado con la convivencia escolar y las relaciones entre compañeros.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Se guardan mis conversaciones?</h3>
                  <p className="text-gray-700">
                    Las conversaciones se guardan temporalmente para mejorar tu experiencia durante la sesión. Si deseas guardar tus conversaciones permanentemente, puedes crear una cuenta.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recursos">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Qué tipo de recursos ofrece AmigBot?</h3>
                  <p className="text-gray-700">
                    AmigBot ofrece artículos, videos, infografías y guías prácticas sobre prevención del bullying, habilidades sociales, manejo de emociones y estrategias para una convivencia escolar positiva.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Cómo encuentro recursos específicos?</h3>
                  <p className="text-gray-700">
                    Puedes explorar las diferentes categorías en la sección de Recursos o usar la búsqueda para encontrar contenido específico según tus necesidades.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Puedo compartir estos recursos?</h3>
                  <p className="text-gray-700">
                    Sí, te animamos a compartir los recursos con amigos, compañeros, profesores o familiares que puedan beneficiarse de esta información.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Los recursos se actualizan?</h3>
                  <p className="text-gray-700">
                    Sí, nuestro equipo actualiza regularmente los recursos para garantizar que la información sea precisa, relevante y útil para todos los usuarios.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reportar">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Cómo puedo reportar un incidente?</h3>
                  <p className="text-gray-700">
                    Ve a la sección "Reportar" y completa el formulario proporcionando los detalles del incidente. Puedes especificar el tipo de bullying y una descripción de la situación.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Qué sucede después de enviar un reporte?</h3>
                  <p className="text-gray-700">
                    Los reportes son revisados por personal capacitado que evaluará la situación y tomará las medidas adecuadas, siempre priorizando la seguridad y el bienestar de los estudiantes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Debo incluir nombres en mi reporte?</h3>
                  <p className="text-gray-700">
                    No es necesario incluir nombres completos si no te sientes cómodo. Proporciona la información con la que te sientas seguro compartiendo, pero recuerda que incluir detalles puede ayudar a resolver la situación.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">¿Cómo sé que mi reporte fue recibido?</h3>
                  <p className="text-gray-700">
                    Recibirás una confirmación inmediata en la aplicación después de enviar tu reporte. Si proporcionaste un correo electrónico, también recibirás una confirmación por esa vía.
                  </p>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <DialogFooter>
          <div className="w-full mt-6 flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => window.open("mailto:soporte@amigbot.do", "_blank")}
              className="flex items-center"
            >
              <span className="material-icons text-sm mr-1.5">email</span>
              Contactar Soporte
            </Button>
            
            <Button 
              onClick={toggleHelpModal} 
              className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-md transition-all duration-300 hover:shadow-lg rounded-xl relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Entendido</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}