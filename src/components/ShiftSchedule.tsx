const shifts = [
  {
    time: '03:30 AM',
    name: 'Patient Transfer - ICU',
    desc: 'Ward 4B to Trauma Unit',
    dotColor: 'purple' as const,
  },
  {
    time: '04:15 AM',
    name: 'Medication Audit',
    desc: 'Controlled substances inventory',
    dotColor: 'muted' as const,
  },
  {
    time: '05:00 AM',
    name: 'Shift Briefing',
    desc: 'Handover with Morning Staff',
    dotColor: 'muted' as const,
  },
  {
    time: '06:30 AM',
    name: 'Ward Rounds',
    desc: 'Post-op patients check',
    dotColor: 'muted' as const,
  },
];

export default function ShiftSchedule() {
  return (
    <div className="shift-schedule">
      <div className="shift-header">
        <span className="shift-title">Shift Schedule</span>
        <span className="shift-date">Wed, Oct 24</span>
      </div>

      <div className="shift-items">
        {shifts.map((s, i) => (
          <div className="shift-item" key={i}>
            <div className={`shift-item-dot ${s.dotColor}`} />
            <div className="shift-item-content">
              <span className="shift-item-time">{s.time}</span>
              <span className="shift-item-name">{s.name}</span>
              <span className="shift-item-desc">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
