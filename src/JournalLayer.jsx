import React from 'react';
import { motion } from 'framer-motion';
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
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                overflow: 'hidden'
            }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }}>imrsv project</span>
                </div>
                <div className="nav-links">
                    <span style={{ color: 'rgba(247, 245, 234, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Journal / Archives</span>
                </div>
            </nav>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
                <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.4em',
                    opacity: 0.4,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '20px'
                }}>
                    TRANSMISSION PENDING
                </span>

                <h1 style={{
                    fontSize: 'clamp(3rem, 10vw, 6rem)',
                    lineHeight: 0.9,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    margin: 0,
                    fontFamily: '"Outfit", sans-serif'
                }}>
                    JOURNAL<br />
                    COMING SOON<span style={{ color: '#F7D031' }}>.</span>
                </h1>

                <div style={{
                    marginTop: '40px',
                    height: '1px',
                    width: '60px',
                    backgroundColor: 'rgba(247, 245, 234, 0.2)',
                    margin: '40px auto'
                }} />

                <p style={{
                    maxWidth: '400px',
                    margin: '0 auto',
                    opacity: 0.5,
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    letterSpacing: '0.02em'
                }}>
                    We are currently archiving the first wave of collective activations. The journal will serve as the permanent record for the impact layer.
                </p>
            </motion.div>

            {/* Subtle background element */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.08, 0.03],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #F7D031 0%, transparent 70%)',
                    zIndex: -1,
                    filter: 'blur(100px)',
                    pointerEvents: 'none'
                }}
            />

            <footer className="footer" style={{ borderTop: 'none' }}>
                <div onClick={onBack} style={{ cursor: 'pointer', fontSize: '0.8rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    ← Return Home
                </div>
            </footer>
        </motion.div>
    );
};

export default JournalLayer;
