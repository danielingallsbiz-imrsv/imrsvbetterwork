import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import ImpactLayer from './ImpactLayer';
import RestorationLayer from './RestorationLayer';
import ApplicationLayer from './ApplicationLayer';
import AdminLayer from './AdminLayer';
import JournalLayer from './JournalLayer';
import LoginLayer from './LoginLayer';

import { supabase } from './lib/supabase';
import { sendNotificationEmail } from './lib/email';

function App() {
  const [view, setView] = useState('home');
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState([]);
  const [dbStatus, setDbStatus] = useState('connecting'); // connecting, connected, offline

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your_supabase_project_url') {
        throw new Error("Supabase URL not configured");
      }

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
      setDbStatus('connected');
    } catch (e) {
      console.warn("Supabase connection failed, using local storage:", e.message);
      setDbStatus('offline');
      // Fallback to local storage
      const saved = localStorage.getItem('imrsv_applications');
      if (saved) setApplications(JSON.parse(saved));
    }
  };

  const handleHomeNavigation = (isSuccess) => {
    setView('home');
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const addApplication = async (appData) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([{
          ...appData,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      if (data) {
        setApplications(prev => [data[0], ...prev]);
        // Trigger the notification email
        sendNotificationEmail(data[0]);
      }
    } catch (e) {
      console.error("Error adding application:", e);
      // Fallback to local storage
      const newApp = { ...appData, id: Date.now(), date: new Date().toLocaleString() };
      const updated = [newApp, ...applications];
      setApplications(updated);
      localStorage.setItem('imrsv_applications', JSON.stringify(updated));
    }
  };

  const deleteApplication = async (id) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (e) {
      console.error("Error deleting application:", e);
      setApplications(prev => prev.filter(app => app.id !== id));
      const saved = JSON.parse(localStorage.getItem('imrsv_applications') || '[]');
      localStorage.setItem('imrsv_applications', JSON.stringify(saved.filter(app => app.id !== id)));
    }
  };

  const approveApplication = async (id) => {
    try {
      const appToUpdate = applications.find(a => a.id === id);
      if (!appToUpdate) return;

      const { data, error } = await supabase
        .from('applications')
        .update({ status: 'approved' })
        .eq('id', id)
        .select();

      if (error) throw error;

      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'approved' } : app));

      // Send Approval Email
      sendNotificationEmail({ ...appToUpdate, type: 'approval' });
    } catch (e) {
      console.error("Error approving application:", e);
    }
  };

  const denyApplication = async (id) => {
    try {
      const appToUpdate = applications.find(a => a.id === id);
      if (!appToUpdate) return;

      const { data, error } = await supabase
        .from('applications')
        .update({ status: 'denied' })
        .eq('id', id)
        .select();

      if (error) throw error;

      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'denied' } : app));

      // Send Denial Email
      sendNotificationEmail({ ...appToUpdate, type: 'denial' });
    } catch (e) {
      console.error("Error denying application:", e);
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <Home key="home"
            navigateToImpact={() => setView('impact')}
            navigateToRestoration={() => setView('restoration')}
            navigateToApply={() => setView('apply')}
            navigateToLogin={() => setView('login')}
            navigateToAdmin={() => setView('admin')}
            navigateToJournal={() => setView('journal')}
            showSuccess={showSuccess}
          />
        )}
        {view === 'impact' && (
          <ImpactLayer
            key="impact"
            onBack={() => setView('home')}
            navigateToRestoration={() => setView('restoration')}
          />
        )}
        {view === 'restoration' && (
          <RestorationLayer
            key="restoration"
            onBack={() => setView('home')}
            navigateToImpact={() => setView('impact')}
            applications={applications}
          />
        )}
        {view === 'apply' && (
          <ApplicationLayer
            key="apply"
            navigateToHome={handleHomeNavigation}
            onSubmit={addApplication}
          />
        )}
        {view === 'admin' && (
          <AdminLayer
            key="admin"
            onBack={() => setView('home')}
            applications={applications}
            onDelete={deleteApplication}
            onApprove={approveApplication}
            onDeny={denyApplication}
            dbStatus={dbStatus}
          />
        )}
        {view === 'login' && (
          <LoginLayer
            key="login"
            onBack={() => setView('home')}
            onNavigateToApply={() => setView('apply')}
            onLogin={(email, pass) => {
              console.log("Login attempt:", email);
              // Future auth logic here
            }}
          />
        )}
        {view === 'journal' && (
          <JournalLayer
            key="journal"
            onBack={() => setView('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
