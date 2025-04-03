
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Search, 
  CheckSquare, 
  Clock,
  User,
  Calendar
} from 'lucide-react';

const CheckInOutPage = () => {
  const [scanMode, setScanMode] = useState(false);
  
  // Mock student check-in data
  const recentCheckIns = [
    { id: 1, name: "John Smith", grade: "10A", busNo: "1201", time: "07:45 AM", type: "check-in" },
    { id: 2, name: "Emily Johnson", grade: "9B", busNo: "1202", time: "07:48 AM", type: "check-in" },
    { id: 3, name: "Michael Brown", grade: "11C", busNo: "1201", time: "07:50 AM", type: "check-in" },
    { id: 4, name: "Sarah Davis", grade: "8A", busNo: "1203", time: "07:52 AM", type: "check-in" },
    { id: 5, name: "David Wilson", grade: "12B", busNo: "1202", time: "07:55 AM", type: "check-in" },
  ];
  
  // Mock student check-out data
  const recentCheckOuts = [
    { id: 6, name: "Lisa Garcia", grade: "10C", busNo: "1204", time: "03:15 PM", type: "check-out" },
    { id: 7, name: "Robert Miller", grade: "9A", busNo: "1205", time: "03:18 PM", type: "check-out" },
    { id: 8, name: "Jennifer Taylor", grade: "11B", busNo: "1204", time: "03:20 PM", type: "check-out" },
    { id: 9, name: "James Anderson", grade: "8C", busNo: "1205", time: "03:22 PM", type: "check-out" },
    { id: 10, name: "Patricia Thomas", grade: "12A", busNo: "1204", time: "03:25 PM", type: "check-out" },
  ];

  return (
    <DashboardLayout title="Check-in/out" userRole="incharge">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-3 md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">QR Code Scanner</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4">
              {scanMode ? (
                <div className="aspect-square w-full max-w-xs bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2">Scanning... Place QR code in view</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-square w-full max-w-xs bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-4">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2">No scanner active</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 w-full">
                <Button 
                  className="flex-1"
                  variant={scanMode ? "outline" : "default"}
                  onClick={() => setScanMode(!scanMode)}
                >
                  {scanMode ? 'Stop Scanning' : 'Start Scanning'}
                </Button>
                <Button variant="outline" className="flex-1">Manual Entry</Button>
              </div>
              
              <div className="w-full pt-4 border-t">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Quick Search</div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Find student..."
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="checkin">
                <TabsList>
                  <TabsTrigger value="checkin">Check-Ins</TabsTrigger>
                  <TabsTrigger value="checkout">Check-Outs</TabsTrigger>
                  <TabsTrigger value="all">All Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="checkin" className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3 text-left">Student</th>
                          <th className="p-3 text-left">Grade</th>
                          <th className="p-3 text-left">Bus No.</th>
                          <th className="p-3 text-left">Time</th>
                          <th className="p-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentCheckIns.map((checkin) => (
                          <tr key={checkin.id} className="hover:bg-gray-50">
                            <td className="p-3 flex items-center">
                              <div className="h-8 w-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              {checkin.name}
                            </td>
                            <td className="p-3">{checkin.grade}</td>
                            <td className="p-3">{checkin.busNo}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                {checkin.time}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                <CheckSquare className="h-3 w-3 mr-1" /> Checked In
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="checkout" className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3 text-left">Student</th>
                          <th className="p-3 text-left">Grade</th>
                          <th className="p-3 text-left">Bus No.</th>
                          <th className="p-3 text-left">Time</th>
                          <th className="p-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentCheckOuts.map((checkout) => (
                          <tr key={checkout.id} className="hover:bg-gray-50">
                            <td className="p-3 flex items-center">
                              <div className="h-8 w-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              {checkout.name}
                            </td>
                            <td className="p-3">{checkout.grade}</td>
                            <td className="p-3">{checkout.busNo}</td>
                            <td className="p-3">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                {checkout.time}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                <CheckSquare className="h-3 w-3 mr-1" /> Checked Out
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="all" className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="p-3 text-left">Student</th>
                          <th className="p-3 text-left">Grade</th>
                          <th className="p-3 text-left">Bus No.</th>
                          <th className="p-3 text-left">Time</th>
                          <th className="p-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[...recentCheckIns, ...recentCheckOuts]
                          .sort((a, b) => {
                            // Simple time-based sorting (just for demo)
                            return a.time > b.time ? -1 : 1;
                          })
                          .map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="p-3 flex items-center">
                                <div className="h-8 w-8 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="h-4 w-4 text-gray-500" />
                                </div>
                                {item.name}
                              </td>
                              <td className="p-3">{item.grade}</td>
                              <td className="p-3">{item.busNo}</td>
                              <td className="p-3">
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                                  {item.time}
                                </div>
                              </td>
                              <td className="p-3">
                                {item.type === 'check-in' ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    <CheckSquare className="h-3 w-3 mr-1" /> Checked In
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    <CheckSquare className="h-3 w-3 mr-1" /> Checked Out
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-blue-700">Total Check-Ins</p>
                    <h3 className="text-2xl font-bold text-blue-900">124</h3>
                  </div>
                  <CheckSquare className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-xs text-blue-600 mt-2">+12 from yesterday</div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-green-700">Total Check-Outs</p>
                    <h3 className="text-2xl font-bold text-green-900">118</h3>
                  </div>
                  <CheckSquare className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-xs text-green-600 mt-2">+10 from yesterday</div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-yellow-700">Pending Check-Outs</p>
                    <h3 className="text-2xl font-bold text-yellow-900">6</h3>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-xs text-yellow-600 mt-2">-2 from yesterday</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-purple-700">Absent Students</p>
                    <h3 className="text-2xl font-bold text-purple-900">8</h3>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-xs text-purple-600 mt-2">+1 from yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CheckInOutPage;
