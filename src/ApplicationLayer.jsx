import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import InteractiveText from './components/InteractiveText';
import { supabase } from './lib/supabase';
import { Camera, Plus, Loader2, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import './App.css';
import './Home.css';

const ApplicationLayer = ({ navigateToHome, onSubmit }) => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success
    const [currentStep, setCurrentStep] = useState(0);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        hub: '',
        social: '',
        occupation: '',
        profession: '',
        bio: '',
        gender: '',
        birthday: '',
        address: '',
        contribution: '',
        picture: ''
    });

    const steps = [
        { label: '01 / 08', title: 'WHO ARE YOU?' },
        { label: '02 / 08', title: 'WHERE ARE YOU?' },
        { label: '03 / 08', title: 'WHAT DO YOU DO?' },
        { label: '04 / 08', title: 'YOUR STORY.' },
        { label: '05 / 08', title: 'THE DETAILS.' },
        { label: '06 / 08', title: 'MAILING.' },
        { label: '07 / 08', title: 'THE CONTRIBUTION.' },
        { label: '08 / 08', title: 'THE VISUAL.' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, picture: e.target.files[0] }));
        }
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
            let pictureUrl = formData.picture;

            // Handle native file upload to Supabase Storage
            if (formData.picture instanceof File) {
                const fileExt = formData.picture.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { data, error } = await supabase.storage
                    .from('applications')
                    .upload(`visuals/${fileName}`, formData.picture);

                if (error) {
                    console.error("Image upload failed:", error);
                    alert("Image upload failed. It will be submitted without the picture. Ensure the 'applications' bucket exists.");
                    pictureUrl = ''; // fallback
                } else if (data) {
                    const { data: publicUrlData } = supabase.storage
                        .from('applications')
                        .getPublicUrl(`visuals/${fileName}`);
                    pictureUrl = publicUrlData.publicUrl;
                }
            }

            const finalData = { ...formData, picture: pictureUrl };

            if (onSubmit) {
                await onSubmit(finalData);
            }
            navigateToHome(true);
        } catch (error) {
            console.error("Submission failed:", error);
            setStatus('idle');
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="profile-fields-grid">
                        <div className="input-field-wrap">
                            <label className="label">Full Name</label>
                            <input required name="name" type="text" className="input" value={formData.name} onChange={handleInputChange} placeholder="Alex Rivera" />
                        </div>
                        <div className="input-field-wrap">
                            <label className="label">Email Address</label>
                            <input required name="email" type="email" className="input" value={formData.email} onChange={handleInputChange} placeholder="alex@example.com" />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="profile-fields-grid">
                        <div className="input-field-wrap">
                            <label className="label">Primary Hub / City</label>
                            <input required name="hub" type="text" className="input" value={formData.hub} onChange={handleInputChange} placeholder="Los Angeles, California" />
                        </div>
                        <div className="input-field-wrap">
                            <label className="label">Social Link / Portfolio</label>
                            <input required name="social" type="text" className="input" value={formData.social} onChange={handleInputChange} placeholder="@handle or url" />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="profile-fields-grid">
                        <div className="input-field-wrap">
                            <label className="label">Occupation</label>
                            <input required name="occupation" type="text" className="input" value={formData.occupation} onChange={handleInputChange} placeholder="Architect, Builder, Creator, etc." />
                        </div>
                        <div className="input-field-wrap">
                            <label className="label">Profession / Title</label>
                            <input required name="profession" type="text" className="input" value={formData.profession} onChange={handleInputChange} placeholder="e.g. Photographer, Designer, Chef" />
                        </div>
                    </div>
                );
            case 3: {
                const wordCount = formData.bio.trim() === '' ? 0 : formData.bio.trim().split(/\s+/).length;
                const overLimit = wordCount > 120;
                return (
                    <div className="input-field-wrap">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label className="label">Bio</label>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: overLimit ? '#EF4444' : 'var(--muted)', textTransform: 'uppercase' }}>
                                {wordCount} / 120 words
                            </span>
                        </div>
                        <textarea
                            required
                            name="bio"
                            className="textarea"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell the collective who you are in under 120 words..."
                            rows="6"
                        />
                        {overLimit && (
                            <p style={{ fontSize: '10px', color: '#EF4444', marginTop: '4px', fontWeight: 700, textTransform: 'uppercase' }}>Bio must be under 120 words.</p>
                        )}
                    </div>
                );
            }
            case 4:
                return (
                    <div className="profile-fields-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="input-field-wrap">
                            <label className="label">Gender</label>
                            <select required name="gender" className="input" value={formData.gender} onChange={handleInputChange} style={{ color: 'var(--ink)' }}>
                                <option value="" disabled>Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-field-wrap">
                            <label className="label">Date of Birth</label>
                            <input required name="birthday" type="date" className="input" value={formData.birthday} onChange={handleInputChange} style={{ color: 'var(--ink)' }} />
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="input-field-wrap">
                        <label className="label">Mailing Address</label>
                        <input required name="address" type="text" className="input" value={formData.address} onChange={handleInputChange} placeholder="Street, City, State, ZIP, Country" />
                    </div>
                );
            case 6:
                return (
                    <div className="input-field-wrap">
                        <label className="label">Contribution to Sunday Collection</label>
                        <textarea required name="contribution" className="textarea" value={formData.contribution} onChange={handleInputChange} placeholder="How do you intend to participate?" rows="4" />
                    </div>
                );
            case 7:
                return (
                    <div className="input-field-wrap">
                        <label className="label">Cultural Archive: Submit a Picture</label>
                        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px', lineHeight: 1.5 }}>
                            Upload the coolest picture you have been a part of or taken. This will be added to our journal.
                        </p>

                        <div className="avatarWrap" style={{ width: '100%', height: '240px', borderRadius: '24px' }}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <div
                                className="avatarCircle"
                                style={{ width: '100%', height: '100%', borderRadius: '24px' }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                {formData.picture ? (
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <img
                                            src={formData.picture instanceof File ? URL.createObjectURL(formData.picture) : formData.picture}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px' }}
                                        />
                                        <div className="avatarOverlay" style={{ borderRadius: '24px' }}>
                                            <Camera size={32} color="#FFF" />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Plus size={24} color="var(--muted)" />
                                        </div>
                                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Select Visual Archive</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {formData.picture instanceof File && (
                            <p style={{ fontSize: '10px', color: 'var(--accent-orange)', marginTop: '12px', fontWeight: 800, textTransform: 'uppercase' }}>
                                File Selected: {formData.picture.name}
                            </p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const isCurrentStepValid = () => {
        const bioWordCount = formData.bio.trim() === '' ? 0 : formData.bio.trim().split(/\s+/).length;
        switch (currentStep) {
            case 0: return formData.name && formData.email;
            case 1: return formData.hub && formData.social;
            case 2: return formData.occupation && formData.profession;
            case 3: return formData.bio && bioWordCount <= 120;
            case 4: return formData.gender && formData.birthday;
            case 5: return formData.address;
            case 6: return formData.contribution;
            case 7: return !!formData.picture;
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

            <section className="section" style={{ maxWidth: '600px', paddingTop: '160px', paddingBottom: '100px', flex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="profileCard"
                        style={{ padding: '40px', background: '#FFF' }}
                    >
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--muted)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
                            {steps[currentStep].label}
                        </span>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--ink)', marginBottom: '40px', lineHeight: 1.1, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                            {steps[currentStep].title}
                        </h1>

                        <form onSubmit={nextStep}>
                            {renderStep()}

                            <div style={{ display: 'flex', gap: '16px', marginTop: '60px' }}>
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        style={{
                                            flex: 1,
                                            height: '56px',
                                            borderRadius: '16px',
                                            background: 'var(--border-color)',
                                            color: 'var(--ink)',
                                            fontWeight: 800,
                                            fontSize: '12px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <ArrowLeft size={16} />
                                        Back
                                    </button>
                                )}
                                <button
                                    disabled={!isCurrentStepValid() || status === 'submitting'}
                                    className="saveBtn"
                                    style={{
                                        flex: 2,
                                        height: '56px',
                                        opacity: (!isCurrentStepValid() || status === 'submitting') ? 0.3 : 1
                                    }}
                                >
                                    {status === 'submitting' ? (
                                        <Loader2 className="loading-ring" size={20} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>{currentStep === steps.length - 1 ? 'Submit Application' : 'Next Step'}</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    )}
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
