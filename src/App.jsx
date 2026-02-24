import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import ImpactLayer from './ImpactLayer';
import RestorationLayer from './RestorationLayer';
import ApplicationLayer from './ApplicationLayer';
import AdminLayer from './AdminLayer';

function App() {
  const [view, setView] = useState('home');
  const [showSuccess, setShowSuccess] = useState(false);
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('imrsv_applications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('imrsv_applications', JSON.stringify(applications));
  }, [applications]);

  const handleHomeNavigation = (isSuccess) => {
    setView('home');
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const addApplication = (appData) => {
    setApplications(prev => [...prev, { ...appData, id: Date.now(), date: new Date().toLocaleString() }]);
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
