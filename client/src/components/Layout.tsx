import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row container mx-auto px-2 md:px-4 py-4 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full filter blur-3xl pointer-events-none -z-10 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full filter blur-3xl pointer-events-none -z-10 opacity-70"></div>
        
        <div className="fixed left-0 top-0 bottom-0 z-10 md:relative md:z-0">
          <Navigation />
        </div>
        
        <div className="flex-grow md:px-6 lg:px-10 pt-4 md:pt-6 md:pb-10 relative">
          <div className="max-w-full md:max-w-4xl mx-auto">
            {children}
          </div>
        </div>
        
        <div className="block md:hidden fixed bottom-0 right-0 left-0 z-10 bg-white shadow-lg">
          <MobileNavigation />
        </div>
      </main>
    </div>
  );
}
