import React from 'react';
import { motion } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const RestorationLayer = ({ onBack, navigateToImpact }) => {
    const cities = [
        { name: 'Oahu', status: '$2,756', fund: 'Active Allocation', projects: [], isNumeric: true },
        { name: 'Medellín', status: 'STAGING', fund: 'Coming Soon...', projects: [] },
        { name: 'Bali', status: 'VETTING', fund: 'Coming Soon...', projects: [] },
        { name: 'Rome', status: 'VETTING', fund: 'Coming Soon...', projects: [] }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#111', color: '#F7F5EA' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span style={{ color: 'rgba(247, 245, 234, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <span className="mobile-hide">
                            <InteractiveText text="Real-time Ledger v1.0" />
                        </span>
                        <span className="mobile-show">
                            <InteractiveText text="Ledger" />
                        </span>
                    </span>
                </div>
            </nav>

            <section className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '160px' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>
                        <InteractiveText text="THE LEDGER / PROOF OF IMPACT" />
                    </span>
                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px', color: '#F7F5EA' }}>
                        <InteractiveText text="THE LEDGER." />
                    </h1>
                </motion.div>

                <div style={{ marginTop: '60px', borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '40px' }}>
                    <div className="concept-grid" style={{ maxWidth: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                        {cities.map((city, i) => (
                            <motion.div
                                key={city.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                style={{
                                    padding: '40px',
                                    border: city.isNumeric ? '1px solid rgba(247, 208, 49, 0.2)' : '1px solid rgba(247, 245, 234, 0.05)',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {city.isNumeric && <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', backgroundColor: '#F7D031' }} />}
                                <span style={{ fontSize: '0.8rem', opacity: 0.5, letterSpacing: '0.1em' }}>{city.name}</span>
                                <h3 style={{ fontSize: '2.5rem', margin: '15px 0', color: city.isNumeric ? '#F7D031' : '#F7F5EA', letterSpacing: city.isNumeric ? '0.05em' : 'normal' }}>{city.status}</h3>
                                <div style={{ marginBottom: '25px' }}>
                                    <span style={{ fontSize: '0.9rem', color: city.isNumeric ? '#F7D031' : 'rgba(247, 245, 234, 0.4)' }}>{city.fund}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {city.projects.map(p => (
                                        <div key={p} style={{ fontSize: '0.8rem', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: city.isNumeric ? '#F7D031' : 'rgba(247, 245, 234, 0.2)' }} />
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="concept-grid" style={{ marginTop: '100px', maxWidth: '800px' }}>
                    <div className="concept-text">
                        <h3 style={{ fontSize: '2rem', marginBottom: '30px', color: '#F7F5EA' }}>
                            <InteractiveText text="How the Ledger works" />
                        </h3>
                        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
                            The Ledger is just our way of keeping everything transparent. It shows exactly where the Restoration Fund is going—from membership slices to activation fees.
                        </p>
                        <p style={{ opacity: 0.8 }}>
                            We don't just donate; we invest. The Ledger tracks where the money is currently hitting and what community projects are up next. It’s a live look at what we're actually doing.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(247, 245, 234, 0.1)' }}>
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.4 }}>
                    <img src="/logo.svg" alt="" style={{ height: '12px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>
                    <span>©2026</span>
                </div>
            </footer>
        </motion.div>
    );
};

export default RestorationLayer;
