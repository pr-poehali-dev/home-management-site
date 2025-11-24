import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import Services from "./pages/Services";
import Documents from "./pages/Documents";
import ForResidents from "./pages/ForResidents";
import Contacts from "./pages/Contacts";
import Houses from "./pages/Houses";
import HouseDetail from "./pages/HouseDetail";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="bg-metallic-graphite marble-accent min-h-screen">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/services" element={<Services />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/for-residents" element={<ForResidents />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/houses/:id" element={<HouseDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;