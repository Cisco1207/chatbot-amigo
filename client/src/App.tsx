import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ReportPage from "@/pages/ReportPage";
import ResourcesPage from "@/pages/ResourcesPage";
import LearnPage from "@/pages/LearnPage";
import NotFound from "@/pages/not-found";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

function Router() {
  const [sessionId, setSessionId] = useState("");
  
  useEffect(() => {
    // Get existing session ID or create a new one
    const existingSessionId = localStorage.getItem("chatSessionId");
    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem("chatSessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reportar">
        {() => <ReportPage sessionId={sessionId} />}
      </Route>
      <Route path="/recursos" component={ResourcesPage} />
      <Route path="/aprender" component={LearnPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
