import React from 'react';
import { useScroll, useTransform, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
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
                            members.map((member, i) => {
                                const bioExcerpt = member.bio
                                    ? member.bio.trim().split(/\s+/).slice(0, 20).join(' ') + (member.bio.trim().split(/\s+/).length > 20 ? '…' : '')
                                    : null;
                                const avatarUrl = member.photos?.find(p => p);
                                const joinedDate = member.joined_date || member.created_at;
                                return (
                                    <motion.div
                                        key={member.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bucket-card"
                                        style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', padding: '30px' }}
                                    >
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                                            {avatarUrl ? (
                                                <img src={avatarUrl} alt={member.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '50%', flexShrink: 0, border: '2px solid rgba(0,0,0,0.06)' }} onError={e => e.target.style.display = 'none'} />
                                            ) : (
                                                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#F7D031', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 800, color: '#111', flexShrink: 0 }}>
                                                    {(member.full_name || member.name || '?')[0].toUpperCase()}
                                                </div>
                                            )}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <span className="bucket-num" style={{ color: '#F7D031', fontSize: '0.65rem' }}>{(i + 1).toString().padStart(2, '0')}.</span>
                                                <h3 style={{ color: '#1A1A1A', fontSize: '1.1rem', fontWeight: 700, margin: '2px 0 4px', lineHeight: 1.2 }}>{member.full_name || member.name}</h3>
                                                {member.profession && (
                                                    <span style={{ fontSize: '0.65rem', color: '#F7D031', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{member.profession}</span>
                                                )}
                                            </div>
                                        </div>
                                        {bioExcerpt && (
                                            <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.6, margin: '0 0 14px', fontStyle: 'italic' }}>"{bioExcerpt}"</p>
                                        )}
                                        <div style={{ height: '1px', background: 'rgba(0,0,0,0.05)', margin: '12px 0' }} />
                                        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.35, letterSpacing: '0.05em' }}>
                                            {joinedDate ? `Joined ${new Date(joinedDate).toLocaleDateString()}` : 'Active Member'}
                                        </p>
                                    </motion.div>
                                );
                            })
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
