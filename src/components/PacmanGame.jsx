import React, { useEffect, useState, useRef } from 'react';

const PacmanGame = () => {
    const [dots, setDots] = useState([]);
    const [pacman, setPacman] = useState({ x: 100, y: 100, angle: 0 });
    const containerRef = useRef(null);
    const requestRef = useRef();
    const pacmanPos = useRef({ x: 100, y: 100, angle: 0 });
    const dotsRef = useRef([]);

    // Initialize dots
    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const initialDots = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * (rect.width - 40) + 20,
            y: Math.random() * (rect.height - 40) + 20,
        }));
        setDots(initialDots);
        dotsRef.current = initialDots;
    }, []);

    const animate = (time) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        let { x, y, angle } = pacmanPos.current;
        const speed = 2.5;

        if (dotsRef.current.length > 0) {
            // Find nearest dot
            let nearestDot = dotsRef.current[0];
            let minDist = Math.hypot(nearestDot.x - x, nearestDot.y - y);

            dotsRef.current.forEach(dot => {
                const dist = Math.hypot(dot.x - x, dot.y - y);
                if (dist < minDist) {
                    minDist = dist;
                    nearestDot = dot;
                }
            });

            // Move towards dot (strictly orthogonal - commit to one axis)
            const dx = nearestDot.x - x;
            const dy = nearestDot.y - y;

            // If we're already aligned on X, move Y. 
            // Otherwise, get to the correct X first.
            if (Math.abs(dx) > speed) {
                x += dx > 0 ? speed : -speed;
                angle = dx > 0 ? 0 : 180;
            } else if (Math.abs(dy) > speed) {
                y += dy > 0 ? speed : -speed;
                angle = dy > 0 ? 90 : 270;
            } else {
                // We are very close to the dot, just snap to it to eat it
                x = nearestDot.x;
                y = nearestDot.y;
            }

            // Check collision
            if (minDist < 15) {
                dotsRef.current = dotsRef.current.filter(d => d.id !== nearestDot.id);
                setDots([...dotsRef.current]);
            }
        } else {
            // Respawn dots
            const newDots = Array.from({ length: 25 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * (rect.width - 40) + 20,
                y: Math.random() * (rect.height - 40) + 20,
            }));
            dotsRef.current = newDots;
            setDots(newDots);
        }

        pacmanPos.current = { x, y, angle };
        setPacman({ x, y, angle });

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
