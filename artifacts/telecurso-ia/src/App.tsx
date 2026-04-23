import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import LoginPage from "./pages/login";
import FeedPage from "./pages/feed";
import IaProfilePage from "./pages/ia-profile";
import VideoPage from "./pages/video";
import MissionsPage from "./pages/missions";
import Profissoes from "./pages/Profissoes";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/feed">
        <AppLayout>
          <FeedPage />
        </AppLayout>
      </Route>
      <Route path="/ia/:iaId">
        <AppLayout>
          <IaProfilePage />
        </AppLayout>
      </Route>
      <Route path="/video/:videoId">
        <AppLayout>
          <VideoPage />
        </AppLayout>
      </Route>
      <Route path="/missions/:iaId">
        <AppLayout>
          <MissionsPage />
        </AppLayout>
      </Route>
      <Route path="/profissoes">
        <AppLayout>
          <Profissoes />
        </AppLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(//$/, "")}
        >
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
