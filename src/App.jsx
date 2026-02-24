import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './Home';
import ImpactLayer from './ImpactLayer';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <Home key="home" navigateToImpact={() => setView('impact')} />
        ) : (
          <ImpactLayer key="impact" onBack={() => setView('home')} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
