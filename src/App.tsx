
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import Buses from "./pages/Buses";
import RoutesPage from "./pages/Routes"; // Renamed to RoutesPage to avoid conflict
import NotFound from "./pages/NotFound";
import StudentsPage from "./pages/Students";
import PersonnelPage from "./pages/Personnel";
import NotificationsPage from "./pages/Notifications";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import CheckInOutPage from "./pages/CheckInOut";
import SchedulePage from "./pages/Schedule";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/buses" element={<Buses />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/personnel" element={<PersonnelPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/check-in-out" element={<CheckInOutPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
