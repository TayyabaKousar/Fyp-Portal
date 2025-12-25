import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle,
  Bell,
  LogOut,
  User,
  Eye,
  Download,
  Save,
  Clock,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface ExaminerDashboardProps {
  onLogout: () => void;
}

export function ExaminerDashboard({ onLogout }: ExaminerDashboardProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [marks, setMarks] = useState({
    introduction: '',
    literature: '',
    methodology: '',
    implementation: '',
    results: '',
    conclusion: '',
    presentation: '',
    documentation: '',
  });
  const [feedback, setFeedback] = useState('');

  const stats = [
    { label: 'Assigned Projects', value: '8', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Evaluations', value: '3', icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Completed', value: '5', icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'This Week', value: '2', icon: FileCheck, color: 'from-purple-500 to-purple-600' },
  ];

  const assignedProjects = [
    { 
      id: 1, 
      student: 'John Smith', 
      regNo: 'CS-2021-001',
      project: 'AI-based Healthcare System', 
      supervisor: 'Dr. Anderson',
      status: 'pending',
      type: 'Thesis',
      submissionDate: 'Nov 20, 2025'
    },
    { 
      id: 2, 
      student: 'Sarah Johnson', 
      regNo: 'CS-2021-002',
      project: 'E-Commerce Platform', 
      supervisor: 'Dr. Williams',
      status: 'pending',
      type: 'Proposal',
      submissionDate: 'Nov 18, 2025'
    },
    { 
      id: 3, 
      student: 'Mike Wilson', 
      regNo: 'CS-2021-003',
      project: 'Smart City IoT System', 
      supervisor: 'Dr. Brown',
      status: 'completed',
      type: 'Thesis',
      submissionDate: 'Nov 15, 2025'
    },
  ];

  const evaluationCriteria = [
    { name: 'introduction', label: 'Introduction & Background', maxMarks: 10 },
    { name: 'literature', label: 'Literature Review', maxMarks: 10 },
    { name: 'methodology', label: 'Methodology', maxMarks: 15 },
    { name: 'implementation', label: 'Implementation', maxMarks: 20 },
    { name: 'results', label: 'Results & Analysis', maxMarks: 15 },
    { name: 'conclusion', label: 'Conclusion', maxMarks: 10 },
    { name: 'presentation', label: 'Presentation Quality', maxMarks: 10 },
    { name: 'documentation', label: 'Documentation', maxMarks: 10 },
  ];

  const totalMarks = evaluationCriteria.reduce((sum, criterion) => sum + criterion.maxMarks, 0);
  const obtainedMarks = Object.values(marks).reduce((sum, mark) => sum + (parseFloat(mark) || 0), 0);
  const percentage = (obtainedMarks / totalMarks) * 100;

  const handleSubmitEvaluation = () => {
    const missingMarks = evaluationCriteria.some(
      (criterion) => !marks[criterion.name as keyof typeof marks]
    );

    if (missingMarks) {
      toast.error('Please fill in all marks');
      return;
    }

    if (!feedback) {
      toast.error('Please provide feedback');
      return;
    }

    toast.success('Evaluation submitted successfully');
    setMarks({
      introduction: '',
      literature: '',
      methodology: '',
      implementation: '',
      results: '',
      conclusion: '',
      presentation: '',
      documentation: '',
    });
    setFeedback('');
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
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
                <p className="text-xs text-gray-500">Examiner Dashboard</p>
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
            <h2 className="text-3xl mb-2">Welcome, Dr. Roberts</h2>
            <p className="text-gray-600">Review and evaluate student projects</p>
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

          {/* Assigned Projects Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/70 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle>Assigned Projects</CardTitle>
                <CardDescription>Projects assigned for evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead>Student</TableHead>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Supervisor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedProjects.map((project) => (
                        <TableRow key={project.id} className="hover:bg-white/50">
                          <TableCell>
                            <div>
                              <p>{project.student}</p>
                              <p className="text-xs text-gray-500">{project.regNo}</p>
                            </div>
                          </TableCell>
                          <TableCell>{project.project}</TableCell>
                          <TableCell>{project.supervisor}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                project.status === 'completed'
                                  ? 'bg-green-500'
                                  : 'bg-yellow-500'
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{project.submissionDate}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedStudent(project)}
                                  disabled={project.status === 'completed'}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  {project.status === 'completed' ? 'View' : 'Evaluate'}
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Evaluate Project</DialogTitle>
                                  <DialogDescription>
                                    {project.student} - {project.project}
                                  </DialogDescription>
                                </DialogHeader>

                                <Tabs defaultValue="document" className="mt-4">
                                  <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="document">Document</TabsTrigger>
                                    <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="document" className="space-y-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base">Project Documents</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-3">
                                        <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <FileText className="w-10 h-10 text-blue-500" />
                                            <div>
                                              <p>Proposal.pdf</p>
                                              <p className="text-sm text-gray-500">2.5 MB</p>
                                            </div>
                                          </div>
                                          <Button size="sm" variant="outline">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                          </Button>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <FileText className="w-10 h-10 text-purple-500" />
                                            <div>
                                              <p>SRS_Document.pdf</p>
                                              <p className="text-sm text-gray-500">3.2 MB</p>
                                            </div>
                                          </div>
                                          <Button size="sm" variant="outline">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                          </Button>
                                        </div>
                                        <div className="p-4 rounded-lg bg-gray-50 flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <FileText className="w-10 h-10 text-pink-500" />
                                            <div>
                                              <p>Final_Thesis.pdf</p>
                                              <p className="text-sm text-gray-500">8.7 MB</p>
                                            </div>
                                          </div>
                                          <Button size="sm" variant="outline">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>

                                  <TabsContent value="evaluation" className="space-y-4">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base">Evaluation Form</CardTitle>
                                        <CardDescription>Assign marks based on evaluation criteria</CardDescription>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        {evaluationCriteria.map((criterion) => (
                                          <div key={criterion.name} className="grid grid-cols-3 gap-4 items-center">
                                            <Label className="col-span-2">{criterion.label}</Label>
                                            <div className="flex items-center gap-2">
                                              <Input
                                                type="number"
                                                min="0"
                                                max={criterion.maxMarks}
                                                value={marks[criterion.name as keyof typeof marks]}
                                                onChange={(e) =>
                                                  setMarks({
                                                    ...marks,
                                                    [criterion.name]: e.target.value,
                                                  })
                                                }
                                                placeholder="0"
                                                className="w-20"
                                              />
                                              <span className="text-sm text-gray-500">/ {criterion.maxMarks}</span>
                                            </div>
                                          </div>
                                        ))}

                                        <div className="pt-4 border-t">
                                          <div className="flex justify-between mb-2">
                                            <span>Total Score</span>
                                            <span className="text-xl">
                                              {obtainedMarks.toFixed(1)} / {totalMarks}
                                            </span>
                                          </div>
                                          <Progress value={percentage} className="h-2 mb-2" />
                                          <p className="text-sm text-gray-500 text-right">
                                            {percentage.toFixed(1)}%
                                          </p>
                                        </div>

                                        <div>
                                          <Label>Feedback & Comments</Label>
                                          <Textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Provide detailed feedback on the student's work..."
                                            rows={6}
                                            className="mt-2"
                                          />
                                        </div>

                                        <div className="flex gap-2 pt-4">
                                          <Button
                                            onClick={handleSubmitEvaluation}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                          >
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Submit Evaluation
                                          </Button>
                                          <Button
                                            variant="outline"
                                            onClick={handleSaveDraft}
                                          >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Draft
                                          </Button>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </TabsContent>
                                </Tabs>
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
