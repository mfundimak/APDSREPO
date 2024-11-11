import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
          "url('https://img.freepik.com/premium-photo/blue-digital-bank-glowing-icon-blue-tone-background-online-banking-app-transaction-concept-3d_117038-28415.jpg?w=1060')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '600px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.6))',
          }}
        />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 1rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
            }}
          >
           Welcome to the Bank Portal
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '1.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
            Your secure place for banking services
            Secure As A Safe
          </p>
          <Link
            to="/login"
            style={{
              backgroundColor: '#38b2ac',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Get Started
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default HomePage;
