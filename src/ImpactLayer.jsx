import React from 'react';
import { motion } from 'framer-motion';
import './Home.css'; // Reusing global styles for consistency

const ImpactLayer = ({ onBack }) => {
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
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links">
                    <span onClick={onBack}>Back to Main</span>
                </div>
            </nav>

            <section className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="section-label">THE IMPACT LAYER / OUR MISSION</span>
                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px' }}>
                        PARTICIPATION <br /> RESTORES.
                    </h1>
                </motion.div>

                <div className="concept-grid" style={{ marginTop: '80px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>What’s the idea here?</h3>
                        <p style={{ marginBottom: '20px' }}>
                            Basically, the Impact Layer is our way of making sure we’re actually helping out the places we visit.
                        </p>
                        <p>
                            We don’t just throw parties and dip. We make sure a real chunk of everything we do goes straight back into the local shops, artists, and projects that make these cities what they are. It’s about being a good guest.
                        </p>
                    </div>
                </div>

                <div className="bucket-grid" style={{ marginTop: '100px' }}>
                    <div className="bucket-card">
                        <span className="bucket-num">01.</span>
                        <h3 className="bucket-title">How it works</h3>
                        <p className="bucket-desc">
                            We take a slice of every membership and put it into what we call a "Restoration Fund." That money stays in the city where it was raised and only goes to local people.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">02.</span>
                        <h3 className="bucket-title">The hangouts</h3>
                        <p className="bucket-desc">
                            We do about 1 or 2 events a month. Sometimes it's just a chill dinner with builders, other times it’s a big night showing off what the locals are making.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">03.</span>
                        <h3 className="bucket-title">Staying connected</h3>
                        <p className="bucket-desc">
                            We’re all about bridging the gap. When we’re in town, we make sure our people are actually hanging with locals and spending money at the spots that define the culture.
                        </p>
                    </div>
                </div>

                <div className="concept-grid" style={{ marginTop: '120px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Where we're staying</h3>
                        <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
                            "Participation that restores."
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
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links" style={{ color: 'var(--text-secondary)' }}>
                    <span>©2026</span>
                </div>
            </footer>
        </motion.div>
    );
};

export default ImpactLayer;
