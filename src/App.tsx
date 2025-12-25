import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { SupervisorDashboard } from './components/dashboards/SupervisorDashboard';
import { HODDashboard } from './components/dashboards/HODDashboard';
import { ExaminerDashboard } from './components/dashboards/ExaminerDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { ClearanceDashboard } from './components/clearance/ClearanceDashboard';
import { Toaster } from './components/ui/sonner';

type Page = 
  | 'landing' 
  | 'login' 
  | 'register' 
  | 'student' 
  | 'supervisor' 
  | 'hod' 
  | 'examiner' 
  | 'admin'
  | 'clearance';

type UserRole = 'student' | 'supervisor' | 'hod' | 'examiner' | 'admin' | 'accounts' | 'affairs' | 'dean';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    switch (role) {
      case 'student':
        setCurrentPage('student');
        break;
      case 'supervisor':
        setCurrentPage('supervisor');
        break;
      case 'hod':
        setCurrentPage('hod');
        break;
      case 'examiner':
        setCurrentPage('examiner');
        break;
      case 'admin':
        setCurrentPage('admin');
        break;
      case 'accounts':
      case 'affairs':
      case 'dean':
        setCurrentPage('clearance');
        break;
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onNavigate={setCurrentPage}
          />
        );
      case 'login':
        return (
          <LoginPage 
            onNavigate={setCurrentPage}
            onLogin={handleLogin}
          />
        );
      case 'register':
        return (
          <RegisterPage 
            onNavigate={setCurrentPage}
          />
        );
      case 'student':
        return (
          <StudentDashboard 
            onLogout={handleLogout}
            onNavigate={setCurrentPage}
          />
        );
      case 'supervisor':
        return (
          <SupervisorDashboard 
            onLogout={handleLogout}
          />
        );
      case 'hod':
        return (
          <HODDashboard 
            onLogout={handleLogout}
          />
        );
      case 'examiner':
        return (
          <ExaminerDashboard 
            onLogout={handleLogout}
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            onLogout={handleLogout}
          />
        );
      case 'clearance':
        return (
          <ClearanceDashboard 
            role={userRole as 'accounts' | 'affairs' | 'dean'}
            onLogout={handleLogout}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}
