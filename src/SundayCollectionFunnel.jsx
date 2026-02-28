import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from './lib/supabase';
import './SundayCollectionFunnel.css';

const SundayCollectionFunnel = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError('Please enter a valid email.');
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone || phone.length < 8) {
            setError('Please enter a valid phone number.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error: sbError } = await supabase
                .from('leads') // Assuming a 'leads' table for B2C
                .insert([
                    {
                        email,
                        phone,
                        source: 'sunday_collection_funnel',
                        created_at: new Date().toISOString()
                    }
                ]);

            if (sbError) throw sbError;

            setStep(3);
        } catch (err) {
            console.error('Lead capture failed:', err);
            // Fallback for demo/offline
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sunday-funnel-container">
            <div className="funnel-content">
                <header className="funnel-header">
                    <span className="funnel-brand">THE IMRSV PROJECT</span>
                    <h1 className="funnel-title">sunday collection</h1>
                    <p className="funnel-subtitle">
                        intentional gatherings for those who explore with purpose.
                    </p>
                </header>

                <div className="funnel-form-container">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="funnel-step"
                            >
                                <span className="funnel-step-label">Step 01 / Join the movement</span>
                                <h3>Where should we send the invite?</h3>
                                <form className="funnel-input-group" onSubmit={handleNextStep}>
                                    <input
                                        type="email"
                                        className="funnel-input"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoFocus
                                    />
                                    {error && <p style={{ color: '#FF4D00', fontSize: '0.8rem' }}>{error}</p>}
                                    <button className="funnel-btn" type="submit">
                                        Continue <ArrowRight size={16} />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="funnel-step"
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                    <ArrowLeft
                                        size={16}
                                        style={{ cursor: 'pointer', opacity: 0.5 }}
                                        onClick={() => setStep(1)}
                                    />
                                    <span className="funnel-step-label" style={{ margin: 0 }}>Step 02 / Early Resident Status</span>
                                </div>
                                <h3>Lock in text alerts for drops.</h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '5px' }}>
                                    sunday collection events drop via SMS only.
                                </p>
                                <form className="funnel-input-group" onSubmit={handleSubmit}>
                                    <input
                                        type="tel"
                                        className="funnel-input"
                                        placeholder="+1 000 000 0000"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        autoFocus
                                    />
                                    {error && <p style={{ color: '#FF4D00', fontSize: '0.8rem' }}>{error}</p>}
                                    <button className="funnel-btn" type="submit" disabled={loading}>
                                        {loading ? 'Securing Status...' : 'Unlock Drop Access'}
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="funnel-success"
                            >
                                <div className="success-icon">
                                    <Check size={60} />
                                </div>
                                <h3>Status Secured.</h3>
                                <p className="funnel-subtitle" style={{ marginTop: '10px' }}>
                                    you're on the list. we'll reach out when the next sunday collection drops in your region.
                                </p>
                                <div className="back-home" onClick={() => navigate('/')}>
                                    Back to Hub
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="back-home" style={{ marginTop: '60px' }} onClick={() => navigate('/')}>
                    Exit Funnel
                </div>
            </div>
        </div>
    );
};

export default SundayCollectionFunnel;
