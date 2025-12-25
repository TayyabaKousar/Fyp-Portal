import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Bell,
  LogOut,
  User,
  FileCheck,
  Clock,
  Award,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface HODDashboardProps {
  onLogout: () => void;
}

export function HODDashboard({ onLogout }: HODDashboardProps) {
  const [remarks, setRemarks] = useState('');

  const stats = [
    { label: 'Total Projects', value: '45', icon: FileCheck, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Approvals', value: '8', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Approved', value: '32', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'Supervisors', value: '12', icon: Users, color: 'from-purple-500 to-purple-600' },
  ];

  const supervisorAssignments = [
    { id: 1, student: 'John Smith', supervisor: 'Dr. Anderson', project: 'AI Healthcare', status: 'pending' },
    { id: 2, student: 'Sarah Johnson', supervisor: 'Dr. Williams', project: 'E-Commerce Platform', status: 'pending' },
    { id: 3, student: 'Mike Wilson', supervisor: 'Dr. Brown', project: 'Smart City IoT', status: 'approved' },
    { id: 4, student: 'Emma Davis', supervisor: 'Dr. Taylor', project: 'Blockchain Supply Chain', status: 'pending' },
  ];

  const enrollmentRequests = [
    { id: 1, student: 'Alex Brown', regNo: 'CS-2021-001', cgpa: '3.8', project: 'Machine Learning App' },
    { id: 2, student: 'Lisa Chen', regNo: 'CS-2021-002', cgpa: '3.9', project: 'Mobile Banking App' },
  ];

  const projectData = [
    { name: 'Approved', value: 32, color: '#10b981' },
    { name: 'Pending', value: 8, color: '#f59e0b' },
    { name: 'Rejected', value: 5, color: '#ef4444' },
  ];

  const supervisorData = [
    { name: 'Dr. Anderson', students: 8 },
    { name: 'Dr. Williams', students: 6 },
    { name: 'Dr. Brown', students: 7 },
    { name: 'Dr. Taylor', students: 5 },
    { name: 'Dr. Martinez', students: 9 },
  ];

  const handleApprove = (id: number, type: string) => {
    toast.success(`${type} approved successfully`);
  };

  const handleReject = (id: number, type: string) => {
    toast.error(`${type} rejected`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FYP Portal
                </h1>
                <p className="text-xs text-gray-500">HOD Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl mb-2">Welcome, Dr. Johnson</h2>
            <p className="text-gray-600">Department Overview & Management</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/70 backdrop-blur-lg border-white/20 hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-3xl">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                  <CardDescription>Overview of all FYP projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={projectData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle>Supervisor Workload</CardTitle>
                  <CardDescription>Number of students per supervisor</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={supervisorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity={1} />
                          <stop offset="100%" stopColor="#1e3a8a" stopOpacity={1} />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Enrollment Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-white/70 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle>FYP Enrollment Requests</CardTitle>
                <CardDescription>Review and approve student enrollments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrollmentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-lg bg-white/50 border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4>{request.student}</h4>
                            <Badge variant="outline">{request.regNo}</Badge>
                            <Badge className="bg-green-500">CGPA: {request.cgpa}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{request.project}</p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Review Enrollment</DialogTitle>
                                <DialogDescription>{request.student} - {request.regNo}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-sm text-gray-600">CGPA</p>
                                    <p className="text-xl">{request.cgpa}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-sm text-gray-600">Project</p>
                                    <p className="text-sm">{request.project}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label>Remarks</Label>
                                  <Textarea
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    placeholder="Add your remarks..."
                                    rows={3}
                                    className="mt-2"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    className="flex-1 bg-green-500 hover:bg-green-600"
                                    onClick={() => handleApprove(request.id, 'Enrollment')}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                                    onClick={() => handleReject(request.id, 'Enrollment')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Supervisor Assignments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-white/70 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle>Supervisor Assignments</CardTitle>
                <CardDescription>Review and approve supervisor-student pairings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead>Student</TableHead>
                        <TableHead>Supervisor</TableHead>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supervisorAssignments.map((assignment) => (
                        <TableRow key={assignment.id} className="hover:bg-white/50">
                          <TableCell>{assignment.student}</TableCell>
                          <TableCell>{assignment.supervisor}</TableCell>
                          <TableCell>{assignment.project}</TableCell>
                          <TableCell>
                            <Badge
                              variant={assignment.status === 'approved' ? 'default' : 'secondary'}
                              className={
                                assignment.status === 'approved'
                                  ? 'bg-green-500'
                                  : 'bg-yellow-500'
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {assignment.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => handleApprove(assignment.id, 'Assignment')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={() => handleReject(assignment.id, 'Assignment')}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
