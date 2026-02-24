import React from 'react';
import { motion } from 'framer-motion';

const InteractiveText = ({ text, style, className }) => {
    // Split text into characters, including spaces
    const characters = text.split("");

    return (
        <span className={className} style={{ ...style, display: 'inline-block' }}>
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === " " ? "pre" : "normal"
                    }}
                    whileHover={{
                        color: '#F7D031',
                        textShadow: '0 0 15px rgba(247, 208, 49, 0.8)',
                        scale: 1.1,
                        transition: { duration: 0.1 }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

export default InteractiveText;
