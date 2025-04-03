
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bus, Clock, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { format } from 'date-fns';

// Types for our schedule data
type ScheduleEventType = 'morning-pickup' | 'afternoon-dropoff' | 'special-event';

interface ScheduleEvent {
  id: number;
  busId: string;
  busNumber: string;
  routeId: string;
  routeNumber: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: ScheduleEventType;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

// Mock schedule data
const mockSchedules: ScheduleEvent[] = [
  {
    id: 1,
    busId: 'bus-1',
    busNumber: 'SB-1205',
    routeId: 'route-1',
    routeNumber: 'Route #1',
    date: new Date(),
    startTime: '07:30',
    endTime: '08:15',
    type: 'morning-pickup',
    status: 'completed',
    notes: 'Normal pickup schedule'
  },
  {
    id: 2,
    busId: 'bus-2',
    busNumber: 'SB-1308',
    routeId: 'route-2',
    routeNumber: 'Route #3',
    date: new Date(),
    startTime: '07:35',
    endTime: '08:20',
    type: 'morning-pickup',
    status: 'completed'
  },
  {
    id: 3,
    busId: 'bus-3',
    busNumber: 'SB-1422',
    routeId: 'route-3',
    routeNumber: 'Route #6',
    date: new Date(),
    startTime: '07:40',
    endTime: '08:25',
    type: 'morning-pickup',
    status: 'in-progress'
  },
  {
    id: 4,
    busId: 'bus-1',
    busNumber: 'SB-1205',
    routeId: 'route-1',
    routeNumber: 'Route #1',
    date: new Date(),
    startTime: '15:30',
    endTime: '16:15',
    type: 'afternoon-dropoff',
    status: 'scheduled'
  },
  {
    id: 5,
    busId: 'bus-2',
    busNumber: 'SB-1308',
    routeId: 'route-2',
    routeNumber: 'Route #3',
    date: new Date(),
    startTime: '15:35',
    endTime: '16:20',
    type: 'afternoon-dropoff',
    status: 'scheduled'
  },
  {
    id: 6,
    busId: 'bus-3',
    busNumber: 'SB-1422',
    routeId: 'route-3',
    routeNumber: 'Route #6',
    date: new Date(Date.now() + 86400000), // Tomorrow
    startTime: '08:00',
    endTime: '16:00',
    type: 'special-event',
    status: 'scheduled',
    notes: 'Field trip to Natural History Museum'
  }
];

const busData = [
  { id: 'bus-1', number: 'SB-1205', route: 'Route #1' },
  { id: 'bus-2', number: 'SB-1308', route: 'Route #3' },
  { id: 'bus-3', number: 'SB-1422', route: 'Route #6' },
  { id: 'bus-4', number: 'SB-1506', route: 'Route #8' },
];

const routeData = [
  { id: 'route-1', number: 'Route #1' },
  { id: 'route-2', number: 'Route #3' },
  { id: 'route-3', number: 'Route #6' },
  { id: 'route-4', number: 'Route #8' },
];

// Functional component for schedule card
const ScheduleCard = ({ event }: { event: ScheduleEvent }) => {
  const getStatusColor = () => {
    switch(event.status) {
      case 'completed': return 'text-transport-green';
      case 'in-progress': return 'text-transport-orange';
      case 'scheduled': return 'text-transport-blue';
      case 'cancelled': return 'text-destructive';
      default: return 'text-transport-gray';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{event.busNumber}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {event.routeNumber}
            </CardDescription>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-transport-blue" />
              <span className="text-sm">{format(event.date, 'PPP')}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-transport-orange" />
              <span className="text-sm">{event.startTime} - {event.endTime}</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
              {event.type === 'morning-pickup' ? 'Morning Pickup' : 
               event.type === 'afternoon-dropoff' ? 'Afternoon Dropoff' : 'Special Event'}
            </span>
          </div>
          {event.notes && (
            <div className="text-sm text-muted-foreground mt-2">
              Note: {event.notes}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {event.status === 'scheduled' && (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" size="sm" className="flex-1">Edit</Button>
            <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
          </div>
        )}
        {event.status === 'in-progress' && (
          <Button variant="outline" size="sm" className="w-full">Track Bus</Button>
        )}
        {(event.status === 'completed' || event.status === 'cancelled') && (
          <Button variant="outline" size="sm" className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Schedule form component
const ScheduleForm = ({ onClose }: { onClose: () => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Schedule</DialogTitle>
        <DialogDescription>
          Create a new bus schedule. Fill in the details below.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mx-auto"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" type="time" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bus">Select Bus</Label>
          <Select>
            <SelectTrigger id="bus">
              <SelectValue placeholder="Select a bus" />
            </SelectTrigger>
            <SelectContent>
              {busData.map(bus => (
                <SelectItem key={bus.id} value={bus.id}>
                  {bus.number} - {bus.route}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduleType">Schedule Type</Label>
          <Select>
            <SelectTrigger id="scheduleType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning-pickup">Morning Pickup</SelectItem>
              <SelectItem value="afternoon-dropoff">Afternoon Dropoff</SelectItem>
              <SelectItem value="special-event">Special Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Input id="notes" placeholder="Add any additional notes here..." />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Save Schedule</Button>
      </DialogFooter>
    </>
  );
};

// Main Schedule Page Component
const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter schedules based on selected date and tab
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredSchedules = mockSchedules.filter(schedule => {
    const dateMatches = date 
      ? schedule.date.toDateString() === date.toDateString()
      : true;
      
    if (activeTab === "all") return dateMatches;
    return dateMatches && (
      (activeTab === "morning" && schedule.type === "morning-pickup") ||
      (activeTab === "afternoon" && schedule.type === "afternoon-dropoff") ||
      (activeTab === "special" && schedule.type === "special-event")
    );
  });

  return (
    <DashboardLayout title="Schedule">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border max-w-sm"
          />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                Add New Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <ScheduleForm onClose={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="morning">Morning</TabsTrigger>
            <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">
              {activeTab === "all" ? "All Schedules" : 
               activeTab === "morning" ? "Morning Pickups" : 
               activeTab === "afternoon" ? "Afternoon Dropoffs" : "Special Events"}
              {date && ` - ${format(date, 'PPP')}`}
            </h3>
            
            {filteredSchedules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchedules.map(schedule => (
                  <ScheduleCard key={schedule.id} event={schedule} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bus className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700">No schedules found</h3>
                  <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
                    There are no scheduled bus trips for the selected date or category. 
                    Try selecting a different date or create a new schedule.
                  </p>
                  <Button 
                    className="mt-6" 
                    onClick={() => setDialogOpen(true)}
                  >
                    Create Schedule
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
