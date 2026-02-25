import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import ImpactLayer from './ImpactLayer';
import RestorationLayer from './RestorationLayer';
import ApplicationLayer from './ApplicationLayer';
import AdminLayer from './AdminLayer';
import JournalLayer from './JournalLayer';

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
      localStorage.setItem('imrsv_applications', JSON.stringify(applications.filter(app => app.id !== id)));
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
            dbStatus={dbStatus}
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
