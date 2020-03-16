import React from 'react';
import App from './App';
import AuthContextProvider from './context/AuthContext';

export default function Main() {

    return(
        <AuthContextProvider>
            <App/>
        </AuthContextProvider>
    );
}