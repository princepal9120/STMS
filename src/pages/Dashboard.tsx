
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, MapPin, User, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`rounded-full p-3 ${color}`}>
        {icon}
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Buses" 
            value="24" 
            icon={<Bus className="h-5 w-5 text-white" />}
            color="bg-transport-blue"
          />
          <StatCard 
            title="Active Routes" 
            value="12" 
            icon={<MapPin className="h-5 w-5 text-white" />}
            color="bg-transport-green"
          />
          <StatCard 
            title="Registered Students" 
            value="750" 
            icon={<User className="h-5 w-5 text-white" />}
            color="bg-transport-orange"
          />
          <StatCard 
            title="Bus Trips Today" 
            value="48" 
            icon={<Clock className="h-5 w-5 text-white" />}
            color="bg-transport-gray"
          />
        </div>

        {/* Active buses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Buses</CardTitle>
              <CardDescription>
                Current status of all school buses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, number: "SB-1205", route: "Route #1", capacity: 40, filled: 32, status: "active" },
                  { id: 2, number: "SB-1308", route: "Route #3", capacity: 35, filled: 31, status: "active" },
                  { id: 3, number: "SB-1422", route: "Route #6", capacity: 40, filled: 28, status: "active" },
                  { id: 4, number: "SB-1506", route: "Route #8", capacity: 35, filled: 22, status: "inactive" },
                ].map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Bus className="h-5 w-5 text-transport-blue" />
                      <div>
                        <h4 className="text-sm font-medium">{bus.number}</h4>
                        <p className="text-xs text-muted-foreground">{bus.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs">{bus.filled}/{bus.capacity}</span>
                          <span className="text-xs font-medium">{Math.round((bus.filled / bus.capacity) * 100)}%</span>
                        </div>
                        <Progress value={(bus.filled / bus.capacity) * 100} />
                      </div>
                      <span className={bus.status === 'active' ? 'bus-status-active' : 'bus-status-inactive'}>
                        {bus.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Bus Schedule</CardTitle>
              <CardDescription>
                Upcoming departures and arrivals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, number: "SB-1205", route: "Route #1", departureTime: "7:30 AM", arrivalTime: "8:15 AM", status: "Completed" },
                  { id: 2, number: "SB-1308", route: "Route #3", departureTime: "7:35 AM", arrivalTime: "8:20 AM", status: "Completed" },
                  { id: 3, number: "SB-1422", route: "Route #6", departureTime: "7:40 AM", arrivalTime: "8:25 AM", status: "In Progress" },
                  { id: 4, number: "SB-1205", route: "Route #1", departureTime: "3:30 PM", arrivalTime: "4:15 PM", status: "Scheduled" },
                ].map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Bus className="h-5 w-5 text-transport-blue" />
                      <div>
                        <h4 className="text-sm font-medium">{schedule.number}</h4>
                        <p className="text-xs text-muted-foreground">{schedule.route}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-transport-blue" />
                        <span className="text-xs">{schedule.departureTime} - {schedule.arrivalTime}</span>
                      </div>
                      <span className={`text-xs font-medium ${
                        schedule.status === 'Completed' ? 'text-transport-green' :
                        schedule.status === 'In Progress' ? 'text-transport-orange' :
                        'text-transport-gray'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simplified map preview */}
        <Card className="col-span-1 w-full">
          <CardHeader>
            <CardTitle>Live Bus Tracking</CardTitle>
            <CardDescription>
              Real-time location of all school buses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-transport-blue mx-auto mb-4" />
                <p className="text-lg font-medium">Map Integration</p>
                <p className="text-sm text-muted-foreground">Live tracking will be available here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
