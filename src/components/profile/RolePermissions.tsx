
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, X, Check } from 'lucide-react';

// Define role-specific permissions
const allPermissions = {
  'manage_buses': 'Manage Buses',
  'manage_routes': 'Manage Routes',
  'manage_students': 'Manage Students',
  'manage_personnel': 'Manage Personnel',
  'view_reports': 'View Reports',
  'manage_settings': 'Manage Settings',
  'manage_users': 'Manage Users',
  'view_assigned_bus': 'View Assigned Bus',
  'update_bus_location': 'Update Bus Location',
  'view_bus_students': 'View Bus Students',
  'manage_check_in_out': 'Manage Check-in/out',
  'view_child_bus': 'View Child Bus',
  'view_notifications': 'View Notifications',
  'view_schedule': 'View Schedule'
};

const RolePermissions = () => {
  const { user, hasPermission } = useAuth();

  if (!user) return null;

  // Get role-specific badge color
  const getRoleBadgeVariant = (role: 'admin' | 'parent' | 'incharge') => {
    switch (role) {
      case 'admin': return 'info';
      case 'incharge': return 'success';
      case 'parent': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Role & Permissions</CardTitle>
          <Badge variant={getRoleBadgeVariant(user.role) as any} className="capitalize">
            {user.role}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
          {Object.entries(allPermissions).map(([permKey, permLabel]) => (
            <div key={permKey} className="flex items-center gap-2 p-2 border rounded">
              {hasPermission(permKey) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ${!hasPermission(permKey) && 'text-gray-400'}`}>
                {permLabel}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RolePermissions;
