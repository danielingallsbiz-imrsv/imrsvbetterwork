import React, { useEffect, useState, useRef } from 'react';

const PacmanGame = () => {
    const [dots, setDots] = useState([]);
    const [pacman, setPacman] = useState({ x: 100, y: 100, angle: 0 });
    const containerRef = useRef(null);
    const requestRef = useRef();
    const pacmanPos = useRef({ x: 100, y: 100, angle: 0 });
    const dotsRef = useRef([]);

    // Initialize dots in a line
    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const lineY = rect.height / 2;
        const initialDots = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: (rect.width / 15) * i + (rect.width / 30),
            y: lineY,
        }));
        setDots(initialDots);
        dotsRef.current = initialDots;
        pacmanPos.current = { x: -50, y: lineY, angle: 0 };
    }, []);

    const animate = (time) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        let { x, y, angle } = pacmanPos.current;
        const speed = 2;
        const lineY = rect.height / 2;

        // Move strictly horizontal
        x += speed;
        angle = 0;

        // Wrap around
        if (x > rect.width + 50) {
            x = -50;
            // Respawn dots when wrapping
            const newDots = Array.from({ length: 15 }, (_, i) => ({
                id: Date.now() + i,
                x: (rect.width / 15) * i + (rect.width / 30),
                y: lineY,
            }));
            dotsRef.current = newDots;
            setDots(newDots);
        }

        // Check collision with dots on path
        dotsRef.current = dotsRef.current.filter(dot => {
            const dist = Math.abs(dot.x - x);
            return dist > 15;
        });
        setDots([...dotsRef.current]);

        pacmanPos.current = { x, y: lineY, angle };
        setPacman({ x, y: lineY, angle });

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div ref={containerRef} className="pacman-container">
            {dots.map(dot => (
                <div
                    key={dot.id}
                    className="pacman-dot"
                    style={{ left: dot.x, top: dot.y }}
                />
            ))}
            <div
                className="pacman"
                style={{
                    left: pacman.x,
                    top: pacman.y,
                    transform: `translate(-50%, -50%) rotate(${pacman.angle}deg)`
                }}
            />
        </div>
    );
};

export default PacmanGame;
