import React from "react";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/protected/Dashboard/Routes";
import LoginForm from "./pages/LoginPage";
import ProtectRoute from "./context/ProtectRoutes";
import { Toaster } from "sonner";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageNotFound from "./pages/PageNotFound";
// import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
        position="top-right"
          richColors
          toastOptions={{
            classNames: {
              error: ["bg-red-400", "text-red-400"],
              success: "text-green-400",
              warning: ["text-yellow-400", "bg-black"],
              info: ["bg-blue-400", "text-blue-400"],
            },
            closeButton: true,
            invert: true,
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* protected routes */}
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
