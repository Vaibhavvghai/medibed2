import { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  UserCircle, 
  CalendarCheck, 
  Activity, 
  BriefcaseMedical, 
  Edit3,
  HeartPulse,
  Lock
} from 'lucide-react';

export default function ProfileSettings() {
  const [stressLevel, setStressLevel] = useState<'low' | 'med' | 'high'>('low');
  
  // Toggles state
  const [alerts, setAlerts] = useState({
    appointments: true,
    prescriptions: false,
    bedUpdates: true,
    twoFactor: true
  });

  const toggleAlert = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const chartData = [
    { day: 'Mon', scheduled: 8, actual: 9 },
    { day: 'Tue', scheduled: 8, actual: 10 },
    { day: 'Wed', scheduled: 8, actual: 8 },
    { day: 'Thu', scheduled: 8, actual: 11 },
    { day: 'Fri', scheduled: 8, actual: 7 },
  ];

  return (
    <div className="prof-container">
      {/* Top Banner */}
      <div className="prof-banner">
        <div className="prof-banner-content">
          <div className="prof-avatar-large">AT</div>
          <div className="prof-info">
            <h1>Dr. Aris Thorne</h1>
            <p>Clinical Lead • Cardiology Department</p>
            <div className="prof-meta">
              <span className="prof-badge">ID: MED-99214</span>
              <span className="prof-badge"><Building2 size={12}/> Ward 4C</span>
            </div>
          </div>
        </div>
        <button className="prof-edit-btn">
          <Edit3 size={14} /> Quick Edit
        </button>
      </div>

      <div className="prof-grid">
        {/* LEFT: Wellness Dashboard */}
        <div className="prof-column">
          <div className="prof-section-heading">
            <HeartPulse size={18} className="text-teal-400" />
            <h2>Personal Health Overview</h2>
          </div>

          <div className="prof-card">
            <div className="prof-health-row">
              <div className="prof-health-stat">
                <span className="lbl">Last Comprehensive Checkup</span>
                <strong className="text-primary">Aug 14, 2026</strong>
              </div>
              <div className="prof-health-stat">
                <span className="lbl">Vaccination Status</span>
                <strong className="text-teal-400">Up to Date</strong>
              </div>
            </div>

            <div className="prof-divider"></div>

            <div className="prof-stress-monitor">
              <span className="lbl">Self-Reported Stress Level (This Week)</span>
              <div className="prof-stress-selector">
                <button 
                  className={`stress-btn low ${stressLevel === 'low' ? 'active' : ''}`}
                  onClick={() => setStressLevel('low')}
                >Low</button>
                <button 
                  className={`stress-btn med ${stressLevel === 'med' ? 'active' : ''}`}
                  onClick={() => setStressLevel('med')}
                >Moderate</button>
                <button 
                  className={`stress-btn high ${stressLevel === 'high' ? 'active' : ''}`}
                  onClick={() => setStressLevel('high')}
                >High</button>
              </div>
              <p className="prof-stress-msg">
                {stressLevel === 'low' && 'Great! Keep up the healthy balance.'}
                {stressLevel === 'med' && 'Monitor your fatigue. Ensure you take scheduled breaks.'}
                {stressLevel === 'high' && 'Please consider speaking with the clinical wellness team.'}
              </p>
            </div>

            <div className="prof-divider"></div>

            <div className="prof-chart-section">
              <span className="lbl">Clinical Hours (Scheduled vs Actual)</span>
              <div className="prof-bar-chart">
                {chartData.map((d) => (
                  <div key={d.day} className="pbc-col">
                    <div className="pbc-bars">
                      <div className="pbc-bar actual" style={{ height: `${(d.actual / 12) * 100}%` }}></div>
                      <div className="pbc-bar scheduled" style={{ height: `${(d.scheduled / 12) * 100}%` }}></div>
                    </div>
                    <span className="pbc-label">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="prof-divider"></div>

            <div className="prof-reviews">
              <span className="lbl mb-2">Upcoming Mandatory Reviews</span>
              <div className="prof-review-item">
                <CalendarCheck size={16} className="text-teal-400" />
                <span>Annual Respiratory Mask Fit Test</span>
                <span className="prof-date-pill">Nov 12</span>
              </div>
              <div className="prof-review-item">
                <Activity size={16} className="text-teal-400" />
                <span>Q4 Ergonomics & Wellness Seminar</span>
                <span className="prof-date-pill">Dec 01</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Settings Panel */}
        <div className="prof-column">
          <div className="prof-section-heading">
            <UserCircle size={18} className="text-purple-400" />
            <h2>Account Settings</h2>
          </div>

          <div className="prof-card">
            <h3 className="prof-subhead">Notification Preferences</h3>
            <div className="prof-toggle-row">
              <div className="ptr-info">
                <Bell size={16} className="text-purple-400" />
                <span>Urgent Appointment Alerts</span>
              </div>
              <label className="prof-switch">
                <input type="checkbox" checked={alerts.appointments} onChange={() => toggleAlert('appointments')} />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="prof-toggle-row">
              <div className="ptr-info">
                <BriefcaseMedical size={16} className="text-purple-400" />
                <span>Prescription Refill Reminders</span>
              </div>
              <label className="prof-switch">
                <input type="checkbox" checked={alerts.prescriptions} onChange={() => toggleAlert('prescriptions')} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="prof-toggle-row">
              <div className="ptr-info">
                <Building2 size={16} className="text-purple-400" />
                <span>Ward Bed Status Updates</span>
              </div>
              <label className="prof-switch">
                <input type="checkbox" checked={alerts.bedUpdates} onChange={() => toggleAlert('bedUpdates')} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="prof-divider mt-4"></div>

            <h3 className="prof-subhead">Security & Authentication</h3>
            <div className="prof-toggle-row">
              <div className="ptr-info">
                <ShieldCheck size={16} className="text-teal-400" />
                <span>Two-Factor Authentication (2FA)</span>
              </div>
              <label className="prof-switch">
                <input type="checkbox" checked={alerts.twoFactor} onChange={() => toggleAlert('twoFactor')} />
                <span className="slider round"></span>
              </label>
            </div>
            <button className="prof-ghost-btn mt-2">
              <Lock size={14} /> Change Account Password
            </button>

            <div className="prof-divider mt-4"></div>

            <h3 className="prof-subhead">Linked Facilities</h3>
            <div className="prof-facility-list">
              <div className="prof-facility active">
                <div className="pf-dot"></div>
                <span>MediBed Advanced Care (Primary)</span>
              </div>
              <div className="prof-facility">
                <div className="pf-dot inactive"></div>
                <span>City Center Cardiology Wing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
