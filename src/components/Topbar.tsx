import { Search, Settings, Bell, Grid2x2 } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Clinical Intelligence</h2>
        <div className="topbar-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search patient records, labs, or meds..."
            id="global-search"
          />
        </div>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn" id="settings-btn" aria-label="Settings">
          <Settings size={18} />
        </button>
        <button className="topbar-icon-btn" id="notifications-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="topbar-icon-btn" id="grid-btn" aria-label="Grid view">
          <Grid2x2 size={18} />
        </button>
        <button className="topbar-avatar" id="profile-btn" aria-label="Profile">
          AT
        </button>
      </div>
    </header>
  );
}
