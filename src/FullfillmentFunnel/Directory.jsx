import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import '../Home.css';

const CATEGORIES = [
    { id: 'speakeasy', label: 'Speakeasies' },
    { id: 'techno', label: 'Techno' },
    { id: 'music', label: 'Music' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'workspaces', label: 'Workspaces' },
    { id: 'vintage', label: 'Vintage/Thrift' },
    { id: 'experiences', label: 'Experiences' },
];

const CITIES = [
    { slug: 'medellin', label: 'Medellín' },
];

const DESCRIPTION_OVERRIDES = {
    'La Cruda': 'Industrial exterior. Neon-forward cocktail lab inside.',
    'Mombasa': 'Password-entry cocktail room with afro-house energy.',
    'Victoria Regia': 'Refined hidden-door bar focused on elevated mixology.',
    'La Oculta': "Provenza's unmarked-door speakeasy for curated nights.",
};

// Fallback photos by category
const CATEGORY_FALLBACKS = {
    speakeasy: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    techno: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    music: 'https://images.unsplash.com/photo-1571266752414-d6e4a0f04839?w=800&q=80',
    restaurants: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    workspaces: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    vintage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    experiences: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
};

const LocationCard = ({ location }) => {
    const [expanded, setExpanded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const handleDirections = (e) => {
        e.stopPropagation();
        const url = location.lat && location.lng
            ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ' ' + location.city)}`;
        window.open(url, '_blank');
    };

    const neighborhood = location.neighborhood && location.neighborhood.toLowerCase() !== 'unknown'
        ? location.neighborhood
        : null;

    const description = DESCRIPTION_OVERRIDES[location.name] || location.what_it_is;

    // Find the best photo URL
    const photoUrl = location.photo_url
        || CATEGORY_FALLBACKS[location.category?.toLowerCase()]
        || CATEGORY_FALLBACKS.speakeasy;

    return (
        <motion.div
            layout
            onClick={() => setExpanded(!expanded)}
            className="premium-card"
            style={{
                background: '#FFF',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '20px',
                cursor: 'pointer',
                border: '1px solid var(--line)',
                padding: 0
            }}
        >
            {/* PHOTO */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#1A1A1A', overflow: 'hidden' }}>
                <img
                    src={photoUrl}
                    alt={location.name}
                    onLoad={() => setImgLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        opacity: imgLoaded ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        filter: 'brightness(0.9) contrast(1.05)',
                    }}
                />
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '20px', right: 0 }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        color: '#FFF',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                    }}>
                        {location.name}
                    </h3>
                    {neighborhood && (
                        <span className="label-caps" style={{ color: '#F7D031', marginTop: '6px' }}>
                            {neighborhood}
                        </span>
                    )}
                </div>

                <motion.div
                    animate={{ rotate: expanded ? 45 : 0 }}
                    style={{
                        position: 'absolute', top: '16px', right: '16px',
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#FFF',
                        fontSize: '1.2rem',
                        fontWeight: 300,
                    }}
                >
                    +
                </motion.div>
            </div>

            <div style={{ padding: '20px' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'var(--ink)',
                    lineHeight: 1.6,
                    opacity: 0.8
                }}>
                    {description}
                </p>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            borderTop: '1px solid var(--line)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {location.hours_text && location.hours_text !== 'TBD' && (
                                    <div>
                                        <label className="label-caps" style={{ color: 'var(--muted)', marginBottom: '4px' }}>Hours</label>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--ink)', margin: 0 }}>{location.hours_text}</p>
                                    </div>
                                )}
                                {location.address_text && location.address_text !== 'TBD' && (
                                    <div>
                                        <label className="label-caps" style={{ color: 'var(--muted)', marginBottom: '4px' }}>Address</label>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--ink)', margin: 0 }}>{location.address_text}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleDirections}
                                style={{
                                    alignSelf: 'stretch',
                                    background: 'var(--ink)',
                                    color: '#FFF',
                                    border: 'none',
                                    padding: '16px',
                                    fontSize: '10px',
                                    fontWeight: 800,
                                    letterSpacing: '0.14em',
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    textTransform: 'uppercase'
                                }}
                            >
                                [ GET DIRECTIONS ]
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Directory({ members = [], onBack, onLogout }) {
    const { citySlug } = useParams();
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('speakeasy');
    const [showCitySwitcher, setShowCitySwitcher] = useState(false);
    const cityDropdownRef = useRef(null);

    const currentCity = CITIES.find(c => c.slug === citySlug) || CITIES[0];

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            try {
                let query = supabase
                    .from('locations')
                    .select('*')
                    .eq('city_slug', citySlug || currentCity.slug);

                if (activeCategory) {
                    query = query.ilike('category', `%${activeCategory}%`);
                }

                const { data, error } = await query
                    .order('sort_rank', { ascending: true })
                    .order('name', { ascending: true });

                if (error) throw error;
                setLocations(data || []);
            } catch (err) {
                console.error('Error fetching locations:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, [citySlug, activeCategory]);

    useEffect(() => {
        const handler = (e) => {
            if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target)) {
                setShowCitySwitcher(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="portal-theme">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="home-container"
                style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--ink)', display: 'flex', flexDirection: 'column' }}
            >
                {/* TOP BAR */}
                <div className="topBar">
                    <div className="topBarInner">
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/member')}>
                            <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                        </div>
                        <div className="brandMark">SUNDAY COLLECTION</div>
                        <div style={{ justifySelf: 'end' }}>
                            <motion.span
                                onClick={onLogout}
                                whileHover={{ opacity: 1 }}
                                style={{ cursor: 'pointer', color: 'var(--ink)', fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}
                            >
                                LOG OUT
                            </motion.span>
                        </div>
                    </div>
                </div>

                <section className="pageWrap" style={{ paddingTop: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <motion.div
                        className="premium-container"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >

                        {/* HEADER */}
                        <div style={{ marginBottom: '40px' }}>
                            <div ref={cityDropdownRef} style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
                                <button
                                    onClick={() => setShowCitySwitcher(s => !s)}
                                    style={{
                                        background: 'none', border: 'none', padding: 0,
                                        cursor: CITIES.length > 1 ? 'pointer' : 'default',
                                        display: 'flex', alignItems: 'center', gap: '5px',
                                        fontSize: '10px', letterSpacing: '0.18em', fontWeight: 800,
                                        color: 'var(--muted)', textTransform: 'uppercase',
                                    }}
                                >
                                    {currentCity.label}
                                    {CITIES.length > 1 && <span style={{ fontSize: '0.55rem' }}>▾</span>}
                                </button>
                                <AnimatePresence>
                                    {showCitySwitcher && CITIES.length > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            style={{
                                                position: 'absolute', top: '100%', left: 0,
                                                background: '#FFF', border: '1px solid var(--line)',
                                                borderRadius: '12px', padding: '8px 0', minWidth: '160px',
                                                zIndex: 100, boxShadow: 'var(--shadow)',
                                            }}
                                        >
                                            {CITIES.map(city => (
                                                <div
                                                    key={city.slug}
                                                    onClick={() => { navigate(`/directory/${city.slug}`); setShowCitySwitcher(false); }}
                                                    style={{
                                                        padding: '12px 16px', fontSize: '12px', fontWeight: 800,
                                                        cursor: 'pointer', color: city.slug === citySlug ? '#F7D031' : 'var(--ink)',
                                                        letterSpacing: '0.05em',
                                                        textTransform: 'uppercase'
                                                    }}
                                                >
                                                    {city.label}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 12px 0', letterSpacing: '-0.04em', color: 'var(--ink)', lineHeight: 0.9 }}>
                                {currentCity.label} <br />House Guide.
                            </h2>
                            <p style={{ margin: 0, fontSize: '11px', letterSpacing: '0.12em', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                                A curated, living directory for the collective.
                            </p>
                        </div>

                        {/* CATEGORY TABS */}
                        <div
                            className="no-scrollbar"
                            style={{
                                display: 'flex', gap: '12px', overflowX: 'auto',
                                paddingBottom: '24px', marginBottom: '12px',
                                WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory',
                            }}
                        >
                            {CATEGORIES.map(cat => {
                                const isActive = activeCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        style={{
                                            background: isActive ? 'var(--ink)' : 'rgba(255,255,255,0.5)',
                                            color: isActive ? '#F7D031' : 'var(--ink)',
                                            border: isActive ? '1px solid var(--ink)' : '1px solid var(--line)',
                                            borderRadius: '30px',
                                            padding: '10px 20px',
                                            fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em',
                                            whiteSpace: 'nowrap', cursor: 'pointer',
                                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                            scrollSnapAlign: 'start', flexShrink: 0,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* LOCATIONS LIST */}
                        <div style={{ flex: 1, paddingBottom: '80px' }}>
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                                    <span className="label-caps" style={{ color: 'var(--muted)' }}>Accessing Protocols...</span>
                                </div>
                            ) : locations.length > 0 ? (
                                locations.map(loc => (
                                    <LocationCard key={loc.id} location={loc} />
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.3 }}>
                                    <span className="label-caps">Nothing found in this sector.</span>
                                </div>
                            )}
                        </div>

                    </motion.div>
                </section>

                <footer className="footer" style={{ borderTop: '1px solid var(--line)', background: 'transparent' }}>
                    <div style={{ opacity: 0.4, fontSize: '10px', color: 'var(--ink)', fontWeight: 800, letterSpacing: '0.1em' }}>THE IMRSV PROJECT / DIRECTORY</div>
                    <div style={{ color: 'var(--muted)', fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em' }}>VERSION 2.0.4</div>
                </footer>
            </motion.div>
        </div>
    );
}
