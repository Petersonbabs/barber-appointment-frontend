import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";


const ProtectRoute = ()=>{

    const {accessToken, user} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!accessToken && !user) {
          navigate('/login');
        }
      }, [navigate]);
    return <Outlet />

}

export default ProtectRoute