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
            style={{
                background: '#FFF',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '16px',
                cursor: 'pointer',
                boxShadow: expanded
                    ? '0 12px 40px rgba(0,0,0,0.14)'
                    : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.25s ease',
                border: '1px solid rgba(0,0,0,0.06)',
            }}
        >
            {/* PHOTO — Airbnb inspired with IMRSV dark editorial twist */}
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
                        filter: 'brightness(0.82) contrast(1.08)',
                    }}
                />
                {/* Gold grain overlay for brand texture */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%)',
                    pointerEvents: 'none',
                }} />

                {/* Name + neighborhood overlay — bottom left */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px', right: 0 }}>
                    <h3 style={{
                        margin: 0,
                        fontSize: '1.15rem',
                        fontWeight: 900,
                        color: '#FFF',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1,
                        textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }}>
                        {location.name}
                    </h3>
                    {neighborhood && (
                        <span style={{
                            fontSize: '11px',
                            color: '#F7D031',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            opacity: 0.9,
                            marginTop: '3px',
                            display: 'block',
                        }}>
                            {neighborhood}
                        </span>
                    )}
                </div>

                {/* Expand indicator — top right */}
                <motion.div
                    animate={{ rotate: expanded ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{
                        position: 'absolute', top: '12px', right: '12px',
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#F7D031',
                        fontSize: '1.1rem',
                        fontWeight: 300,
                        lineHeight: 1,
                    }}
                >
                    +
                </motion.div>

                {/* Price hint badge */}
                {location.price_hint && (
                    <div style={{
                        position: 'absolute', top: '12px', left: '12px',
                        background: 'rgba(0,0,0,0.45)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '20px',
                        padding: '3px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#F7D031',
                        letterSpacing: '0.05em',
                    }}>
                        {location.price_hint}
                    </div>
                )}
            </div>

            {/* DESCRIPTION BAR below photo */}
            <div style={{ padding: '14px 16px 16px' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.83rem',
                    color: 'rgba(26,26,26,0.65)',
                    lineHeight: 1.55,
                }}>
                    {description}
                </p>
            </div>

            {/* EXPANDED DETAILS */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{
                            borderTop: '1px solid rgba(0,0,0,0.06)',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '14px',
                        }}>
                            {/* Hours + Address */}
                            {((location.hours_text && location.hours_text !== 'TBD') ||
                                (location.address_text && location.address_text !== 'TBD')) && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        {location.hours_text && location.hours_text !== 'TBD' && (
                                            <div>
                                                <h4 style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.12em', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: 700 }}>Hours</h4>
                                                <p style={{ fontSize: '0.8rem', color: 'rgba(26,26,26,0.65)', margin: 0, lineHeight: 1.5 }}>{location.hours_text}</p>
                                            </div>
                                        )}
                                        {location.address_text && location.address_text !== 'TBD' && (
                                            <div>
                                                <h4 style={{ fontSize: '0.6rem', color: '#F7D031', letterSpacing: '0.12em', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: 700 }}>Address</h4>
                                                <p style={{ fontSize: '0.8rem', color: 'rgba(26,26,26,0.65)', margin: 0, lineHeight: 1.5 }}>{location.address_text}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                            {/* Directions button */}
                            <button
                                onClick={handleDirections}
                                style={{
                                    alignSelf: 'flex-start',
                                    background: '#1A1A1A',
                                    color: '#F7D031',
                                    border: 'none',
                                    padding: '10px 20px',
                                    fontSize: '0.65rem',
                                    fontWeight: 800,
                                    letterSpacing: '0.1em',
                                    cursor: 'pointer',
                                    borderRadius: '24px',
                                    textTransform: 'uppercase',
                                    transition: 'background 0.18s',
                                }}
                            >
                                Get Directions
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
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
                            style={{ cursor: 'pointer', color: '#1A1A1A', fontWeight: 800, fontSize: '10px', letterSpacing: '0.1em', opacity: 0.6, textTransform: 'uppercase' }}
                        >
                            LOG OUT
                        </motion.span>
                    </div>
                </div>
            </div>

            <section className="pageWrap" style={{ paddingTop: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                    {/* HEADER */}
                    <div style={{ marginBottom: '24px' }}>
                        {/* City Switcher */}
                        <div ref={cityDropdownRef} style={{ position: 'relative', display: 'inline-block', marginBottom: '14px' }}>
                            <button
                                onClick={() => setShowCitySwitcher(s => !s)}
                                style={{
                                    background: 'none', border: 'none', padding: 0,
                                    cursor: CITIES.length > 1 ? 'pointer' : 'default',
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    fontSize: '0.6rem', letterSpacing: '0.18em', fontWeight: 700,
                                    color: 'rgba(26,26,26,0.45)', textTransform: 'uppercase',
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
                                        transition={{ duration: 0.15 }}
                                        style={{
                                            position: 'absolute', top: '100%', left: 0,
                                            background: '#FFF', border: '1px solid rgba(0,0,0,0.1)',
                                            borderRadius: '6px', padding: '8px 0', minWidth: '140px',
                                            zIndex: 100, boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        {CITIES.map(city => (
                                            <div
                                                key={city.slug}
                                                onClick={() => { navigate(`/directory/${city.slug}`); setShowCitySwitcher(false); }}
                                                style={{
                                                    padding: '10px 16px', fontSize: '0.75rem', fontWeight: 700,
                                                    cursor: 'pointer', color: city.slug === citySlug ? '#F7D031' : '#1A1A1A',
                                                    letterSpacing: '0.05em',
                                                }}
                                            >
                                                {city.label}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1, textTransform: 'capitalize' }}>
                            {currentCity.label} House Guide.
                        </h2>
                        <p style={{ margin: 0, fontSize: '0.65rem', letterSpacing: '0.15em', opacity: 0.35, textTransform: 'uppercase' }}>
                            A curated, living directory for members only.
                        </p>
                    </div>

                    {/* CATEGORY TABS */}
                    <div
                        className="no-scrollbar"
                        style={{
                            display: 'flex', gap: '8px', overflowX: 'auto',
                            paddingBottom: '18px', marginBottom: '8px',
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
                                        background: isActive ? '#1A1A1A' : 'transparent',
                                        color: isActive ? '#F7D031' : '#1A1A1A',
                                        border: isActive ? '1px solid #1A1A1A' : '1px solid rgba(0,0,0,0.15)',
                                        borderRadius: '30px',
                                        padding: '6px 14px',
                                        fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em',
                                        whiteSpace: 'nowrap', cursor: 'pointer',
                                        transition: 'all 0.18s ease',
                                        opacity: isActive ? 1 : 0.85,
                                        boxShadow: isActive ? 'inset 0 1px 3px rgba(0,0,0,0.3)' : 'none',
                                        scrollSnapAlign: 'start', flexShrink: 0,
                                    }}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* LOCATIONS LIST */}
                    <div style={{ flex: 1, paddingBottom: '60px' }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.3 }}>
                                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Accessing records...</span>
                            </div>
                        ) : locations.length > 0 ? (
                            locations.map(loc => (
                                <LocationCard key={loc.id} location={loc} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.3 }}>
                                <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Nothing here yet.</span>
                            </div>
                        )}
                    </div>

                </motion.div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ opacity: 0.3, fontSize: '0.65rem', color: '#1A1A1A', letterSpacing: '0.05em' }}>the imrsv project / directory</div>
                <div style={{ color: 'rgba(26,26,26,0.3)', fontSize: '0.65rem', letterSpacing: '0.05em' }}>VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
}
