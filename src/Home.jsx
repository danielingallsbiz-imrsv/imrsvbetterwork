import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import './Home.css';

const Home = ({ navigateToImpact, navigateToRestoration, navigateToApply, navigateToAdmin, navigateToJournal, showSuccess }) => {
    const { scrollY } = useScroll();
    const [isPastHero, setIsPastHero] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

    const handleImpactClick = () => {
        navigateToImpact();
    };

    const handleRestorationClick = () => {
        navigateToRestoration();
    };

    const handleApplyClick = () => {
        navigateToApply();
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
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#F7D031',
                            color: '#000',
                            textAlign: 'center',
                            padding: '30px 40px',
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            zIndex: 2000,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            maxWidth: '400px',
                            lineHeight: 1.4,
                            pointerEvents: 'none'
                        }}
                    >
                        APPLICATION RECEIVED.<br />
                        VETTING IN PROGRESS.
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLASH OVERLAY */}
            <AnimatePresence>
                {isFlashing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.6 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#fff',
                            zIndex: 9999,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* NAVBAR */}
            <nav className={`nav-bar ${isPastHero ? 'nav-hidden' : ''}`}>
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', marginTop: '2px' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links">
                    <span onClick={handleImpactClick} style={{ cursor: 'pointer' }}>The Impact Layer</span>
                    <span onClick={handleRestorationClick} style={{ cursor: 'pointer' }}>Restoration</span>
                    <span onClick={handleApplyClick} style={{ cursor: 'pointer' }}>Apply</span>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero-section">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    className="hero-content"
                >
                    <h1 className="hero-title">Participation<br />that restores.</h1>
                    <p className="hero-subtitle">Sunday Collection By imrsv</p>
                </motion.div>

                <img
                    src="/hawaii-party-hero.jpg"
                    alt="IMRSV Hawaii Party"
                    className="hero-video-bg"
                />
            </section>

            {/* PRIVATE NETWORK */}
            <section className="section">
                <span className="section-label shine-effect">01 / PRIVATE NETWORK.</span>
                <div className="concept-grid" style={{ alignItems: 'center', marginTop: '60px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3.5rem', marginBottom: '40px', lineHeight: 1 }}>ACCESS OVER NOISE.</h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px' }}>
                            IMRSV is a private, membership-based platform designed for access over noise.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Operated as a closed ecosystem, we provide approved members with curated experiences, local access, and share proprietary opportunity inside a protected network.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Information is protected. Participation is intentional.
                        </p>
                        <p>
                            This is not a public free-for-all. This is controlled access.
                        </p>
                    </div>

                </div>
            </section>

            {/* WHERE WE OPERATE */}
            <section className="section">
                <span className="section-label shine-effect">02 / UPCOMING ACTIVATIONS.</span>
                <h2 className="concept-title" style={{ maxWidth: '900px' }}>
                    Mid-April 1-Day Popup. <br />
                    Oahu, Hawaii.
                </h2>

                <div className="bucket-grid" style={{ marginBottom: '80px' }}>
                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>APR. 12</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>OAHU HUB</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: $50 (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="shine-effect"
                            style={{
                                color: '#F7D031',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 800,
                                marginTop: '10px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'inherit'
                            }}
                        >
                            apply →
                        </button>
                        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '20px' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>09:00 — 11:00 : IMRSV RUN CLUB</div>
                            <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>12:00 — 14:00 : CURATED NETWORKING</div>
                            <div style={{ fontSize: '0.8rem' }}>15:00 — 21:00 : DJ SET / OPEN BAR</div>
                        </div>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>MAY 03</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>CHICAGO HUB / AFTER HOURS</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: $15 (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="shine-effect"
                            style={{
                                color: '#F7D031',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 800,
                                marginTop: '10px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'inherit'
                            }}
                        >
                            apply →
                        </button>
                        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '20px' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>09:00 — 11:00 : IMRSV RUN CLUB</div>
                            <div style={{ fontSize: '0.8rem' }}>12:00 — 15:00 : LUNCH + BEACH GAMES</div>
                        </div>
                    </div>

                    <div className="bucket-card" style={{ background: '#1A1A1A', color: '#F7F5EA', border: 'none' }}>
                        <span className="bucket-num" style={{ color: '#F7D031' }}>MAY 17 / 31</span>
                        <h3 className="bucket-title" style={{ color: '#F7F5EA' }}>MEDELLÍN HUB</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(247, 245, 234, 0.7)' }}>
                            Ticket: TBD (Full Fund Reinvestment)
                        </p>
                        <button
                            onClick={handleApplyClick}
                            className="shine-effect"
                            style={{
                                color: '#F7D031',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 800,
                                marginTop: '10px',
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                textAlign: 'left',
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'inherit'
                            }}
                        >
                            apply →
                        </button>
                        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '20px' }}>
                            <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>MAY 17 : IMRSV RUN CLUB — FREE</div>
                            <div style={{ fontSize: '0.8rem' }}>MAY 31 : ROOFTOP DINNER / SHOWCASE / AFTER HOURS</div>
                        </div>
                    </div>

                    <div className="bucket-card" style={{
                        background: 'rgba(247, 245, 234, 0.4)',
                        border: '1px solid rgba(26, 26, 26, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <span className="bucket-num" style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '2rem' }}>MAY</span>
                        <h3 className="bucket-title" style={{ color: 'rgba(26, 26, 26, 0.8)', fontSize: '1.2rem', margin: '10px 0' }}>BALI / ROME</h3>
                        <p className="bucket-desc" style={{ color: 'rgba(26, 26, 26, 0.5)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                            COMING SOON.<br />
                            VETTED APPLICATIONS ONLY.
                        </p>
                    </div>
                </div>

                <div className="bucket-grid">
                    <BucketCard
                        num="01."
                        title="The Activation"
                        desc="Each activation brings together travelers, local creators, and small businesses to circulate value back into the local ecosystem."
                    />
                    <BucketCard
                        num="02."
                        title="The Connection"
                        desc="We don’t extract value from cities. We reinvest directly into the venues and collaborators that define local culture."
                    />
                    <BucketCard
                        num="03."
                        title="The Mission"
                        desc="To build a platform that turns travel into participation. We don’t just visit—we collaborate and reinvest."
                    />
                </div>
            </section>

            {/* THE GAME LAYER */}
            <section className="section" style={{ backgroundColor: '#111', color: '#F7F5EA' }}>
                <span className="section-label shine-effect" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>03 / THE GAME LAYER.</span>
                <div className="concept-grid" style={{ alignItems: 'center' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3.5rem', marginBottom: '30px', color: '#F7F5EA' }}>COLLECT THE WORLD.</h3>
                        <p style={{ marginBottom: '20px', fontSize: '1.2rem', opacity: 0.9 }}>
                            IMRSV adds a real-world collection system centered around verified “Hubs.”
                        </p>
                        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                            Physically visiting and claiming spots like restaurants, viewpoints, and cultural hubs earns points—participation currency that unlocks perks and missions.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' }}>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Unlocks</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Partner perks, event benefits, early access, and special in-app missions.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Status</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>The more you participate, the more access you unlock in the network.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* THE CORE IDEA */}
            <section className="section">
                <span className="section-label shine-effect">04 / THE CORE IDEA.</span>
                <div className="concept-grid">

                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <h2 className="concept-title" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 0 }}>
                            Intentional <br />Exploration.
                        </h2>
                        <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Most travel platforms are transactional. IMRSV builds ongoing participation.
                        </p>
                        <p>
                            We transition from booked spectators to active contributors. By connecting creators, builders, and travelers, we ensure exploration creates real utility for the cities we enter.
                        </p>
                        <p style={{ fontStyle: 'italic', borderLeft: '2px solid var(--border-color)', paddingLeft: '20px' }}>
                            We don’t just visit cities — <br />
                            we collaborate with them, host within them, and reinvest into them.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Participation ]</span>
                            <button onClick={handleApplyClick} className="gauntlet-btn" style={{ marginTop: 0, padding: '18px 60px' }}>[ Join Sunday Collection ]</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE GAUNTLET / JOIN */}
            <section className="gauntlet-section" id="apply">
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
                    <button onClick={handleApplyClick} className="gauntlet-btn shine-effect">[ Join Sunday Collection ]</button>
                </motion.div>
            </section>

            <footer className="footer">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                    <img src="/logo.svg" alt="" style={{ height: '12px', width: 'auto', marginTop: '1px' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links" style={{ color: 'var(--text-secondary)' }}>
                    <span onClick={navigateToJournal} style={{ cursor: 'pointer' }}>Journal</span>
                    <span onClick={navigateToAdmin} style={{ cursor: 'pointer' }}>©2026</span>
                </div>
            </footer>
        </div>
    );
};

const BucketCard = ({ num, title, desc }) => (
    <div className="bucket-card">
        <span className="bucket-num">{num}</span>
        <h3 className="bucket-title">{title}</h3>
        <p className="bucket-desc">{desc}</p>
    </div>
);

export default Home;
