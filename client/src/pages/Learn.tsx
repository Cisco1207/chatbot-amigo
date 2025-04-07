import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Learn() {
  useEffect(() => {
    document.title = "AmigBot - Aprende";
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Aprende Sobre el Bullying</h1>
          <p className="text-neutral-600">
            Conocer más sobre el acoso escolar es el primer paso para prevenirlo y detenerlo.
          </p>
        </div>

        <Tabs defaultValue="tipos" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="tipos">Tipos de Bullying</TabsTrigger>
            <TabsTrigger value="senales">Señales de Alerta</TabsTrigger>
            <TabsTrigger value="efectos">Efectos</TabsTrigger>
          </TabsList>

          <TabsContent value="tipos" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <i className="fas fa-fist-raised text-primary text-xl mr-3"></i>
                  <CardTitle>Bullying Físico</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-700">
                  <p className="mb-2">
                    Es la forma más visible de acoso escolar, que incluye acciones como:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Golpear, empujar o zarandear</li>
                    <li>Dar patadas o puñetazos</li>
                    <li>Arrebatar, romper o esconder pertenencias</li>
                    <li>Tirar del pelo o pellizcar</li>
                  </ul>
                  <p>
                    Este tipo de bullying deja marcas visibles en la víctima, como moretones, rasguños o ropa dañada.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <i className="fas fa-comments text-primary text-xl mr-3"></i>
                  <CardTitle>Bullying Verbal</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-700">
                  <p className="mb-2">
                    Consiste en el uso de palabras para herir emocionalmente a otra persona:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Insultos y apodos ofensivos</li>
                    <li>Burlas o ridiculización</li>
                    <li>Amenazas e intimidación</li>
                    <li>Comentarios discriminatorios</li>
                  </ul>
                  <p>
                    Aunque no deja marcas físicas, el bullying verbal puede causar daños emocionales profundos y duraderos.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <i className="fas fa-user-friends text-primary text-xl mr-3"></i>
                  <CardTitle>Bullying Social</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-700">
                  <p className="mb-2">
                    Se refiere a formas de acoso dirigidas a dañar la reputación o relaciones sociales:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Exclusión deliberada de grupos o actividades</li>
                    <li>Difusión de rumores o chismes</li>
                    <li>Manipulación de relaciones de amistad</li>
                    <li>Humillación pública</li>
                  </ul>
                  <p>
                    Este tipo de bullying puede ser difícil de detectar pero causa sentimientos de aislamiento y rechazo.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center">
                  <i className="fas fa-mobile-alt text-primary text-xl mr-3"></i>
                  <CardTitle>Cyberbullying</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-700">
                  <p className="mb-2">
                    Es el acoso que ocurre a través de tecnologías digitales:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>Mensajes amenazantes o hirientes</li>
                    <li>Publicación de fotos o videos humillantes</li>
                    <li>Creación de perfiles falsos para acosar</li>
                    <li>Exclusión de grupos en línea</li>
                  </ul>
                  <p>
                    El cyberbullying puede ocurrir 24/7 y llegar a un público amplio rápidamente, lo que lo hace especialmente dañino.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="senales" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Señales de que alguien sufre bullying</CardTitle>
                <CardDescription>
                  Reconocer estas señales puede ayudar a identificar situaciones de acoso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Señales físicas</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Lesiones inexplicables (moretones, cortes)</li>
                      <li>Ropa, libros o pertenencias dañadas</li>
                      <li>Dolores de cabeza o estómago frecuentes</li>
                      <li>Cambios en los hábitos alimenticios</li>
                      <li>Dificultad para dormir o pesadillas</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Señales emocionales</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Pérdida de interés en actividades que disfrutaba</li>
                      <li>Baja autoestima y comentarios negativos sobre sí mismo</li>
                      <li>Cambios de humor repentinos</li>
                      <li>Comportamiento ansioso o temeroso</li>
                      <li>Expresiones de tristeza, soledad o desespero</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Señales sociales</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Evita ciertas situaciones o lugares (como recreos)</li>
                      <li>Pérdida repentina de amigos</li>
                      <li>Evita situaciones sociales o actividades escolares</li>
                      <li>Busca la compañía de adultos constantemente</li>
                      <li>Se aísla durante actividades grupales</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Señales académicas</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Disminución en el rendimiento escolar</li>
                      <li>Pérdida de interés en las tareas escolares</li>
                      <li>Faltas injustificadas a clases</li>
                      <li>Evita hablar sobre la escuela</li>
                      <li>Cambio en la actitud hacia los estudios</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="efectos" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Efectos del Bullying</CardTitle>
                <CardDescription>
                  El acoso escolar tiene consecuencias serias y duraderas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Efectos a corto plazo</h3>
                    <Separator className="my-2" />
                    <p className="mb-3 text-neutral-700">
                      Las consecuencias inmediatas del bullying pueden incluir:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                      <li>Ansiedad y miedo constante</li>
                      <li>Sentimientos de soledad y tristeza</li>
                      <li>Baja autoestima y autoconfianza</li>
                      <li>Problemas de concentración</li>
                      <li>Dolores físicos y problemas de sueño</li>
                      <li>Disminución del rendimiento académico</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Efectos a largo plazo</h3>
                    <Separator className="my-2" />
                    <p className="mb-3 text-neutral-700">
                      El bullying puede tener efectos duraderos que persisten hasta la edad adulta:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                      <li>Mayor riesgo de depresión y ansiedad</li>
                      <li>Dificultad para establecer relaciones saludables</li>
                      <li>Problemas de salud física relacionados con el estrés</li>
                      <li>Mayor riesgo de comportamientos autolesivos</li>
                      <li>Dificultades para confiar en los demás</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-primary mb-2">Impacto en los testigos</h3>
                    <p className="text-neutral-700">
                      El bullying no solo afecta a las víctimas directas. Los testigos también pueden experimentar:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-neutral-700">
                      <li>Sentimientos de impotencia</li>
                      <li>Culpabilidad por no intervenir</li>
                      <li>Miedo a convertirse en la próxima víctima</li>
                      <li>Desensibilización ante la violencia</li>
                      <li>Confusión sobre cómo actuar ante situaciones similares</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
