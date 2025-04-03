
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Edit, 
  Shield, 
  Bell,
  CalendarDays,
} from 'lucide-react';
import RolePermissions from '@/components/profile/RolePermissions';

const PersonalInformation = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Information
        </Button>
      </CardFooter>
    </Card>
  );
};

const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Notification Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {['Email Notifications', 'SMS Notifications', 'Push Notifications', 'Bus Delay Alerts'].map((notification) => (
            <div key={notification} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-500" />
                <span>{notification}</span>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityLog = () => {
  const logs = [
    { date: '2025-04-03', action: 'Logged in to the system', time: '09:30 AM' },
    { date: '2025-04-03', action: 'Updated profile information', time: '10:15 AM' },
    { date: '2025-04-02', action: 'Changed notification settings', time: '02:45 PM' },
    { date: '2025-04-01', action: 'Viewed bus schedule', time: '08:20 AM' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="bg-gray-100 rounded-full p-2 mt-1">
                <CalendarDays className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">{log.action}</p>
                <p className="text-sm text-gray-500">
                  {log.date} at {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="px-0">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <DashboardLayout title="Profile">
        <div className="text-center p-8">
          <p>Please login to view your profile.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Profile">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Shield className="h-4 w-4" />
                <span className="text-sm capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-6">
            <PersonalInformation />
            <RolePermissions />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityLog />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
