import { ChevronRight, ExternalLink } from 'lucide-react';

const patients = [
  {
    room: '99201',
    name: 'Julian S. Vance',
    meta: '42yy • Inpatient • O Positive',
    spo2: '98%',
    bpm: '72',
    status: 'stable' as const,
    statusLabel: 'Stable',
  },
  {
    room: '402',
    name: 'Elias Vancamp',
    meta: '58yy • ICU • AB Negative',
    spo2: '91%',
    bpm: '112',
    status: 'declining' as const,
    statusLabel: 'Declining',
  },
  {
    room: '1087',
    name: 'Clara Mendez',
    meta: '31yy • Post-Op • B Positive',
    spo2: '95%',
    bpm: '88',
    status: 'stable' as const,
    statusLabel: 'Stable',
  },
];

export default function PriorityPatients() {
  return (
    <div className="priority-patients">
      <div className="section-header">
        <h2 className="section-title">Priority Patients</h2>
        <button className="view-all-link">
          View All <ExternalLink size={12} />
        </button>
      </div>

      {patients.map((p) => (
        <div className="patient-card" key={p.room}>
          <div className="patient-rm">
            <div className="patient-rm-label">RM</div>
            <div className="patient-rm-number">{p.room}</div>
          </div>
          <div className="patient-info">
            <div className="patient-name">{p.name}</div>
            <div className="patient-meta">{p.meta}</div>
          </div>
          <div className="patient-vitals">
            <div className="vital-item">
              <div className="vital-label">SpO2</div>
              <div className="vital-value">{p.spo2}</div>
            </div>
            <div className="vital-item">
              <div className="vital-label">BPM</div>
              <div className="vital-value">{p.bpm}</div>
            </div>
          </div>
          <div className="patient-status">
            <span className={`status-badge ${p.status}`}>{p.statusLabel}</span>
            <button className="patient-arrow" aria-label={`View ${p.name}`}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
