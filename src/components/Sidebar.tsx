import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Pill,
  ClockArrowUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cross,
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
  onLogout: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const mainNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'patient-history', label: 'Patient History', icon: ClockArrowUp },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
];

export default function Sidebar({ activeNav, onNavChange, onLogout, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        {onToggleCollapse && (
        <div className="sidebar-collapse-btn" onClick={onToggleCollapse}>
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </div>
      )}
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
            <span className="sidebar-nav-text">{item.label}</span>
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
          <span className="sidebar-nav-text">Settings</span>
        </button>
        <button className="sidebar-nav-item logout-item" onClick={onLogout}>
          <LogOut size={18} className="nav-icon" />
          <span className="sidebar-nav-text">Logout</span>
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
