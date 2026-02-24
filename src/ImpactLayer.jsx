import React from 'react';
import { motion } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css'; // Reusing global styles for consistency

const BucketCard = ({ num, title, desc }) => (
    <div className="bucket-card">
        <span className="bucket-num">{num}</span>
        <h3 className="bucket-title">
            <InteractiveText text={title} />
        </h3>
        <p className="bucket-desc">{desc}</p>
    </div>
);

const ImpactLayer = ({ onBack, navigateToRestoration }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                </div>
            </nav>

            <section className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="section-label">
                        <InteractiveText text="THE RESTORATION LAYER / OUR MISSION" />
                    </span>
                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px' }}>
                        <InteractiveText text="RESTORING" /> <br />
                        <InteractiveText text="THE HUBS." />
                    </h1>
                </motion.div>

                <div className="concept-grid" style={{ marginTop: '80px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>
                            <InteractiveText text="ACCESS OVER NOISE." />
                        </h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px', fontSize: '1.2rem' }}>
                            IMRSV is a private, membership-based platform designed for access over noise.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            Operated as a closed ecosystem, we provide approved members with curated experiences, local access, and share proprietary opportunity inside a protected network.
                        </p>
                        <p>
                            Information is protected. Participation is intentional. This is not a public free-all. This is controlled access.
                        </p>
                    </div>
                </div>

                <div className="concept-grid" style={{ marginTop: '100px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>
                            <InteractiveText text="What’s the idea here?" />
                        </h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px', fontSize: '1.2rem' }}>
                            Basically, Sunday Collection is our way of making sure we’re actually helping out the places we visit.
                        </p>
                        <p>
                            We don’t just throw parties and dip. We make sure a real chunk of everything we do goes straight back into the local shops, artists, and projects that make these cities what they are. It’s about being a good guest.
                        </p>
                    </div>
                </div>

                <div className="bucket-grid" style={{ marginTop: '100px' }}>
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

                <div className="concept-grid" style={{ marginTop: '120px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>
                            <InteractiveText text="Where we're staying" />
                        </h3>
                        <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
                            "Leave it better than you found it."
                        </p>
                        <p>
                            We aren't here for a quick trip. We pick our spots—like Medellín, Bali, Oahu, and Rome—and we focus on the long-term. The goal is to build something that lasts, not just show up as tourists.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
                    <img src="/logo.svg" alt="" style={{ height: '12px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links" style={{ color: 'var(--text-secondary)' }}>
                    <span>©2026</span>
                </div>
            </footer>
        </motion.div>
    );
};

export default ImpactLayer;
