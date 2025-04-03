
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bus, MapPin, User, Bell, Calendar, QrCode, BarChart, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
};

const NavItem = ({ icon, label, to, active, collapsed }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
      active 
        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      collapsed && "justify-center px-2"
    )}
    title={collapsed ? label : undefined}
  >
    <div className={cn("flex-shrink-0", collapsed ? "w-5 h-5" : "w-5 h-5")}>
      {icon}
    </div>
    {!collapsed && <span className="transition-opacity duration-200">{label}</span>}
  </Link>
);

type SidebarProps = {
  className?: string;
  userRole?: 'admin' | 'parent' | 'incharge';
  collapsed?: boolean;
};

const Sidebar = ({ className, userRole = 'admin', collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();
  
  // Auto-collapse on mobile
  const isCollapsed = isMobile || collapsed;

  const navItems = [
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Dashboard",
      to: "/",
      visible: ['admin', 'parent', 'incharge']
    },
    {
      icon: <Bus className="h-5 w-5" />,
      label: "Buses",
      to: "/buses",
      visible: ['admin', 'parent', 'incharge']
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Routes",
      to: "/routes",
      visible: ['admin', 'incharge']
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Personnel",
      to: "/personnel",
      visible: ['admin']
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Students",
      to: "/students",
      visible: ['admin', 'incharge']
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Notifications",
      to: "/notifications",
      visible: ['admin', 'parent', 'incharge']
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      to: "/schedule",
      visible: ['admin', 'parent', 'incharge']
    },
    {
      icon: <QrCode className="h-5 w-5" />,
      label: "Check-in/out",
      to: "/check-in-out",
      visible: ['incharge']
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Reports",
      to: "/reports",
      visible: ['admin']
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      to: "/settings",
      visible: ['admin']
    }
  ];

  const filteredNavItems = navItems.filter(item => item.visible.includes(userRole));

  return (
    <div 
      className={cn(
        "bg-sidebar flex flex-col h-screen transition-all duration-300",
        isCollapsed ? "w-16" : "w-64", 
        className
      )}
    >
      <div className={cn(
        "flex items-center gap-2 px-2 mb-8 mt-4",
        isCollapsed ? "justify-center" : "px-4"
      )}>
        <Bus className="h-8 w-8 text-white flex-shrink-0" />
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-white whitespace-nowrap overflow-hidden">
            SchoolBus<span className="text-transport-orange">Track</span>
          </h1>
        )}
      </div>
      
      <div className="space-y-1 px-2 overflow-y-auto flex-1">
        {filteredNavItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={currentPath === item.to}
            collapsed={isCollapsed}
          />
        ))}
      </div>
      
      <div className={cn(
        "mt-auto border-t border-sidebar-border pt-4 px-2 pb-4",
        isCollapsed ? "text-center" : ""
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "gap-3 px-3 py-2"
        )}>
          <div className="rounded-full bg-sidebar-accent h-8 w-8 flex items-center justify-center flex-shrink-0">
            <User className="h-4 w-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-sidebar-foreground/80">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
