import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('https://localhost:5000/api/payments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPayments(res.data);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to fetch payments.');
        } finally {
            setLoading(false);
        }
    };

    const verifyPayment = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`https://localhost:5000/api/payments/${id}/verify`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Payment Verified: ' + res.data.message);
            fetchPayments();
        } catch (error) {
            alert('Verification Failed: ' + (error.response?.data?.message || 'Verification failed.'));
        }
    };

    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            minHeight: '100vh', 
            padding: '24px', 
            background: 'linear-gradient(to bottom, #1e3a8a, #ffffff)',  // Blue to White gradient
        }}>
            <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '24px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2rem', color: '#ffffff' }}>Transactions</h1>

                {message && (
                    <p style={{ color: 'red' }}>{message}</p>
                )}

                {loading ? (
                    <div style={{ fontSize: '2rem', color: '#ffffff' }}>Loading...</div>
                ) : (
                    <div style={{ width: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#2b6cb0', color: 'white' }}>
                                <tr>
                                    <th style={{ padding: '12px' }}>Customer</th>
                                    <th style={{ padding: '12px' }}>Amount</th>
                                    <th style={{ padding: '12px' }}>Currency</th>
                                    <th style={{ padding: '12px' }}>Provider</th>
                                    <th style={{ padding: '12px' }}>Payee Account</th>
                                    <th style={{ padding: '12px' }}>SWIFT Code</th>
                                    <th style={{ padding: '12px' }}>Status</th>
                                    <th style={{ padding: '12px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment._id}>
                                        <td style={{ padding: '12px' }}>
                                            <span title={payment.client?.accountID || 'N/A'}>
                                                {payment.client?.name || 'N/A'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{ color: 'green' }}>💰</span> {payment.amount}
                                        </td>
                                        <td style={{ padding: '12px' }}>{payment.currency}</td>
                                        <td style={{ padding: '12px' }}>{payment.provider}</td>
                                        <td style={{ padding: '12px' }}>{payment.payeeAccount}</td>
                                        <td style={{ padding: '12px' }}>{payment.swiftCode}</td>
                                        <td style={{ padding: '12px' }}>
                                            {payment.status === 'in_progress' ? (
                                                <span style={{ backgroundColor: '#f6ad55', padding: '4px 8px', borderRadius: '4px' }}>Pending</span>
                                            ) : payment.status === 'approved' ? (
                                                <span style={{ backgroundColor: 'green', padding: '4px 8px', borderRadius: '4px', color: 'white' }}>Verified</span>
                                            ) : (
                                                <span style={{ backgroundColor: 'red', padding: '4px 8px', borderRadius: '4px', color: 'white' }}>Failed</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            {payment.status === 'in_progress' ? (
                                                <button
                                                    onClick={() => verifyPayment(payment._id)}
                                                    style={{
                                                        backgroundColor: '#2b6cb0', 
                                                        color: 'white', 
                                                        padding: '8px 16px', 
                                                        border: 'none', 
                                                        borderRadius: '4px', 
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Verify
                                                </button>
                                            ) : (
                                                <span style={{ color: 'red' }}>❌</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
