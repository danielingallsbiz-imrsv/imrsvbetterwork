import React from 'react';
import { motion } from 'framer-motion';

const InteractiveText = ({ text, style, className }) => {
    // Split text into words first to maintain word grouping on mobile
    const words = text.split(" ");

    return (
        <span className={className} style={{ ...style, display: 'inline-block' }}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            style={{
                                display: 'inline-block',
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
                    {wordIndex < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
                </span>
            ))}
        </span>
    );
};

export default InteractiveText;
