import { FlaskConical, TriangleAlert, CircleCheckBig } from 'lucide-react';

const stats = [
  {
    label: 'Pending Appointment',
    value: '12',
    iconColor: 'purple' as const,
    Icon: FlaskConical,
    badge: { text: '4 Critical', type: 'critical' as const },
    footerText: 'Updated 2m ago',
  },
  {
    label: 'Urgency Order',
    value: '03',
    valueClass: 'purple-text',
    iconColor: 'amber' as const,
    Icon: TriangleAlert,
    badge: { text: 'Immediate Action', type: 'warning' as const },
  },
  {
    label: 'To Round',
    value: '08',
    iconColor: 'teal' as const,
    Icon: CircleCheckBig,
    badge: { text: 'Next: Room 402', type: 'info' as const },
  },
];

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-card-header">
            <span className="stat-card-label">{stat.label}</span>
            <div className={`stat-card-icon ${stat.iconColor}`}>
              <stat.Icon size={20} />
            </div>
          </div>
          <div className={`stat-card-number ${stat.valueClass || ''}`}>
            {stat.value}
          </div>
          <div className="stat-card-footer">
            <span className={`stat-badge ${stat.badge.type}`}>
              {stat.badge.text}
            </span>
            {stat.footerText && (
              <span className="stat-footer-text">{stat.footerText}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
