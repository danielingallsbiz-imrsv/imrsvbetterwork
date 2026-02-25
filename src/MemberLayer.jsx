import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const MemberLayer = ({ user, onLogout, onBack }) => {
    const [showBriefing, setShowBriefing] = useState(true);
    const [rsvpStatus, setRsvpStatus] = useState({});

    const handleRSVP = (eventId) => {
        setRsvpStatus(prev => ({ ...prev, [eventId]: 'SECURED' }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#000', minHeight: '100vh', color: '#F7F5EA', display: 'flex', flexDirection: 'column', position: 'relative' }}
        >
            {/* WELCOME BRIEFING OVERLAY */}
            <AnimatePresence>
                {showBriefing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            zIndex: 3000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '40px'
                        }}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{ maxWidth: '500px', textAlign: 'center' }}
                        >
                            <span className="section-label" style={{ color: '#F7D031' }}>PROTOCOL / INITIATION</span>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', lineHeight: 1 }}>WELCOME TO THE INSIDE.</h2>
                            <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '20px' }}>
                                As a member of the Sunday Collection, your participation directly fuels the restoration of the communities we visit.
                            </p>
                            <p style={{ opacity: 0.7, lineHeight: 1.6, marginBottom: '40px' }}>
                                A significant portion of every ticket and membership goes straight to local artists and cultural preservation projects. You are no longer just a spectator; you are a patron.
                            </p>
                            <button
                                onClick={() => setShowBriefing(false)}
                                className="gauntlet-btn"
                                style={{ padding: '15px 40px' }}
                            >
                                [ ACKNOWLEDGE & ENTER ]
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span onClick={onLogout} style={{ cursor: 'pointer', color: '#F7D031' }}>
                        <InteractiveText text="Log Out" />
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
                    </div>

                    <h1 className="hero-title" style={{ fontSize: '4rem', color: '#F7F5EA', marginBottom: '30px', lineHeight: 1 }}>
                        <InteractiveText text="WELCOME" /><br />
                        <InteractiveText text="INSIDE." />
                    </h1>

                    <div style={{ display: 'flex', gap: '40px', marginBottom: '60px' }}>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Identity</p>
                            <p style={{ fontSize: '1.1rem', color: '#F7F5EA', fontWeight: 500 }}>{user?.email}</p>
                            <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', marginTop: '4px', opacity: 0.8 }}>
                                MEMBERSHIP ID: {user?.id?.slice(0, 8).toUpperCase() || 'INITIALIZING...'} [ SECURE NODE AUTHENTICATOR ]
                            </p>
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
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>UPCOMING SESSIONS</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Oahu Hub Activation — April 12.
                                <br />Private location revealed 24h prior.
                            </p>
                            <button
                                onClick={() => handleRSVP('oahu-apr')}
                                className="gauntlet-btn"
                                style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px', backgroundColor: rsvpStatus['oahu-apr'] ? '#45FFC7' : '#F7D031', color: '#000' }}
                            >
                                {rsvpStatus['oahu-apr'] ? '[ RSVP SECURED ]' : '[ SECURE SPOT — $50 ]'}
                            </button>
                        </div>
                        <div className="bucket-card" style={{ background: '#111', border: '1px solid rgba(247, 245, 234, 0.1)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031' }}>02.</span>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>TICKET SHOP</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Limited Edition 'Restoration' physical collection. Only available to verified nodes.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>[ ACCESS SHOP ]</button>
                        </div>
                        <div className="bucket-card" style={{ background: '#111', border: '1px solid rgba(247, 245, 234, 0.1)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031' }}>03.</span>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>RESTORE LEDGER</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.6)' }}>
                                Interactive tracking of Oahu Hub reinvestment into local lei artists and surfers.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>[ OPEN LEDGER ]</button>
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
