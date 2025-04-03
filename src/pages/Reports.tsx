
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock chart data
  const busOccupancyData = [
    { busNo: 'Bus 1201', occupancy: 85, capacity: 100 },
    { busNo: 'Bus 1202', occupancy: 65, capacity: 100 },
    { busNo: 'Bus 1203', occupancy: 92, capacity: 100 },
    { busNo: 'Bus 1204', occupancy: 78, capacity: 100 },
    { busNo: 'Bus 1205', occupancy: 45, capacity: 100 },
  ];

  const busPerformanceData = [
    { month: 'Jan', onTime: 95, delay: 5 },
    { month: 'Feb', onTime: 92, delay: 8 },
    { month: 'Mar', onTime: 88, delay: 12 },
    { month: 'Apr', onTime: 91, delay: 9 },
    { month: 'May', onTime: 94, delay: 6 },
    { month: 'Jun', onTime: 90, delay: 10 },
  ];

  return (
    <DashboardLayout title="Reports" userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Transportation Analytics</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bus Occupancy Rate</CardTitle>
                  <CardDescription>Current occupancy of each bus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={busOccupancyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="busNo" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="occupancy" fill="#3B82F6" name="Current Occupancy" />
                        <Bar dataKey="capacity" fill="#CBD5E1" name="Maximum Capacity" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bus Performance Trends</CardTitle>
                  <CardDescription>On-time performance over 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={busPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="onTime" stroke="#22C55E" name="On-time %" />
                        <Line type="monotone" dataKey="delay" stroke="#EF4444" name="Delay %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Generated reports from the past 30 days</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3 text-left">Report Name</th>
                          <th className="p-3 text-left">Generated On</th>
                          <th className="p-3 text-left">Type</th>
                          <th className="p-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="p-3 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-gray-500" />
                              Monthly Occupancy Report
                            </td>
                            <td className="p-3">{`${i * 2}/15/2023`}</td>
                            <td className="p-3">PDF</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Download</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bus Performance Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Performance metrics will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="attendance">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Attendance Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Attendance reports will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financial">
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Financial data will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
