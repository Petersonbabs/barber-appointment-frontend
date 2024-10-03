import React from "react";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/protected/Dashboard/Routes";
import Login from "./pages/Login";
import ProtectRoute from "./context/ProtectRoutes";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* protected routes */}
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
