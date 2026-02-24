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
                    <span className="section-label">THE IMPACT LAYER / FOUNDATION</span>
                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px' }}>
                        CIRCULATING VALUE. <br /> RESTORING HUBS.
                    </h1>
                </motion.div>

                <div className="concept-grid" style={{ marginTop: '80px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>What is the Impact Layer?</h3>
                        <p style={{ marginBottom: '20px' }}>
                            The Impact Layer is the economic engine of IMRSV. It’s the mechanism that ensures every member activation creates tangible utility for the host city.
                        </p>
                        <p>
                            We don't just host parties; we channel resources—both intellectual and financial—directly into local businesses, creators, and restoration projects.
                        </p>
                    </div>
                </div>

                <div className="bucket-grid" style={{ marginTop: '100px' }}>
                    <div className="bucket-card">
                        <span className="bucket-num">01.</span>
                        <h3 className="bucket-title">How it Works</h3>
                        <p className="bucket-desc">
                            A percentage of all membership flows and event participation is locked into a localized "Restoration Fund" for each Hub.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">02.</span>
                        <h3 className="bucket-title">The Events</h3>
                        <p className="bucket-desc">
                            We host 1-2 curated activations per month. These range from private builder dinners to large-scale cultural showcases.
                        </p>
                    </div>
                    <div className="bucket-card">
                        <span className="bucket-num">03.</span>
                        <h3 className="bucket-title">The Action</h3>
                        <p className="bucket-desc">
                            During events, we bridge the gap between travelers and locals, facilitating direct reinvestment into the venues and creators that define the culture.
                        </p>
                    </div>
                </div>

                <div className="concept-grid" style={{ marginTop: '120px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Where we Invest</h3>
                        <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
                            "Participation that restores."
                        </p>
                        <p>
                            Our focus is long-term. We choose specific Hubs (Medellín, Bali, Oahu, Rome) and commit to a 5-year reinvestment cycle, helping build sustainable systems rather than transactional tourism.
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
