import { Routes, Route } from "react-router-dom";

import Home from "../pages/student/Home";
import PGList from "../pages/student/PGList";
import PGDetails from "../pages/student/PGDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import AddPG from "../pages/owner/AddPg";
import MyPGs from "../pages/owner/MyPGs";

import AdminDashboard from "../pages/admin/AdminDashboard";
import VerifyPG from "../pages/admin/VerifyPG";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/pgs" element={<PGList />} />
      <Route path="/pg/:id" element={<PGDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= OWNER ================= */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/add-pg"
        element={
          <ProtectedRoute role="owner">
            <AddPG />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/my-pgs"
        element={
          <ProtectedRoute role="owner">
            <MyPGs />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/verify-pg"
        element={
          <ProtectedRoute role="admin">
            <VerifyPG />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
