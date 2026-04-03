import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsStrip from './components/StatsStrip';
import FeatureCards from './components/FeatureCards';
import PriorityPatients from './components/PriorityPatients';
import ShiftSchedule from './components/ShiftSchedule';
import AppointmentsPage from './components/AppointmentsPage';
import PatientAccess from './components/PatientAccess';
import PatientDirectory from './components/PatientDirectory';
import ProfileSettings from './components/ProfileSettings';
import './App.css';

function App() {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <div className="app-layout">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <div className="main-area">
        <Topbar />
        <main className="main-content">
          {activeNav === 'dashboard' && (
            <>
              <StatsStrip />
              <FeatureCards />
              <div className="bottom-row">
                <PriorityPatients />
                <ShiftSchedule />
              </div>
            </>
          )}
          {activeNav === 'appointments' && <AppointmentsPage />}
          {activeNav === 'patients' && <PatientDirectory />}
          {activeNav === 'patient-history' && <PatientAccess />}
          {activeNav === 'settings' && <ProfileSettings />}
        </main>
      </div>
    </div>
  );
}

export default App;
