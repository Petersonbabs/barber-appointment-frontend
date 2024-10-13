import axios from "axios";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";

const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [authMessage, setAuthMessage] = useState("");
  const [authStatus, setAuthStatus] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const auth = getAuth(app);

  const setUserData = (data) => {
    setUser(data.user);
    setAccessToken(data.token);
    setAuthMessage(data.message);
    setAuthStatus(data.status);
  };

  useEffect(() => {}, [accessToken]);

  // validate token
  const validateToken = () => {};

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
      console.log(error);
      toast.error(error.response.data.message, { position: "top-right" });
    } finally {
      setLoadingAuth(false);
    }
  };

  // LOGIN USER
  const loginUser = async (formData) => {
    setLoadingAuth(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);
      if (response.status) {
        toast.success("Login succesful!");
        navigate("/");
      } else {
      }
      console.log(response);
      const data = response.data;
      setUserData(data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response);
    } finally {
      setLoadingAuth(false);
    }
  };

  // SIGN IN WITH GOOGLE
  const signInWithGoogle = async () => {
    try {
      // 1. sign in with google
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const { displayName, email, phoneNumber, imageUrl } =
        resultsFromGoogle.user;

      const data = {
        name: displayName,
        email: email,
        phoneNumber: phoneNumber,
        profilePic: photoURL,
      };
      // 2. send details to backend
      const response = await axios.post(`${apiUrl}/auth/google`, data);
      if (response.status) {
        const user = await response.data;
        console.log(user);
        setUserData(user);
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
    authStatus,
    loginUser,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
