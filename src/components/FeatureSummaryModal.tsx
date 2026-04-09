import { X, CalendarDays, Search, Pill, BedDouble, CalendarOff, Clock, User, ChevronRight } from 'lucide-react';

interface FeatureSummaryProps {
  featureId: string | null;
  onClose: () => void;
}

export default function FeatureSummaryModal({ featureId, onClose }: FeatureSummaryProps) {
  if (!featureId) return null;

  const renderContent = () => {
    switch (featureId) {
      case 'appointments':
        return (
          <div className="fm-content">
            <div className="fm-metrics">
              <div className="fm-metric"><span className="fm-val">10</span><span className="fm-lbl">Total</span></div>
              <div className="fm-metric"><span className="fm-val">3</span><span className="fm-lbl">Pending</span></div>
              <div className="fm-metric"><span className="fm-val">7</span><span className="fm-lbl">Completed</span></div>
            </div>
            <div className="fm-list">
              <h4>Up Next</h4>
              <div className="fm-list-item"><span>10:30 AM - David Rodriguez</span><span className="fm-badge now">NOW</span></div>
              <div className="fm-list-item"><span>11:15 AM - Elena Gilbert</span><span className="fm-badge upcoming">UPCOMING</span></div>
            </div>
          </div>
        );
      case 'patient-lookup':
        return (
          <div className="fm-content">
            <div className="fm-search-bar">
              <Search size={16} />
              <input type="text" placeholder="Search by name, ID, or room..." />
            </div>
            <div className="fm-list">
              <h4>Recently Viewed</h4>
              <div className="fm-list-item"><span style={{display:'flex', alignItems:'center', gap:'8px'}}><User size={14}/> Julian S. Vance</span><span className="fm-badge done">Room 99201</span></div>
              <div className="fm-list-item"><span style={{display:'flex', alignItems:'center', gap:'8px'}}><User size={14}/> Clara Mendez</span><span className="fm-badge done">Room 1087</span></div>
            </div>
          </div>
        );
      case 'prescriptions':
        return (
          <div className="fm-content">
            <div className="fm-alert-box">
              <Pill size={20} className="text-warning" />
              <div>
                <strong style={{color:'#fff'}}>4 Pending Approvals</strong>
                <p>Require doctor signature for dispensing</p>
              </div>
            </div>
            <div className="fm-list">
              <div className="fm-list-item"><span>Amoxicillin 500mg - Elias V.</span><button className="fm-btn-small">Sign</button></div>
              <div className="fm-list-item"><span>Lisinopril 10mg - Sarah J.</span><button className="fm-btn-small">Sign</button></div>
            </div>
          </div>
        );
      case 'bed-overview':
        return (
          <div className="fm-content">
            <div className="fm-metrics">
              <div className="fm-metric"><span className="fm-val">80%</span><span className="fm-lbl">Occupancy</span></div>
              <div className="fm-metric"><span className="fm-val">4</span><span className="fm-lbl">Available</span></div>
              <div className="fm-metric"><span className="fm-val">16</span><span className="fm-lbl">Occupied</span></div>
            </div>
            <div className="fm-progress-bar">
              <div className="fm-progress-fill" style={{ width: '80%' }}></div>
            </div>
            <div className="fm-list">
              <div className="fm-list-item text-danger"><span style={{display:'flex', alignItems:'center', gap:'8px'}}><BedDouble size={14}/> Ward 4B - Bed 402</span><span className="fm-badge now">CRITICAL</span></div>
            </div>
          </div>
        );
      case 'leave-mgmt':
        return (
          <div className="fm-content">
            <div className="fm-metrics">
              <div className="fm-metric"><span className="fm-val">12</span><span className="fm-lbl">Available</span></div>
              <div className="fm-metric"><span className="fm-val">8</span><span className="fm-lbl">Taken</span></div>
            </div>
            <div className="fm-list">
              <h4>Upcoming Leave</h4>
              <div className="fm-list-item"><span>Oct 28 - Oct 30</span><span className="fm-badge done">APPROVED</span></div>
            </div>
          </div>
        );
      case 'availability':
        return (
          <div className="fm-content">
            <div className="fm-alert-box success">
              <Clock size={20} />
              <div>
                <strong style={{color:'#fff'}}>Currently On-Call</strong>
                <p>Your shift ends at 04:00 PM today.</p>
              </div>
            </div>
            <div className="fm-list">
              <h4>Next Shift</h4>
              <div className="fm-list-item"><span>Tomorrow, 08:00 AM - 04:00 PM</span><span className="fm-badge upcoming">WARD 4</span></div>
            </div>
          </div>
        );
      default:
        return <div>No summary available.</div>;
    }
  };

  const titles: Record<string, string> = {
    'appointments': 'Appointments Summary',
    'patient-lookup': 'Quick Lookup',
    'prescriptions': 'Prescriptions Dashboard',
    'bed-overview': 'Bed Allocation Summary',
    'leave-mgmt': 'Leave Balance Check',
    'availability': 'My Schedule & Status',
  };

  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div className="appt-modal-content feature-modal" onClick={(e) => e.stopPropagation()}>
        <div className="appt-modal-header">
          <h2>{titles[featureId] || 'Summary'}</h2>
          <button className="appt-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="appt-modal-body">
          {renderContent()}
        </div>
        <div className="appt-modal-footer">
          <button className="appt-modal-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
