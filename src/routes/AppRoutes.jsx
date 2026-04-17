import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Auth
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Student
import Home from '../pages/student/Home'
import PGList from '../pages/student/PGList'
import PGDetails from '../pages/student/PGDetails'
import CollegeSelect from '../pages/student/CollegeSelect'
import StudentDashboard from '../pages/student/StudentDashboard'

// Owner
import OwnerDashboard from '../pages/owner/OwnerDashboard'
import AddPg from '../pages/owner/AddPg'
import MyPGs from '../pages/owner/MyPGs'
import MyListings from '../pages/owner/MyListings'
import OwnerContact from '../pages/owner/OwnerContact'

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard'
import Users from '../pages/admin/Users'
import VerifyPg from '../pages/admin/VerifyPg'

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="loading-screen"><div className="spinner" /></div>
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

const AppRoutes = () => {
  const { user } = useAuth()

  const getDefaultRoute = () => {
    if (!user) return '/home'
    switch (user.role) {
      case 'admin': return '/admin/dashboard'
      case 'owner': return '/owner/dashboard'
      case 'student': return '/student/dashboard'
      default: return '/home'
    }
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to={getDefaultRoute()} /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to={getDefaultRoute()} /> : <Register />} />
      <Route path="/pg/:id" element={<PGDetails />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <ProtectedRoute roles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/pg-list" element={<PGList />} />
      <Route path="/college-select" element={<CollegeSelect />} />

      {/* Owner Routes */}
      <Route path="/owner/dashboard" element={
        <ProtectedRoute roles={['owner']}>
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/owner/add-pg" element={
        <ProtectedRoute roles={['owner']}>
          <AddPg />
        </ProtectedRoute>
      } />
      <Route path="/owner/my-pgs" element={
        <ProtectedRoute roles={['owner']}>
          <MyPGs />
        </ProtectedRoute>
      } />
      <Route path="/owner/listings" element={
        <ProtectedRoute roles={['owner']}>
          <MyListings />
        </ProtectedRoute>
      } />
      <Route path="/owner/contact" element={
        <ProtectedRoute roles={['owner']}>
          <OwnerContact />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute roles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute roles={['admin']}>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/admin/verify-pg" element={
        <ProtectedRoute roles={['admin']}>
          <VerifyPg />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes