import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Home.css';

const Home = () => {
    const { scrollY } = useScroll();
    const [isPastHero, setIsPastHero] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsPastHero(latest > window.innerHeight - 100);
        });
    }, [scrollY]);

    return (
        <div className="home-container no-scrollbar">
            {/* NAVBAR */}
            <nav className={`nav-bar ${isPastHero ? 'nav-hidden' : ''}`}>
                <div className="nav-logo">IMRSV PROJECT</div>
                <div className="nav-links">
                    <span>The Impact Layer</span>
                    <span>Restoration</span>
                    <span>Apply</span>
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
                    <p className="hero-subtitle">the collective by imrsv</p>
                </motion.div>

                <img
                    src="/hero-bg.png"
                    alt="IMRSV Collection"
                    className="hero-video-bg"
                    style={{
                        opacity: 0.8,
                        filter: 'grayscale(0.2) contrast(1.1) brightness(0.8)',
                        zIndex: -1
                    }}
                />
            </section>

            {/* PRIVATE NETWORK */}
            <section className="section">
                <span className="section-label">01 / PRIVATE NETWORK.</span>
                <div className="concept-grid" style={{ alignItems: 'center', marginTop: '60px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3rem', marginBottom: '40px', lineHeight: 1 }}>ACCESS OVER NOISE.</h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px' }}>
                            IMRSV is a private, IP-driven ecosystem for intentional travelers.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            We are not a public platform. Membership is controlled, information is protected, and participation is curated.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Members gain access to private groups, verified local connections, and status progression within our closed ecosystem.
                        </p>
                        <p>
                            This is not a public listing site. This is controlled access.
                        </p>
                    </div>
                    <div className="gallery-item">
                        <img
                            src="/dinner.png"
                            className="gallery-img"
                            alt="The Collective Dinner"
                            style={{ borderRadius: '2px', filter: 'grayscale(0.2) contrast(1.1)' }}
                        />
                    </div>
                </div>
            </section>

            {/* GLOBAL OPERATIONS */}
            <section className="section">
                <span className="section-label">02 / GLOBAL OPERATIONS.</span>
                <h2 className="concept-title" style={{ maxWidth: '900px' }}>
                    1–2 curated events per month. <br />
                    Medellín. Bali. Oahu. Rome.
                </h2>
                <div className="bucket-grid">
                    <BucketCard
                        num="01."
                        title="The Activation"
                        desc="Revenue generated through events is partially reinvested directly into the local ecosystem—supporting operators and venues."
                    />
                    <BucketCard
                        num="02."
                        title="The Circulation"
                        desc="We don’t extract value from cities. We circulate it by supporting the small businesses that built them."
                    />
                    <BucketCard
                        num="03."
                        title="The Mission"
                        desc="To build a platform that turns travel into participation. We don’t just visit—we collaborate."
                    />
                </div>
            </section>

            {/* THE GAME LAYER */}
            <section className="section" style={{ backgroundColor: '#1A1A1A', color: '#F7F5EA' }}>
                <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>03 / THE GAME LAYER.</span>
                <div className="concept-grid" style={{ alignItems: 'center' }}>
                    <div className="gallery-item">
                        <img
                            src="/movement.png"
                            className="gallery-img"
                            alt="Intentional Movement"
                            style={{ borderRadius: '2px', filter: 'grayscale(0.3) contrast(1.1)' }}
                        />
                    </div>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3rem', marginBottom: '30px', color: '#F7F5EA' }}>COLLECT THE WORLD.</h3>
                        <p style={{ marginBottom: '20px', fontSize: '1.2rem', opacity: 0.9 }}>
                            IMRSV adds a real-world collection system. Around the world are verified “Hubs”—restaurants, bars, and cultural points.
                        </p>
                        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                            Physically claiming these locations earns points. Unique or harder-to-reach spots reward more. This is participation currency.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px' }}>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>The Rewards</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Partner perks, event benefits, and early access opportunities.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>The Missions</h4>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Time-based or location-based opportunities with higher status rewards.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* THE IMPACT LAYER */}
            <section className="section">
                <span className="section-label">04 / THE IMPACT LAYER.</span>
                <div className="concept-grid">
                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <h2 className="concept-title" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 0 }}>
                            Participation <br />Restores.
                        </h2>
                        <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            Most travel platforms are transactional. IMRSV builds ongoing participation.
                        </p>
                        <p>
                            Instead of just booking and leaving, members explore, collect, connect, and earn.
                            Travel becomes part of a larger system—not just a one-time experience.
                        </p>
                        <p style={{ fontStyle: 'italic', borderLeft: '2px solid var(--accent-yellow)', paddingLeft: '20px' }}>
                            We don’t just visit cities — <br />
                            we collaborate with them, host within them, and reinvest into them.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Join The Collective ]</span>
                            <button className="gauntlet-btn" style={{ marginTop: 0, padding: '18px 60px' }}>begin application</button>
                        </div>
                    </div>
                    <div className="gallery-item">
                        <img
                            src="/restoration.png"
                            className="gallery-img"
                            alt="Community Restoration"
                            style={{ borderRadius: '2px', filter: 'grayscale(0.1) contrast(1.05)' }}
                        />
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
                        We prioritize those ready to contribute to the Impact Layer.
                    </p>
                    <button className="gauntlet-btn">Begin Application</button>
                </motion.div>
            </section>

            <footer className="footer">
                <div className="nav-logo">IMRSV PROJECT</div>
                <div className="nav-links" style={{ color: 'var(--text-secondary)' }}>
                    <span>Journal</span>
                    <span>©2026</span>
                </div>
            </footer>
        </div>
    );
};

const ImpactCard = ({ title, desc, img }) => (
    <div className="raw-card">
        <img src={img} alt={title} className="raw-card-img" />
        <div className="raw-overlay">
            <span className="raw-tag">Active Restoration</span>
            <h3 className="raw-title">{title}</h3>
            <p style={{ fontSize: '0.8rem', color: '#fff', opacity: 0.8 }}>{desc}</p>
        </div>
    </div>
);

const BucketCard = ({ num, title, desc }) => (
    <div className="bucket-card">
        <span className="bucket-num">{num}</span>
        <h3 className="bucket-title">{title}</h3>
        <p className="bucket-desc">{desc}</p>
    </div>
);

export default Home;
