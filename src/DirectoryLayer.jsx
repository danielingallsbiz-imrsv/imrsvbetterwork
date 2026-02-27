import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import ClippingText from './components/ClippingText';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const DirectoryLayer = ({ members = [], onBack, onLogout }) => {
    const { scrollY } = useScroll();
    const brandingOpacity = useTransform(scrollY, [100, 250], [1, 0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#1A1A1A' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    <motion.div style={{
                        opacity: brandingOpacity,
                        display: 'flex',
                        alignItems: 'center',
                        transform: 'translateY(2px)'
                    }}>
                        <ClippingText text="SUNDAY COLLECTION" scale={0.32} />
                    </motion.div>
                </div>
                <div className="nav-links">
                    <span onClick={onLogout} style={{ cursor: 'pointer', color: '#1A1A1A', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
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
                        <h1 className="concept-title" style={{ fontSize: '3rem', color: '#1A1A1A', margin: 0 }}>MEMBERS.</h1>
                        <p style={{ opacity: 0.4, fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '10px' }}>THE ACTIVE COLLECTIVE</p>
                    </div>

                    <div className="bucket-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {members.length > 0 ? (
                            members.map((member, i) => (
                                <motion.div
                                    key={member.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bucket-card"
                                    style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '30px' }}
                                >
                                    <span className="bucket-num" style={{ color: '#F7D031' }}>{(i + 1).toString().padStart(2, '0')}.</span>
                                    <h3 className="bucket-title" style={{ color: '#1A1A1A', fontSize: '1.2rem', marginBottom: '5px' }}>{member.name}</h3>
                                    <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '15px' }}>
                                        ID: {member.id.toUpperCase()}
                                    </p>
                                    <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '15px 0' }} />
                                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.05em' }}>
                                        Joined {new Date(member.joined_at).toLocaleDateString()}
                                    </p>
                                </motion.div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', opacity: 0.3 }}>
                                <p>No members found in orbit.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div style={{ opacity: 0.4, fontSize: '0.7rem', color: '#1A1A1A' }}>the imrsv project / member directory</div>
                <div style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '0.7rem' }}>PROTOCOL: VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
};

export default DirectoryLayer;
