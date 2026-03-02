import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import InteractiveText from '../components/InteractiveText';
import '../Home.css';

const CATEGORIES = [
    { id: 'speakeasy', label: 'Speakeasies' },
    { id: 'techno', label: 'Techno' },
    { id: 'music', label: 'Music' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'workspaces', label: 'Workspaces' },
    { id: 'vintage', label: 'Vintage/Thrift' },
    { id: 'experiences', label: 'Experiences' }
];

const LocationCard = ({ location }) => {
    const [expanded, setExpanded] = useState(false);

    const handleDirections = (e) => {
        e.stopPropagation();
        const url = location.lat && location.lng
            ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + " " + location.city)}`;
        window.open(url, '_blank');
    };

    const handleInstagram = (e) => {
        e.stopPropagation();
        if (!location.instagram) return;
        const url = location.instagram.startsWith('http')
            ? location.instagram
            : `https://instagram.com/${location.instagram.replace('@', '')}`;
        window.open(url, '_blank');
    };

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            style={{
                border: '1px solid rgba(0,0,0,0.1)',
                background: '#FFF',
                padding: '20px',
                marginBottom: '16px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                        {location.name}
                    </h3>
                    {location.neighborhood && (
                        <span style={{ fontSize: '0.65rem', color: '#F7D031', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            {location.neighborhood}
                        </span>
                    )}
                </div>
                <span style={{ fontSize: '1.2rem', color: '#F7D031', fontWeight: 300 }}>
                    {expanded ? '—' : '+'}
                </span>
            </div>

            <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', color: 'rgba(26,26,26,0.8)' }}>
                {location.what_it_is}
            </p>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '20px' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {location.why_it_matters && (
                                <div>
                                    <h4 style={{ fontSize: '0.65rem', color: '#F7D031', letterSpacing: '0.1em', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Why It Matters</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(26,26,26,0.7)', margin: 0, lineHeight: 1.5 }}>{location.why_it_matters}</p>
                                </div>
                            )}

                            {(location.hours_text || location.address_text) && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                    {location.hours_text && (
                                        <div>
                                            <h4 style={{ fontSize: '0.65rem', color: '#F7D031', letterSpacing: '0.1em', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Hours</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'rgba(26,26,26,0.7)', margin: 0 }}>{location.hours_text}</p>
                                        </div>
                                    )}
                                    {location.address_text && (
                                        <div>
                                            <h4 style={{ fontSize: '0.65rem', color: '#F7D031', letterSpacing: '0.1em', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Address</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'rgba(26,26,26,0.7)', margin: 0 }}>{location.address_text}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    onClick={handleDirections}
                                    style={{
                                        flex: 2,
                                        background: '#1A1A1A',
                                        color: '#F7D031',
                                        border: 'none',
                                        padding: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.05em',
                                        cursor: 'pointer'
                                    }}
                                >
                                    [ GET DIRECTIONS ]
                                </button>
                                {location.instagram && (
                                    <button
                                        onClick={handleInstagram}
                                        style={{
                                            flex: 1,
                                            background: 'transparent',
                                            color: '#1A1A1A',
                                            border: '1px solid rgba(0,0,0,0.2)',
                                            padding: '12px',
                                            fontSize: '0.7rem',
                                            fontWeight: 800,
                                            letterSpacing: '0.05em',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        INSTAGRAM
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Directory({ members = [], onBack, onLogout }) {
    const { citySlug } = useParams();
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('speakeasy'); // default to first category

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            try {
                // Fetch locations for this city slug, ordered by rank/name
                let query = supabase
                    .from('locations')
                    .select('*')
                    .eq('city_slug', citySlug);

                if (activeCategory) {
                    // Because user might mix cases in the sheet, ilike is safer
                    query = query.ilike('category', `%${activeCategory}%`);
                }

                const { data, error } = await query.order('sort_rank', { ascending: true }).order('name', { ascending: true });

                if (error) throw error;
                setLocations(data || []);
            } catch (err) {
                console.error("Error fetching locations:", err);
            } finally {
                setLoading(false);
            }
        };

        if (citySlug) {
            fetchLocations();
        }
    }, [citySlug, activeCategory]);

    // Derived Display Name
    const displayCityName = citySlug ? citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace('-', ' ') : 'Directory';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
        >
            {/* SOHO STYLE TOP BAR */}
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
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '30px' }}>
                        <div className="sectionHeader" style={{ padding: 0, marginTop: 0 }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1A1A1A', lineHeight: 1, textTransform: 'capitalize' }}>
                                {displayCityName} House Guide.
                            </h2>
                        </div>
                        <p style={{ opacity: 0.4, fontSize: '0.7rem', letterSpacing: '0.15em', marginTop: '10px' }}>CURATED DIRECTORY</p>
                    </div>

                    {/* Horizontal Scroll Categories */}
                    <div className="directory-categories no-scrollbar" style={{
                        display: 'flex',
                        gap: '12px',
                        overflowX: 'auto',
                        paddingBottom: '20px',
                        marginBottom: '10px',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    background: activeCategory === cat.id ? '#1A1A1A' : 'transparent',
                                    color: activeCategory === cat.id ? '#F7D031' : '#1A1A1A',
                                    border: activeCategory === cat.id ? '1px solid #1A1A1A' : '1px solid rgba(0,0,0,0.2)',
                                    borderRadius: '30px',
                                    padding: '8px 16px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Locations List */}
                    <div style={{ flex: 1, paddingBottom: '60px' }}>
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.4 }}>
                                <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>ACCESSING RECORDS...</span>
                            </div>
                        ) : locations.length > 0 ? (
                            locations.map(loc => (
                                <LocationCard key={loc.id} location={loc} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.4 }}>
                                <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>NO LOCATIONS UNLOCKED YET.</span>
                            </div>
                        )}
                    </div>

                </motion.div>
            </section>

            <footer className="footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
                <div style={{ opacity: 0.4, fontSize: '0.7rem', color: '#1A1A1A' }}>the imrsv project / directory</div>
                <div style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '0.7rem' }}>PROTOCOL: VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
}
