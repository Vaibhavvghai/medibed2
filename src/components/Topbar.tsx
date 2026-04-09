import { useState, useRef, useEffect } from 'react';
import { Search, Settings, Bell, Grid2x2, User, FileText, Pill } from 'lucide-react';

export default function Topbar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = [
    { id: 1, type: 'Patient', text: 'Julian S. Vance', subtext: 'Room 301 • O Positive', icon: User },
    { id: 2, type: 'Patient', text: 'Clara Mendez', subtext: 'Room 401 • Post-Op', icon: User },
    { id: 3, type: 'Patient', text: 'Elias Vancamp', subtext: 'Room 402 • ICU', icon: User },
    { id: 4, type: 'Lab', text: 'Complete Blood Count (CBC)', subtext: 'Pending results for E. Vancamp', icon: FileText },
    { id: 5, type: 'Lab', text: 'Metabolic Panel', subtext: 'Urgent request for Clara M.', icon: FileText },
    { id: 6, type: 'Lab', text: 'Lipid Profile', subtext: 'Pending results for Julian S.', icon: FileText },
    { id: 7, type: 'Medicine', text: 'Amoxicillin 500mg', subtext: 'Pending signature', icon: Pill },
    { id: 8, type: 'Medicine', text: 'Lisinopril 10mg', subtext: 'Prescribed to Sarah J.', icon: Pill },
    { id: 9, type: 'Medicine', text: 'Ibuprofen 400mg', subtext: 'Administered 2h ago', icon: Pill },
  ].filter(r => r.text.toLowerCase().includes(query.toLowerCase()) || r.type.toLowerCase().includes(query.toLowerCase()));

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Clinical Intelligence</h2>
        <div className="topbar-search-container" ref={searchRef}>
          <div className="topbar-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search patient name, labs, medicine, etc..."
              id="global-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              autoComplete="off"
            />
          </div>
          {isFocused && query.length > 0 && (
            <div className="search-dropdown">
              {results.length > 0 ? (
                results.map((r) => (
                  <div className="search-result-item" key={r.id}>
                    <div className="search-result-icon"><r.icon size={16} /></div>
                    <div className="search-result-content">
                      <div className="search-result-title">{r.text}</div>
                      <div className="search-result-sub">{r.type} • {r.subtext}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-no-results">No matches found for "{query}"</div>
              )}
            </div>
          )}
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
