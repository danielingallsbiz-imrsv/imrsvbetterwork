import React from 'react';
import { motion } from 'framer-motion';

const ClippingText = ({ text }) => {
    const letters = text.split('');

    const colors = [
        '#E74C3C', // Red
        '#3498DB', // Blue
        '#F1C40F', // Yellow
        '#2ECC71', // Green
        '#9B59B6', // Purple
        '#ECF0F1', // White/Cream
        '#34495E'  // Dark Blue/Grey
    ];

    const fonts = [
        'serif',
        'sans-serif',
        'monospace',
        '"Metal", serif',
        '"Inter", sans-serif'
    ];

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {letters.map((char, index) => {
                if (char === ' ') return <div key={index} style={{ width: '20px' }} />;

                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
                const randomRotation = (Math.random() * 10 - 5).toFixed(2);
                const isDark = ['#34495E', '#E74C3C', '#3498DB', '#9B59B6'].includes(randomColor);

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10, rotate: 0 }}
                        animate={{ opacity: 1, y: 0, rotate: parseFloat(randomRotation) }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        style={{
                            background: randomColor,
                            color: isDark ? '#FFF' : '#000',
                            padding: '8px 12px',
                            fontFamily: randomFont,
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            display: 'inline-block',
                            boxShadow: '2px 3px 0px rgba(0,0,0,0.2)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            userSelect: 'none',
                            lineHeight: 1,
                            transformOrigin: 'center'
                        }}
                    >
                        {char.toUpperCase()}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ClippingText;
