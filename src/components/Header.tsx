
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  User,
  Settings,
  LogOut,
  Shield,
  Car,
  Users
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  
  // Role-specific icon
  const getRoleIcon = (role: 'admin' | 'parent' | 'incharge') => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />;
      case 'incharge':
        return <Car className="h-4 w-4 text-green-600" />;
      case 'parent':
        return <Users className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">School Transport MS</h1>
      
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                  <div className="flex items-center gap-1 mt-1">
                    {getRoleIcon(user.role)}
                    <Badge variant="outline" className="text-xs capitalize">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthModal />
        )}
      </div>
    </header>
  );
};

export default Header;
