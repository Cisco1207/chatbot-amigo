import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Resource {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: string;
}

export default function Resources() {
  useEffect(() => {
    document.title = "AmigBot - Recursos";
  }, []);

  // Fetch all resources
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded-full w-48"></div>
          <div className="h-4 bg-gray-200 rounded-full w-64"></div>
          <div className="h-4 bg-gray-200 rounded-full w-56"></div>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary mb-2">Recursos Contra el Bullying</h1>
          <p className="text-neutral-600">
            Aquí encontrarás información útil y herramientas para prevenir y manejar situaciones de acoso escolar.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-6 md:grid-cols-2">
          {resources?.map((resource) => (
            <Card key={resource.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <i className={`${resource.icon} text-secondary text-xl mr-3`}></i>
                  <CardTitle>{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-neutral-700 whitespace-pre-line">
                  {resource.content}
                </CardDescription>
                <button className="mt-4 w-full bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Ver más información
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="bg-primary bg-opacity-5 p-6 rounded-xl">
          <h2 className="text-xl font-bold text-primary mb-3">Líneas de Ayuda</h2>
          <p className="text-neutral-700 mb-4">
            Si necesitas hablar con alguien de manera urgente, estas líneas de ayuda están disponibles:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <i className="fas fa-phone-alt text-primary mr-3"></i>
              <div>
                <p className="font-semibold">Línea Nacional Contra el Bullying</p>
                <p className="text-neutral-600">800-123-4567</p>
              </div>
            </li>
            <li className="flex items-center">
              <i className="fas fa-comments text-primary mr-3"></i>
              <div>
                <p className="font-semibold">Chat de Crisis</p>
                <p className="text-neutral-600">www.chatayuda.org</p>
              </div>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope text-primary mr-3"></i>
              <div>
                <p className="font-semibold">Correo de Ayuda</p>
                <p className="text-neutral-600">ayuda@antibullying.org</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </ScrollArea>
  );
}
