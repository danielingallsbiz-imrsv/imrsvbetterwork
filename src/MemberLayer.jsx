import React from 'react';
import { motion } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const MemberLayer = ({ user, onLogout, onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#000', minHeight: '100vh', color: '#F7F5EA', display: 'flex', flexDirection: 'column' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span onClick={onLogout} style={{ cursor: 'pointer', color: '#F7D031' }}>
                        <InteractiveText text="Disconnect Node" />
                    </span>
                </div>
            </nav>

            <section className="section" style={{ paddingTop: '160px', flex: 1 }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                        <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)', margin: 0 }}>
                            MEMBER / SESSION ACTIVE
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 600 }}>
                            NODE ID: {user?.id?.slice(0, 8).toUpperCase() || 'INITIALIZING...'}
                        </span>
                    </div>

                    <h1 className="hero-title" style={{ fontSize: '4rem', color: '#F7F5EA', marginBottom: '30px', lineHeight: 1 }}>
                        <InteractiveText text="WELCOME" /><br />
                        <InteractiveText text="INSIDE." />
                    </h1>

                    <div style={{ display: 'flex', gap: '40px', marginBottom: '60px' }}>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Identity</p>
                            <p style={{ fontSize: '1.1rem', color: '#F7F5EA', fontWeight: 500 }}>{user?.email}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Tier</p>
                            <p style={{ fontSize: '1.1rem', color: '#F7D031', fontWeight: 600 }}>FOUNDATION MEMBER</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Status</p>
                            <p style={{ fontSize: '1.1rem', color: '#45FFC7', fontWeight: 600 }}>VERIFIED NODE</p>
                        </div>
                    </div>

                    <div className="bucket-grid">
                        <div className="bucket-card" style={{ background: '#111', border: '1px solid rgba(247, 245, 234, 0.1)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031' }}>01.</span>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MY SESSIONS</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Your upcoming RSVPs and secured tickets for IMRSV activations.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>View Tickets</button>
                        </div>
                        <div className="bucket-card" style={{ background: '#111', border: '1px solid rgba(247, 245, 234, 0.1)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031' }}>02.</span>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>HUB INTEL</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Exclusive coordinates and timing for the next Oahu activation.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>Reveal Intel</button>
                        </div>
                        <div className="bucket-card" style={{ background: '#111', border: '1px solid rgba(247, 245, 234, 0.1)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031' }}>03.</span>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>RESTORE</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Track how your participation is directly impacting local artists.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>Open Ledger</button>
                        </div>
                    </div>
                </motion.div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(247, 245, 234, 0.1)' }}>
                <div style={{ opacity: 0.4, fontSize: '0.7rem' }}>the imrsv project / secure session access</div>
                <div style={{ color: 'rgba(247, 245, 234, 0.4)', fontSize: '0.7rem' }}>PROTOCOL: VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
};

export default MemberLayer;
