import React, { useState, useEffect } from 'react';
import { AnimatePresence, useScroll, useTransform, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import InteractiveText from './components/InteractiveText';
import ClippingText from './components/ClippingText';
import { supabase } from './lib/supabase';
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
    const briefingKey = `imrsv_briefing_acknowledged_${user?.id} `;
    const [showBriefing, setShowBriefing] = useState(() => !localStorage.getItem(briefingKey));
    const [rsvpStatus, setRsvpStatus] = useState({});
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [expandedSession, setExpandedSession] = useState(null);
    const [showTripsModal, setShowTripsModal] = useState(false);
    const [expandedTrip, setExpandedTrip] = useState(null);

    // Profile panel
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [profileData, setProfileData] = useState({
        full_name: '', profession: '', bio: '',
        photos: ['', '', '']
    });

    // Credit / contribution
    const [creditData, setCreditData] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email) return;
            const { data } = await supabase
                .from('applications')
                .select('id, full_name, profession, bio, photos, contribution_amount, credit_balance, renewal_date')
                .ilike('email', user.email.trim())
                .single();
            if (data) {
                setProfileData({
                    full_name: data.full_name || '',
                    profession: data.profession || '',
                    bio: data.bio || '',
                    photos: data.photos?.length ? [...data.photos, ...['', '', '']].slice(0, 3) : ['', '', '']
                });
                setCreditData(data);
                if (data.id) {
                    const { data: txns } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('member_id', data.id)
                        .order('created_at', { ascending: false })
                        .limit(5);
                    setTransactions(txns || []);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const saveProfile = async () => {
        if (!user?.email) return;
        setProfileSaving(true);
        const photos = profileData.photos.filter(p => p.trim() !== '');
        await supabase.from('applications')
            .update({ full_name: profileData.full_name, profession: profileData.profession, bio: profileData.bio, photos })
            .ilike('email', user.email.trim());
        setProfileSaving(false);
        setProfileSaved(true);
        setTimeout(() => { setProfileSaved(false); setShowProfilePanel(false); }, 1500);
    };

    const bioWordCount = profileData.bio.trim() === '' ? 0 : profileData.bio.trim().split(/\s+/).length;
    const bioOverLimit = bioWordCount > 120;

    const toggleSession = (index) => setExpandedSession(expandedSession === index ? null : index);
    const toggleTrip = (index) => setExpandedTrip(expandedTrip === index ? null : index);
    const { scrollY } = useScroll();
    const brandingOpacity = useTransform(scrollY, [200, 350], [1, 0]);
    const handleRSVP = (eventId) => setRsvpStatus(prev => ({ ...prev, [eventId]: 'SECURED' }));
    const handleAcknowledge = () => { localStorage.setItem(briefingKey, 'true'); setShowBriefing(false); };
    const scrollToMembers = () => { const el = document.getElementById('members-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
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
                                {profileData.full_name || userName || 'Accessing Portal...'}
                            </p>
                            {profileData.profession && (
                                <p style={{ fontSize: '0.75rem', color: 'rgba(26,26,26,0.6)', letterSpacing: '0.05em', marginBottom: '4px' }}>{profileData.profession}</p>
                            )}
                            <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700 }}>
                                MEMBERSHIP ID: {user?.id?.slice(0, 8).toUpperCase() || 'INITIALIZING...'}
                            </p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '25px', flexWrap: 'wrap' }}>
                                <button onClick={scrollToMembers} style={{ background: '#F7D031', border: 'none', padding: '12px 24px', fontSize: '0.7rem', fontWeight: 800, color: '#000', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.1em' }}>[ VIEW MEMBERS ]</button>
                                <button onClick={() => setShowProfilePanel(true)} style={{ background: 'transparent', border: '1px solid rgba(26,26,26,0.2)', padding: '12px 24px', fontSize: '0.7rem', fontWeight: 800, color: '#1A1A1A', cursor: 'pointer', borderRadius: '4px', letterSpacing: '0.1em' }}>[ EDIT PROFILE ]</button>
                            </div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', marginBottom: '5px' }}>Tier</p>
                            <p style={{ fontSize: '1.1rem', color: '#1A1A1A', fontWeight: 600 }}>FOUNDATION MEMBER</p>
                        </div>
                        {creditData && (
                            <div style={{ background: '#FFF', border: '1px solid rgba(0,0,0,0.08)', padding: '25px 30px', borderRadius: '4px', minWidth: '220px' }}>
                                <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>CREDIT BALANCE</p>
                                <p style={{ fontSize: '2rem', fontWeight: 800, color: '#1A1A1A', margin: '0 0 4px' }}>${(creditData.credit_balance ?? 0).toFixed(2)}</p>
                                <p style={{ fontSize: '0.65rem', opacity: 0.4, marginBottom: '16px' }}>of ${(creditData.contribution_amount ?? 0).toFixed(2)} contribution</p>
                                {creditData.renewal_date && (
                                    <p style={{ fontSize: '0.65rem', opacity: 0.5 }}>Renews: {new Date(creditData.renewal_date).toLocaleDateString()}</p>
                                )}
                                {transactions.length > 0 && (
                                    <div style={{ marginTop: '16px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {transactions.map(t => (
                                            <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{t.description || 'Transaction'}</span>
                                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FF453A' }}>-${t.amount.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
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
                                onClick={() => setShowSessionsModal(true)}
                                className="gauntlet-btn"
                                style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px', backgroundColor: '#F7D031', color: '#000' }}
                            >
                                [ VIEW LOCATIONS & DETAILS ]
                            </button>
                        </div>
                        <div className="bucket-card" style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <span className="bucket-num" style={{ color: '#F7D031', opacity: 0.8 }}>02.</span>
                            <h3 className="bucket-title" style={{ color: '#1A1A1A' }}>UPCOMING TRIPS</h3>
                            <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.6)' }}>
                                Access exclusive global trips and itineraries reserved for the collective.
                            </p>
                            <button
                                onClick={() => setShowTripsModal(true)}
                                className="gauntlet-btn"
                                style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '20px', backgroundColor: '#F7D031', color: '#000' }}
                            >
                                [ VIEW TRIPS & ITINERARIES ]
                            </button>
                        </div>
                    </div>

                    {/* MEMBERS SECTION */}
                    <div id="members-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '100px' }}>
                        <div style={{ marginBottom: '60px' }}>
                            <ClippingText text="MEMBERS." scale={0.5} style={{ color: '#1A1A1A', margin: 0 }} />
                            <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '10px' }}>MEMBERS CURRENTLY IN ORBIT</p>
                        </div>
                        <div className="bucket-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                            {activeMembers.length > 0 ? (
                                activeMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="bucket-card"
                                        style={{ background: '#FFF', border: '1px solid rgba(0, 0, 0, 0.06)', padding: '25px', boxShadow: 'none' }}
                                    >
                                        <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '8px' }}>
                                            USER {member.id?.slice(0, 8).toUpperCase()}
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

            {/* PROFILE EDIT PANEL */}
            <AnimatePresence>
                {showProfilePanel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(247,245,234,0.98)', zIndex: 5000, overflowY: 'auto', padding: '40px 20px' }}
                    >
                        <div style={{ maxWidth: '560px', margin: '0 auto', paddingTop: '60px', paddingBottom: '100px' }}>
                            <button onClick={() => setShowProfilePanel(false)} style={{ background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: '#1A1A1A', cursor: 'pointer', opacity: 0.5, marginBottom: '40px', padding: 0 }}>[ CLOSE ]</button>
                            <span style={{ fontSize: '0.65rem', color: 'rgba(26,26,26,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>MEMBER PROFILE</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '10px 0 40px', color: '#1A1A1A' }}>EDIT PROFILE.</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                                {/* Full Name */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Full Name</label>
                                    <input value={profileData.full_name} onChange={e => setProfileData(p => ({ ...p, full_name: e.target.value }))} placeholder="Your full name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26,26,26,0.2)', padding: '10px 0', fontSize: '1.1rem', outline: 'none' }} />
                                </div>
                                {/* Profession */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Profession *</label>
                                    <input value={profileData.profession} onChange={e => setProfileData(p => ({ ...p, profession: e.target.value }))} placeholder="e.g. Photographer, Architect" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26,26,26,0.2)', padding: '10px 0', fontSize: '1.1rem', outline: 'none' }} />
                                </div>
                                {/* Bio */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Bio</label>
                                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: bioOverLimit ? '#FF453A' : 'rgba(26,26,26,0.4)' }}>{bioWordCount} / 120 words</span>
                                    </div>
                                    <textarea value={profileData.bio} onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))} placeholder="Tell the collective who you are..." rows={5} style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${bioOverLimit ? '#FF453A' : 'rgba(26,26,26,0.2)'}`, padding: '10px 0', fontSize: '1rem', outline: 'none', resize: 'none', lineHeight: 1.7 }} />
                                    {bioOverLimit && <p style={{ fontSize: '0.65rem', color: '#FF453A', margin: 0 }}>Bio must be under 120 words.</p>}
                                </div>
                                {/* Photos */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Photos (3 image URLs)</label>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <span style={{ fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.05em' }}>PHOTO {i + 1}</span>
                                            <input value={profileData.photos[i]} onChange={e => { const p = [...profileData.photos]; p[i] = e.target.value; setProfileData(prev => ({ ...prev, photos: p })); }} placeholder={`https://...`} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26,26,26,0.15)', padding: '8px 0', fontSize: '0.9rem', outline: 'none', color: '#1A1A1A' }} />
                                            {profileData.photos[i] && <img src={profileData.photos[i]} alt={`Preview ${i + 1}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginTop: '4px' }} onError={e => e.target.style.display = 'none'} />}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={saveProfile}
                                    disabled={profileSaving || bioOverLimit || !profileData.profession.trim()}
                                    style={{ background: profileSaved ? '#2ECC71' : '#1A1A1A', color: '#FFF', border: 'none', padding: '18px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '4px', opacity: (profileSaving || bioOverLimit || !profileData.profession.trim()) ? 0.4 : 1, transition: 'background 0.3s' }}
                                >
                                    {profileSaved ? '[ SAVED ✓ ]' : profileSaving ? '[ SAVING... ]' : '[ SAVE PROFILE ]'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SESSIONS MODAL */}
            <AnimatePresence>
                {showSessionsModal && (
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
                            zIndex: 4000,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', position: 'relative', paddingTop: '40px', paddingBottom: '100px' }}>
                            <button
                                onClick={() => setShowSessionsModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.1em',
                                    color: '#1A1A1A',
                                    cursor: 'pointer',
                                    opacity: 0.5,
                                    padding: '10px'
                                }}
                            >
                                [ CLOSE ]
                            </button>

                            <ClippingText text="LOCATIONS." scale={0.6} style={{ color: '#1A1A1A', margin: 0, marginBottom: '10px' }} />
                            <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '60px', fontWeight: 600 }}>SELECT A SESSION FOR DETAILS</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* SESSION 1: PROJECT CULTURE */}
                                <div style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#FFF', padding: '30px' }}>
                                    <div
                                        onClick={() => toggleSession(1)}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                    >
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#1A1A1A' }}>01. PROJECT CULTURE</h3>
                                        <span style={{ fontSize: '1.2rem', color: '#F7D031', fontWeight: 300 }}>
                                            {expandedSession === 1 ? '—' : '+'}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {expandedSession === 1 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '30px' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '30px' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHERE</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Medellín, Colombia. Exact coordinates provided upon RSVP.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHAT</h4>
                                                        <div style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            <strong>Itinerary:</strong><br />
                                                            10am: Run Club<br />
                                                            12pm - 5pm: Community Day<br />
                                                            6pm - 11pm: After Hours Network (Ice baths, DJ, Open Bar, Tattoos)
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>HOW</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Secure your spot via the portal. Travel and accommodations are self-managed.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open('https://buy.stripe.com/test_cNieVdgy716kdRfct8abK00', '_blank');
                                                        handleRSVP('project-culture');
                                                    }}
                                                    className="gauntlet-btn"
                                                    style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '30px', width: '100%', backgroundColor: rsvpStatus['project-culture'] ? '#2ECC71' : '#F7D031', color: '#000' }}
                                                >
                                                    {rsvpStatus['project-culture'] ? '[ REDIRECTING... ]' : '[ SECURE SPOT ]'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* TRIPS MODAL */}
            <AnimatePresence>
                {showTripsModal && (
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
                            zIndex: 4000,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '40px',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', position: 'relative', paddingTop: '40px', paddingBottom: '100px' }}>
                            <button
                                onClick={() => setShowTripsModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.1em',
                                    color: '#1A1A1A',
                                    cursor: 'pointer',
                                    opacity: 0.5,
                                    padding: '10px'
                                }}
                            >
                                [ CLOSE ]
                            </button>

                            <ClippingText text="TRIPS." scale={0.6} style={{ color: '#1A1A1A', margin: 0, marginBottom: '10px' }} />
                            <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '60px', fontWeight: 600 }}>SELECT A TRIP FOR ITINERARY</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {/* TRIP 1: KYOTO CULTURAL IMMERSION */}
                                <div style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#FFF', padding: '30px' }}>
                                    <div
                                        onClick={() => toggleTrip(1)}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                    >
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#1A1A1A' }}>01. KYOTO CULTURAL IMMERSION</h3>
                                        <span style={{ fontSize: '1.2rem', color: '#F7D031', fontWeight: 300 }}>
                                            {expandedTrip === 1 ? '—' : '+'}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {expandedTrip === 1 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '30px' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '30px' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHERE</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Kyoto, Japan. Traditional Machiya stay with exclusive temple access.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHAT</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            A 7-day intensive. Restoring centuries-old artisan crafts and connecting directly with local masters.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>HOW</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Secure your spot via the portal. Only 10 seats available per quarter.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleRSVP('trip-kyoto'); }}
                                                    className="gauntlet-btn"
                                                    style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '30px', width: '100%', backgroundColor: rsvpStatus['trip-kyoto'] ? '#2ECC71' : '#F7D031', color: '#000' }}
                                                >
                                                    {rsvpStatus['trip-kyoto'] ? '[ SECURED ]' : '[ DEPOSIT — $2500 ]'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                {/* TRIP 2: PATAGONIA EXPEDITION */}
                                <div style={{ border: '1px solid rgba(0,0,0,0.1)', background: '#FFF', padding: '30px' }}>
                                    <div
                                        onClick={() => toggleTrip(2)}
                                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                                    >
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#1A1A1A' }}>02. PATAGONIA EXPEDITION</h3>
                                        <span style={{ fontSize: '1.2rem', color: '#F7D031', fontWeight: 300 }}>
                                            {expandedTrip === 2 ? '—' : '+'}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {expandedTrip === 2 && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: 'auto', opacity: 1, marginTop: '30px' }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '30px' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHERE</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Patagonia, Argentina/Chile. Deep wilderness basecamp.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>WHAT</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            A 10-day journey. Direct reforestation efforts with local conservationists alongside mountain excursions.
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 style={{ fontSize: '0.7rem', color: '#F7D031', letterSpacing: '0.1em', marginBottom: '10px' }}>HOW</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.6 }}>
                                                            Secure your spot via the portal. Rigorous physical requirements apply.
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleRSVP('trip-patagonia'); }}
                                                    className="gauntlet-btn"
                                                    style={{ fontSize: '0.7rem', padding: '12px 20px', marginTop: '30px', width: '100%', backgroundColor: rsvpStatus['trip-patagonia'] ? '#2ECC71' : '#F7D031', color: '#000' }}
                                                >
                                                    {rsvpStatus['trip-patagonia'] ? '[ SECURED ]' : '[ DEPOSIT — $2500 ]'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MemberLayer;
