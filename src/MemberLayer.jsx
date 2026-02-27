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

const MemberLayer = ({ user, userName, members = [], onLogout, onBack }) => {
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

    const scrollToMembers = () => {
        const el = document.getElementById('members-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    // Filter for members with active logins (or fallback to approved members if none marked yet)
    const activeMembers = members.filter(m => m.status === 'approved');

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
                    <motion.div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            opacity: brandingOpacity
                        }}
                    >
                        <ClippingText text="SUNDAY COLLECTION" scale={0.22} />
                    </motion.div>
                </div>
                <div className="nav-links">
                    <motion.span
                        onClick={onLogout}
                        whileHover={{
                            opacity: 1,
                            textShadow: 'none'
                        }}
                        style={{
                            cursor: 'pointer',
                            color: '#1A1A1A',
                            fontWeight: 800,
                            fontSize: '0.6rem',
                            letterSpacing: '0.1em',
                            opacity: 0.7,
                            textShadow: 'none'
                        }}
                    >
                        LOG OUT
                    </motion.span>
                </div>
            </nav>

            <section className="section" style={{ paddingTop: '160px', paddingBottom: '100px', flex: 1 }}>
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

                    <div style={{ display: 'flex', gap: '60px', marginBottom: '80px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div>
                            <p style={{ fontSize: '1.2rem', color: '#1A1A1A', fontWeight: 600, letterSpacing: '0.02em', marginBottom: '4px' }}>
                                {userName || 'Accessing Portal...'}
                            </p>
                            <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700 }}>
                                MEMBERSHIP ID: {user?.id?.slice(0, 8).toUpperCase() || 'INITIALIZING...'}
                            </p>
                            <button
                                onClick={scrollToMembers}
                                style={{
                                    background: '#F7D031',
                                    border: 'none',
                                    padding: '12px 24px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    color: '#000',
                                    marginTop: '25px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    letterSpacing: '0.1em',
                                    display: 'block'
                                }}
                            >
                                [ VIEW MEMBERS ]
                            </button>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Tier</p>
                            <p style={{ fontSize: '1.1rem', color: '#1A1A1A', fontWeight: 600 }}>FOUNDATION MEMBER</p>
                        </div>
                    </div>

                    <div className="bucket-grid" style={{ marginBottom: '120px' }}>
                        <div className="bucket-card" style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031', opacity: 0.8 }}>01.</span>
                            <h3 className="bucket-title" style={{ color: '#1A1A1A' }}>UPCOMING SESSIONS</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.6)' }}>
                                Medellín Hub Opening — March 29.
                                <br />Full 4-week drop sequence unlocked.
                            </p>
                            <button
                                onClick={() => handleRSVP('medellin-mar')}
                                className="gauntlet-btn"
                                style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px', backgroundColor: rsvpStatus['medellin-mar'] ? '#2ECC71' : '#F7D031', color: '#000' }}
                            >
                                {rsvpStatus['medellin-mar'] ? '[ RSVP SECURED ]' : '[ SECURE SPOT — $TBD ]'}
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
                    </div>

                    {/* MEMBERS SECTION */}
                    <div id="members-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '100px' }}>
                        <div style={{ marginBottom: '60px' }}>
                            <ClippingText text="MEMBERS." scale={0.5} style={{ color: '#1A1A1A', margin: 0 }} />
                            <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '10px' }}>NODES CURRENTLY IN ORBIT</p>
                        </div>
                        <div className="bucket-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                            {activeMembers.length > 0 ? (
                                activeMembers.map((member, i) => (
                                    <div
                                        key={member.id}
                                        className="bucket-card"
                                        style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '25px', boxShadow: 'none' }}
                                    >
                                        <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>
                                            NODE {member.id?.slice(0, 8).toUpperCase()}
                                        </p>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 600, color: '#1A1A1A' }}>{member.name}</h3>
                                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.6rem', opacity: 0.3, textTransform: 'uppercase' }}>Verified {new Date(member.created_at || member.date).toLocaleDateString()}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span style={{ fontSize: '0.5rem', fontWeight: 700, color: '#2ECC71', letterSpacing: '0.05em' }}>ACTIVE NOW</span>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC71', boxShadow: '0 0 10px rgba(46, 204, 113, 0.4)' }} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>Initializing members data...</p>
                            )}
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
