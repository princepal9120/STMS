
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, Plus, User, Phone, Bus, MapPin } from 'lucide-react';

type Personnel = {
  name: string;
  phone: string;
  email?: string;
  licenseDetails?: string;
  role: 'driver' | 'cleaner' | 'incharge';
};

type Bus = {
  id: number;
  busNumber: string;
  routeNumber: string;
  capacity: number;
  status: 'active' | 'inactive';
  driver: Personnel;
  cleaner: Personnel;
  incharge: Personnel;
};

const BusForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Bus</DialogTitle>
        <DialogDescription>
          Enter the details for the new school bus.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="busNumber">Bus Number</Label>
            <Input id="busNumber" placeholder="SB-1234" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="routeNumber">Route Number</Label>
            <Input id="routeNumber" placeholder="Route #1" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input id="capacity" type="number" placeholder="40" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Driver Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driverName">Name</Label>
              <Input id="driverName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverPhone">Phone</Label>
              <Input id="driverPhone" placeholder="+1 (555) 123-4567" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="licenseDetails">License Details</Label>
            <Input id="licenseDetails" placeholder="License Number" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Cleaner Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cleanerName">Name</Label>
              <Input id="cleanerName" placeholder="Jane Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cleanerPhone">Phone</Label>
              <Input id="cleanerPhone" placeholder="+1 (555) 987-6543" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Bus Incharge Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inchargeName">Name</Label>
              <Input id="inchargeName" placeholder="Robert Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inchargePhone">Phone</Label>
              <Input id="inchargePhone" placeholder="+1 (555) 456-7890" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inchargeEmail">Email</Label>
            <Input id="inchargeEmail" type="email" placeholder="robert@example.com" />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Save Bus</Button>
      </DialogFooter>
    </>
  );
};

const BusCard = ({ bus }: { bus: Bus }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{bus.busNumber}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Bus</DropdownMenuItem>
              <DropdownMenuItem>View Route</DropdownMenuItem>
              <DropdownMenuItem>View Students</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {bus.routeNumber}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Capacity</p>
            <p className="text-lg">{bus.capacity} Students</p>
          </div>
          <span className={bus.status === 'active' ? 'bus-status-active' : 'bus-status-inactive'}>
            {bus.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-transport-blue" />
            <div>
              <p className="text-sm font-medium">Driver</p>
              <p className="text-xs text-muted-foreground">{bus.driver.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-transport-green" />
            <div>
              <p className="text-sm font-medium">Cleaner</p>
              <p className="text-xs text-muted-foreground">{bus.cleaner.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-transport-orange" />
            <div>
              <p className="text-sm font-medium">Incharge</p>
              <p className="text-xs text-muted-foreground">{bus.incharge.name}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const Buses = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const buses: Bus[] = [
    {
      id: 1,
      busNumber: "SB-1205",
      routeNumber: "Route #1",
      capacity: 40,
      status: "active",
      driver: {
        name: "John Doe",
        phone: "+1 (555) 123-4567",
        licenseDetails: "DL-98765432",
        role: "driver"
      },
      cleaner: {
        name: "Jane Smith",
        phone: "+1 (555) 987-6543",
        role: "cleaner"
      },
      incharge: {
        name: "Robert Johnson",
        phone: "+1 (555) 456-7890",
        email: "robert@example.com",
        role: "incharge"
      }
    },
    {
      id: 2,
      busNumber: "SB-1308",
      routeNumber: "Route #3",
      capacity: 35,
      status: "active",
      driver: {
        name: "Michael Brown",
        phone: "+1 (555) 234-5678",
        licenseDetails: "DL-12345678",
        role: "driver"
      },
      cleaner: {
        name: "Sarah Davis",
        phone: "+1 (555) 876-5432",
        role: "cleaner"
      },
      incharge: {
        name: "Emily Wilson",
        phone: "+1 (555) 567-8901",
        email: "emily@example.com",
        role: "incharge"
      }
    },
    {
      id: 3,
      busNumber: "SB-1422",
      routeNumber: "Route #6",
      capacity: 40,
      status: "active",
      driver: {
        name: "David Miller",
        phone: "+1 (555) 345-6789",
        licenseDetails: "DL-87654321",
        role: "driver"
      },
      cleaner: {
        name: "Lisa Thompson",
        phone: "+1 (555) 765-4321",
        role: "cleaner"
      },
      incharge: {
        name: "James Anderson",
        phone: "+1 (555) 678-9012",
        email: "james@example.com",
        role: "incharge"
      }
    },
    {
      id: 4,
      busNumber: "SB-1506",
      routeNumber: "Route #8",
      capacity: 35,
      status: "inactive",
      driver: {
        name: "Richard Taylor",
        phone: "+1 (555) 456-7890",
        licenseDetails: "DL-23456789",
        role: "driver"
      },
      cleaner: {
        name: "Patricia Moore",
        phone: "+1 (555) 654-3210",
        role: "cleaner"
      },
      incharge: {
        name: "Thomas Jackson",
        phone: "+1 (555) 789-0123",
        email: "thomas@example.com",
        role: "incharge"
      }
    }
  ];

  const filteredBuses = buses.filter(
    bus => bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
           bus.routeNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Buses">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="max-w-sm w-full">
          <Input
            placeholder="Search buses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <BusForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBuses.map(bus => (
          <BusCard key={bus.id} bus={bus} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Buses;
