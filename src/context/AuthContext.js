import React, {useState, createContext } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const[isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuth")=== 'true');

    const toggleAuth = (parm) => {
        setIsAuthenticated(parm);
    }
    return(
    <AuthContext.Provider value={{isAuthenticated, toggleAuth}}>
        {props.children}
    </AuthContext.Provider>
    );
}