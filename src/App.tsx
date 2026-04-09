import { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsStrip from './components/StatsStrip';
import FeatureCards from './components/FeatureCards';
import AnalyticsCharts from './components/AnalyticsCharts';
import PriorityPatients from './components/PriorityPatients';
import ShiftSchedule from './components/ShiftSchedule';
import AppointmentsPage from './components/AppointmentsPage';
import PrescriptionTracker from './components/PrescriptionTracker';
import PatientAccess from './components/PatientAccess';
import PatientDirectory from './components/PatientDirectory';
import ProfileSettings from './components/ProfileSettings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeNav, setActiveNav] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      ) : (
        
    <div className={`app-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} onLogout={() => setIsAuthenticated(false)} isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="main-area">
        <Topbar />
        <main className="main-content">
          {activeNav === 'dashboard' && (
            <>
              <StatsStrip />
              <FeatureCards />
              <AnalyticsCharts />
              <div className="bottom-row">
                <PriorityPatients />
                <ShiftSchedule />
              </div>
            </>
          )}
          {activeNav === 'appointments' && <AppointmentsPage />}
          {activeNav === 'patients' && <PatientDirectory />}
          {activeNav === 'patient-history' && <PatientAccess />}
          {activeNav === 'prescriptions' && <PrescriptionTracker />}
          {activeNav === 'settings' && <ProfileSettings />}
        </main>
      </div>
    </div>
      )}
    </>
  );
}

export default App;
