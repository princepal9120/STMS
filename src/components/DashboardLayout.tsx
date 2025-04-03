
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UserCircle, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './auth/AuthModal';

type DashboardLayoutProps = {
  children: React.ReactNode;
  title?: string;
  requiredPermission?: string;
};

const DashboardLayout = ({ 
  children, 
  title = "Dashboard",
  requiredPermission
}: DashboardLayoutProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { user, isAuthenticated, hasPermission } = useAuth();
  const navigate = useNavigate();

  // Check if the user has permission to access this page
  useEffect(() => {
    if (requiredPermission && isAuthenticated && !hasPermission(requiredPermission)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [requiredPermission, isAuthenticated, hasPermission, navigate, toast]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const showNotification = () => {
    toast({
      title: "New Notification",
      description: "Bus #1205 has started its journey from school.",
    });
  };

  // If the user is not authenticated and this page requires authentication
  if (requiredPermission && !isAuthenticated) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please login to access this page</p>
          <AuthModal defaultTab="login" triggerElement={<Button>Login Now</Button>} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className={`${sidebarOpen ? 'block' : 'hidden md:block'} transition-all duration-300 ease-in-out`}>
        <Sidebar userRole={user?.role || 'admin'} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:mr-2">
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={showNotification}>
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
