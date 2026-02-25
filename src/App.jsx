import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import ImpactLayer from './ImpactLayer';
import RestorationLayer from './RestorationLayer';
import ApplicationLayer from './ApplicationLayer';
import AdminLayer from './AdminLayer';
import JournalLayer from './JournalLayer';
import LoginLayer from './LoginLayer';
import MemberLayer from './MemberLayer';

import { supabase } from './lib/supabase';
import { sendNotificationEmail } from './lib/email';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [dbStatus, setDbStatus] = useState('connecting');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        checkMembership(session.user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      if (newUser) {
        checkMembership(newUser.email);
      } else {
        setIsMember(false);
        if (location.pathname === '/member') navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkMembership = async (email) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('status')
        .ilike('email', email.trim())
        .eq('status', 'approved');

      if (data && data.length > 0) {
        setIsMember(true);
        if (location.pathname === '/login' || location.pathname === '/') {
          navigate('/member');
        }
      } else {
        setIsMember(false);
      }
    } catch (err) {
      console.error("Membership check failed:", err);
    }
  };

  const handleSignup = async (email, password) => {
    const { data: appData } = await supabase
      .from('applications')
      .select('status')
      .ilike('email', email.trim())
      .eq('status', 'approved');

    if (!appData || appData.length === 0) {
      throw new Error("ACCESS DENIED. YOUR APPLICATION IS NOT YET APPROVED.");
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const handleLogin = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

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
      const saved = localStorage.getItem('imrsv_applications');
      if (saved) setApplications(JSON.parse(saved));
    }
  };

  const handleHomeNavigation = (isSuccess) => {
    navigate('/');
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
        sendNotificationEmail(data[0]);
      }
    } catch (e) {
      const newApp = { ...appData, id: Date.now(), date: new Date().toLocaleString() };
      const updated = [newApp, ...applications];
      setApplications(updated);
      localStorage.setItem('imrsv_applications', JSON.stringify(updated));
    }
  };

  const deleteApplication = async (id) => {
    try {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (error) throw error;
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (e) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const approveApplication = async (id) => {
    try {
      const appToUpdate = applications.find(a => a.id === id);
      if (!appToUpdate) return;
      await supabase.from('applications').update({ status: 'approved' }).eq('id', id);
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'approved' } : app));
      sendNotificationEmail({ ...appToUpdate, type: 'approval' });
    } catch (e) {
      console.error("Error approving:", e);
    }
  };

  const denyApplication = async (id) => {
    try {
      const appToUpdate = applications.find(a => a.id === id);
      if (!appToUpdate) return;
      await supabase.from('applications').update({ status: 'denied' }).eq('id', id);
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'denied' } : app));
      sendNotificationEmail({ ...appToUpdate, type: 'denial' });
    } catch (e) {
      console.error("Error denying:", e);
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <Home
              navigateToImpact={() => navigate('/impact')}
              navigateToRestoration={() => navigate('/restoration')}
              navigateToApply={() => navigate('/apply')}
              navigateToLogin={() => navigate('/login')}
              navigateToAdmin={() => navigate('/admin')}
              navigateToJournal={() => navigate('/journal')}
              showSuccess={showSuccess}
            />
          } />
          <Route path="/impact" element={
            <ImpactLayer
              onBack={() => navigate('/')}
              navigateToRestoration={() => navigate('/restoration')}
            />
          } />
          <Route path="/restoration" element={
            <RestorationLayer
              onBack={() => navigate('/')}
              navigateToImpact={() => navigate('/impact')}
              applications={applications}
            />
          } />
          <Route path="/apply" element={
            <ApplicationLayer
              navigateToHome={handleHomeNavigation}
              onSubmit={addApplication}
            />
          } />
          <Route path="/admin" element={
            <AdminLayer
              onBack={() => navigate('/')}
              applications={applications}
              onDelete={deleteApplication}
              onApprove={approveApplication}
              onDeny={denyApplication}
              dbStatus={dbStatus}
            />
          } />
          <Route path="/login" element={
            <LoginLayer
              onBack={() => navigate('/')}
              onNavigateToApply={() => navigate('/apply')}
              onLogin={handleLogin}
              onSignup={handleSignup}
              initialMode="login"
            />
          } />
          <Route path="/createaccount" element={
            <LoginLayer
              onBack={() => navigate('/')}
              onNavigateToApply={() => navigate('/apply')}
              onLogin={handleLogin}
              onSignup={handleSignup}
              initialMode="signup"
            />
          } />
          <Route path="/signup" element={<Navigate to="/createaccount" replace />} />
          <Route path="/member" element={
            isMember ? (
              <MemberLayer
                user={user}
                onLogout={handleLogout}
                onBack={() => navigate('/')}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/journal" element={
            <JournalLayer onBack={() => navigate('/')} />
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
