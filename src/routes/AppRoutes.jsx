
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import ManagerDashboard from "../pages/ManagerDashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";



const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
       <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
       <Route
        path="/admin"
        element={
            <ProtectedRoute role="admin">
            <AdminDashboard />
            </ProtectedRoute>
        }
        />

      <Route
        path="/employee"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute role="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
       
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
