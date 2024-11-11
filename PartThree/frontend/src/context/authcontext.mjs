import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        role: null,
    });

    // Decode the token to get role
    useEffect(() => {
        if (auth.token) {
            try {
                const decoded = jwtDecode(auth.token);
                setAuth(prev => ({ ...prev, role: decoded.role }));
            } catch (error) {
                console.error('Invalid token:', error);
                setAuth({ token: null, role: null });
                localStorage.removeItem('token');
            }
        } else {
            setAuth({ token: null, role: null });
        }
    }, [auth.token]);

    // Function to handle login
    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setAuth({ token, role: decoded.role });
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
