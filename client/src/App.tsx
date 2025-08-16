import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { KonamiEasterEgg, LogoEasterEgg, SecretWordEasterEgg } from "@/components/ui/easter-eggs";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground dark">
          <Toaster />
          <Router />
          {/* Hidden Easter Eggs */}
          <KonamiEasterEgg />
          <LogoEasterEgg />
          <SecretWordEasterEgg />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
