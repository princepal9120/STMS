
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Bus } from 'lucide-react';

const Routes = () => {
  const routes = [
    {
      id: 1,
      routeNumber: "Route #1",
      startPoint: "Northern Heights",
      endPoint: "Central School Campus",
      distance: "8.5 km",
      stops: 12,
      buses: ["SB-1205"],
      students: 32
    },
    {
      id: 2,
      routeNumber: "Route #3",
      startPoint: "Westwood Community",
      endPoint: "Central School Campus",
      distance: "12.3 km",
      stops: 15,
      buses: ["SB-1308"],
      students: 31
    },
    {
      id: 3,
      routeNumber: "Route #6",
      startPoint: "Riverside Village",
      endPoint: "Central School Campus",
      distance: "10.7 km",
      stops: 14,
      buses: ["SB-1422"],
      students: 28
    },
    {
      id: 4,
      routeNumber: "Route #8",
      startPoint: "Eastern Hills",
      endPoint: "Central School Campus",
      distance: "14.2 km",
      stops: 18,
      buses: ["SB-1506"],
      students: 22
    }
  ];

  return (
    <DashboardLayout title="Routes">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="max-w-sm w-full">
          <Input
            placeholder="Search routes..."
            className="w-full"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Route
        </Button>
      </div>

      <div className="space-y-6">
        {routes.map(route => (
          <Card key={route.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{route.routeNumber}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {route.startPoint} to {route.endPoint}
                  </CardDescription>
                </div>
                <Button variant="outline">View on Map</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Route Details</h4>
                  <div className="space-y-1">
                    <p className="text-sm"><span className="font-medium">Distance:</span> {route.distance}</p>
                    <p className="text-sm"><span className="font-medium">Stops:</span> {route.stops}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Assigned Buses</h4>
                  <div className="flex flex-wrap gap-2">
                    {route.buses.map(bus => (
                      <div key={bus} className="flex items-center gap-1 bg-muted py-1 px-2 rounded-md text-xs">
                        <Bus className="h-3.5 w-3.5" />
                        {bus}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Students</h4>
                  <p className="text-sm">{route.students} students registered</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Route Map</h4>
                <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-transport-blue mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Route map visualization will be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Routes;
