
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon, 
  Bell, 
  User, 
  Shield, 
  Mail, 
  Globe,
  Database,
  Save
} from 'lucide-react';

const SettingsPage = () => {
  return (
    <DashboardLayout title="Settings" userRole="admin">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                <TabsTrigger 
                  value="general" 
                  className="justify-start w-full"
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start w-full"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="profile" 
                  className="justify-start w-full"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="justify-start w-full"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="integrations" 
                  className="justify-start w-full"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Integrations
                </TabsTrigger>
                <TabsTrigger 
                  value="database" 
                  className="justify-start w-full"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Database
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="general" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Manage your system-wide settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">School Name</Label>
                      <Input 
                        id="school-name" 
                        defaultValue="Westside High School" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        defaultValue="123 Education St, City, State, 12345" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input 
                        id="contact-email" 
                        type="email" 
                        defaultValue="contact@westsidehigh.edu" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Contact Phone</Label>
                      <Input 
                        id="contact-phone" 
                        defaultValue="(123) 456-7890" 
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-gray-500">
                          Enable dark mode for the dashboard
                        </p>
                      </div>
                      <Switch id="dark-mode" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Manage how and when notifications are sent
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive push notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Bus Delay Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Get notified when buses are delayed
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Check-in/out Alerts</Label>
                        <p className="text-sm text-gray-500">
                          Get notified when students check in or out
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                      Manage your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input 
                        id="full-name" 
                        defaultValue="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="john.doe@example.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        defaultValue="(123) 456-7890" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        defaultValue="Administrator" 
                        disabled 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Profile</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">
                          Enable two-factor authentication for added security
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect with other systems and services
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["School Management System", "Payment Gateway", "GPS Tracking", "Student Information System"].map((integration) => (
                        <div key={integration} className="flex items-center justify-between border p-4 rounded-lg">
                          <div>
                            <h3 className="font-medium">{integration}</h3>
                            <p className="text-sm text-gray-500">Connect to {integration}</p>
                          </div>
                          <Button variant="outline">Connect</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="database" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Database Management</CardTitle>
                    <CardDescription>
                      Manage your database settings and operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h3 className="font-medium">Database Status</h3>
                      <p className="text-sm text-green-600 mt-1">Connected and operational</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Server:</span> MongoDB Atlas
                        </div>
                        <div>
                          <span className="text-gray-500">Version:</span> 5.0.6
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span> 2.4 GB
                        </div>
                        <div>
                          <span className="text-gray-500">Collections:</span> 24
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <Button variant="outline" className="flex-1">
                        Backup Database
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Restore From Backup
                      </Button>
                      <Button variant="outline" className="flex-1 text-red-500 hover:text-red-700">
                        Clear Test Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
