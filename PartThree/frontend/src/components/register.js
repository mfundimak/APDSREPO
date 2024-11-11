import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    identity: '',
    accountID: '',
    secret: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, identity, accountID, secret } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure URL matches the backend API endpoint
      const res = await axios.post('https://localhost:5000/api/users/register', formData);
      setMessage(res.data.message);
      alert('Account created. Your account has been successfully created!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
      alert('Error: ' + (error.response?.data?.message || 'An error occurred during registration.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7fafc' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#2c7a7b', textAlign: 'center', fontSize: '24px' }}>Create an Account</h2>

        {message && (
          <div style={{ backgroundColor: '#f56565', color: 'white', padding: '8px', borderRadius: '4px', marginBottom: '16px' }}>
            {message}
          </div>
        )}

        <form onSubmit={onSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="John Doe"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>ID Number</label>
            <input
              type="text"
              name="identity"
              value={identity}
              onChange={onChange}
              placeholder="12345678"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Account Number</label>
            <input
              type="text"
              name="accountID"
              value={accountID}
              onChange={onChange}
              placeholder="1234567890"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              name="secret"
              value={secret}
              onChange={onChange}
              placeholder="Password"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
            />
          </div>

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: '#38b2ac', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px' }}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/login" style={{ color: '#38b2ac', textDecoration: 'none' }}>
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
