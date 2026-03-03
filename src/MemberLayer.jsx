import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, useScroll, useTransform, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import InteractiveText from './components/InteractiveText';
import ClippingText from './components/ClippingText';
import { supabase } from './lib/supabase';
import { AvatarUploader, PhotoGalleryUploader } from './App';
import './App.css';
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
    const navigate = useNavigate();
    const briefingKey = `imrsv_briefing_acknowledged_${user?.id} `;
    const [showBriefing, setShowBriefing] = useState(() => !localStorage.getItem(briefingKey));
    const [rsvpStatus, setRsvpStatus] = useState({});
    const [showSessionsModal, setShowSessionsModal] = useState(false);
    const [expandedSession, setExpandedSession] = useState(null);
    const [showTripsModal, setShowTripsModal] = useState(false);
    const [expandedTrip, setExpandedTrip] = useState(null);

    // Perks Pagination
    const perksRailRef = useRef(null);
    const [activePerkIndex, setActivePerkIndex] = useState(0);

    // Profile panel
    const [showProfilePanel, setShowProfilePanel] = useState(false);
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [profileData, setProfileData] = useState({
        full_name: '', profession: '', bio: '',
        photos: ['', '', '']
    });
    const [selectedMember, setSelectedMember] = useState(null);
    const [referCopied, setReferCopied] = useState(false);

    // Welcome Intro State
    const [showWelcomeIntro, setShowWelcomeIntro] = useState(true);

    useEffect(() => {
        if (showWelcomeIntro) {
            const timer = setTimeout(() => setShowWelcomeIntro(false), 900);
            return () => clearTimeout(timer);
        }
    }, [showWelcomeIntro]);

    // Credit / contribution
    const [creditData, setCreditData] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const rail = perksRailRef.current;
        if (!rail) return;

        const handleScroll = () => {
            const cards = Array.from(rail.children).filter(el => el.offsetParent !== null);
            if (!cards.length) return;

            const railLeft = rail.getBoundingClientRect().left;
            let bestI = 0;
            let bestDist = Infinity;

            cards.forEach((card, i) => {
                const left = card.getBoundingClientRect().left;
                const dist = Math.abs(left - railLeft);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestI = i;
                }
            });

            if (bestI !== activePerkIndex) {
                setActivePerkIndex(bestI);
            }
        };

        const onScroll = () => {
            requestAnimationFrame(handleScroll);
        };

        rail.addEventListener('scroll', onScroll, { passive: true });
        return () => rail.removeEventListener('scroll', onScroll);
    }, [activePerkIndex]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            const { data } = await supabase
                .from('profiles')
                .select('id, full_name, profession, bio, avatar_path')
                .eq('id', user.id)
                .single();
            if (data) {
                setProfileData({
                    full_name: data.full_name || '',
                    profession: data.profession || '',
                    bio: data.bio || '',
                    avatar_path: data.avatar_path || ''
                });
            }

            // Also fetch gallery from profile_photos
            const { data: photos } = await supabase
                .from('profile_photos')
                .select('*')
                .eq('user_id', user.id)
                .order('sort_order', { ascending: true });

            setGallery(photos || []);

            // Fetch credit data from applications (legacy but still used for balance)
            const { data: appData } = await supabase
                .from('applications')
                .select('id, contribution_amount, credit_balance, renewal_date')
                .ilike('email', user.email.trim())
                .single();
            if (appData) {
                setCreditData(appData);
                if (appData.id) {
                    const { data: txns } = await supabase
                        .from('transactions')
                        .select('*')
                        .eq('member_id', appData.id)
                        .order('created_at', { ascending: false })
                        .limit(5);
                    setTransactions(txns || []);
                }
            }
        };
        fetchProfile();
    }, [user]);

    const [gallery, setGallery] = useState([]);

    const saveProfile = async () => {
        if (!user?.id) return;
        setProfileSaving(true);

        const { error } = await supabase.from('profiles')
            .update({
                full_name: profileData.full_name,
                profession: profileData.profession,
                bio: profileData.bio
            })
            .eq('id', user.id);

        if (error) {
            console.error("Profile save error:", error);
        } else {
            setProfileSaved(true);
            setTimeout(() => { setProfileSaved(false); setShowProfilePanel(false); }, 1500);
        }
        setProfileSaving(false);
    };

    useEffect(() => {
        // Hide welcome intro after 2 seconds
        const timer = setTimeout(() => setShowWelcomeIntro(false), 2000);
        return () => clearTimeout(timer);
    }, []);

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

            <AnimatePresence>
                {showWelcomeIntro && !showBriefing && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#F7F5EA',
                            zIndex: 2500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{ fontFamily: 'serif', fontSize: '3rem', fontWeight: 800, letterSpacing: '0.1em' }}
                        >
                            WELCOME.
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

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

            <section className="pageWrap" style={{ paddingTop: '10px', paddingBottom: '100px', flex: 1 }}>
                <motion.div
                    className="stack"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* PREMIUM SOHO HOUSE INSPIRED HERO SECTION */}
                    <div className="heroGrid">

                        {/* DIGITAL MEMBER ID CARD */}
                        <div className="member-id-card card">
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, pointerEvents: 'none' }}>
                                <svg width="200" height="200" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="#1A1A1A" strokeWidth="20" fill="none" /></svg>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                                <div>
                                    <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#1A1A1A', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                                        {profileData.full_name || userName || 'Accessing Portal...'}
                                    </h1>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(26,26,26,0.6)', letterSpacing: '0.05em', margin: '5px 0 0 0', textTransform: 'uppercase' }}>
                                        {profileData.profession || 'GUEST'}
                                    </p>
                                </div>
                                {profileData.photos && profileData.photos[0] ? (
                                    <img src={profileData.photos[0]} alt="Member Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.1)' }} />
                                ) : (
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F5F5F3', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: '1.5rem', opacity: 0.2 }}>?</span>
                                    </div>
                                )}
                            </div>

                            {/* INLINE ACTION BUTTONS */}
                            <div className="actionsRow">
                                <button onClick={() => setShowProfilePanel(true)} className="action-pill-btn" onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    EDIT IDENTITY
                                </button>
                                <button onClick={() => navigate('/directory/medellin')} className="action-pill-btn" onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                    DIRECTORY
                                </button>
                                <button onClick={() => {
                                    const refCode = user?.id?.slice(0, 8).toUpperCase() || 'INVITE';
                                    const referLink = `https://theimrsvproject.org/apply?ref=${refCode}`;
                                    navigator.clipboard.writeText(referLink).then(() => {
                                        setReferCopied(true);
                                        setTimeout(() => setReferCopied(false), 2500);
                                    });
                                }} className="action-pill-btn" onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                    {referCopied ? 'LINK COPIED!' : 'REFER A FRIEND'}
                                </button>
                            </div>

                            <div className="memberMetaRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', margin: '0 0 5px 0' }}>MEMBERSHIP ID</p>
                                    <p style={{ fontSize: '1rem', color: '#1A1A1A', fontWeight: 700, margin: 0, letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                                        {user?.id?.slice(0, 8).toUpperCase() || '-------------'}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '0.1em', margin: '0 0 5px 0' }}>STATUS</p>
                                    <div className="statusPill" style={{ display: 'inline-block', background: '#F7D031', color: '#000', fontSize: '0.6rem', fontWeight: 800, padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.1em' }}>
                                        ACTIVE FOUNDATION
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DARK MODE CREDIT WIDGET */}
                        {creditData && (
                            <div className="credit-widget-card card">
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #F7D031, #FFF)' }} />

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <p style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.15em', fontWeight: 700, margin: 0 }}>HOUSE CREDIT</p>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v12M6 12h12" /></svg>
                                    </div>
                                    <p style={{ fontSize: '2.5rem', fontWeight: 300, color: '#FFF', margin: '0 0 5px 0', letterSpacing: '-0.02em' }}>${(creditData.credit_balance ?? 0).toFixed(2)}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', margin: 0, letterSpacing: '0.05em' }}>of ${(creditData.contribution_amount ?? 0).toFixed(2)} annual</p>
                                </div>

                                <div>
                                    {creditData.renewal_date && (
                                        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: '0 0 15px 0', letterSpacing: '0.05em' }}>RENEWS: {new Date(creditData.renewal_date).toLocaleDateString()}</p>
                                    )}
                                    {transactions.length > 0 && (
                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {transactions.map(t => (
                                                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>{t.description || 'Charge'}</span>
                                                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#F7D031' }}>-${t.amount.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="divider" />

                    {/* CONSOLIDATED HOUSE PERKS & EVENTS */}
                    <div className="section" style={{ marginBottom: '40px' }}>
                        <div className="sectionHeader">
                            <h2 className="sectionTitle">HOUSE PERKS & SESSIONS</h2>
                            <span className="sectionMeta">UNLOCKING SOON</span>
                        </div>

                        <div className="hScroll" ref={perksRailRef}>

                            {/* ACTIVE INTERACTIVE PERKS */}
                            <div
                                onClick={() => navigate('/directory/medellin')}
                                className="perkCard"
                            >
                                <div className="perkTop">
                                    <div className="perkIndex">01.</div>
                                    <div className="perkDot" style={{ background: '#F7D031' }} />
                                </div>
                                <div className="perkBody">
                                    <div className="perkTitle">MEDELLÍN HOUSE GUIDE</div>
                                    <div className="perkCopy">
                                        A curated directory of the best spots in the city.
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setShowSessionsModal(true)}
                                className="perkCard"
                            >
                                <div className="perkTop">
                                    <div className="perkIndex">02.</div>
                                    <div className="perkDot" style={{ background: '#F7D031' }} />
                                </div>
                                <div className="perkBody">
                                    <div className="perkTitle">UPCOMING SESSIONS</div>
                                    <div className="perkCopy">
                                        Medellín Hub Opening — March 29.<br />Full 4-week drop sequence.
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setShowTripsModal(true)}
                                className="perkCard"
                            >
                                <div className="perkTop">
                                    <div className="perkIndex">03.</div>
                                    <div className="perkDot" style={{ background: '#F7D031' }} />
                                </div>
                                <div className="perkBody">
                                    <div className="perkTitle">UPCOMING TRIPS</div>
                                    <div className="perkCopy">
                                        Access exclusive global itineraries reserved for the collective.
                                    </div>
                                </div>
                            </div>

                            {/* FUTURE PLACEHOLDERS */}
                            <div className="perkCard perkLocked" onClick={() => alert('Unlocking soon')}>
                                <div className="perkTop">
                                    <div className="perkIndex">GLOBAL WORKSPACES</div>
                                </div>
                            </div>
                            <div className="perkCard perkLocked" onClick={() => alert('Unlocking soon')}>
                                <div className="perkTop">
                                    <div className="perkIndex">PARTNER DISCOUNTS</div>
                                </div>
                            </div>
                            <div className="perkCard perkLocked" onClick={() => alert('Unlocking soon')}>
                                <div className="perkTop">
                                    <div className="perkIndex">SECRET MENUS</div>
                                </div>
                            </div>
                        </div>

                        <div className="perksDots" aria-label="Perks pagination">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <span
                                    key={index}
                                    className={`perksDot ${index === activePerkIndex ? 'isActive' : ''}`}
                                    onClick={() => {
                                        const rail = perksRailRef.current;
                                        if (!rail) return;
                                        const cards = Array.from(rail.children).filter(el => el.offsetParent !== null);
                                        cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* MEMBERS SECTION */}
                    <div id="members-section" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '100px' }}>
                        <div style={{ marginBottom: '60px' }}>
                            <div className="sectionHeader" style={{ padding: 0, marginTop: 0 }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1 }}>MEMBERS.</h2>
                                <span className="sectionMetaCount">({activeMembers.length})</span>
                            </div>
                            <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '10px' }}>MEMBERS ONLINE</p>
                        </div>
                        <div className="membersRail">
                            {activeMembers.length > 0 ? (
                                activeMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className="memberCard"
                                        onClick={() => setSelectedMember(member)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="memberCardBody">
                                            <div className="memberTop">
                                                {/* Avatar */}
                                                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F7D031', fontSize: '1.2rem', fontWeight: 800, flexShrink: 0, overflow: 'hidden' }}>
                                                    {member.photos?.[0] ? (
                                                        <img src={member.photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        member.name ? member.name.charAt(0).toUpperCase() : '?'
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.1rem', margin: '0 0 2px 0', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.01em', fontFamily: 'serif' }}>
                                                        {member.name || member.full_name}
                                                    </h3>
                                                    <div className="memberMeta">
                                                        <span style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.1em', fontWeight: 800 }}>
                                                            {member.profession || 'MEMBER'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {member.bio && (
                                                <p style={{ fontSize: '0.75rem', color: 'rgba(26,26,26,0.6)', margin: '10px 0 0 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {member.bio}
                                                </p>
                                            )}

                                            <div className="memberBottom" style={{ marginTop: '12px' }}>
                                                <span style={{ fontSize: '0.6rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Joined {new Date(member.created_at || member.date).toLocaleDateString()}</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(46, 204, 113, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC71', boxShadow: '0 0 8px rgba(46, 204, 113, 0.6)' }} />
                                                    <span style={{ fontSize: '0.55rem', fontWeight: 800, color: '#2ECC71', letterSpacing: '0.05em' }}>IN ORBIT</span>
                                                </div>
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

            {/* PROFILE EDIT PANEL overhaul */}
            <AnimatePresence>
                {showProfilePanel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'var(--bg)', zIndex: 5000, overflowY: 'auto', padding: '40px 20px' }}
                    >
                        <div style={{ maxWidth: '640px', margin: '0 auto', paddingTop: '60px', paddingBottom: '100px' }}>
                            <button onClick={() => setShowProfilePanel(false)} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: 800, letterSpacing: '0.14em', color: 'var(--muted)', cursor: 'pointer', marginBottom: '20px', padding: 0, textTransform: 'uppercase' }}>[ CLOSE ]</button>

                            <div style={{ marginBottom: '40px' }}>
                                <span className="label" style={{ marginBottom: '4px', display: 'block' }}>MEMBER PROFILE</span>
                                <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: 0, color: 'var(--ink)', letterSpacing: '-0.02em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>EDIT PROFILE.</h1>
                            </div>

                            <div className="profileCard">
                                {/* Avatar Uploader */}
                                <div style={{ marginBottom: '32px' }}>
                                    <AvatarUploader
                                        userId={user.id}
                                        currentPath={profileData.avatar_path}
                                        onUploadSuccess={(url, path) => setProfileData(prev => ({ ...prev, avatar_path: path }))}
                                    />
                                </div>

                                {/* Identity Fields */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                    <div>
                                        <label className="label">Full Name</label>
                                        <input
                                            className="input"
                                            value={profileData.full_name}
                                            onChange={e => setProfileData(p => ({ ...p, full_name: e.target.value }))}
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Profession</label>
                                        <input
                                            className="input"
                                            value={profileData.profession}
                                            onChange={e => setProfileData(p => ({ ...p, profession: e.target.value }))}
                                            placeholder="e.g. Photographer, Architect"
                                        />
                                    </div>

                                    <div>
                                        <label className="label">Bio</label>
                                        <textarea
                                            className="textarea"
                                            value={profileData.bio}
                                            onChange={e => setProfileData(p => ({ ...p, bio: e.target.value }))}
                                            placeholder="Tell the collective who you are..."
                                        />
                                        <div style={{ textAlign: 'right', marginTop: '8px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: bioOverLimit ? '#FF453A' : 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{bioWordCount} / 120 words</span>
                                        </div>
                                    </div>

                                    {/* Gallery Uploader */}
                                    <div>
                                        <label className="label">Additional Photos</label>
                                        <PhotoGalleryUploader
                                            userId={user.id}
                                            photos={gallery}
                                            onUpdate={async () => {
                                                const { data } = await supabase
                                                    .from('profile_photos')
                                                    .select('*')
                                                    .eq('user_id', user.id)
                                                    .order('sort_order', { ascending: true });
                                                setGallery(data || []);
                                            }}
                                        />
                                    </div>

                                    <button
                                        className="saveBtn"
                                        onClick={saveProfile}
                                        disabled={profileSaving || bioOverLimit || !profileData.profession.trim()}
                                    >
                                        {profileSaved ? '[ SAVED ✓ ]' : profileSaving ? '[ SAVING... ]' : '[ SAVE CHANGES ]'}
                                    </button>
                                </div>
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

                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1, marginBottom: '10px' }}>LOCATIONS.</h2>
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
                                                            12pm - 5pm: Community Day (Ice baths, DJ, Open Bar, Tattoos, sauna)<br />
                                                            6pm - 11pm: After Hours Network
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
            </AnimatePresence >

            {/* TRIPS MODAL */}
            < AnimatePresence >
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

                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1, marginBottom: '10px' }}>TRIPS.</h2>
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
            </AnimatePresence >
            {/* MEMBER PROFILE MODAL */}
            < AnimatePresence >
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'flex-end' }}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            onClick={e => e.stopPropagation()}
                            style={{ width: '100%', maxHeight: '85vh', overflowY: 'auto', backgroundColor: '#F7F5EA', padding: '30px 24px 60px', borderRadius: '16px 16px 0 0' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.4, textTransform: 'uppercase' }}>MEMBER PROFILE</span>
                                <button onClick={() => setSelectedMember(null)} style={{ background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', color: '#1A1A1A', cursor: 'pointer', opacity: 0.5, padding: 0 }}>[ CLOSE ]</button>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: '30px' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F7D031', fontSize: '1.8rem', fontWeight: 800, flexShrink: 0, overflow: 'hidden' }}>
                                    {selectedMember.photos?.[0] ? (
                                        <img src={selectedMember.photos[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        (selectedMember.name || selectedMember.full_name || '?').charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <h2 style={{ margin: '0 0 4px 0', fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A', fontFamily: 'serif' }}>
                                        {selectedMember.name || selectedMember.full_name || 'Member'}
                                    </h2>
                                    {selectedMember.profession && (
                                        <span style={{ fontSize: '0.65rem', color: '#F7D031', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{selectedMember.profession}</span>
                                    )}
                                </div>
                            </div>

                            {selectedMember.bio && (
                                <div style={{ marginBottom: '30px' }}>
                                    <h4 style={{ fontSize: '0.6rem', letterSpacing: '0.15em', opacity: 0.4, marginBottom: '8px', fontWeight: 700 }}>ABOUT</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)', lineHeight: 1.7, margin: 0 }}>{selectedMember.bio}</p>
                                </div>
                            )}

                            {selectedMember.photos?.filter(p => p).length > 1 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '30px' }}>
                                    {selectedMember.photos.filter(p => p).map((photo, i) => (
                                        <img key={i} src={photo} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '4px' }} />
                                    ))}
                                </div>
                            )}

                            <div style={{ fontSize: '0.6rem', opacity: 0.3, letterSpacing: '0.1em' }}>
                                MEMBER ID: {selectedMember.id?.slice(0, 8).toUpperCase()}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >
        </motion.div >
    );
};

export default MemberLayer;
