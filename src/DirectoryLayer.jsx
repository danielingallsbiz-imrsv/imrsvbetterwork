import React, { useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Globe, Loader2, ChevronRight, User, Camera, Shield, Star, Activity, Plus, Search, Trash2 } from 'lucide-react';
import { supabase } from './lib/supabase';
import './Home.css';

const DirectoryLayer = ({ onBack, onLogout }) => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProfile, setSelectedProfile] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .order('full_name', { ascending: true });

                if (error) throw error;
                setProfiles(data || []);
            } catch (err) {
                console.error("Error fetching profiles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const filteredProfiles = profiles.filter(p => {
        const query = searchQuery.toLowerCase();
        return (
            (p.full_name && p.full_name.toLowerCase().includes(query)) ||
            (p.profession && p.profession.toLowerCase().includes(query))
        );
    });

    if (loading) {
        return (
            <div className="portal-theme" style={{ display: 'grid', placeItems: 'center', background: '#F7F5EA' }}>
                <Loader2 className="loading-ring" size={40} color="#C5A059" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="portal-theme tab-layout"
        >
            <div className="premium-container">
                {/* TOP BAR */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                    <div style={{ cursor: 'pointer' }} onClick={onBack}>
                        <img src="/logo.svg" alt="IMRSV" style={{ height: '14px', width: 'auto', filter: 'brightness(0)' }} />
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', opacity: 0.4 }}>MEMBER DIRECTORY</div>
                    <button onClick={onLogout} style={{ background: 'none', border: 'none', fontSize: '10px', fontWeight: 800, cursor: 'pointer', opacity: 0.6 }}>LOG OUT</button>
                </div>

                <div style={{ marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>The Directory.</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '12px' }}>{profiles.length} Active Collective Members</p>

                    <div style={{ marginTop: '40px', position: 'relative', maxWidth: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', opacity: 0.3 }} />
                        <input
                            type="text"
                            placeholder="Find a member..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="premium-input"
                            style={{ paddingLeft: '48px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {filteredProfiles.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="premium-card"
                            onClick={() => setSelectedProfile(p)}
                            style={{ cursor: 'pointer', padding: '24px' }}
                        >
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <img
                                    src={p.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"}
                                    style={{ width: '64px', height: '64px', borderRadius: '32px', objectFit: 'cover' }}
                                    alt={p.full_name}
                                />
                                <div style={{ minWidth: 0 }}>
                                    <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>{p.full_name || 'Anonymous'}</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{p.profession || 'Explorer'}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* MEMBER DETAIL OVERLAY */}
            <AnimatePresence>
                {selectedProfile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(247, 245, 234, 0.95)', backdropFilter: 'blur(10px)', zIndex: 9000, overflowY: 'auto' }}
                    >
                        <div className="premium-container" style={{ paddingTop: '80px' }}>
                            <button
                                onClick={() => setSelectedProfile(null)}
                                style={{ position: 'fixed', top: '40px', right: '40px', background: '#FFF', border: '1px solid var(--line)', borderRadius: '50%', padding: '12px', cursor: 'pointer', boxShadow: 'var(--shadow)' }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
                                <img
                                    src={selectedProfile.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"}
                                    style={{ width: '160px', height: '160px', borderRadius: '80px', objectFit: 'cover', border: '4px solid #FFF', boxShadow: 'var(--shadow)', marginBottom: '32px' }}
                                    alt=""
                                />
                                <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--ink)' }}>{selectedProfile.full_name}</h2>
                                <p style={{ fontSize: '16px', color: 'var(--gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px', marginTop: '8px' }}>{selectedProfile.profession}</p>
                                {selectedProfile.bio && (
                                    <div style={{ maxWidth: '600px', margin: '40px auto' }}>
                                        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--ink)', opacity: 0.8 }}>{selectedProfile.bio}</p>
                                    </div>
                                )}
                            </div>

                            {/* PHOTO GALLERY */}
                            {selectedProfile.photo_urls && selectedProfile.photo_urls.some(u => u) && (
                                <div style={{ marginBottom: '100px' }}>
                                    <label className="label-caps" style={{ textAlign: 'center', marginBottom: '32px' }}>Perspective & Drops</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                                        {selectedProfile.photo_urls.filter(u => u).map((url, i) => (
                                            <div key={i} style={{ aspectRatio: '4/5', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                                                <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="footer" style={{ borderTop: '1px solid rgba(0, 0, 0, 0.05)', marginTop: 'auto', padding: '20px 0' }}>
                <div style={{ opacity: 0.4, fontSize: '0.7rem', color: '#1A1A1A' }}>the imrsv project / member directory</div>
                <div style={{ color: 'rgba(26, 26, 26, 0.4)', fontSize: '0.7rem' }}>PROTOCOL: VERSION 2.0.4</div>
            </footer>
        </motion.div>
    );
};

export default DirectoryLayer;
