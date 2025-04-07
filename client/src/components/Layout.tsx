import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col md:flex-row">
        <Navigation />
        {children}
        <MobileNavigation />
      </main>
    </div>
  );
}
