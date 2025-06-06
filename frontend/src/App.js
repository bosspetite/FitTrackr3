import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Goal from './pages/Goal';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from './components/ProtectedRoute';

// Simple authentication check
const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/activities" element={<ProtectedRoute element={<Activity />} />} />
        <Route path="/goals" element={<ProtectedRoute element={<Goal />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/logout" element={<ProtectedRoute element={<Login />} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;