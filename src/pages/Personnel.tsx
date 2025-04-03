
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Plus, Search, Phone, Mail, Bus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const PersonnelPage = () => {
  // Mock personnel data
  const personnel = [
    { id: 1, name: "David Miller", role: "Driver", busNo: "1201", phone: "+1 234-567-8901", email: "david@example.com" },
    { id: 2, name: "Susan Johnson", role: "Incharge", busNo: "1202", phone: "+1 234-567-8902", email: "susan@example.com" },
    { id: 3, name: "Robert Brown", role: "Driver", busNo: "1203", phone: "+1 234-567-8903", email: "robert@example.com" },
    { id: 4, name: "Linda Davis", role: "Cleaner", busNo: "1201", phone: "+1 234-567-8904", email: "linda@example.com" },
    { id: 5, name: "James Wilson", role: "Incharge", busNo: "1203", phone: "+1 234-567-8905", email: "james@example.com" },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'driver': return 'bg-blue-100 text-blue-800';
      case 'incharge': return 'bg-green-100 text-green-800';
      case 'cleaner': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Personnel" userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search personnel..."
                className="pl-8 w-[250px] md:w-[300px]"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Personnel
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Personnel List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {personnel.map((person) => (
                <Card key={person.id} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <div className="font-semibold">{person.name}</div>
                        <div>
                          <Badge variant="outline" className={getRoleBadgeColor(person.role)}>
                            {person.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Bus className="h-4 w-4 mr-2" />
                        Bus #{person.busNo}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {person.phone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {person.email}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
                      <Button size="sm" variant="outline" className="flex-1">Contact</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PersonnelPage;
