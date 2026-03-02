import React, { useState } from 'react';
import { useScroll, useTransform, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import ClippingText from './components/ClippingText';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const DirectoryLayer = ({ members = [], onBack, onLogout }) => {
    const { scrollY } = useScroll();
    const brandingOpacity = useTransform(scrollY, [100, 250], [1, 0]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMembers = members.filter(member => {
        const query = searchQuery.toLowerCase();
        return (
            (member.full_name && member.full_name.toLowerCase().includes(query)) ||
            (member.name && member.name.toLowerCase().includes(query)) ||
            (member.id && member.id.toLowerCase().includes(query)) ||
            (member.profession && member.profession.toLowerCase().includes(query))
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
        >
            {/* SOHO STYLE TOP BAR */}
            <div className="topBar">
                <div className="topBarInner">
                    {/* Left: Logo/Back */}
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onBack}>
                        <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    </div>

                    {/* Center: Brand Anchor */}
                    <div className="brandMark">
                        SUNDAY COLLECTION
                    </div>

                    {/* Right: Log Out */}
                    <div style={{ justifySelf: 'end' }}>
                        <motion.span
                            onClick={onLogout}
                            whileHover={{ opacity: 1 }}
                            style={{
                                cursor: 'pointer',
                                color: '#1A1A1A',
                                fontWeight: 800,
                                fontSize: '10px',
                                letterSpacing: '0.1em',
                                opacity: 0.6,
                                textTransform: 'uppercase'
                            }}
                        >
                            LOG OUT
                        </motion.span>
                    </div>
                </div>
            </div>

            <section className="pageWrap" style={{ paddingTop: '10px', flex: 1 }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div style={{ marginBottom: '60px' }}>
                        <div className="sectionHeader" style={{ padding: 0, marginTop: 0 }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1 }}>MEMBERS.</h2>
                            <span className="sectionMetaCount">({members.filter(m => m.status === 'approved').length})</span>
                        </div>
                        <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '10px' }}>THE ACTIVE COLLECTIVE</p>

                        <div style={{ marginTop: '40px', position: 'relative', maxWidth: '400px' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', opacity: 0.3 }}>
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by name, ID, or profession..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 46px',
                                    fontSize: '0.9rem',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    borderRadius: '12px',
                                    background: '#FFF',
                                    color: '#1A1A1A',
                                    outline: 'none',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>
                    </div>

                    <div className="bucket-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((member, i) => {
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
