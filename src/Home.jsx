import React, { useState, useEffect } from 'react';
import { useScroll, AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import InteractiveText from './components/InteractiveText';
import PacmanGame from './components/PacmanGame';
import { supabase } from './lib/supabase';
import './Home.css';

const Home = ({ navigateToApply, navigateToLogin, navigateToAdmin, navigateToJournal }) => {
    const { scrollY } = useScroll();
    const [isPastHero, setIsPastHero] = useState(false);

    const [subscribeEmail, setSubscribeEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('');
    const [appEmail, setAppEmail] = useState('');
    const [appStatus, setAppStatus] = useState('');

    const handleEmailSubmit = async (e, source, email, setStatus, setEmailInput) => {
        e.preventDefault();
        if (!email) return;
        setStatus('submitting');
        try {
            const { error } = await supabase
                .from('subscribers')
                .insert([{ email, source, created_at: new Date().toISOString() }]);

            if (error) throw error;

            setStatus('success');
            setEmailInput('');
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            console.error("Subscription failed:", err);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const handleApplyClick = () => {
        navigateToApply();
    };

    const handleLoginClick = () => {
        navigateToLogin();
    };

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsPastHero(latest > window.innerHeight - 100);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <div className="home-container no-scrollbar">
            {/* APPLICATION STATUS BANNER */}
            {/* APPLICATION STATUS POPUP */}

            {/* NAVBAR */}
            <nav className={`nav-bar ${isPastHero ? 'nav-hidden' : ''}`}>
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', marginTop: '2px' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span onClick={navigateToJournal} style={{ cursor: 'pointer' }}>
                        <span className="mobile-hide">
                            <InteractiveText text="Journal." />
                        </span>
                        <span className="mobile-show">
                            <InteractiveText text="Journal." />
                        </span>
                    </span>
                    <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
                        <InteractiveText text="Login" />
                    </span>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero-section" >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="hero-content"
                >
                    <h1 className="hero-title">
                        <InteractiveText text="Participation" /><br />
                        <InteractiveText text="that restores." />
                    </h1>
                    <p className="hero-subtitle">
                        <InteractiveText text="Sunday Collection By imrsv" />
                    </p>
                </motion.div>

                <img
                    src="/hawaii-party-hero.jpg"
                    alt="Sunday Collection Hero"
                    className="hero-video-bg"
                    style={{ pointerEvents: 'none', objectFit: 'cover' }}
                />
            </section>

            {/* THE MISSION */}
            <section className="section" >
                <span className="section-label">
                    <InteractiveText text="01 / WHAT'S THE IDEA HERE?" />
                </span>
                <div className="bucket-grid" style={{ marginTop: '60px' }}>
                    <div className="bucket-card">
                        <span className="bucket-num">01.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="IRL Events (Sunday Collection)" />
                        </h3>
                        <p className="bucket-desc">
                            We run events twice a month across three different countries, and host exclusive global trips once a month.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">02.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="How it works" />
                        </h3>
                        <p className="bucket-desc">
                            We take a slice of every ticket and global trip and put it right into what we call The IMRSV Project. That capital stays in the city and goes directly back to the local community—simple as that.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">03.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="The Network" />
                        </h3>
                        <p className="bucket-desc">
                            This isn't just a guest list; it's a curated community. We connect like-minded people in select cities all around the world, sharing first access to global drops, exclusive itineraries, and physical collections.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-start' }}>
                    <button className="gauntlet-btn" onClick={handleApplyClick} style={{ padding: '16px 40px', fontSize: '0.8rem', marginTop: 0 }}>
                        [ APPLY FOR SUNDAY COLLECTION ]
                    </button>
                </div>
            </section>

            {/* WHERE WE OPERATE */}
            <section className="section" >
                <span className="section-label">
                    <InteractiveText text="02 / UPCOMING DROPS." />
                </span>
                <h2 className="concept-title" style={{ maxWidth: '900px' }}>
                    <InteractiveText text="Colombia Drop Sequence." /> <br />
                    <InteractiveText text="Medellín, Colombia." />
                </h2>

                <div className="bucket-grid" style={{ marginBottom: '80px' }}>
                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>MAR. 29</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <p style={{ color: 'rgba(247, 245, 234, 0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Medellín, CO</p>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA', margin: 0 }}>PROJECT CULTURE</h3>
                        </div>
                        <button
                            onClick={handleApplyClick}
                            className="apply-link-btn"
                        >
                            apply →
                        </button>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 05</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <p style={{ color: 'rgba(247, 245, 234, 0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Medellín, CO</p>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA', margin: 0 }}>THE ART</h3>
                        </div>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 19</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <p style={{ color: 'rgba(247, 245, 234, 0.4)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Buriticá, CO</p>
                            <h3 className="bucket-title" style={{ color: '#F7F5EA', margin: 0 }}>MAYDAY</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE CORE IDEA */}
            <section className="section" >
                <span className="section-label">
                    <InteractiveText text="03 / THE CORE IDEA." />
                </span>
                <div className="concept-grid">

                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <h2 className="concept-title" style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: 0, textTransform: 'uppercase' }}>
                            <InteractiveText text="MOST TRAVEL STUFF IS JUST TRANSACTIONAL." /> <br />
                            <InteractiveText text="IMRSV IS ABOUT BUILDING ACTUAL PARTICIPATION." />
                        </h2>
                        <p>
                            We’re moving from just being spectators to being active contributors. By connecting creators, builders, and travelers, we make sure that exploring a city actually does something for the people living there.
                        </p>
                        <p style={{ fontStyle: 'italic', borderLeft: '2px solid var(--border-color)', paddingLeft: '20px' }}>
                            We don’t just visit cities — <br />
                            we collaborate with them, host stuff within them, and reinvest into them.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Participation ]</span>
                            <button
                                onClick={handleApplyClick}
                                style={{
                                    background: '#F7D031',
                                    color: '#111',
                                    border: 'none',
                                    padding: '16px 32px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.05em',
                                    cursor: 'pointer',
                                    display: 'inline-block'
                                }}
                            >
                                [ JOIN SUNDAY COLLECTION ]
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE APP LAYER */}
            <section className="section" style={{ backgroundColor: '#111', color: '#F7F5EA', position: 'relative', overflow: 'hidden' }}>
                <PacmanGame />
                <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>
                    <InteractiveText text="04 / THE IMRSV APP." />
                </span>
                <div className="concept-grid" style={{ alignItems: 'center' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3.5rem', marginBottom: '30px', color: '#F7F5EA' }}>
                            <InteractiveText text="IN DEVELOPMENT." />
                        </h3>
                        <p style={{ marginBottom: '20px', fontSize: '1.2rem', opacity: 0.9 }}>
                            The central digital nervous system for the IMRSV network.
                        </p>
                        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                            A seamless portal to book exclusive events, unlock authentic experiences with locals, and secure your place on global trips.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                                    <InteractiveText text="UNLOCK" />
                                </h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Partner perks, event benefits, early access, and special in-app missions.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                                    <InteractiveText text="STATUS" />
                                </h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>The more you participate, the more access you unlock in the network.</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => handleEmailSubmit(e, 'app', appEmail, setAppStatus, setAppEmail)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '40px', maxWidth: '400px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(247,245,234,0.1)' }}>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '5px', color: '#F7D031', letterSpacing: '0.1em' }}>JOIN THE WAITLIST</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="email"
                                    placeholder="Enter email to pre-download..."
                                    value={appEmail}
                                    onChange={(e) => setAppEmail(e.target.value)}
                                    required
                                    style={{ flex: 1, padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(247,245,234,0.3)', background: 'transparent', color: '#F7F5EA', outline: 'none' }}
                                />
                                <button
                                    type="submit"
                                    disabled={appStatus === 'submitting'}
                                    style={{ backgroundColor: '#F7D031', color: '#111', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', opacity: appStatus === 'submitting' ? 0.7 : 1 }}
                                >
                                    {appStatus === 'submitting' ? '...' : (appStatus === 'success' ? 'JOINED!' : 'PRE-DOWNLOAD')}
                                </button>
                            </div>
                            {appStatus === 'error' && <span style={{ color: '#FF453A', fontSize: '0.8rem' }}>Failed to submit. Check connection.</span>}
                        </form>
                    </div>

                </div>
            </section>

            {/* THE GAUNTLET / JOIN */}
            <section className="gauntlet-section" id="apply" >
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="gauntlet-title">Request Access.</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.7, fontSize: '1.2rem', fontWeight: 500 }}>
                        Entry into The IMRSV Project is via a vetted application. <br />
                        We prioritize those ready to contribute to Sunday Collection.
                    </p>
                    <button onClick={handleApplyClick} className="gauntlet-btn">[ Join Sunday Collection ]</button>
                </motion.div>
            </section>

            <footer className="footer-extended">
                <div className="footer-top">
                    <div className="footer-links-grid">
                        <div className="footer-col">
                            <span onClick={() => alert('We are always looking for operations and curatorial talent.')}>Careers</span>
                            <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>About</span>
                            <a href="mailto:hello@imrsv.com" style={{ textDecoration: 'none' }}>Contact</a>
                        </div>
                        <div className="footer-col">
                            <span onClick={() => alert('The IMRSV Native App is currently in closed development.')}>Download app</span>
                            <a href="https://instagram.com/theimrsvproject" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>@theimrsvproject</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom-grid">
                    <div className="footer-subscribe">
                        <h4>Subscribe</h4>
                        <p>Sign up to hear about events, news and updates from our <span onClick={navigateToJournal} style={{ cursor: 'pointer', textDecoration: 'underline' }}>journal</span> and Sunday Collection.</p>
                        <form onSubmit={(e) => handleEmailSubmit(e, 'journal', subscribeEmail, setSubscribeStatus, setSubscribeEmail)} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={subscribeEmail}
                                    onChange={(e) => setSubscribeEmail(e.target.value)}
                                    required
                                    style={{ flex: 1, padding: '10px 0', border: 'none', borderBottom: '1px solid #1A1A1A', background: 'transparent', outline: 'none', color: '#1A1A1A' }}
                                />
                                <button
                                    type="submit"
                                    disabled={subscribeStatus === 'submitting'}
                                    className="subscribe-btn-pill"
                                    style={{ margin: 0, opacity: subscribeStatus === 'submitting' ? 0.5 : 1 }}
                                >
                                    {subscribeStatus === 'submitting' ? '...' : (subscribeStatus === 'success' ? 'Subscribed!' : 'Subscribe')}
                                </button>
                            </div>
                            {subscribeStatus === 'error' && <span style={{ color: '#FF453A', fontSize: '0.8rem' }}>Subscription failed. Please try again.</span>}
                        </form>
                    </div>
                    <div className="footer-locale-selector">
                        <span onClick={() => alert('Additional language and regional support coming soon.')}>English (US) ⏷</span>
                    </div>
                </div>
                <div style={{ padding: '0px 0', fontSize: '0.8rem', opacity: 0.5, borderTop: 'none', display: 'flex', justifyContent: 'flex-start' }}>
                    <span onClick={navigateToAdmin} style={{ cursor: 'pointer' }}>© 2026 The IMRSV Project</span>
                </div>
            </footer>
        </div>
    );
};

const BucketCard = ({ num, title, desc }) => (
    <div className="bucket-card">
        <span className="bucket-num">{num}</span>
        <h3 className="bucket-title">
            <InteractiveText text={title} />
        </h3>
        <p className="bucket-desc">{desc}</p>
    </div>
);

export default Home;
