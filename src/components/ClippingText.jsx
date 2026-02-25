import React from 'react';
import { motion } from 'framer-motion';

const ClippingText = ({ text }) => {
    const words = text.split(' ');

    const colors = [
        '#E74C3C', // Classic Red
        '#C0392B', // Pomegranate (Deep Red)
        '#B71C1C', // Dark Red
        '#D32F2F', // Crimson
        '#3498DB', // Blue
        '#F1C40F', // Yellow
        '#2ECC71', // Green
        '#9B59B6', // Purple
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '15px' : '40px', alignItems: 'flex-start' }}>
            {words.map((word, wIndex) => (
                <div key={wIndex} style={{ display: 'flex', gap: isMobile ? '3px' : '8px', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char, index) => {
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                        const randomRotation = (Math.random() * 8 - 4).toFixed(2);
                        const isDark = ['#34495E', '#E74C3C', '#C0392B', '#B71C1C', '#D32F2F', '#3498DB', '#9B59B6'].includes(randomColor);

                        return (
                            <motion.div
                                key={`${wIndex}-${index}`}
                                initial={{ opacity: 0, y: 10, rotate: 0 }}
                                animate={{ opacity: 1, y: 0, rotate: parseFloat(randomRotation) }}
                                transition={{ delay: (wIndex * 5 + index) * 0.05, duration: 0.4 }}
                                style={{
                                    background: randomColor,
                                    color: isDark ? '#FFF' : '#000',
                                    padding: isMobile ? '6px 10px' : '12px 18px',
                                    fontFamily: randomFont,
                                    fontSize: isMobile ? '1.75rem' : '3.5rem',
                                    fontWeight: 900,
                                    display: 'inline-block',
                                    boxShadow: '2px 4px 0px rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    userSelect: 'none',
                                    lineHeight: 1,
                                    transformOrigin: 'center',
                                    marginBottom: isMobile ? '10px' : '20px'
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
