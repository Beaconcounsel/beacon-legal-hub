import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import LanguageRouter from "./components/LanguageRouter";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import PracticeAreas from "./pages/PracticeAreas";
import Insights from "./pages/Insights";
import Research from "./pages/Research";
import OurApproach from "./pages/OurApproach";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route element={<LanguageRouter />}>
      {/* English routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Index />} />
      <Route path="/practice-areas" element={<PracticeAreas />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/research" element={<Research />} />
      <Route path="/our-approach" element={<OurApproach />} />
      <Route path="/contact" element={<Contact />} />

      {/* French routes */}
      <Route path="/fr" element={<Landing />} />
      <Route path="/fr/home" element={<Index />} />
      <Route path="/fr/practice-areas" element={<PracticeAreas />} />
      <Route path="/fr/insights" element={<Insights />} />
      <Route path="/fr/research" element={<Research />} />
      <Route path="/fr/our-approach" element={<OurApproach />} />
      <Route path="/fr/contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
