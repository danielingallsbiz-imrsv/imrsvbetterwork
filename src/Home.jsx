import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container no-scrollbar">
            {/* NAVBAR */}
            <nav className="nav-bar">
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
                >
                    <h1 className="hero-title">Participation<br />that restores.</h1>
                    <p className="hero-subtitle">The Collection by The IMRSV Project</p>
                </motion.div>

                <img
                    src="https://images.unsplash.com/photo-1551632432-c735e8299bc2?q=80&w=2000&auto=format&fit=crop"
                    alt="Atmosphere"
                    className="hero-video-bg"
                    style={{ opacity: 0.35, filter: 'grayscale(1) contrast(1.1)' }}
                />
            </section>

            {/* THE MISSION */}
            <section className="section">
                <span className="section-label">01 / The Mission.</span>
                <h2 className="concept-title">
                    IMRSV is not just immersive membership. <br />
                    It is participation that restores.
                </h2>

                <div className="concept-grid">
                    <div className="gallery-item">
                        <img
                            src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000&auto=format&fit=crop"
                            className="gallery-img"
                            alt="Community Focus"
                            style={{ borderRadius: '2px' }}
                        />
                    </div>
                    <div className="concept-text">
                        <p>
                            Every experience generates profit. A percentage of that profit does not stay inside the organization. <br /><br />
                            It flows back into the local community where the immersion happens. Most travel extracts. <br /><br />
                            We reinvest.
                        </p>
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

            {/* THE VOTING SYSTEM */}
            <section className="section">
                <span className="section-label">04 / The Choice.</span>
                <div className="concept-grid">
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>One member. <br />One vote.</h3>
                        <p>
                            Local candidates are nominated and vetted. Members decide where the funds are distributed.
                            Ownership stays with the people who were there.
                        </p>
                    </div>
                    <div className="gallery-item" style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>Transparency. Participation. Results.</p>
                        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', width: '100%' }}></div>
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
