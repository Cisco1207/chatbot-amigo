import { useState, useEffect, ReactNode } from "react";
import Sidebar from "../sidebar/Sidebar";
import MobileNavigation from "../mobile/MobileNavigation";
import MobileMenu from "../mobile/MobileMenu";
import { useMediaQuery } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Close mobile menu when switching to desktop
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:flex md:w-72 bg-white shadow-soft flex-col">
        <Sidebar />
      </div>

      {/* Mobile menu (hidden by default) */}
      {isMobile && (
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <header className="bg-white shadow-soft px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1606791422814-b32c705e3e2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
                alt="Logo AmigBot" 
                className="h-10 w-10 rounded-full"
              />
              <h1 className="font-nunito font-bold text-lg text-primary ml-2">AmigBot</h1>
            </div>
            <button 
              className="text-neutral-600 focus:outline-none" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </header>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>

        {/* Mobile Navigation (mobile only) */}
        {isMobile && <MobileNavigation />}
      </div>
    </div>
  );
}
