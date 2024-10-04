import React from "react";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/protected/Dashboard/Routes";
import LoginForm from "./pages/LoginPage";
import ProtectRoute from "./context/ProtectRoutes";
import { Toaster } from "sonner";
// import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <AuthProvider>
      <Toaster richColors toastOptions={
        {
          
          classNames: {
            error: ['bg-red-400', 'text-red-400'],
            success: 'text-green-400',
            warning: ['text-yellow-400', 'bg-black'],
            info: ['bg-blue-400', 'text-blue-400'],
          },
          closeButton: true,
          invert: true,
        }
      }/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />

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
