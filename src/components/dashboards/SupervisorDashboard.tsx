import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle,
  Upload,
  Bell,
  LogOut,
  User,
  Eye,
  ThumbsUp,
  ThumbsDown,
  FileCheck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';

interface SupervisorDashboardProps {
  onLogout: () => void;
}

export function SupervisorDashboard({ onLogout }: SupervisorDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [feedback, setFeedback] = useState('');

  const students = [
    { 
      id: 1, 
      name: 'John Smith', 
      project: 'AI-based Healthcare System', 
      ideaStatus: 'pending',
      proposalStatus: 'approved',
      lastUpdate: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      project: 'E-Commerce Platform', 
      ideaStatus: 'approved',
      proposalStatus: 'pending',
      lastUpdate: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Mike Wilson', 
      project: 'Smart City IoT System', 
      ideaStatus: 'approved',
      proposalStatus: 'approved',
      lastUpdate: '3 days ago'
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      project: 'Blockchain Supply Chain', 
      ideaStatus: 'pending',
      proposalStatus: 'not-submitted',
      lastUpdate: '5 hours ago'
    },
  ];

  const pendingRequests = [
    { id: 1, student: 'Alex Brown', project: 'Machine Learning App', type: 'Supervision Request' },
    { id: 2, student: 'Lisa Chen', project: 'Mobile Banking App', type: 'Idea Approval' },
  ];

  const stats = [
    { label: 'Total Students', value: '12', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Reviews', value: '5', icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Approved Projects', value: '8', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'This Month', value: '3', icon: FileCheck, color: 'from-pink-500 to-pink-600' },
  ];

  const handleApprove = (studentId: number, type: string) => {
    toast.success(`${type} approved successfully`);
  };

  const handleReject = (studentId: number, type: string) => {
    toast.error(`${type} rejected`);
  };

  const handleSubmitFeedback = () => {
    if (!feedback) {
      toast.error('Please provide feedback');
      return;
    }
    toast.success('Feedback submitted successfully');
    setFeedback('');
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
                <p className="text-xs text-gray-500">Supervisor Dashboard</p>
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
            <h2 className="text-3xl mb-2">Welcome, Dr. Anderson</h2>
            <p className="text-gray-600">Manage your students and their projects</p>
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

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="bg-white/70 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Review and respond to student requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 rounded-lg bg-white/50 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all"
                    >
                      <div>
                        <h4>{request.student}</h4>
                        <p className="text-sm text-gray-600">{request.project}</p>
                        <Badge variant="outline" className="mt-2">{request.type}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleApprove(request.id, request.type)}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => handleReject(request.id, request.type)}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Students Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/70 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle>My Students</CardTitle>
                <CardDescription>Track student progress and submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead>Student</TableHead>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Idea Status</TableHead>
                        <TableHead>Proposal Status</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-white/50">
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.project}</TableCell>
                          <TableCell>
                            <Badge
                              variant={student.ideaStatus === 'approved' ? 'default' : 'secondary'}
                              className={
                                student.ideaStatus === 'approved'
                                  ? 'bg-green-500'
                                  : student.ideaStatus === 'pending'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-400'
                              }
                            >
                              {student.ideaStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={student.proposalStatus === 'approved' ? 'default' : 'secondary'}
                              className={
                                student.proposalStatus === 'approved'
                                  ? 'bg-green-500'
                                  : student.proposalStatus === 'pending'
                                  ? 'bg-yellow-500'
                                  : 'bg-gray-400'
                              }
                            >
                              {student.proposalStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{student.lastUpdate}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>{student.name} - Project Details</DialogTitle>
                                  <DialogDescription>{student.project}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="mb-2">Project Status</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-600">Idea Status</p>
                                        <Badge className="mt-1 bg-green-500">
                                          {student.ideaStatus}
                                        </Badge>
                                      </div>
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-600">Proposal Status</p>
                                        <Badge className="mt-1 bg-yellow-500">
                                          {student.proposalStatus}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Provide Feedback</Label>
                                    <Textarea
                                      value={feedback}
                                      onChange={(e) => setFeedback(e.target.value)}
                                      placeholder="Write your feedback here..."
                                      rows={4}
                                      className="mt-2"
                                    />
                                  </div>

                                  <div>
                                    <Label>Upload Similarity Report</Label>
                                    <Input type="file" className="mt-2" />
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      onClick={handleSubmitFeedback}
                                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                    >
                                      <Upload className="w-4 h-4 mr-2" />
                                      Submit Feedback
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-green-500 text-green-500 hover:bg-green-50"
                                      onClick={() => handleApprove(student.id, 'Project')}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant="outline"
                                      className="border-red-500 text-red-500 hover:bg-red-50"
                                      onClick={() => handleReject(student.id, 'Project')}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
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
