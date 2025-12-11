import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import CompanyDetail from "./pages/CompanyDetail";
import News from "./pages/News";
import AdminNews from "./pages/AdminNews";
import Services from "./pages/Services";

import ForResidents from "./pages/ForResidents";

import Houses from "./pages/Houses";
import HouseDetail from "./pages/HouseDetail";
import BulkUpload from "./pages/BulkUpload";
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
            <Route path="/about/:id" element={<CompanyDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/services" element={<Services />} />

            <Route path="/for-residents" element={<ForResidents />} />

            <Route path="/houses" element={<Houses />} />
            <Route path="/houses/:id" element={<HouseDetail />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;