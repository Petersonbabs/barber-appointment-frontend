import axios from "axios";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [authMessage, setAuthMessage] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const setUserData = (data) => {
    setUser(data.user);
    setAccessToken(data.token);
    setAuthMessage(data.message);
    setAuthStatus(data.status)
  };

  useEffect(()=>{

  }, [accessToken])

  // validate token
  const validateToken = ()=>{

  }

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

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    try {
      // 1. sign in with google

      const dataFromGoogle = await axios.post()
      const data = {
        name: dataFromGoogle.displayName,
        email: dataFromGoogle.email,
        phoneNumber: dataFromGoogle.phoneNumber,
        profilePic:  dataFromGoogle.image

      }
      // 2. send details to backend
      const response = await axios.post(`${apiUrl}/auth/google`, )

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

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
