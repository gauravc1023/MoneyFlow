import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import LandingPage from "./LandingPage";
import Auth from "./Auth";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Profile from "./Profile";
import "./DashBoardBackground.css";
/* ==============================
   PROTECTED ROUTE
============================== */



const ProtectedRoute = ({ allowedRoles, children }) => {

  const token = localStorage.getItem("authToken");
  const storedRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(storedRole)) {
    if (storedRole === "USER") {
      return <Navigate to="/user" replace />;
    }

    if (storedRole === "ADMIN") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

/* ==============================
   APP
============================== */

const App = () => {

  return (
    <BrowserRouter>

      <Routes>

        {/* ==============================
            LANDING PAGE
        ============================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />


        {/* ==============================
            LOGIN
        ============================== */}

        <Route
          path="/login"
          element={<Auth mode="login" />}
        />


        {/* ==============================
            REGISTER
        ============================== */}

        <Route
          path="/register"
          element={<Auth mode="register" />}
        />


        {/* ==============================
            USER DASHBOARD
        ============================== */}

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />


        {/* ==============================
            ADMIN DASHBOARD
        ============================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            USER PROFILE
        ============================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            ADMIN PROFILE
        ============================== */}

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ==============================
            UNKNOWN URL
        ============================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;