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
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>[</span>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', marginTop: '2px' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project ]</span>
                </div>
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
                    src="/hawaii-party-hero.jpg"
                    alt="IMRSV Hawaii Party"
                    className="hero-video-bg"
                />
            </section>

            {/* PRIVATE NETWORK */}
            <section className="section">
                <span className="section-label">01 / PRIVATE NETWORK.</span>
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
                <span className="section-label">02 / WHERE WE OPERATE.</span>
                <h2 className="concept-title" style={{ maxWidth: '900px' }}>
                    1–2 curated activations per month. <br />
                    Medellín. Bali. Oahu. Rome.
                </h2>
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
                <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>03 / THE GAME LAYER.</span>
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
                <span className="section-label">04 / THE CORE IDEA.</span>
                <div className="concept-grid">

                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <h2 className="concept-title" style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 0 }}>
                            Participation <br />Restores.
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
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Join The Collective ]</span>
                            <button className="gauntlet-btn" style={{ marginTop: 0, padding: '18px 60px' }}>begin application</button>
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
                        We prioritize those ready to contribute to the Impact Layer.
                    </p>
                    <button className="gauntlet-btn">Begin Application</button>
                </motion.div>
            </section>

            <footer className="footer">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                    <span>[</span>
                    <img src="/logo.svg" alt="" style={{ height: '12px', width: 'auto', marginTop: '1px' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project ]</span>
                </div>
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
