import { useState } from 'react';
import AppointmentSummaryModal from './AppointmentSummaryModal';
import {
  CheckCircle2,
  Clock,
  BedDouble,
  AlertCircle,
  Plus,
  Grid2x2,
} from 'lucide-react';

/* ───── Data ───── */

interface Session {
  id: string;
  time: string;
  period: string;
  patient: string;
  type: string;
  location: string;
  status: 'served' | 'now' | 'upcoming';
}

interface BedCard {
  id: string;
  label: string;
  patient: string | null;
  admDuration: string | null;
  alert: boolean;
}

const SERVED: Session[] = [
  { id: 's1', time: '08:30', period: 'AM', patient: 'Sarah Jenkins', type: 'Post-Op Consultation', location: 'Room 301', status: 'served' },
  { id: 's2', time: '09:15', period: 'AM', patient: 'Michael Chen', type: 'Routine Lab Review', location: 'Room 204', status: 'served' },
];

const UPCOMING: Session[] = [
  { id: 'u1', time: '10:30', period: 'AM', patient: 'David Rodriguez', type: 'Acute Abdominal Pain', location: 'Room 402', status: 'now' },
  { id: 'u2', time: '11:15', period: 'AM', patient: 'Elena Gilbert', type: 'Diabetes Management', location: 'Ward B', status: 'upcoming' },
  { id: 'u3', time: '12:00', period: 'PM', patient: 'James Park', type: 'Post-Surgery Follow-up', location: 'Room 108', status: 'upcoming' },
  { id: 'u4', time: '01:30', period: 'PM', patient: 'Priya Sharma', type: 'Cardiac Assessment', location: 'Room 305', status: 'upcoming' },
  { id: 'u5', time: '02:45', period: 'PM', patient: 'Oliver Wright', type: 'Wound Care Review', location: 'Room 412', status: 'upcoming' },
];

const BEDS: BedCard[] = [
  { id: 'b101', label: 'BED 101', patient: 'John Doe', admDuration: 'ADM: 3 DAYS', alert: false },
  { id: 'b102', label: 'BED 102', patient: 'Aria Montgomery', admDuration: 'ADM: 12 HOURS', alert: false },
  { id: 'b103', label: 'BED 103', patient: null, admDuration: null, alert: false },
  { id: 'b104', label: 'BED 104', patient: 'Sam Winchester', admDuration: null, alert: true },
  { id: 'b105', label: 'BED 105', patient: 'Hannah Baker', admDuration: 'ADM: 5 DAYS', alert: false },
  { id: 'b106', label: 'BED 106', patient: null, admDuration: null, alert: false },
];

/* ───── Component ───── */

export default function DailySchedule() {
  const [selectedAppt, setSelectedAppt] = useState<any>(null);
  const [sessions] = useState({ served: SERVED, upcoming: UPCOMING });

  return (
    <div className="ds-layout">
      {/* ── LEFT: Schedule ── */}
      <div className="ds-left">
        {/* Served Today */}
        <div className="ds-section">
          <div className="ds-section-label">Served Today</div>
          {sessions.served.map((s) => (
            <div key={s.id} className="ds-session-card served" onClick={() => setSelectedAppt(s)} style={{cursor:"pointer"}}>
              <div className="ds-time">
                <span className="ds-time-value">{s.time}</span>
                <span className="ds-time-period">{s.period}</span>
              </div>
              <div className="ds-session-info">
                <span className="ds-patient-name">{s.patient}</span>
                <span className="ds-session-type">{s.type}</span>
              </div>
              <div className="ds-session-end">
                <CheckCircle2 size={18} className="ds-check-icon" />
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="ds-section">
          <div className="ds-section-label">Upcoming Sessions</div>
          {sessions.upcoming.map((s) => (
            <div
              key={s.id}
              className={`ds-session-card ${s.status === 'now' ? 'now' : 'upcoming'}`} onClick={() => setSelectedAppt(s)} style={{cursor:"pointer"}}
            >
              <div className="ds-time">
                <span className={`ds-time-value ${s.status === 'now' ? 'now-time' : ''}`}>
                  {s.time}
                </span>
                <span className={`ds-time-period ${s.status === 'now' ? 'now-label' : ''}`}>
                  {s.status === 'now' ? 'NOW' : s.period}
                </span>
              </div>
              <div className="ds-session-info">
                <span className="ds-patient-name">{s.patient}</span>
                <span className="ds-session-type">
                  <Clock size={12} /> {s.type} • {s.location}
                </span>
              </div>
              <div className="ds-session-end">
                {s.status === 'now' ? (
                  <button className="ds-start-btn">Start Session</button>
                ) : (
                  <CheckCircle2 size={18} className="ds-pending-icon" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Ward Status ── */}
      <div className="ds-right">
        <div className="ds-ward-header">
          <h2 className="section-title">Ward Status</h2>
          <span className="ds-ward-badge">8/12 Occupied</span>
        </div>

        <div className="ds-bed-grid">
          {BEDS.map((bed) => (
            <div
              key={bed.id}
              className={`ds-bed-card ${bed.patient ? 'occupied' : 'available'} ${bed.alert ? 'alert' : ''}`}
            >
              <div className="ds-bed-top">
                <span className="ds-bed-label">{bed.label}</span>
                {bed.patient && <BedDouble size={14} className="ds-bed-icon" />}
                {bed.alert && <AlertCircle size={14} className="ds-alert-icon" />}
              </div>
              {bed.patient ? (
                <>
                  <span className="ds-bed-patient">{bed.patient}</span>
                  {bed.alert ? (
                    <span className="ds-bed-alert-text">Critical Alert</span>
                  ) : (
                    <span className="ds-bed-adm">{bed.admDuration}</span>
                  )}
                </>
              ) : (
                <div className="ds-bed-available">
                  <Plus size={14} />
                  <span>Available</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="ds-full-ward-btn">
          <Grid2x2 size={14} /> Full Ward View
        </button>
      </div>
      <AppointmentSummaryModal appointment={selectedAppt} onClose={() => setSelectedAppt(null)} />
    </div>
  );
}
