import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authcontext.mjs';

const Navbar = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const isEmployee = auth.role === 'staff';

    const handleLogout = () => {
        logout();
        navigate('/HomePage');
    };

    return (
        <div style={{ backgroundColor: '#1a202c', padding: '1rem', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <NavLink 
                        to="/" 
                        style={({ isActive }) => ({
                            color: isActive ? '#0077FF' : 'white', // Lumo Blue when active
                            marginRight: '20px', 
                            textDecoration: 'none'
                        })}
                    >
                        Home
                    </NavLink>

                    {auth.token && (
                        <>
                            <NavLink 
                                to="/dashboard" 
                                style={({ isActive }) => ({
                                    color: isActive ? '#0077FF' : 'white', // Lumo Blue when active
                                    marginRight: '20px', 
                                    textDecoration: 'none'
                                })}
                            >
                                Dashboard
                            </NavLink>

                            {isEmployee && (
                                <NavLink 
                                    to="/payment" 
                                    style={({ isActive }) => ({
                                        color: isActive ? '#0077FF' : 'white', // Lumo Blue when active
                                        marginRight: '20px', 
                                        textDecoration: 'none'
                                    })}
                                >
                                    Payments
                                </NavLink>
                            )}
                        </>
                    )}
                </div>
                
                <div style={{ marginLeft: 'auto' }}>
                    {auth.token ? (
                        <button 
                            onClick={handleLogout} 
                            style={{
                                backgroundColor: '#1a202c', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0.5rem 1rem', 
                                cursor: 'pointer', 
                                fontSize: '16px'
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink to="/login" style={{ marginRight: '20px', textDecoration: 'none' }}>
                            <button 
                                style={{
                                    backgroundColor: '#1a202c', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '0.5rem 1rem', 
                                    cursor: 'pointer', 
                                    fontSize: '16px'
                                }}
                            >
                                Login
                            </button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
