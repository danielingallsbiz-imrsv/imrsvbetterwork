import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveText from './components/InteractiveText';
import './Home.css';

const ApplicationLayer = ({ navigateToHome, onSubmit }) => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hub: '',
        social: '',
        occupation: '',
        gender: '',
        birthday: '',
        address: '',
        contribution: ''
    });

    const steps = [
        { label: '01 / 06', title: 'WHO ARE YOU?' },
        { label: '02 / 06', title: 'WHERE ARE YOU?' },
        { label: '03 / 06', title: 'WHAT DO YOU DO?' },
        { label: '04 / 06', title: 'THE DETAILS.' },
        { label: '05 / 06', title: 'MAILING.' },
        { label: '06 / 06', title: 'THE CONTRIBUTION.' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = (e) => {
        if (e) e.preventDefault();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            window.scrollTo(0, 0);
        } else {
            submitForm();
        }
    };

    const prevStep = (e) => {
        if (e) e.preventDefault();
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const submitForm = async () => {
        setStatus('submitting');
        try {
            if (onSubmit) {
                await onSubmit(formData);
            }
            navigateToHome(true);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus('idle');
            // You could add an error message here based on your UI needs
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Full Name</label>
                            <input required name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Alex Rivera" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Email Address</label>
                            <input required name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="alex@example.com" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Primary Hub / City</label>
                            <input required name="hub" type="text" value={formData.hub} onChange={handleInputChange} placeholder="Los Angeles, California" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Social Link / Portfolio</label>
                            <input required name="social" type="text" value={formData.social} onChange={handleInputChange} placeholder="@handle or url" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Occupation</label>
                        <input required name="occupation" type="text" value={formData.occupation} onChange={handleInputChange} placeholder="Architect, Builder, Creator, etc." style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                    </div>
                );
            case 3:
                return (
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Gender</label>
                            <select required name="gender" value={formData.gender} onChange={handleInputChange} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none', color: '#1A1A1A' }}>
                                <option value="" disabled>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Date of Birth</label>
                            <input required name="birthday" type="date" value={formData.birthday} onChange={handleInputChange} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '8px 0', fontSize: '1.2rem', outline: 'none', color: '#1A1A1A' }} />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Mailing Address</label>
                        <input required name="address" type="text" value={formData.address} onChange={handleInputChange} placeholder="Street, City, State, ZIP, Country" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none' }} />
                    </div>
                );
            case 5:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Contribution to Sunday Collection</label>
                        <textarea required name="contribution" value={formData.contribution} onChange={handleInputChange} placeholder="How do you intend to participate?" rows="4" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(26, 26, 26, 0.2)', padding: '10px 0', fontSize: '1.2rem', outline: 'none', resize: 'none' }} />
                    </div>
                );
            default:
                return null;
        }
    };

    const isCurrentStepValid = () => {
        switch (currentStep) {
            case 0: return formData.name && formData.email;
            case 1: return formData.hub && formData.social;
            case 2: return formData.occupation;
            case 3: return formData.gender && formData.birthday;
            case 4: return formData.address;
            case 5: return formData.contribution;
            default: return false;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="home-container"
            style={{ backgroundColor: '#F7F5EA', minHeight: '100vh', color: '#1A1A1A', display: 'flex', flexDirection: 'column' }}
        >
            <nav className="nav-bar">
                <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1A1A1A' }} onClick={() => navigateToHome(false)}>
                    <img src="/logo.svg" alt="" style={{ height: '14px', width: 'auto', filter: 'invert(1)' }} />
                    <span style={{ marginLeft: '4px' }} className="mobile-hide">
                        <InteractiveText text="imrsv project" />
                    </span>
                </div>
                <div className="nav-links">
                    <span onClick={() => navigateToHome(false)} style={{ cursor: 'pointer', color: '#1A1A1A' }}>
                        <InteractiveText text={status === 'submitting' ? '...' : 'Cancel'} />
                    </span>
                </div>
            </nav>

            <section className="section" style={{ maxWidth: '600px', paddingTop: '160px', flex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <span className="section-label" style={{ color: 'rgba(26, 26, 26, 0.4)' }}>
                            <InteractiveText text={steps[currentStep].label} />
                        </span>
                        <h1 className="concept-title" style={{ fontSize: '3.5rem', color: '#1A1A1A', marginBottom: '40px', lineHeight: 1.1 }}>
                            <InteractiveText text={steps[currentStep].title} />
                        </h1>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '60px', marginTop: '60px' }} onSubmit={nextStep}>
                            {renderStep()}

                            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="gauntlet-btn"
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                            color: '#1A1A1A',
                                            border: '1px solid rgba(26, 26, 26, 0.2)',
                                            padding: '18px'
                                        }}
                                    >
                                        back
                                    </button>
                                )}
                                <button
                                    disabled={!isCurrentStepValid() || status === 'submitting'}
                                    className="gauntlet-btn"
                                    style={{
                                        flex: 2,
                                        opacity: (!isCurrentStepValid() || status === 'submitting') ? 0.3 : 1,
                                        padding: '18px'
                                    }}
                                >
                                    {status === 'submitting' ? 'VERIFYING...' : (currentStep === steps.length - 1 ? 'submit application' : 'Next Step')}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </section>
        </motion.div>
    );
};

export default ApplicationLayer;
