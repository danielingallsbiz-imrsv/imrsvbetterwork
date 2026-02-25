import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const LoginLayer = ({ onBack, onNavigateToApply, onLogin, onSignup }) => {
    const [mode, setMode] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('mode') === 'claim' ? 'signup' : 'login';
    });
    const [email, setEmail] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('email') || '';
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                if (onLogin) await onLogin(email, password);
            } else {
                if (password !== confirmPassword) {
                    throw new Error("PASSWORDS DO NOT MATCH.");
                }
                if (onSignup) await onSignup(email, password);
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1A1A1A' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span onClick={onBack} style={{ cursor: 'pointer', color: '#000' }}>
                        <InteractiveText text="Back" />
                    </span>
                </div>
            </nav>

            <section className="section" style={{ maxWidth: '400px', paddingTop: '160px', flex: 1 }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label" style={{ color: 'rgba(26, 26, 26, 0.4)', textTransform: 'uppercase' }}>
                        SUNDAY COLLECTION
                    </span>
                    <h1 className="concept-title" style={{ fontSize: '3rem', color: '#1A1A1A', marginBottom: '10px', lineHeight: 1.1 }}>
                        <InteractiveText text={mode === 'login' ? "LOGIN" : "CREATE ACCOUNT"} />
                    </h1>

                    {mode === 'signup' && (
                        <p style={{ fontSize: '0.9rem', opacity: 0.5, marginBottom: '30px' }}>
                            Initialize your node by setting a secure password.
                        </p>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: mode === 'signup' ? '10px' : '40px' }}>
                        {error && (
                            <div style={{ backgroundColor: 'rgba(255, 69, 58, 0.1)', color: '#FF453A', padding: '15px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '3px solid #FF453A' }}>
                                {error.toUpperCase()}
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alex@example.com"
                                style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>Password</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={mode === 'login' ? "Enter your password" : "Set your password"}
                                style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }}
                            />
                        </div>

                        {mode === 'signup' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>Confirm Password</label>
                                <input
                                    required
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }}
                                />
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="gauntlet-btn"
                            style={{
                                marginTop: '20px',
                                opacity: loading ? 0.3 : 1,
                                padding: '18px'
                            }}
                        >
                            {loading ? 'PROCESSING...' : mode === 'login' ? 'Login' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{ marginTop: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                            {mode === 'login' ? "First time here?" : "Already have access?"}{' '}
                            <span
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#000', fontWeight: 700 }}
                            >
                                {mode === 'login' ? "Create an account" : "Login here"}
                            </span>
                        </p>

                        {mode === 'login' && (
                            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                                Not a member? <span onClick={onNavigateToApply} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#000', fontWeight: 700 }}>Apply for access</span>
                            </p>
                        )}
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default LoginLayer;
