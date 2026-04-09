import { X, Clock, MapPin, User, FileText, CheckCircle2 } from 'lucide-react';

interface AppointmentSummaryProps {
  appointment: {
    patient: string;
    time: string;
    period?: string;
    type?: string;
    location?: string;
    bedId?: string;
    status: string;
    [key: string]: any;
  } | null;
  onClose: () => void;
}

export default function AppointmentSummaryModal({ appointment, onClose }: AppointmentSummaryProps) {
  if (!appointment) return null;
  return (
    <div className="appt-modal-overlay" onClick={onClose}>
      <div className="appt-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="appt-modal-header">
          <h2>Appointment Summary</h2>
          <button className="appt-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="appt-modal-body">
          <div className="appt-modal-row">
            <div className="appt-modal-icon"><User size={24} /></div>
            <div className="appt-modal-details">
              <span className="appt-modal-label">Patient Name</span>
              <span className="appt-modal-value">{appointment.patient}</span>
            </div>
          </div>
          <div className="appt-modal-row">
            <div className="appt-modal-icon"><Clock size={24} /></div>
            <div className="appt-modal-details">
              <span className="appt-modal-label">Scheduled Time</span>
              <span className="appt-modal-value">{appointment.time} {appointment.period || ''}</span>
            </div>
          </div>
          <div className="appt-modal-row">
            <div className="appt-modal-icon"><MapPin size={24} /></div>
            <div className="appt-modal-details">
              <span className="appt-modal-label">Location / Bed</span>
              <span className="appt-modal-value">{appointment.location || appointment.bedId}</span>
            </div>
          </div>
          <div className="appt-modal-row">
            <div className="appt-modal-icon"><FileText size={24} /></div>
            <div className="appt-modal-details">
              <span className="appt-modal-label">Type / Reason</span>
              <span className="appt-modal-value">{appointment.type || 'General Consultation'}</span>
            </div>
          </div>
          <div className="appt-modal-row">
            <div className="appt-modal-icon"><CheckCircle2 size={24} /></div>
            <div className="appt-modal-details">
              <span className="appt-modal-label">Status</span>
              <span className={`appt-modal-status-badge ${appointment.status.toLowerCase().replace(' ', '-')}`}>{appointment.status.toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="appt-modal-footer">
          <button className="appt-modal-btn" onClick={onClose}>Close Summary</button>
        </div>
      </div>
    </div>
  );
}
