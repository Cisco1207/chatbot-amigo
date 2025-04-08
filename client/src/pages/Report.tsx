import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  type: z.string().min(1, { message: "Por favor, selecciona el tipo de bullying" }),
  description: z.string().min(10, { message: "Por favor, describe la situación con al menos 10 caracteres" })
});

interface ReportProps {
  sessionId: string;
}

export default function Report({ sessionId }: ReportProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "AmigBot - Reportar";
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      description: ""
    }
  });

  const reportMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await apiRequest("POST", "/api/reports", {
        ...values,
        sessionId,
        timestamp: Date.now()
      });
    },
    onSuccess: () => {
      toast({
        title: "Reporte enviado",
        description: "Gracias por compartir esta información. Tu reporte ha sido registrado.",
      });
      setSubmitted(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo enviar el reporte. Por favor, intenta de nuevo más tarde.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    reportMutation.mutate(values);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Card className="max-w-md w-full shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle2 className="h-12 w-12 text-secondary" />
              <div>
                <CardTitle className="text-xl mb-2">Reporte Enviado</CardTitle>
                <CardDescription className="text-neutral-700">
                  Gracias por compartir esta información. Tu reporte ha sido registrado y será revisado por nuestro equipo.
                </CardDescription>
              </div>
              <Button className="mt-4 bg-primary" onClick={() => setSubmitted(false)}>
                Crear otro reporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold text-primary mb-6">Reportar una Situación de Bullying</h1>
        
        <Alert className="mb-6 bg-primary/10 border-primary text-neutral-800">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-semibold">Importante</AlertTitle>
          <AlertDescription className="text-neutral-700">
            Este formulario es confidencial. No necesitas proporcionar nombres completos o detalles que te identifiquen si no te sientes cómodo.
          </AlertDescription>
        </Alert>
        
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Formulario de Reporte</CardTitle>
            <CardDescription>
              Cuéntanos sobre la situación para que podamos ayudar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Bullying</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Físico" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Físico (golpes, empujones, etc.)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Verbal" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Verbal (insultos, burlas, etc.)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Social" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Social (exclusión, rumores, etc.)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Cibernético" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Cibernético (mensajes, fotos, etc.)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Otro" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              Otro
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe la situación aquí. Puedes incluir cuándo ocurrió, dónde, y cómo te sientes al respecto."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Proporciona tantos detalles como te sientas cómodo compartiendo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-dark"
                  disabled={reportMutation.isPending}
                >
                  {reportMutation.isPending ? "Enviando..." : "Enviar Reporte"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-sm text-neutral-500">
              Si necesitas ayuda inmediata, por favor habla con un adulto de confianza o contacta a la línea de ayuda contra el bullying al 800-123-4567.
            </p>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
}
