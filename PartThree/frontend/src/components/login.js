import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authcontext.mjs';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    identity: '',
    accountID: '',
    secret: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { identity, accountID, secret } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://localhost:5000/api/users/login', formData);
      login(res.data.token); // Update the AuthContext
      
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      alert('Login successful. Redirecting...');
      
      // Redirect based on user type
      setTimeout(() => {
        if (payload.role === 'staff') {
          navigate('/payments');
        } else {
          navigate('/dashboard');
        }
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
      alert(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7fafc' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '24px', color: '#2b6cb0', textAlign: 'center' }}>Login to Your Account</h2>

        {message && (
          <div style={{ backgroundColor: '#fbd38d', color: '#9b2c2c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <strong>Error:</strong> {message}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem' }}>ID Number</label>
            <input
              type="text"
              name="identity"
              value={identity}
              onChange={onChange}
              placeholder="Enter your ID Number"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e0',
                fontSize: '16px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem' }}>Account Number</label>
            <input
              type="text"
              name="accountID"
              value={accountID}
              onChange={onChange}
              placeholder="Enter your Account Number"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e0',
                fontSize: '16px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="secret"
              name="secret"
              value={secret}
              onChange={onChange}
              placeholder="Enter your secret"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e0',
                fontSize: '16px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#2b6cb0',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '1rem',
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#2b6cb0' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
