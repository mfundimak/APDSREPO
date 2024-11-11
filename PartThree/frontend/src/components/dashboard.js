import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authcontext.mjs'; 

const Dashboard = () => {
    const { auth } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        provider: 'SWIFT',
        payeeAccount: '',
        swiftCode: '',
    });
    const [loading, setLoading] = useState(false);

    const { amount, currency, provider, payeeAccount, swiftCode } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = auth.token;
        try {
            const res = await axios.post('https://localhost:5000/api/payments', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Payment Successful: ' + res.data.message);
            setFormData({
                amount: '',
                currency: 'USD',
                provider: 'SWIFT',
                payeeAccount: '',
                swiftCode: '',
            });
        } catch (error) {
            alert('Payment Failed: ' + (error.response?.data?.message || 'An error occurred during the payment process.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #1e3a8a, #ffffff)',  // Blue to White gradient
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                maxWidth: '400px',  // Reduced width
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '100%'
            }}>
                <h2 style={{ textAlign: 'center', color: '#1a202c' }}>Welcome To Your Payment Portal</h2>
                <p style={{ textAlign: 'center', fontSize: '16px', color: '#718096', marginBottom: '20px' }}>
                    Transfer funds safely on your portal
                </p>

                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <label htmlFor="amount" style={{ display: 'block', marginBottom: '8px' }}>Amount</label>
                        <div style={{ position: 'relative' }}>
                            <span style={{
                                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a0aec0', zIndex: 1,
                                pointerEvents: 'none', paddingLeft: '10px'
                            }}>$</span>
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={onChange}
                                placeholder="Enter amount"
                                min="0"
                                step="0.01"
                                style={{
                                    padding: '12px 16px', paddingLeft: '32px', width: '100%', maxWidth: '320px',  // Reduced width
                                    borderRadius: '8px', border: '1px solid #e2e8f0', margin: '0 auto', position: 'relative'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <label htmlFor="currency" style={{ display: 'block', marginBottom: '8px' }}>Currency</label>
                        <select
                            name="currency"
                            value={currency}
                            onChange={onChange}
                            style={{
                                padding: '12px 16px', width: '100%', maxWidth: '320px', // Reduced width
                                borderRadius: '8px', border: '1px solid #e2e8f0', margin: '0 auto'
                            }}
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="ZAR">ZAR - South African Rand</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <label htmlFor="provider" style={{ display: 'block', marginBottom: '8px' }}>Provider</label>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ marginRight: '8px', color: '#3182ce' }}>SWIFT</span>  {/* Blue color */}
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <label htmlFor="payeeAccount" style={{ display: 'block', marginBottom: '8px' }}>Payee Account</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="payeeAccount"
                                value={payeeAccount}
                                onChange={onChange}
                                placeholder="Enter payee account number"
                                style={{
                                    padding: '12px 16px', width: '100%', maxWidth: '320px', // Reduced width
                                    borderRadius: '8px', border: '1px solid #e2e8f0', margin: '0 auto'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                        <label htmlFor="swiftCode" style={{ display: 'block', marginBottom: '8px' }}>SWIFT Code</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                name="swiftCode"
                                value={swiftCode}
                                onChange={onChange}
                                placeholder="Enter SWIFT/BIC code"
                                style={{
                                    padding: '12px 16px', width: '100%', maxWidth: '320px', // Reduced width
                                    borderRadius: '8px', border: '1px solid #e2e8f0', margin: '0 auto'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '12px 24px', backgroundColor: '#3182ce', color: 'white', borderRadius: '8px', width: '100%', fontSize: '16px',
                            border: 'none', cursor: 'pointer'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
