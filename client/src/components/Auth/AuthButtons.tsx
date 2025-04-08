import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export default function AuthButtons() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="flex">
      <AuthModal />
      
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-md transition-all duration-300 hover:shadow-lg rounded-xl relative overflow-hidden group">
            <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
            <span className="relative flex items-center">
              <span className="material-icons text-sm mr-1.5">person_add</span>
              Registrarse
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-center text-xl">Crea una Cuenta</DialogTitle>
            <DialogDescription className="text-center">
              Regístrate para acceder a todas las funciones de AmigBot
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <p className="text-center text-sm text-muted-foreground">
              Al crear una cuenta, podrás:
            </p>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                <span>Guardar tus conversaciones con AmigBot</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                <span>Acceder a recursos exclusivos sobre prevención del bullying</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                <span>Recibir notificaciones sobre nuevos contenidos</span>
              </li>
              <li className="flex items-center">
                <span className="material-icons text-primary mr-2 text-sm">check_circle</span>
                <span>Participar en la comunidad de AmigBot</span>
              </li>
            </ul>
            
            <Button 
              onClick={() => {
                setRegisterOpen(false);
                const modalTrigger = document.querySelector("[aria-label='Iniciar Sesión']") as HTMLButtonElement;
                if (modalTrigger) {
                  modalTrigger.click();
                  setTimeout(() => {
                    const registerTab = document.querySelector("[data-state='inactive'][value='register']") as HTMLButtonElement;
                    if (registerTab) {
                      registerTab.click();
                    }
                  }, 100);
                }
              }}
              className="mt-4 bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 shadow-md transition-all duration-300 hover:shadow-lg rounded-xl relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center">
                <span className="material-icons text-sm mr-1.5">how_to_reg</span>
                Crear una cuenta
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}