import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  User, 
  Bell,
  LogOut,
  Menu,
  X,
  FileCheck,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';

interface StudentDashboardProps {
  onLogout: () => void;
  onNavigate: (page: 'clearance') => void;
}

export function StudentDashboard({ onLogout, onNavigate }: StudentDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const projectStatus = {
    ideaStatus: 'approved',
    supervisorStatus: 'approved',
    proposalStatus: 'pending',
    internalEvaluation: 'not-started',
    externalEvaluation: 'not-started',
  };

  const statusConfig = {
    approved: { label: 'Approved', color: 'bg-green-500', icon: CheckCircle },
    pending: { label: 'Pending', color: 'bg-yellow-500', icon: Clock },
    rejected: { label: 'Rejected', color: 'bg-red-500', icon: XCircle },
    'not-started': { label: 'Not Started', color: 'bg-gray-400', icon: AlertCircle },
  };

  const timeline = [
    { step: 'Idea Submission', status: 'completed', date: 'Oct 15, 2025' },
    { step: 'Supervisor Selection', status: 'completed', date: 'Oct 20, 2025' },
    { step: 'Proposal Submission', status: 'in-progress', date: 'In Progress' },
    { step: 'Internal Evaluation', status: 'pending', date: 'Pending' },
    { step: 'External Evaluation', status: 'pending', date: 'Pending' },
    { step: 'Thesis Submission', status: 'pending', date: 'Pending' },
  ];

  const notifications = [
    { id: 1, message: 'Your proposal is under review', time: '2 hours ago', type: 'info' },
    { id: 2, message: 'Supervisor approved your idea', time: '1 day ago', type: 'success' },
    { id: 3, message: 'Upload your SRS document', time: '3 days ago', type: 'warning' },
  ];

  const handleFileUpload = (type: string) => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    toast.success(`${type} uploaded successfully`);
    setSelectedFile(null);
  };

  const progressPercentage = (timeline.filter(t => t.status === 'completed').length / timeline.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    FYP Portal
                  </h1>
                  <p className="text-xs text-gray-500">Student Dashboard</p>
                </div>
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

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            x: sidebarOpen ? 0 : -300,
          }}
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/70 backdrop-blur-xl border-r border-gray-200 lg:translate-x-0 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:block`}
        >
          <nav className="p-4 space-y-2 mt-20 lg:mt-4">
            <Button variant="ghost" className="w-full justify-start text-purple-600 bg-purple-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => onNavigate('clearance')}
            >
              <FileCheck className="w-4 h-4 mr-2" />
              Degree Clearance
            </Button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl mb-2">Welcome back, John!</h2>
              <p className="text-gray-600">Here's your FYP progress overview</p>
            </motion.div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(projectStatus).map(([key, status], index) => {
                const config = statusConfig[status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/70 backdrop-blur-lg border-white/20 hover:shadow-lg transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {config.label}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h3 className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                  <CardDescription>Track your FYP journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Overall Progress</span>
                      <span className="text-sm">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="relative">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.status === 'completed'
                                ? 'bg-green-500'
                                : item.status === 'in-progress'
                                ? 'bg-blue-500'
                                : 'bg-gray-300'
                            }`}
                          >
                            {item.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : item.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-white" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-white" />
                            )}
                          </div>
                          {index < timeline.length - 1 && (
                            <div
                              className={`absolute left-1/2 top-10 w-0.5 h-8 -translate-x-1/2 ${
                                item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4>{item.step}</h4>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Document Upload & Notifications */}
            <div className="grid lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card className="bg-white/70 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle>Document Upload</CardTitle>
                    <CardDescription>Upload your project documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="proposal">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="proposal">Proposal</TabsTrigger>
                        <TabsTrigger value="srs">SRS</TabsTrigger>
                        <TabsTrigger value="thesis">Thesis</TabsTrigger>
                      </TabsList>

                      {['proposal', 'srs', 'thesis'].map((type) => (
                        <TabsContent key={type} value={type} className="space-y-4">
                          <div>
                            <Label htmlFor={`${type}-file`}>Select File</Label>
                            <Input
                              id={`${type}-file`}
                              type="file"
                              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`${type}-description`}>Description</Label>
                            <Textarea
                              id={`${type}-description`}
                              placeholder={`Add a description for your ${type}...`}
                              className="mt-1"
                              rows={3}
                            />
                          </div>
                          <Button
                            onClick={() => handleFileUpload(type)}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload {type.charAt(0).toUpperCase() + type.slice(1)}
                          </Button>
                        </TabsContent>
                      ))}
                    </Tabs>
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
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Recent updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 rounded-lg bg-white/50 border border-gray-200 hover:shadow-md transition-all"
                        >
                          <div className="flex gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notif.type === 'success'
                                  ? 'bg-green-500'
                                  : notif.type === 'warning'
                                  ? 'bg-yellow-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
