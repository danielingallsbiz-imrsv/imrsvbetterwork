import React from 'react';
import { motion } from 'framer-motion';

const ClippingText = ({ text }) => {
    const words = text.split(' ');

    const colors = [
        '#E74C3C', // Red (Classic)
        '#C0392B', // Deep Red
        '#E67E22', // Orange
        '#3498DB', // Blue
        '#F1C40F', // Yellow
        '#2ECC71', // Green
        '#9B59B6', // Purple
        '#E74C3C', // Extra Red for weight
        '#C0392B', // Extra Red for weight
        '#ECF0F1', // White/Cream
        '#34495E'  // Dark Charcoal
    ];

    const fonts = [
        'serif',
        'sans-serif',
        'monospace',
        '"Metal", serif',
        '"Inter", sans-serif'
    ];

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '12px' : '30px', alignItems: 'flex-start' }}>
            {words.map((word, wIndex) => (
                <div key={wIndex} style={{ display: 'flex', gap: isMobile ? '2px' : '6px', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, index) => {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                        const randomRotation = (Math.random() * 8 - 4).toFixed(2);
                        const isDark = ['#34495E', '#C0392B', '#E74C3C', '#3498DB', '#9B59B6'].includes(randomColor);

                        return (
                            <motion.div
                                key={`${wIndex}-${index}`}
                                initial={{ opacity: 0, y: 10, rotate: 0 }}
                                animate={{ opacity: 1, y: 0, rotate: parseFloat(randomRotation) }}
                                transition={{ delay: (wIndex * 5 + index) * 0.05, duration: 0.4 }}
                                style={{
                                    background: randomColor,
                                    color: isDark ? '#FFF' : '#000',
                                    padding: isMobile ? '4px 6px' : '8px 12px',
                                    fontFamily: randomFont,
                                    fontSize: isMobile ? '1.25rem' : '2.5rem',
                                    fontWeight: 900,
                                    display: 'inline-block',
                                    boxShadow: '1px 2px 0px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    userSelect: 'none',
                                    lineHeight: 1,
                                    transformOrigin: 'center',
                                    marginBottom: isMobile ? '6px' : '10px'
                                }}
                            >
                                {char.toUpperCase()}
                            </motion.div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ClippingText;
