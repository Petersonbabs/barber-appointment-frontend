import { createContext, useContext, useState } from "react";

const AuthContext = createContext()
export const useAuthContext = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const [authenticated, setAuthenticated] = useState(false)
    const value = {
        authenticated
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider