import React, { useState, useRef } from 'react';
import { Camera, Plus, Trash2, Loader2, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { supabase } from '../lib/supabase';

/**
 * Premium Avatar Uploader
 * - Circular, Soho-style boutique feel
 * - Unique filename persistence in Supabase Storage
 */
export function AvatarUploader({ userId, currentUrl, onUploadSuccess }) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async (event) => {
        try {
            setUploading(true);
            const file = event.target.files[0];
            if (!file) return;

            // 1. Compress
            const options = { maxWidthOrHeight: 800, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);

            // 2. Generate unique path
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${userId}/${fileName}`;

            // 3. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(filePath, compressedFile);

            if (uploadError) throw uploadError;

            // 4. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(filePath);

            // 5. Update profiles table (optional if handled by parent)
            if (onUploadSuccess) onUploadSuccess(publicUrl);

        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
                onClick={() => !uploading && fileInputRef.current.click()}
                style={{
                    position: 'relative',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    cursor: uploading ? 'wait' : 'pointer',
                    border: '1px solid var(--line)',
                    background: 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {currentUrl ? (
                    <img src={currentUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <Camera size={32} color="var(--muted)" />
                )}

                {uploading && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader2 className="loading-ring" size={24} />
                    </div>
                )}

                <div className="hover-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(26, 26, 26, 0.4)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.2s ease',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                }}>
                    Change
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em', fontWeight: 700, textTransform: 'uppercase' }}>Tap to change photo</span>
        </div>
    );
}

/**
 * Premium Photo Gallery Uploader (3 Slots)
 */
export function PhotoGalleryUploader({ userId, photoUrls = [null, null, null], onUpdate }) {
    const [uploadingSlot, setUploadingSlot] = useState(null);
    const fileInputRef = useRef(null);
    const currentSlotRef = useRef(null);

    const handleFileClick = (slotIndex) => {
        currentSlotRef.current = slotIndex;
        fileInputRef.current.click();
    };

    const handleUpload = async (event) => {
        const slotIndex = currentSlotRef.current;
        const file = event.target.files[0];
        if (!file || slotIndex === null) return;

        try {
            setUploadingSlot(slotIndex);

            // 1. Compress
            const options = { maxWidthOrHeight: 1200, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);

            // 2. Path
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}-${slotIndex}-${Date.now()}.${fileExt}`;
            const filePath = `gallery/${userId}/${fileName}`;

            // 3. Upload
            const { error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(filePath, compressedFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(filePath);

            // 4. Update parent
            const newUrls = [...photoUrls];
            newUrls[slotIndex] = publicUrl;
            onUpdate(newUrls);

        } catch (error) {
            console.error('Gallery upload error:', error);
        } finally {
            setUploadingSlot(null);
            event.target.value = '';
        }
    };

    const removePhoto = (idx) => {
        const newUrls = [...photoUrls];
        newUrls[idx] = null;
        onUpdate(newUrls);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[0, 1, 2].map((idx) => (
                <div key={idx} style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line)', background: 'rgba(26, 26, 26, 0.03)' }}>
                    {photoUrls[idx] ? (
                        <>
                            <img src={photoUrls[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button
                                onClick={() => removePhoto(idx)}
                                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                            >
                                <Trash2 size={12} color="#FFF" />
                            </button>
                            <div
                                onClick={() => handleFileClick(idx)}
                                style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.9)', padding: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', cursor: 'pointer', textTransform: 'uppercase' }}
                            >
                                Replace
                            </div>
                        </>
                    ) : (
                        <div
                            onClick={() => handleFileClick(idx)}
                            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: '8px' }}
                        >
                            {uploadingSlot === idx ? <Loader2 size={24} className="loading-ring" /> : <Plus size={24} color="var(--muted)" />}
                            <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Add Photo</span>
                        </div>
                    )}
                </div>
            ))}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
}
