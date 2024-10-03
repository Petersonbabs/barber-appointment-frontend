import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";


const ProtectRoute = ()=>{

    const {authenticated} = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated) {
          navigate('/login');
        }
      }, [navigate]);
    return <Outlet />

}

export default ProtectRoute