import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Logout from './Logout';
import AttendancePage from './Attendance';
import NotificationForm from './NotificationForm';
import ErrorBoundary from './ErrorBoundary';
import ProfilePage from './Profile';
import { HolidaysPage } from './Holidays';
import { LeavesPage } from './Leaves';
import AttendanceList from './AttendanceList';
import SkillsList from './SkillsList';
import LeaveList from './LeavesList';

function App() {
  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/sign-in" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-out" element={<Logout />} />
          {/* Protected Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
              <ErrorBoundary>
                <UserDashboard />
              </ErrorBoundary>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/attendance"
            element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/notification-form"
            element={
              <ProtectedRoute>
              <NotificationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
              <ProfilePage />
             </ProtectedRoute>
            }
          />
          <Route
            path="/holidays"
            element={
              <ProtectedRoute>
                <HolidaysPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/leaves"
            element={
              <ProtectedRoute>
                <LeavesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/attendance-list"
            element={
              <ProtectedRoute>
                <AttendanceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills-list"
            element={
              <ProtectedRoute>
                <SkillsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leaves-list"
            element={
              <ProtectedRoute>
                <LeaveList />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
