import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import ClippingText from './components/ClippingText';
import './Home.css';

const WelcomeBriefing = ({ onAcknowledge }) => (
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
            backgroundColor: 'rgba(247, 245, 234, 0.98)',
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
            style={{ maxWidth: '500px', textAlign: 'center', color: '#1A1A1A' }}
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
                onClick={onAcknowledge}
                className="gauntlet-btn"
                style={{ padding: '15px 40px' }}
            >
                [ ACKNOWLEDGE & ENTER ]
            </button>
        </motion.div>
    </motion.div>
);

const MemberLayer = ({ user, userName, onLogout, onBack }) => {
    // Check if briefing was already acknowledged for this user
    const briefingKey = `imrsv_briefing_acknowledged_${user?.id}`;
    const [showBriefing, setShowBriefing] = useState(() => {
        return !localStorage.getItem(briefingKey);
    });

    const [rsvpStatus, setRsvpStatus] = useState({});

    const { scrollY } = useScroll();
    // Start fading after 200px (past the header) and fully gone by 350px
    const brandingOpacity = useTransform(scrollY, [200, 350], [1, 0]);

    const handleRSVP = (eventId) => {
        setRsvpStatus(prev => ({ ...prev, [eventId]: 'SECURED' }));
    };

    const handleAcknowledge = () => {
        localStorage.setItem(briefingKey, 'true');
        setShowBriefing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column', position: 'relative' }}
        >
            <AnimatePresence>
                {showBriefing && <WelcomeBriefing onAcknowledge={handleAcknowledge} />}
            </AnimatePresence>

            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#1A1A1A' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    <motion.div style={{
                        display: 'flex',
                        alignItems: 'center',
                        transform: 'translateY(2px)',
                        opacity: brandingOpacity
                    }}>
                        <ClippingText text="SUNDAY COLLECTION" scale={0.32} />
                    </motion.div>
                </div>
                <div className="nav-links">
                    <span onClick={onLogout} style={{ cursor: 'pointer', color: '#1A1A1A', fontWeight: 600 }}>
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
                    <div style={{ marginBottom: '60px' }}>
                        <h1 className="concept-title" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', color: '#1A1A1A', lineHeight: 1, margin: 0 }}>
                            WELCOME.
                        </h1>
                    </div>

                    <div style={{ display: 'flex', gap: '60px', marginBottom: '60px', alignItems: 'flex-start' }}>
                        <div>
                            <p style={{ fontSize: '1.2rem', color: '#1A1A1A', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '4px' }}>
                                {userName || 'Accessing Portal...'}
                            </p>
                            <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700 }}>
                                MEMBERSHIP ID: {user?.id?.slice(0, 8).toUpperCase() || 'INITIALIZING...'}
                            </p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Tier</p>
                            <p style={{ fontSize: '1.1rem', color: '#1A1A1A', fontWeight: 600 }}>FOUNDATION MEMBER</p>
                        </div>
                    </div>

                    <div className="bucket-grid">
                        <div className="bucket-card" style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031', opacity: 0.8 }}>01.</span>
                            <h3 className="bucket-title" style={{ color: '#1A1A1A' }}>UPCOMING SESSIONS</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.6)' }}>
                                Oahu Hub Activation — April 12.
                                <br />Private location revealed 24h prior.
                            </p>
                            <button
                                onClick={() => handleRSVP('oahu-apr')}
                                className="gauntlet-btn"
                                style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px', backgroundColor: rsvpStatus['oahu-apr'] ? '#2ECC71' : '#F7D031', color: '#000' }}
                            >
                                {rsvpStatus['oahu-apr'] ? '[ RSVP SECURED ]' : '[ SECURE SPOT — $50 ]'}
                            </button>
                        </div>
                        <div className="bucket-card" style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031', opacity: 0.8 }}>02.</span>
                            <h3 className="bucket-title" style={{ color: '#1A1A1A' }}>TICKET SHOP</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.6)' }}>
                                Limited Edition 'Restoration' physical collection. Only available to verified nodes.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>[ ACCESS SHOP ]</button>
                        </div>
                        <div className="bucket-card" style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031', opacity: 0.8 }}>03.</span>
                            <h3 className="bucket-title" style={{ color: '#1A1A1A' }}>RESTORE LEDGER</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.6)' }}>
                                Interactive tracking of Oahu Hub reinvestment into local lei artists and surfers.
                            </p>
                            <button className="gauntlet-btn" style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px' }}>[ OPEN LEDGER ]</button>
                        </div>
                    </div>
                </motion.div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div style={{ opacity: 0.4, fontSize: '0.7rem', color: '#1A1A1A' }}>the imrsv project / secure session access</div>
                <div style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '0.7rem' }}>PROTOCOL: VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
};

export default MemberLayer;
