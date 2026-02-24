import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const ApplicationLayer = ({ navigateToHome, onSubmit }) => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [timer, setTimer] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const appData = {
            name: formData.get('name'),
            hub: formData.get('hub'),
            social: formData.get('social'),
            occupation: formData.get('occupation'),
            gender: formData.get('gender'),
            birthday: formData.get('birthday'),
            address: formData.get('address'),
            contribution: formData.get('contribution')
        };

        setStatus('submitting');

        // Simulating network transmission
        setTimeout(() => {
            if (onSubmit) onSubmit(appData);
            navigateToHome(true);
        }, 1200);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1A1A1A' }} onClick={() => navigateToHome(false)}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links">
                    <span onClick={() => navigateToHome(false)} style={{ cursor: 'pointer', color: '#1A1A1A' }}>{status === 'submitting' ? '...' : 'Cancel'}</span>
                </div>
            </nav>

            <section className="section" style={{ maxWidth: '600px', paddingTop: '160px' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="section-label" style={{ color: 'rgba(26, 26, 26, 0.4)' }}>MEMBERSHIP APPLICATION</span>
                    <h1 className="concept-title" style={{ fontSize: '4rem', color: '#1A1A1A', marginBottom: '40px' }}>JOIN THE <br />COLLECTIVE.</h1>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '60px' }} onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Full Name</label>
                            <input required name="name" type="text" placeholder="Alex Rivera" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Primary Hub / City</label>
                            <input required name="hub" type="text" placeholder="Oahu, Medellín, etc." style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Social Link / Portfolio</label>
                            <input required name="social" type="text" placeholder="@handle or url" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Occupation</label>
                            <input required name="occupation" type="text" placeholder="Architect, Builder, Creator, etc." style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Gender</label>
                                <select required name="gender" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none', color: '#1A1A1A' }}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Date of Birth</label>
                                <input required name="birthday" type="date" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '8px 0', fontSize: '1.2rem', outline: 'none', color: '#1A1A1A' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Mailing Address (For physical invitations)</label>
                            <input required name="address" type="text" placeholder="Street, City, State, ZIP, Country" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Contribution to Sunday Collection</label>
                            <textarea required name="contribution" placeholder="How do you intend to participate?" rows="4" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none', resize: 'none' }} />
                        </div>

                        <button
                            disabled={status === 'submitting'}
                            className="gauntlet-btn"
                            style={{ width: '100%', marginTop: '30px', opacity: status === 'submitting' ? 0.7 : 1 }}
                        >
                            {status === 'submitting' ? 'VERIFYING...' : 'Submit Request'}
                        </button>
                    </form>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default ApplicationLayer;
