
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'parent' | 'incharge';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'admin' | 'parent' | 'incharge') => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define role-based permissions
const rolePermissions = {
  admin: [
    'manage_buses', 
    'manage_routes', 
    'manage_students', 
    'manage_personnel', 
    'view_reports',
    'manage_settings',
    'manage_users'
  ],
  incharge: [
    'view_assigned_bus', 
    'update_bus_location', 
    'view_bus_students',
    'manage_check_in_out'
  ],
  parent: [
    'view_child_bus', 
    'view_notifications', 
    'view_schedule'
  ]
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return rolePermissions[user.role]?.includes(permission) || false;
  };

  // Mock login function for demo
  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          const user: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150?u=admin',
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } else if (email === 'parent@example.com' && password === 'password') {
          const user: User = {
            id: '2',
            name: 'Parent User',
            email: 'parent@example.com',
            role: 'parent',
            avatar: 'https://i.pravatar.cc/150?u=parent',
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } else if (email === 'incharge@example.com' && password === 'password') {
          const user: User = {
            id: '3',
            name: 'Incharge User',
            email: 'incharge@example.com',
            role: 'incharge',
            avatar: 'https://i.pravatar.cc/150?u=incharge',
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  // Mock signup function for demo
  const signup = async (name: string, email: string, password: string, role: 'admin' | 'parent' | 'incharge') => {
    // This is a mock implementation. In a real app, you would call an API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role,
          avatar: `https://i.pravatar.cc/150?u=${email}`,
        };
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.'
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup, 
      logout,
      hasPermission 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
