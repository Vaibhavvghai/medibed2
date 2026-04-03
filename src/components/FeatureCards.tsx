import {
  CalendarDays,
  Search,
  Pill,
  BedDouble,
  CalendarOff,
  Clock,
  ChevronRight,
} from 'lucide-react';

const features = [
  {
    id: 'appointments',
    title: 'Appointments',
    desc: 'View & manage today\'s schedule',
    Icon: CalendarDays,
    action: 'Open Schedule',
  },
  {
    id: 'patient-lookup',
    title: 'Patient Lookup',
    desc: 'Search records & history',
    Icon: Search,
    action: 'Search Now',
  },
  {
    id: 'prescriptions',
    title: 'Prescriptions',
    desc: 'Review & approve pending Rx',
    Icon: Pill,
    action: 'View Pending',
  },
  {
    id: 'bed-overview',
    title: 'Bed Overview',
    desc: 'Ward map & bed availability',
    Icon: BedDouble,
    action: 'View Map',
  },
  {
    id: 'leave-mgmt',
    title: 'Leave Mgmt',
    desc: 'Request & track leaves',
    Icon: CalendarOff,
    action: 'Manage Leave',
  },
  {
    id: 'availability',
    title: 'Availability',
    desc: 'Set your on-call hours',
    Icon: Clock,
    action: 'Set Hours',
  },
];

export default function FeatureCards() {
  return (
    <div className="feature-cards">
      {features.map((f) => (
        <div className="feature-card" key={f.id} id={`feature-${f.id}`}>
          <div className="feature-card-icon">
            <f.Icon size={18} />
          </div>
          <div className="feature-card-title">{f.title}</div>
          <div className="feature-card-desc">{f.desc}</div>
          <button className="feature-card-btn">
            {f.action} <ChevronRight size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
