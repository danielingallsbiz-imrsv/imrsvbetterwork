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

            {/* MEMBERSHIP */}
            <section className="section">
                <span className="section-label">01 / MEMBERSHIP.</span>
                <div className="concept-grid" style={{ alignItems: 'center', marginTop: '60px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '3rem', marginBottom: '40px', lineHeight: 1 }}>ONE MEMBER. <br /> ONE VOTE.</h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px' }}>
                            The Collection is application-based.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Members get access to private events, meetups, and founder-only rooms in select cities.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Each membership fee directly supports the city we enter.
                        </p>
                        <p>
                            A built-in portion is allocated to a local initiative — a small business, community project, or family in need.
                        </p>
                    </div>
                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ padding: '0 0 60px 0', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>
                            <p style={{ fontSize: '1.4rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4, fontWeight: 800 }}>
                                Members vote where <br />that support goes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINANCIAL STRUCTURE */}
            <section className="section">
                <span className="section-label">02 / How The Money Flows.</span>
                <div className="bucket-grid">
                    <BucketCard
                        num="01."
                        title="Operational"
                        desc="Covers event production, logistics, and sustainable growth."
                    />
                    <BucketCard
                        num="02."
                        title="Member Equity"
                        desc="A reserve sustaining long-term expansion and member participation."
                    />
                    <BucketCard
                        num="03."
                        title="Restoration Fund"
                        desc="The mandatory percentage allocated directly to local reinvestment."
                    />
                </div>
            </section>

            {/* TARGETED IMPACT */}
            <section className="section" style={{ backgroundColor: '#000', color: '#fff' }}>
                <span className="section-label" style={{ color: '#666' }}>03 / Targeted Restoration.</span>
                <h2 className="concept-title" style={{ color: '#fff' }}>
                    Restoration is not vague charity. <br />
                    It is visible impact.
                </h2>

                <div className="raw-grid">
                    <ImpactCard
                        title="FAMILY BUSINESSES"
                        desc="Funding struggling local establishments."
                        img="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop"
                    />
                    <ImpactCard
                        title="COMMUNITY CENTERS"
                        desc="Paying for repairs and local initiatives."
                        img="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop"
                    />
                    <ImpactCard
                        title="ARTISAN COLLECTIVES"
                        desc="Supporting local creators and youth programs."
                        img="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
                    />
                </div>
            </section>

            {/* THE IDEA */}
            <section className="section">
                <span className="section-label">04 / THE IDEA.</span>
                <h2 className="concept-title" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}>
                    Participation restores.
                </h2>

                <div className="concept-grid">
                    <div className="gallery-item">
                        <img
                            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000&auto=format&fit=crop"
                            className="gallery-img"
                            alt="The Community"
                            style={{ borderRadius: '2px' }}
                        />
                    </div>
                    <div className="concept-text" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            IMRSV is a private collection of people who move with intention.
                        </p>
                        <p>
                            We enter cities. <br />
                            We connect with culture. <br />
                            We contribute to what already exists.
                        </p>
                        <p style={{ fontStyle: 'italic' }}>
                            Not spectators. <br />
                            Not tourists. <br /><br />
                            Participants.
                        </p>

                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, display: 'block', marginBottom: '15px' }}>[ Join The Collective ]</span>
                            <button className="gauntlet-btn" style={{ marginTop: 0, padding: '18px 60px' }}>join the collective</button>
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
