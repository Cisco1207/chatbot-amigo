import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function MobileNavigation() {
  const { activeSection, setActiveSection } = useContext(AppContext);
  const [location] = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [tabValue, setTabValue] = useState("login");

  return (
    <nav className="md:hidden py-2 px-1 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-center text-xl">AmigBot</DialogTitle>
            <DialogDescription className="text-center">
              {tabValue === "login" ? "Inicia sesión en tu cuenta" : "Crea una nueva cuenta"}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre de Usuario</label>
                  <input className="w-full p-2 mt-1 border rounded-md" placeholder="usuario123" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Contraseña</label>
                  <input type="password" className="w-full p-2 mt-1 border rounded-md" placeholder="••••••" />
                </div>
                
                <div className="text-sm text-right">
                  <a href="#" className="text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Iniciar Sesión
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre de Usuario</label>
                  <input className="w-full p-2 mt-1 border rounded-md" placeholder="usuario123" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Correo Electrónico</label>
                  <input type="email" className="w-full p-2 mt-1 border rounded-md" placeholder="usuario@ejemplo.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Contraseña</label>
                  <input type="password" className="w-full p-2 mt-1 border rounded-md" placeholder="••••••" />
                  <p className="text-xs text-gray-500 mt-1">Al menos 6 caracteres</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Confirmar Contraseña</label>
                  <input type="password" className="w-full p-2 mt-1 border rounded-md" placeholder="••••••" />
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Crear Cuenta
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <div className="flex justify-around items-center">
        <Link href="/">
          <a 
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              activeSection === 'chat' || location === '/'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
            onClick={() => setActiveSection('chat')}
          >
            <div className={`rounded-full p-1.5 ${activeSection === 'chat' || location === '/' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">forum</span>
            </div>
            <span className="text-xs font-medium mt-1">Chat</span>
            {(activeSection === 'chat' || location === '/') && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <Link href="/recursos">
          <a
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              location === '/recursos'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`rounded-full p-1.5 ${location === '/recursos' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">auto_stories</span>
            </div>
            <span className="text-xs font-medium mt-1">Recursos</span>
            {location === '/recursos' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <Link href="/reportar">
          <a
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              location === '/reportar'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`rounded-full p-1.5 ${location === '/reportar' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">report_problem</span>
            </div>
            <span className="text-xs font-medium mt-1">Reportar</span>
            {location === '/reportar' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <Link href="/aprender">
          <a
            className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all ${
              location === '/aprender'
                ? 'text-blue-600 bg-blue-50' 
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <div className={`rounded-full p-1.5 ${location === '/aprender' ? 'bg-blue-100' : ''}`}>
              <span className="material-icons text-xl">school</span>
            </div>
            <span className="text-xs font-medium mt-1">Aprender</span>
            {location === '/aprender' && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute bottom-0.5"></span>
            )}
          </a>
        </Link>
        
        <button
          onClick={() => setAuthOpen(true)}
          className={`flex flex-col items-center justify-center w-20 py-2 rounded-xl transition-all text-slate-500 hover:bg-slate-50`}
        >
          <div className="rounded-full p-1.5">
            <span className="material-icons text-xl">account_circle</span>
          </div>
          <span className="text-xs font-medium mt-1">Cuenta</span>
        </button>
      </div>
    </nav>
  );
}
