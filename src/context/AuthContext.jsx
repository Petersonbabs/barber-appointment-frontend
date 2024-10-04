import axios from "axios";
import { toast } from "sonner";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [authMessage, setAuthMessage] = useState("test message!");
  const [authStatus, setAuthStatus] = useState("success");
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const setUserData = (data) => {
    setUser(data.user);
    setAccessToken(data.token);
  };

  // REGISTER USER
  const registerUser = async (formData) => {
    setLoadingAuth(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        formData,
      });
      const data = response.data;
      console.log(data);
      setUserData(data);
    } catch (error) {
        console.log(error)
      toast.error(error.response.data.message, {position: 'top-right'})
    } finally {
      setLoadingAuth(false);
    }
  };

  const value = {
    accessToken,
    user,
    setUser,
    registerUser,
    loadingAuth,
    setLoadingAuth,
    authMessage,
    setAuthMessage,
    authStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
