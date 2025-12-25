import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  CheckCircle, 
  Clock,
  XCircle,
  Bell,
  LogOut,
  User,
  Upload,
  FileText,
  AlertCircle,
  Building,
  DollarSign,
  Users as UsersIcon,
  Award
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

interface ClearanceDashboardProps {
  role: 'accounts' | 'affairs' | 'dean' | null;
  onLogout: () => void;
}

export function ClearanceDashboard({ role, onLogout }: ClearanceDashboardProps) {
  const [remarks, setRemarks] = useState('');
  const [viewMode, setViewMode] = useState<'student' | 'department'>(role ? 'department' : 'student');

  // Student clearance status
  const clearanceSteps = [
    { 
      id: 'department', 
      name: 'Department Clearance', 
      icon: Building, 
      status: 'approved', 
      date: 'Nov 10, 2025',
      remarks: 'All lab equipment returned and verified.'
    },
    { 
      id: 'accounts', 
      name: 'Accounts Office', 
      icon: DollarSign, 
      status: 'pending', 
      date: '-',
      remarks: ''
    },
    { 
      id: 'affairs', 
      name: 'Student Affairs', 
      icon: UsersIcon, 
      status: 'not-started', 
      date: '-',
      remarks: ''
    },
    { 
      id: 'academic', 
      name: 'Academic Office', 
      icon: GraduationCap, 
      status: 'not-started', 
      date: '-',
      remarks: ''
    },
    { 
      id: 'dean', 
      name: 'Dean Office', 
      icon: Award, 
      status: 'not-started', 
      date: '-',
      remarks: ''
    },
  ];

  // Department pending clearances
  const pendingClearances = [
    { 
      id: 1, 
      student: 'John Smith', 
      regNo: 'CS-2021-001', 
      program: 'BS Computer Science',
      submissionDate: 'Nov 20, 2025',
      documents: ['Degree Clearance Form', 'No Dues Certificate']
    },
    { 
      id: 2, 
      student: 'Sarah Johnson', 
      regNo: 'CS-2021-002', 
      program: 'BS Software Engineering',
      submissionDate: 'Nov 21, 2025',
      documents: ['Degree Clearance Form']
    },
    { 
      id: 3, 
      student: 'Mike Wilson', 
      regNo: 'CS-2021-003', 
      program: 'BS Computer Science',
      submissionDate: 'Nov 22, 2025',
      documents: ['Degree Clearance Form', 'No Dues Certificate', 'Library Clearance']
    },
  ];

  const completedSteps = clearanceSteps.filter(step => step.status === 'approved').length;
  const progressPercentage = (completedSteps / clearanceSteps.length) * 100;

  const statusConfig = {
    approved: { label: 'Approved', color: 'bg-green-500', icon: CheckCircle, textColor: 'text-green-600' },
    pending: { label: 'Pending', color: 'bg-yellow-500', icon: Clock, textColor: 'text-yellow-600' },
    rejected: { label: 'Rejected', color: 'bg-red-500', icon: XCircle, textColor: 'text-red-600' },
    'not-started': { label: 'Not Started', color: 'bg-gray-400', icon: AlertCircle, textColor: 'text-gray-600' },
  };

  const handleApprove = (studentId: number) => {
    toast.success('Clearance approved successfully');
  };

  const handleReject = (studentId: number) => {
    if (!remarks) {
      toast.error('Please provide remarks for rejection');
      return;
    }
    toast.error('Clearance rejected');
    setRemarks('');
  };

  const handleRequestClearance = () => {
    toast.success('Clearance request submitted');
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'accounts': return 'Accounts Office';
      case 'affairs': return 'Student Affairs';
      case 'dean': return 'Dean Office';
      default: return 'Student';
    }
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
                <p className="text-xs text-gray-500">Degree Clearance - {getRoleTitle()}</p>
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
            <h2 className="text-3xl mb-2">Degree Clearance</h2>
            <p className="text-gray-600">
              {role ? 'Review and approve student clearance requests' : 'Track your degree clearance progress'}
            </p>
          </motion.div>

          {/* Student View */}
          {!role && (
            <>
              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle>Clearance Progress</CardTitle>
                    <CardDescription>Complete all clearances to receive your degree</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Overall Progress</span>
                        <span className="text-sm">{completedSteps} of {clearanceSteps.length} completed</span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      <p className="text-sm text-gray-500 text-right mt-1">
                        {progressPercentage.toFixed(0)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Clearance Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle>Clearance Steps</CardTitle>
                    <CardDescription>Follow these steps to complete your clearance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clearanceSteps.map((step, index) => {
                        const config = statusConfig[step.status as keyof typeof statusConfig];
                        const Icon = step.icon;
                        const StatusIcon = config.icon;
                        
                        return (
                          <div
                            key={step.id}
                            className="relative p-4 rounded-xl bg-white/50 border border-gray-200 hover:shadow-md transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl ${config.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4>{step.name}</h4>
                                  <Badge className={config.color}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {config.label}
                                  </Badge>
                                </div>
                                
                                {step.date !== '-' && (
                                  <p className="text-sm text-gray-500 mb-2">
                                    Completed on: {step.date}
                                  </p>
                                )}
                                
                                {step.remarks && (
                                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {step.remarks}
                                  </p>
                                )}

                                {step.status === 'pending' && (
                                  <div className="mt-3">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button size="sm" variant="outline">
                                          <FileText className="w-4 h-4 mr-2" />
                                          Submit Documents
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>{step.name}</DialogTitle>
                                          <DialogDescription>Upload required documents</DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                          <div>
                                            <Label>Upload Documents</Label>
                                            <Input type="file" multiple className="mt-2" />
                                          </div>
                                          <div>
                                            <Label>Additional Notes</Label>
                                            <Textarea
                                              placeholder="Add any additional information..."
                                              rows={3}
                                              className="mt-2"
                                            />
                                          </div>
                                          <Button
                                            onClick={handleRequestClearance}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                          >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Submit Request
                                          </Button>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                )}
                              </div>
                            </div>

                            {index < clearanceSteps.length - 1 && (
                              <div
                                className={`absolute left-10 top-20 w-0.5 h-8 ${
                                  step.status === 'approved' ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}

          {/* Department View */}
          {role && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle>Pending Clearance Requests</CardTitle>
                  <CardDescription>Review and process student clearances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead>Student</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Submission Date</TableHead>
                          <TableHead>Documents</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingClearances.map((clearance) => (
                          <TableRow key={clearance.id} className="hover:bg-white/50">
                            <TableCell>
                              <div>
                                <p>{clearance.student}</p>
                                <p className="text-xs text-gray-500">{clearance.regNo}</p>
                              </div>
                            </TableCell>
                            <TableCell>{clearance.program}</TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {clearance.submissionDate}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {clearance.documents.map((doc, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Review Clearance Request</DialogTitle>
                                    <DialogDescription>
                                      {clearance.student} - {clearance.regNo}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-600">Program</p>
                                        <p>{clearance.program}</p>
                                      </div>
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-600">Submission Date</p>
                                        <p>{clearance.submissionDate}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label>Submitted Documents</Label>
                                      <div className="mt-2 space-y-2">
                                        {clearance.documents.map((doc, idx) => (
                                          <div
                                            key={idx}
                                            className="p-3 rounded-lg bg-gray-50 flex items-center justify-between"
                                          >
                                            <div className="flex items-center gap-2">
                                              <FileText className="w-5 h-5 text-blue-500" />
                                              <span className="text-sm">{doc}</span>
                                            </div>
                                            <Button size="sm" variant="ghost">
                                              View
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <Label>Remarks (Optional)</Label>
                                      <Textarea
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Add any remarks or reasons for rejection..."
                                        rows={3}
                                        className="mt-2"
                                      />
                                    </div>

                                    <div className="flex gap-2">
                                      <Button
                                        className="flex-1 bg-green-500 hover:bg-green-600"
                                        onClick={() => handleApprove(clearance.id)}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button
                                        variant="outline"
                                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                                        onClick={() => handleReject(clearance.id)}
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
          )}
        </div>
      </main>
    </div>
  );
}
