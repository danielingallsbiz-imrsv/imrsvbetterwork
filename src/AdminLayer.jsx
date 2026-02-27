import React from 'react';
import './Home.css';

const AdminLayer = ({ onBack, applications, onDelete, onApprove, onDeny, dbStatus }) => {
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
                    <span style={{ color: '#F7D031', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>
                        <span className="mobile-hide">Admin Terminal v1.1</span>
                        <span className="mobile-show">Admin</span>
                    </span>
                    <div style={{
                        fontSize: '0.5rem',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Streamlined
                    </div>
                </div>
            </nav>

            <section className="section" style={{ paddingTop: '160px', paddingBottom: '100px' }}>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
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
                </motion.div>

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
                                            <span style={{ fontSize: '0.8rem', color: '#F7D031', marginTop: '5px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{app.occupation}</span>
                                        </div>
                                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'rgba(247, 245, 234, 0.4)' }}>
                                                {app.created_at ? new Date(app.created_at).toLocaleString() : app.date}
                                            </span>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                {(!app.status || app.status === 'pending') && (
                                                    <>
                                                        <button
                                                            onClick={() => onApprove(app.id)}
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
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default AdminLayer;
