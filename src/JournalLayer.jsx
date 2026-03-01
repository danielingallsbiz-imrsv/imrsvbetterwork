import InteractiveText from "./components/InteractiveText"; import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import './Home.css';

const JournalLayer = ({ onBack }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{
                backgroundColor: '#111',
                color: '#F7F5EA',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }}
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
                            <InteractiveText text="Journal / Archives" />
                        </span>
                        <span className="mobile-show">
                            <InteractiveText text="Journal" />
                        </span>
                    </span>
                </div>
            </nav>

            {/* JOURNAL HEADER */}
            <section style={{ padding: '140px 80px 40px 80px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <span style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.4em',
                        opacity: 0.3,
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '20px'
                    }}>
                        <InteractiveText text="JOURNAL — 001" />
                    </span>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                        lineHeight: 0.95,
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        margin: 0,
                        fontFamily: '"Outfit", sans-serif'
                    }}>
                        <InteractiveText text="SUNDAY" /><br />
                        <InteractiveText text="COLLECTION 01." /><br />
                        <span style={{ textDecoration: 'line-through', opacity: 0.4, display: 'inline-block', marginTop: '10px' }}>
                            <InteractiveText text="PROJECT CULTURE" />
                        </span>
                    </h1>
                    <p style={{
                        marginTop: '20px',
                        opacity: 0.4,
                        fontSize: '0.85rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                    }}>
                        Medellín, CO — March 29th, 2026
                    </p>
                </motion.div>
            </section>

            {/* FLYER IMAGE — FULL WIDTH */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                style={{ width: '100%', padding: '0 80px', maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '20px' }}
            >
                <img
                    src="/project-culture-poster.jpg"
                    alt="Sunday Collection 01 — Project Culture Editorial"
                    style={{
                        width: '50%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '2px',
                        objectFit: 'contain'
                    }}
                />
                <img
                    src="/journal-flyer-01.png"
                    alt="Sunday Collection 01 — Project Culture Flyer"
                    style={{
                        width: '50%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '2px',
                        objectFit: 'contain'
                    }}
                />
            </motion.div>

            {/* EDITORIAL CONTENT — NUDE PROJECT / RAWDOGG STYLE */}
            <section style={{ padding: '80px 80px 40px 80px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                >
                    {/* TAGLINE */}
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '60px' }}>
                        {['SUNDAY COLLECTION', 'DROP 01', 'MEDELLÍN', 'MARCH 29'].map((tag) => (
                            <span key={tag} style={{
                                fontSize: '0.65rem',
                                letterSpacing: '0.15em',
                                padding: '8px 16px',
                                border: '1px solid rgba(247, 245, 234, 0.15)',
                                opacity: 0.6,
                                textTransform: 'uppercase'
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* TWO COLUMN EDITORIAL */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', marginBottom: '80px' }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.8rem',
                                fontWeight: 400,
                                lineHeight: 1.1,
                                marginBottom: '30px',
                                fontFamily: '"Outfit", sans-serif'
                            }}>
                                <InteractiveText text="Sunday Collection 01." />
                                <br />
                                <span style={{ opacity: 0.4 }}>
                                    <InteractiveText text="ᴘʀᴏᴊᴇᴄᴛ ᴄᴜʟᴛᴜʀᴇ" />
                                </span>
                            </h2>
                            <p style={{
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                opacity: 0.6,
                                marginBottom: '20px'
                            }}>
                                The first official drop from Sunday Collection lands in Medellín, Colombia. Project Culture is the opening statement — a curated weekend where sound, people, and place collide.
                            </p>
                            <p style={{
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                opacity: 0.6,
                                marginBottom: '20px'
                            }}>
                                Here is the breakdown: We host open pre-events on Friday where everyone is welcome. Sunday begins with member-only wellness from 10:00 AM to 1:00 PM featuring run clubs, ice baths, and saunas. Following a community lunch at 1:00 PM, the rooftop Sunday party kicks off from 2:00 PM to 6:00 PM with DJs and hot tub games. The official "afters" then begin at 6:00 PM.
                            </p>
                            <p style={{
                                fontSize: '0.95rem',
                                lineHeight: 1.7,
                                opacity: 0.6
                            }}>
                                This isn't just a party, it's a blueprint. Every ticket feeds directly back into the local community through The IMRSV Project. You show up, you participate, the city benefits. Simple.
                            </p>
                        </div>
                        <div>
                            <div style={{ borderLeft: '1px solid rgba(247, 245, 234, 0.15)', paddingLeft: '40px' }}>
                                <span style={{
                                    fontSize: '0.6rem',
                                    letterSpacing: '0.3em',
                                    opacity: 0.3,
                                    display: 'block',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                    THE DETAILS
                                </span>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                    <div>
                                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.3, display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>WHEN</span>
                                        <span style={{ fontSize: '1rem', opacity: 0.8 }}>March 29th, 2026</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.3, display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>WHERE</span>
                                        <span style={{ fontSize: '1rem', opacity: 0.8 }}>Medellín, Colombia</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.3, display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>FORMAT</span>
                                        <span style={{ fontSize: '1rem', opacity: 0.8 }}>Curated night — Sound, Culture, Participation</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.3, display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>ACCESS</span>
                                        <span style={{ fontSize: '1rem', opacity: 0.8 }}>Sunday Collection Members + Vetted Applications</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PULL QUOTE */}
                    <div style={{
                        borderTop: '1px solid rgba(247, 245, 234, 0.1)',
                        borderBottom: '1px solid rgba(247, 245, 234, 0.1)',
                        padding: '60px 0',
                        marginBottom: '80px',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                            fontStyle: 'italic',
                            fontWeight: 300,
                            lineHeight: 1.3,
                            opacity: 0.5,
                            maxWidth: '800px',
                            margin: '0 auto',
                            fontFamily: '"Outfit", sans-serif'
                        }}>
                            "We don't just visit cities — we collaborate with them, host stuff within them, and reinvest into them."
                        </p>
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span style={{
                            fontSize: '0.6rem',
                            letterSpacing: '0.3em',
                            opacity: 0.3,
                            display: 'block',
                            marginBottom: '25px',
                            textTransform: 'uppercase'
                        }}>
                            SECURE YOUR SPOT
                        </span>
                        <button
                            onClick={onBack}
                            style={{
                                background: '#F7D031',
                                color: '#111',
                                border: 'none',
                                padding: '18px 50px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                letterSpacing: '0.08em',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.target.style.opacity = '0.85'}
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                        >
                            [ APPLY FOR SUNDAY COLLECTION ]
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* WEEKEND BREAKDOWN */}
            <section style={{ padding: '0px 80px 80px 80px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
                <div style={{ borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '60px' }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        marginBottom: '40px',
                        fontFamily: '"Outfit", sans-serif'
                    }}>
                        <InteractiveText text="The Breakdown." />
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {/* FRIDAY */}
                        <div style={{ background: '#1A1A1A', padding: '30px', borderLeft: '2px solid #F7D031' }}>
                            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Itinerary</span>
                            <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', fontWeight: 400 }}>10:00 AM <span style={{ opacity: 0.4, fontSize: '0.85rem' }}></span></h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>
                                Run Club
                            </p>
                        </div>

                        {/* SUNDAY AM */}
                        <div style={{ background: '#1A1A1A', padding: '30px', borderLeft: '2px solid #F7D031' }}>
                            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Itinerary</span>
                            <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', fontWeight: 400 }}>12:00 PM - 5:00 PM <span style={{ opacity: 0.4, fontSize: '0.85rem' }}></span></h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>
                                Community Day
                            </p>
                        </div>

                        {/* SUNDAY PM */}
                        <div style={{ background: '#1A1A1A', padding: '30px', borderLeft: '2px solid #F7D031' }}>
                            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Itinerary</span>
                            <h3 style={{ fontSize: '1.25rem', margin: '0 0 10px 0', fontWeight: 400 }}>6:00 PM - 11:00 PM</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: 1.6, margin: 0 }}>
                                After Hours Network (Ice baths, DJ, Open Bar, Tattoos)
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <footer style={{
                padding: '40px 80px',
                borderTop: '1px solid rgba(247, 245, 234, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div onClick={onBack} style={{ cursor: 'pointer', fontSize: '0.8rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    <InteractiveText text="← Return Home" />
                </div>
                <span style={{ fontSize: '0.7rem', opacity: 0.2, letterSpacing: '0.1em' }}>
                    © 2026 THE IMRSV PROJECT
                </span>
            </footer>
        </motion.div>
    );
};

export default JournalLayer;
