import logo from './logo.svg';
import './App.css';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Payments from './components/payments'; // Corrected import (capital 'P')
import PrivateRoute from './components/privateroute'; // Corrected import (capital 'P' and 'R')
import Navbar from './components/navbar.js'; // Import Navbar
import HomePage from './components/homepage.js'; // Import HomePage
import { AuthProvider } from './context/authcontext.mjs'; // Import AuthProvider

function App() {
  return (
    
      <AuthProvider> {/* Provide AuthContext */}
        <Router>
          <Navbar /> {/* Include the Navbar here */}
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Use HomePage here */}
            <Route path="/login" element={<Login />} />
            <Route 
              path="/register" 
              element={<Register />} 
            />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/payment" 
              element={
                <PrivateRoute staff={true}>
                  <Payments />
                </PrivateRoute>
              } 
            />
            {/* Add a catch-all route for undefined paths */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    
  );
}

export default App;
