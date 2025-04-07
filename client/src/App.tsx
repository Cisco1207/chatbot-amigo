import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Chat from "@/pages/Chat";
import Resources from "@/pages/Resources";
import Report from "@/pages/Report";
import Learn from "@/pages/Learn";
import HowToHelp from "@/pages/HowToHelp";
import { nanoid } from "nanoid";

function Router() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Initialize or get session ID from localStorage
    const existingSessionId = localStorage.getItem("sessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = nanoid();
      localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={() => <Chat sessionId={sessionId} />} />
        <Route path="/recursos" component={Resources} />
        <Route path="/reportar" component={() => <Report sessionId={sessionId} />} />
        <Route path="/aprende" component={Learn} />
        <Route path="/ayudar" component={HowToHelp} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
