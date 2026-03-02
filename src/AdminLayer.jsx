import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from './lib/supabase';
import { sendCampaignEmail } from './lib/email';

const AdminLayer = ({ onBack, applications, onDelete, onApprove, onDeny, dbStatus }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [editAmounts, setEditAmounts] = useState({}); // { [appId]: string }

    // Campaign View State
    const [currentView, setCurrentView] = useState('vetting'); // 'vetting' | 'campaigns'
    const [subscribers, setSubscribers] = useState([]);
    const [campaignSubject, setCampaignSubject] = useState('');
    const [campaignBody, setCampaignBody] = useState('');
    const [campaignFilter, setCampaignFilter] = useState('all'); // 'all' | 'journal' | 'app'
    const [campaignStatus, setCampaignStatus] = useState('idle');

    useEffect(() => {
        if (isAuthenticated && currentView === 'campaigns') {
            fetchSubscribers();
        }
    }, [isAuthenticated, currentView]);

    const fetchSubscribers = async () => {
        try {
            const { data, error } = await supabase.from('subscribers').select('*');
            if (!error && data) {
                setSubscribers(data);
            }
        } catch (err) {
            console.error("Failed to fetch subscribers:", err);
        }
    };

    const handleBroadcast = async () => {
        if (!campaignSubject || !campaignBody) return alert('Campaign missing subject or body.');

        const targets = subscribers.filter(sub => {
            if (campaignFilter === 'all') return true;
            return sub.source === campaignFilter;
        });

        if (targets.length === 0) return alert('No subscribers match this filter.');

        if (!window.confirm(`BROADCAST WARNING: Send this campaign to ${targets.length} subscriber(s)? This cannot be undone.`)) return;

        setCampaignStatus('sending');
        const emails = targets.map(t => t.email);

        try {
            const res = await sendCampaignEmail(emails, campaignSubject, campaignBody);
            if (res.success) {
                alert(`SUCCESS: Broadcast sent to ${emails.length} recipients.`);
                setCampaignSubject('');
                setCampaignBody('');
            } else {
                alert(`FAILED to broadcast: ${res.error}`);
            }
        } catch (err) {
            alert('CRITICAL ERROR during broadcast.');
        } finally {
            setCampaignStatus('idle');
        }
    };

    const handleSetContribution = async (app) => {
        const amount = parseFloat(editAmounts[app.id]);
        if (isNaN(amount) || amount < 0) return;
        await supabase.from('applications')
            .update({ contribution_amount: amount, credit_balance: amount })
            .eq('id', app.id);
        setEditAmounts(prev => ({ ...prev, [app.id]: '' }));
        alert(`Contribution set to $${amount.toFixed(2)} for ${app.name}`);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'imrsv2026') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('ACCESS DENIED');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="home-container"
                style={{ backgroundColor: '#111', color: '#F7D031', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            >
                <div style={{ position: 'absolute', top: 40, left: 40, cursor: 'pointer', fontFamily: 'monospace', opacity: 0.5, letterSpacing: '0.1em' }} onClick={onBack}>
                    [ ABORT TERMINAL ]
                </div>

                <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0, fontSize: '1rem', opacity: 0.8 }}>Admin Gateway</h2>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            placeholder="Enter Passkey_"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(247, 208, 49, 0.3)',
                                padding: '15px 20px',
                                color: '#F7D031',
                                fontFamily: 'monospace',
                                fontSize: '1.2rem',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" style={{
                            background: '#F7D031',
                            color: '#111',
                            border: 'none',
                            padding: '15px',
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            Authenticate
                        </button>
                        {error && (
                            <div style={{ color: '#FF453A', fontFamily: 'monospace', marginTop: '10px' }}>
                                ERR: {error}
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#111', color: '#F7F5EA', minHeight: '100vh' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">imrsv project</span>
                </div>
                <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        fontSize: '0.6rem',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: dbStatus === 'connected' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                        color: dbStatus === 'connected' ? '#00FF00' : '#FF453A',
                        border: `1px solid ${dbStatus === 'connected' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'}`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {dbStatus === 'connected' ? '● CLOUD SYNC ACTIVE' : '○ OFFLINE (LOCAL ONLY)'}
                    </div>
                </div>
            </nav>

            {/* Dashboard Toggle Nav */}
            <div style={{ position: 'fixed', top: '70px', left: 0, width: '100%', zIndex: 99, display: 'flex', justifyContent: 'center', background: 'rgba(17,17,17,0.8)', padding: '15px 0', borderBottom: '1px solid rgba(247,245,234,0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '4px' }}>
                    <button
                        onClick={() => setCurrentView('vetting')}
                        style={{ padding: '8px 24px', background: currentView === 'vetting' ? '#F7D031' : 'transparent', color: currentView === 'vetting' ? '#111' : '#F7F5EA', border: 'none', borderRadius: '4px', fontFamily: '"Outfit", sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                        Vetting Queue
                    </button>
                    <button
                        onClick={() => setCurrentView('campaigns')}
                        style={{ padding: '8px 24px', background: currentView === 'campaigns' ? '#F7D031' : 'transparent', color: currentView === 'campaigns' ? '#111' : '#F7F5EA', border: 'none', borderRadius: '4px', fontFamily: '"Outfit", sans-serif', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                        Campaigns
                    </button>
                </div>
            </div>

            <section className="section" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
                <AnimatePresence mode="wait">
                    {currentView === 'vetting' ? (
                        <motion.div
                            key="vetting"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>HUB TRANSMISSIONS / VETTING QUEUE</span>
                                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px', color: '#F7F5EA' }}>
                                        THE QUEUE.
                                    </h1>
                                </div>
                                <button
                                    onClick={() => {
                                        const headers = ["Name", "Email", "Status", "Hub", "Occupation", "Social", "Date"];
                                        const rows = applications.map(app => [
                                            app.name,
                                            app.email,
                                            app.status || 'pending',
                                            app.hub,
                                            app.occupation,
                                            app.social,
                                            app.created_at || app.date
                                        ]);
                                        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
                                        const blob = new Blob([csvContent], { type: 'text/csv' });
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.setAttribute('hidden', '');
                                        a.setAttribute('href', url);
                                        a.setAttribute('download', 'imrsv-applications.csv');
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                    }}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #F7D031',
                                        color: '#F7D031',
                                        padding: '10px 20px',
                                        fontSize: '0.8rem',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        letterSpacing: '0.1em',
                                        marginBottom: '10px'
                                    }}
                                >
                                    Export to CSV
                                </button>
                            </div>

                            <div style={{ marginTop: '60px', borderTop: '1px solid rgba(247, 245, 234, 0.1)', paddingTop: '40px' }}>
                                {(!applications || applications.length === 0) ? (
                                    <div style={{ padding: '100px 0', textAlign: 'center', opacity: 0.3 }}>
                                        <p>No active transmissions found in the queue.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {applications.map((app) => (
                                            <motion.div
                                                key={app.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                style={{
                                                    padding: '40px',
                                                    border: '1px solid rgba(247, 245, 234, 0.05)',
                                                    background: 'rgba(255, 255, 255, 0.02)',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.7rem', color: '#F7D031', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '10px' }}>Primary Hub: {app.hub}</span>
                                                        <h4 style={{ fontSize: '2rem', color: '#F7F5EA', margin: 0, fontFamily: '"Outfit", sans-serif' }}>{app.name}</h4>
                                                        <span style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '5px', display: 'block' }}>{app.social}</span>
                                                        <span style={{ fontSize: '0.8rem', color: '#F7D031', marginTop: '5px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{app.occupation}{app.profession ? ` · ${app.profession}` : ''}</span>
                                                        {app.bio && <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '10px', lineHeight: 1.6, maxWidth: '400px', fontStyle: 'italic' }}>"{app.bio}"</p>}
                                                        {app.photos?.filter(p => p).length > 0 && (
                                                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                                                {app.photos.filter(p => p).map((url, i) => (
                                                                    <img key={i} src={url} alt={`Photo ${i + 1}`} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }} onError={e => e.target.style.display = 'none'} />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                                                        <span style={{ fontSize: '0.8rem', color: 'rgba(247, 245, 234, 0.4)' }}>
                                                            {app.created_at ? new Date(app.created_at).toLocaleString() : app.date}
                                                        </span>
                                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                            {(!app.status || app.status === 'pending') && (
                                                                <>
                                                                    <button
                                                                        onClick={async () => {
                                                                            await supabase.from('applications').update({ joined_date: new Date().toISOString().split('T')[0] }).eq('id', app.id);
                                                                            onApprove(app.id);
                                                                        }}
                                                                        style={{
                                                                            background: 'rgba(0, 255, 0, 0.1)',
                                                                            border: '1px solid rgba(0, 255, 0, 0.4)',
                                                                            color: '#00FF00',
                                                                            padding: '6px 12px',
                                                                            fontSize: '0.7rem',
                                                                            borderRadius: '4px',
                                                                            textTransform: 'uppercase',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => onDeny(app.id)}
                                                                        style={{
                                                                            background: 'rgba(255, 165, 0, 0.1)',
                                                                            border: '1px solid rgba(255, 165, 0, 0.4)',
                                                                            color: '#FFA500',
                                                                            padding: '6px 12px',
                                                                            fontSize: '0.7rem',
                                                                            borderRadius: '4px',
                                                                            textTransform: 'uppercase',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease'
                                                                        }}
                                                                    >
                                                                        Deny
                                                                    </button>
                                                                </>
                                                            )}
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm("Are you sure you want to delete this transmission permanently?")) {
                                                                        onDelete(app.id);
                                                                    }
                                                                }}
                                                                style={{
                                                                    background: 'transparent',
                                                                    border: '1px solid rgba(255, 69, 58, 0.4)',
                                                                    color: 'rgba(255, 69, 58, 0.8)',
                                                                    padding: '6px 12px',
                                                                    fontSize: '0.7rem',
                                                                    borderRadius: '4px',
                                                                    textTransform: 'uppercase',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                            {app.status && app.status !== 'pending' && (
                                                                <span style={{
                                                                    padding: '6px 12px',
                                                                    border: `1px solid ${app.status === 'approved' ? '#00FF00' : '#FF453A'}`,
                                                                    color: app.status === 'approved' ? '#00FF00' : '#FF453A',
                                                                    fontSize: '0.7rem',
                                                                    borderRadius: '4px',
                                                                    textTransform: 'uppercase',
                                                                    backgroundColor: app.status === 'approved' ? 'rgba(0, 255, 0, 0.05)' : 'rgba(255, 69, 58, 0.05)'
                                                                }}>
                                                                    {app.status}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px', borderTop: '1px solid rgba(247, 245, 234, 0.05)', paddingTop: '20px' }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gender</span>
                                                        <p style={{ fontSize: '1rem', margin: '5px 0', textTransform: 'capitalize' }}>{app.gender}</p>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Birthday</span>
                                                        <p style={{ fontSize: '1rem', margin: '5px 0' }}>{app.birthday}</p>
                                                    </div>
                                                    {app.joined_date && (
                                                        <div>
                                                            <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Joined Date</span>
                                                            <p style={{ fontSize: '1rem', margin: '5px 0', color: '#2ECC71' }}>{new Date(app.joined_date).toLocaleDateString()}</p>
                                                        </div>
                                                    )}
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mailing Address</span>
                                                        <p style={{ fontSize: '1rem', margin: '5px 0' }}>{app.address}</p>
                                                    </div>
                                                </div>
                                                <div style={{ borderTop: '1px solid rgba(247, 245, 234, 0.05)', paddingTop: '30px' }}>
                                                    <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contribution Intent</span>
                                                    <p style={{ fontSize: '1.1rem', opacity: 0.8, marginTop: '15px', lineHeight: 1.6, fontStyle: 'italic' }}>
                                                        "{app.contribution}"
                                                    </p>
                                                </div>
                                                {app.status === 'approved' && (
                                                    <div style={{ borderTop: '1px solid rgba(247,245,234,0.05)', paddingTop: '20px', marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                        <span style={{ fontSize: '0.7rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Set Contribution ($)</span>
                                                        <input
                                                            type="number" min="0" step="0.01"
                                                            value={editAmounts[app.id] ?? ''}
                                                            onChange={e => setEditAmounts(prev => ({ ...prev, [app.id]: e.target.value }))}
                                                            placeholder="e.g. 130"
                                                            style={{ background: 'transparent', border: '1px solid rgba(247,245,234,0.2)', padding: '6px 12px', color: '#F7F5EA', fontSize: '0.9rem', borderRadius: '4px', outline: 'none', width: '120px' }}
                                                        />
                                                        <button onClick={() => handleSetContribution(app)} style={{ background: '#F7D031', border: 'none', padding: '6px 16px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer', borderRadius: '4px', color: '#111', letterSpacing: '0.05em' }}>SET</button>
                                                        <span style={{ fontSize: '0.7rem', color: '#F7D031' }}>Balance: ${(app.credit_balance ?? 0).toFixed(2)} / ${(app.contribution_amount ?? 0).toFixed(2)}</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="campaigns"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                                <div>
                                    <span className="section-label" style={{ color: 'rgba(247, 245, 234, 0.4)' }}>EMAIL DRIP CAMPAIGNS / BROADCAST TOOL</span>
                                    <h1 className="concept-title" style={{ fontSize: '5rem', lineHeight: 1, marginTop: '20px', color: '#F7F5EA' }}>
                                        CAMPAIGNS.
                                    </h1>
                                </div>
                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                    <span style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOTAL REACH</span>
                                    <span style={{ fontSize: '2rem', color: '#F7D031', fontWeight: 800 }}>{subscribers.length}</span>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(247, 245, 234, 0.1)', borderRadius: '8px', padding: '40px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '40px' }}>

                                    {/* Campaign Composer */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Composer</h3>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Subject</label>
                                            <input
                                                type="text"
                                                value={campaignSubject}
                                                onChange={(e) => setCampaignSubject(e.target.value)}
                                                placeholder="e.g. New IMRSV Run Club Event Added..."
                                                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(247, 245, 234, 0.2)', color: '#F7F5EA', padding: '15px', borderRadius: '4px', outline: 'none', fontSize: '1.2rem', fontFamily: 'inherit' }}
                                            />
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <label style={{ fontSize: '0.8rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>HTML / Body Content</label>
                                            <textarea
                                                value={campaignBody}
                                                onChange={(e) => setCampaignBody(e.target.value)}
                                                placeholder={`<h1>Hello World</h1>\n<p>Writing standard HTML works best here for styling.</p>`}
                                                rows="12"
                                                style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(247, 245, 234, 0.2)', color: '#F7F5EA', padding: '15px', borderRadius: '4px', outline: 'none', fontSize: '1rem', fontFamily: 'monospace', resize: 'vertical' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Broadcast Controls */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', borderLeft: '1px solid rgba(247,245,234,0.1)', paddingLeft: '40px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            <h3 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Audience</h3>

                                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                <input type="radio" value="all" checked={campaignFilter === 'all'} onChange={() => setCampaignFilter('all')} />
                                                Everyone ({subscribers.length})
                                            </label>

                                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                <input type="radio" value="journal" checked={campaignFilter === 'journal'} onChange={() => setCampaignFilter('journal')} />
                                                Journal Subs Only ({subscribers.filter(s => s.source === 'journal').length})
                                            </label>

                                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                                <input type="radio" value="app" checked={campaignFilter === 'app'} onChange={() => setCampaignFilter('app')} />
                                                App Waitlist Only ({subscribers.filter(s => s.source === 'app').length})
                                            </label>
                                        </div>

                                        <div style={{ marginTop: 'auto' }}>
                                            <button
                                                onClick={handleBroadcast}
                                                disabled={campaignStatus === 'sending'}
                                                style={{
                                                    background: '#F7D031',
                                                    color: '#111',
                                                    border: 'none',
                                                    padding: '20px',
                                                    width: '100%',
                                                    borderRadius: '4px',
                                                    fontFamily: 'inherit',
                                                    fontSize: '1rem',
                                                    fontWeight: 800,
                                                    cursor: campaignStatus === 'sending' ? 'not-allowed' : 'pointer',
                                                    transition: 'all 0.2s',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em',
                                                    opacity: campaignStatus === 'sending' ? 0.5 : 1
                                                }}
                                            >
                                                {campaignStatus === 'sending' ? 'TRANSMITTING...' : '[ BROADCAST MESSAGE ]'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </motion.div>
    );
};

export default AdminLayer;
