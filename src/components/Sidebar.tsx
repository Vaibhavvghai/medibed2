import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClockArrowUp,
  Settings,
  LogOut,
  Cross,
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const mainNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'patient-history', label: 'Patient History', icon: ClockArrowUp },
];

export default function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Cross size={18} />
        </div>
        <h1>MediBed</h1>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item ${activeNav === item.id ? 'active' : ''}`}
            onClick={() => onNavChange(item.id)}
          >
            <item.icon size={18} className="nav-icon" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button 
          className={`sidebar-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
          onClick={() => onNavChange('settings')}
        >
          <Settings size={18} className="nav-icon" />
          Settings
        </button>
        <button className="sidebar-nav-item logout-item">
          <LogOut size={18} className="nav-icon" />
          Logout
        </button>
      </div>

      {/* Doctor Profile */}
      <div className="sidebar-doctor">
        <div className="sidebar-doctor-avatar">AT</div>
        <div className="sidebar-doctor-info">
          <span className="name">Dr. Aris Thorne</span>
          <span className="role">Clinical Lead · Ward 4C</span>
        </div>
      </div>
    </aside>
  );
}
