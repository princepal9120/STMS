
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const StudentsPage = () => {
  // Mock student data
  const students = [
    { id: 1, name: "John Smith", grade: "10A", busRoute: "Route 101", busStop: "Main Street" },
    { id: 2, name: "Emily Johnson", grade: "9B", busRoute: "Route 102", busStop: "Oak Avenue" },
    { id: 3, name: "Michael Brown", grade: "11C", busRoute: "Route 101", busStop: "Pine Road" },
    { id: 4, name: "Sarah Davis", grade: "8A", busRoute: "Route 103", busStop: "Maple Boulevard" },
    { id: 5, name: "David Wilson", grade: "12B", busRoute: "Route 102", busStop: "Cedar Lane" },
  ];

  return (
    <DashboardLayout title="Students" userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search students..."
                className="pl-8 w-[250px] md:w-[300px]"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="p-3 text-left w-10">
                      <Checkbox />
                    </th>
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-left">Grade</th>
                    <th className="p-3 text-left">Bus Route</th>
                    <th className="p-3 text-left">Bus Stop</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <Checkbox />
                      </td>
                      <td className="p-3 flex items-center">
                        <div className="h-8 w-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        {student.name}
                      </td>
                      <td className="p-3">{student.grade}</td>
                      <td className="p-3">{student.busRoute}</td>
                      <td className="p-3">{student.busStop}</td>
                      <td className="p-3">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentsPage;
