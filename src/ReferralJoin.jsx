import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';

export default function ReferralJoin() {
    const [searchParams] = useSearchParams();
    const referredBy = searchParams.get('ref') || '';
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = info, 2 = success
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        birthday: '',
        password: '',
    });

    const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!form.name || !form.email || !form.password) {
            setError('Please fill in name, email, and password.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setSaving(true);
        try {
            // 1. Create Supabase auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: form.email.trim().toLowerCase(),
                password: form.password,
                options: {
                    redirectTo: 'https://theimrsvproject.org/login',
                },
            });

            if (authError) {
                if (authError.status === 429) throw new Error('Too many attempts. Please wait a moment.');
                throw authError;
            }

            // 2. Insert application row — status = 'approved' immediately
            const { error: dbError } = await supabase.from('applications').insert([{
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                phone: form.phone.trim(),
                birthday: form.birthday || null,
                status: 'approved',
                referred_by: referredBy || null,
                hub: 'medellin',
                joined_date: new Date().toISOString().split('T')[0],
                created_at: new Date().toISOString(),
            }]);

            if (dbError && dbError.code !== '23505') {
                // 23505 = unique violation (email already exists) — ignore
                throw dbError;
            }

            // 3. If email confirmation is off, session is immediate
            if (authData?.session) {
                navigate('/member');
            } else {
                setStep(2);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = {
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(26,26,26,0.2)',
        padding: '12px 0',
        fontSize: '1.05rem',
        outline: 'none',
        color: '#1A1A1A',
        width: '100%',
    };

    const labelStyle = {
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontWeight: 700,
        color: 'rgba(26,26,26,0.55)',
    };

    if (step === 2) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    minHeight: '100vh', background: '#F7F5EA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '40px 24px', textAlign: 'center',
                }}
            >
                <div style={{ maxWidth: '400px' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>✓</div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' }}>You're in.</h1>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '32px' }}>
                        Check your email to confirm your account, then log in to access the member portal.
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        style={{
                            background: '#1A1A1A', color: '#F7D031', border: 'none',
                            padding: '14px 28px', fontSize: '0.75rem', fontWeight: 800,
                            letterSpacing: '0.1em', cursor: 'pointer', borderRadius: '24px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Go to Login →
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ minHeight: '100vh', background: '#F7F5EA', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}
        >
            <div style={{ width: '100%', maxWidth: '440px' }}>
                {/* Brand mark */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <img src="/logo.svg" alt="" style={{ height: '20px', filter: 'invert(1)', marginBottom: '16px' }} />
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', color: '#1A1A1A' }}>
                        Join the Collective.
                    </h1>
                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {referredBy ? `Referred by ${referredBy}` : 'Private Access'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={labelStyle}>Full Name *</label>
                        <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="Your name" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={labelStyle}>Email *</label>
                        <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" required />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={labelStyle}>Phone</label>
                        <input style={inputStyle} type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (000) 000 0000" />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={labelStyle}>Birthday</label>
                        <input style={inputStyle} type="date" value={form.birthday} onChange={set('birthday')} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={labelStyle}>Create Password *</label>
                        <input style={inputStyle} type="password" value={form.password} onChange={set('password')} placeholder="Min 6 characters" required />
                    </div>

                    {error && (
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#FF453A', letterSpacing: '0.05em' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            background: saving ? 'rgba(26,26,26,0.4)' : '#1A1A1A',
                            color: '#F7D031',
                            border: 'none',
                            padding: '16px',
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            transition: 'background 0.2s',
                            marginTop: '8px',
                        }}
                    >
                        {saving ? 'Creating Your Account...' : '[ Join Now ]'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '0.65rem', opacity: 0.3, letterSpacing: '0.06em' }}>
                    By joining you agree to treat this space with respect.
                </p>
            </div>
        </motion.div>
    );
}
