
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Bus, 
  Calendar, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NotificationsPage = () => {
  // Mock notification data
  const notifications = [
    { 
      id: 1, 
      type: 'alert',
      title: 'Bus #1201 Delayed',
      message: 'Bus #1201 is currently running 15 minutes behind schedule.',
      time: '10 minutes ago',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      read: false
    },
    { 
      id: 2, 
      type: 'info',
      title: 'Bus #1203 Started Journey',
      message: 'Bus #1203 has started its journey from school.',
      time: '25 minutes ago',
      icon: Bus,
      iconColor: 'text-blue-500',
      read: false
    },
    { 
      id: 3, 
      type: 'success',
      title: 'Student Check-in',
      message: 'Emily Johnson has boarded Bus #1202.',
      time: '1 hour ago',
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      read: true
    },
    { 
      id: 4, 
      type: 'info',
      title: 'Route Change',
      message: 'Route #103 has been modified due to road construction.',
      time: '2 hours ago',
      icon: AlertTriangle,
      iconColor: 'text-orange-500',
      read: true
    },
    { 
      id: 5, 
      type: 'reminder',
      title: 'Schedule Change',
      message: 'Early dismissal on Friday. Buses will depart at 2:00 PM.',
      time: '1 day ago',
      icon: Calendar,
      iconColor: 'text-purple-500',
      read: true
    },
  ];

  return (
    <DashboardLayout title="Notifications" userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Notifications</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CheckCircle2 className="h-4 w-4 mr-1" /> 
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-1" /> 
              Preferences
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'} transition-colors hover:bg-gray-50`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full bg-opacity-20 ${notification.read ? 'bg-gray-200' : 'bg-blue-100'}`}>
                          <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className={`font-medium ${notification.read ? '' : 'text-blue-700'}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3 gap-2">
                        <Button variant="ghost" size="sm">Dismiss</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unread">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Unread Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications
                      .filter(notif => !notif.read)
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className="p-4 border rounded-lg bg-blue-50 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-blue-100 bg-opacity-20">
                              <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-blue-700">
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 gap-2">
                            <Button variant="ghost" size="sm">Dismiss</Button>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications
                      .filter(notif => notif.type === 'alert')
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'} transition-colors hover:bg-gray-50`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full bg-opacity-20 ${notification.read ? 'bg-gray-200' : 'bg-blue-100'}`}>
                              <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className={`font-medium ${notification.read ? '' : 'text-blue-700'}`}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 gap-2">
                            <Button variant="ghost" size="sm">Dismiss</Button>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="info">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Information Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications
                      .filter(notif => notif.type === 'info')
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border rounded-lg ${notification.read ? 'bg-white' : 'bg-blue-50'} transition-colors hover:bg-gray-50`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full bg-opacity-20 ${notification.read ? 'bg-gray-200' : 'bg-blue-100'}`}>
                              <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className={`font-medium ${notification.read ? '' : 'text-blue-700'}`}>
                                  {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          </div>
                          <div className="flex justify-end mt-3 gap-2">
                            <Button variant="ghost" size="sm">Dismiss</Button>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
