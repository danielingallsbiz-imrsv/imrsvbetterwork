import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
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
                        <h3 style={{ marginBottom: '30px' }}>
                            <InteractiveText text="ACCESS OVER NOISE." />
                        </h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px', fontSize: '1.2rem' }}>
                            IMRSV is a private spot created for people who value real access over all the noise.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            It’s a closed loop where members get the lowdown on curated experiences, local hooks, and proprietary opportunities within the community.
                        </p>
                        <p>
                            Everything here is intentional and low-key. We aren’t interested in a public free-for-all—just a protected space for our people to build and explore.
                        </p>
                    </div>
                </div>

                <div className="concept-grid" style={{ marginTop: '100px' }}>
                    <div className="concept-text">
                        <h3 style={{ marginBottom: '30px' }}>
                            <InteractiveText text="GAME ON/OFF." />
                        </h3>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '20px', fontSize: '1.2rem' }}>
                            We’re gamifying the way people move through cities to make everything more immersive.
                        </p>
                        <p style={{ marginBottom: '20px' }}>
                            For travelers, it’s about hitting the right spots and earning status that unlocks real access. For locals, it’s about being part of a loop where their work actually gets supported by the community.
                        </p>
                        <p>
                            It turns typical travel stuff into a collaborative game where everyone wins. No more boring tourist loops—just real connection and contribution. Ykwim.
                        </p>
                    </div>
                </div>

                <div className="bucket-grid" style={{ marginTop: '100px' }}>
                    <BucketCard
                        num="01."
                        title="The Activation"
                        desc="We create moments where travelers and locals actually hang out, making sure value stays in the city instead of just passing through."
                    />
                    <BucketCard
                        num="02."
                        title="The Connection"
                        desc="No extraction. We reinvest directly into the spots and people that make local culture what it is."
                    />
                    <BucketCard
                        num="03."
                        title="The Mission"
                        desc="Building a way to turn travel into participation. The goal is to stop just visiting and start actually contributing."
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
                            We aren't here for a quick trip. We pick our spots—like Medellín, Bali, Oahu, and Rome—and we stay for the long haul. The goal is to build something that lasts, not just show up as tourists and leave.
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
