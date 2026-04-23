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
import Hobbies from "./pages/Hobbies";
import RelogioFimProfissoes from "./pages/RelogioFimProfissoes";
import Projetos from "./pages/Projetos";
import Cryptos from "./pages/Cryptos";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(//$/, "")}
        >
          <Switch>
            <Route path="/" component={LoginPage} />
            <Route path="/feed" component={FeedPage} />
            <Route path="/ia/:iaId" component={IaProfilePage} />
            <Route path="/video/:videoId" component={VideoPage} />
            <Route path="/missions/:iaId" component={MissionsPage} />
            <Route path="/profissoes" component={Profissoes} />
            <Route path="/hobbies" component={Hobbies} />
            <Route path="/relogio-fim-profissoes" component={RelogioFimProfissoes} />
            <Route path="/projetos" component={Projetos} />
            <Route path="/cryptos" component={Cryptos} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
