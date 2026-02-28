import React, { useState, useEffect } from 'react';
import { useScroll, AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import InteractiveText from './components/InteractiveText';
import PacmanGame from './components/PacmanGame';
import './Home.css';

const Home = ({ navigateToApply, navigateToLogin, navigateToAdmin, navigateToJournal }) => {
    const { scrollY } = useScroll();
    const [isPastHero, setIsPastHero] = useState(false);

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
                    <InteractiveText text="01 / THE MISSION." />
                </span>
                <div className="concept-grid" style={{ marginTop: '60px' }}>
                    <div className="concept-text">
                        <h3 style={{ marginBottom: '40px', lineHeight: 1 }}>
                            <InteractiveText text="WHAT’S THE IDEA HERE?" />
                        </h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px', fontSize: '1.4rem' }}>
                            Sunday Collection is our way of making sure we’re actually helping out the places we visit.
                        </p>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
                            We don’t just show up, throw a party, and dip. We make sure a real chunk of everything we do goes right back to the local artists and projects that make these cities what they are. It's about being a good guest.
                        </p>
                        <div style={{ marginBottom: '10px', marginTop: '30px' }}>
                            <button className="gauntlet-btn" onClick={handleApplyClick} style={{ padding: '12px 30px', fontSize: '0.8rem' }}>
                                [ JOIN THE COLLECTIVE ]
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bucket-grid" style={{ marginTop: '80px' }}>
                    <div className="bucket-card">
                        <span className="bucket-num">01.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="How it works" />
                        </h3>
                        <p className="bucket-desc">
                            We take a slice of every ticket and global trip and put it right into what we call The IMRSV Project. That capital stays in the city and goes directly back to the local community—simple as that.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">02.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="IRL Events" />
                        </h3>
                        <p className="bucket-desc">
                            We run events twice a month across three different countries.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">03.</span>
                        <h3 className="bucket-title">
                            <InteractiveText text="The Network" />
                        </h3>
                        <p className="bucket-desc">
                            This isn't just a guest list; it's a closed collective. Verified nodes get first access to global drops, high-ticket itineraries, and physical collections before they ever hit the public.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHERE WE OPERATE */}
            <section className="section" >
                <span className="section-label">
                    <InteractiveText text="02 / UPCOMING DROPS." />
                </span>
                <h2 className="concept-title" style={{ maxWidth: '900px' }}>
                    <InteractiveText text="Medellín Drop Sequence." /> <br />
                    <InteractiveText text="Medellín, Colombia." />
                </h2>

                <div className="bucket-grid" style={{ marginBottom: '80px' }}>
                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>MAR. 29</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MEDELLÍN HUB (OPENING)</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: TBD (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="apply-link-btn"
                        >
                            apply →
                        </button>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 05</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MEDELLÍN HUB (PRESENCE)</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: TBD (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="apply-link-btn"
                        >
                            apply →
                        </button>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 12</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MEDELLÍN HUB (DROP)</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: TBD (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="apply-link-btn"
                        >
                            apply →
                        </button>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 19</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MEDELLÍN HUB (CLOSING)</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: TBD (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="apply-link-btn"
                        >
                            apply →
                        </button>
                    </div>
                </div>
            </section>

            {/* THE APP LAYER */}
            <section className="section" style={{ backgroundColor: '#111', color: '#F7F5EA', position: 'relative', overflow: 'hidden' }}>
                <PacmanGame />
                <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>
                    <InteractiveText text="03 / THE IMRSV APP." />
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
                            Track drops, network with local hubs, unlock private locations, and manage off-grid itineraries.
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
                    </div>

                </div>
            </section>

            {/* THE CORE IDEA */}
            <section className="section" >
                <span className="section-label">
                    <InteractiveText text="04 / THE CORE IDEA." />
                </span>
                <div className="concept-grid">

                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <h2 className="concept-title" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 0 }}>
                            <InteractiveText text="INTENTIONAL" /> <br />
                            <InteractiveText text="EXPLORATION." />
                        </h2>
                        <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Most travel stuff is just transactional. IMRSV is about building actual participation.
                        </p>
                        <p>
                            We’re moving from just being spectators to being active contributors. By connecting creators, builders, and travelers, we make sure that exploring a city actually does something for the people living there.
                        </p>
                        <p style={{ fontStyle: 'italic', borderLeft: '2px solid var(--border-color)', paddingLeft: '20px' }}>
                            We don’t just visit cities — <br />
                            we collaborate with them, host stuff within them, and reinvest into them.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Participation ]</span>
                            <button onClick={handleApplyClick} className="gauntlet-btn" style={{ marginTop: 0, padding: '18px 60px' }}>[ Join Sunday Collection ]</button>
                        </div>
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

            <footer className="footer">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                    <img src="/logo.svg" alt="" style={{ height: '12px', width: 'auto', marginTop: '1px' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links" style={{ color: 'var(--text-secondary)' }}>
                    <span onClick={navigateToJournal} style={{ cursor: 'pointer' }}>
                        <InteractiveText text="Journal" />
                    </span>
                    <span onClick={navigateToAdmin} style={{ cursor: 'pointer' }}>
                        <InteractiveText text="©2026" />
                    </span>
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
