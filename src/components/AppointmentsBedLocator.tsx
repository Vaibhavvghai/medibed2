import { useState, useMemo } from 'react';
import AppointmentSummaryModal from './AppointmentSummaryModal';
import {
  Search,
  CalendarDays,
  MapPin,
  ChevronUp,
  ChevronDown,
  Filter,
  Expand,
  Shrink,
} from 'lucide-react';

/* ───── Data ───── */

interface Appointment {
  id: string;
  patient: string;
  age: number;
  time: string;
  status: 'Pending' | 'In Progress' | 'Done';
  bedId: string;        // room-bed  e.g. "301-A"
  ward: string;
}

interface Bed {
  id: string;           // "301-A"
  room: string;
  label: string;        // display label
  occupied: boolean;
  patientName: string | null;
  ward: string;
}

const APPOINTMENTS: Appointment[] = [
  { id: 'a1', patient: 'Julian S. Vance', age: 42, time: '08:00 AM', status: 'In Progress', bedId: 'ICU-101', ward: 'ICU (Intensive Care)' },
  { id: 'a2', patient: 'Elias Vancamp', age: 58, time: '08:30 AM', status: 'Pending', bedId: 'ICU-102', ward: 'ICU (Intensive Care)' },
  { id: 'a3', patient: 'Clara Mendez', age: 31, time: '09:00 AM', status: 'Done', bedId: 'GEN-A01', ward: 'General Ward A' },
  { id: 'a4', patient: 'Ravi Kapoor', age: 67, time: '09:30 AM', status: 'Pending', bedId: 'GEN-A02', ward: 'General Ward A' },
  { id: 'a5', patient: 'Sofia Laurent', age: 28, time: '10:00 AM', status: 'In Progress', bedId: 'ICU-103', ward: 'ICU (Intensive Care)' },
  { id: 'a6', patient: 'Marcus Chen', age: 45, time: '10:30 AM', status: 'Pending', bedId: 'GEN-A03', ward: 'General Ward A' },
  { id: 'a7', patient: 'Amara Osei', age: 53, time: '11:00 AM', status: 'Done', bedId: 'GEN-B01', ward: 'General Ward B' },
  { id: 'a8', patient: 'Dmitri Volkov', age: 36, time: '11:30 AM', status: 'Pending', bedId: 'GEN-B02', ward: 'General Ward B' },
  { id: 'a9', patient: 'Lena Fischer', age: 49, time: '12:00 PM', status: 'In Progress', bedId: 'ICU-104', ward: 'ICU (Intensive Care)' },
  { id: 'a10', patient: 'Kai Tanaka', age: 24, time: '12:30 PM', status: 'Pending', bedId: 'GEN-B03', ward: 'General Ward B' },
];

const WARDS = ['ICU (Intensive Care)', 'General Ward A', 'General Ward B', 'Maternity', 'Pediatrics'];

function generateBeds(): Bed[] {
  const beds: Bed[] = [];
  const occupiedMap: Record<string, string> = {};
  APPOINTMENTS.forEach((a) => { occupiedMap[a.bedId] = a.patient; });

  if (!occupiedMap['MAT-201']) occupiedMap['MAT-201'] = 'Emily Blunt';
  if (!occupiedMap['PED-304']) occupiedMap['PED-304'] = 'Timmy Turner';
  if (!occupiedMap['GEN-B05']) occupiedMap['GEN-B05'] = 'Jane Smith';

  const wardRooms: Record<string, string[][]> = {
    'ICU (Intensive Care)': [['ICU-101', 'ICU-102', 'ICU-103', 'ICU-104'], ['ICU-105', 'ICU-106', 'ICU-107']],
    'General Ward A': [['GEN-A01', 'GEN-A02'], ['GEN-A03', 'GEN-A04'], ['GEN-A05', 'GEN-A06'], ['GEN-A07', 'GEN-A08']],
    'General Ward B': [['GEN-B01', 'GEN-B02'], ['GEN-B03', 'GEN-B04'], ['GEN-B05', 'GEN-B06']],
    'Maternity': [['MAT-201', 'MAT-202'], ['MAT-203', 'MAT-204']],
    'Pediatrics': [['PED-301', 'PED-302', 'PED-303'], ['PED-304', 'PED-305']]
  };

  for (const [ward, rooms] of Object.entries(wardRooms)) {
    for (const room of rooms) {
      for (const bedId of room) {
        beds.push({
          id: bedId,
          room: bedId.split('-')[0],
          label: bedId,
          occupied: !!occupiedMap[bedId],
          patientName: occupiedMap[bedId] || null,
          ward,
        });
      }
    }
  }
  return beds;
}

const ALL_BEDS = generateBeds();

/* ───── Sort helpers ───── */

type SortKey = 'patient' | 'age' | 'time' | 'status';
type SortDir = 'asc' | 'desc';

const statusOrder: Record<string, number> = { 'In Progress': 0, Pending: 1, Done: 2 };

function timeToMinutes(t: string): number {
  const [hm, period] = t.split(' ');
  let [h, m] = hm.split(':').map(Number);
  if (period === 'PM' && h !== 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

/* ───── Component ───── */

export default function AppointmentsBedLocator() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [wardFilter, setWardFilter] = useState<string>('All');
  const [sortKey, setSortKey] = useState<SortKey>('time');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [highlightedBed, setHighlightedBed] = useState<string | null>(null);
  const [hoveredBed, setHoveredBed] = useState<string | null>(null);
  const [isFullView, setIsFullView] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<any>(null);

  /* ── Sorting ── */
  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} style={{ opacity: 0.25 }} />;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  /* ── Filtered & sorted appointments ── */
  const appointments = useMemo(() => {
    let list = [...APPOINTMENTS];

    // search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patient.toLowerCase().includes(q) ||
          a.bedId.toLowerCase().includes(q),
      );
    }

    // status filter
    if (statusFilter !== 'All') {
      list = list.filter((a) => a.status === statusFilter);
    }

    // sort
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'patient':
          cmp = a.patient.localeCompare(b.patient);
          break;
        case 'age':
          cmp = a.age - b.age;
          break;
        case 'time':
          cmp = timeToMinutes(a.time) - timeToMinutes(b.time);
          break;
        case 'status':
          cmp = statusOrder[a.status] - statusOrder[b.status];
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [search, statusFilter, sortKey, sortDir]);

  /* ── Filtered beds by ward ── */
  const beds = useMemo(() => {
    if (wardFilter === 'All') return ALL_BEDS;
    return ALL_BEDS.filter((b) => b.ward === wardFilter);
  }, [wardFilter]);

  const visibleWards = useMemo(() => {
    if (wardFilter === 'All') return WARDS;
    return [wardFilter];
  }, [wardFilter]);

  /* ── Locate handler ── */
  function handleLocate(bedId: string, ward: string) {
    setHighlightedBed(bedId);
    if (wardFilter !== 'All' && wardFilter !== ward) {
      setWardFilter(ward);
    }
  }

  /* ── Status badge class ── */
  function statusClass(s: string) {
    if (s === 'In Progress') return 'in-progress';
    return s.toLowerCase();
  }

  return (
    <div className="abl-page">
      {/* ── Top Filters ── */}
      <div className="abl-filters">
        <div className="abl-search">
          <Search size={15} className="abl-search-icon" />
          <input
            id="appointment-search"
            type="text"
            placeholder="Search patient or bed…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="abl-filter-group">
          <Filter size={14} />
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="abl-filter-group">
          <CalendarDays size={14} />
          <input type="date" id="date-filter" defaultValue="2026-04-03" />
        </div>

        <div className="abl-filter-group">
          <MapPin size={14} />
          <select
            id="ward-filter"
            value={wardFilter}
            onChange={(e) => setWardFilter(e.target.value)}
          >
            <option value="All">All Wards</option>
            {WARDS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Split Panel ── */}
      <div className="abl-split">
        {/* LEFT — Appointments table */}
        {!isFullView && (
        <div className="abl-left">
          <div className="abl-left-header">
            <h2 className="section-title">Appointments</h2>
            <span className="abl-count">{appointments.length} results</span>
          </div>

          <div className="abl-table-wrap">
            <table className="abl-table">
              <thead>
                <tr>
                  <th onClick={() => toggleSort('patient')}>
                    Patient <SortIcon col="patient" />
                  </th>
                  <th onClick={() => toggleSort('age')}>
                    Age <SortIcon col="age" />
                  </th>
                  <th onClick={() => toggleSort('time')}>
                    Time <SortIcon col="time" />
                  </th>
                  <th onClick={() => toggleSort('status')}>
                    Status <SortIcon col="status" />
                  </th>
                  <th>Bed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedAppt(a)}
                    style={{cursor:"pointer"}}
                    className={highlightedBed === a.bedId ? 'row-highlight' : ''}
                  >
                    <td className="td-patient">{a.patient}</td>
                    <td>{a.age}</td>
                    <td>{a.time}</td>
                    <td>
                      <span className={`appt-badge ${statusClass(a.status)}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="td-bed">{a.bedId}</td>
                    <td>
                      <button
                        className="locate-btn"
                        onClick={(e) => { e.stopPropagation(); handleLocate(a.bedId, a.ward); }}
                      >
                        <MapPin size={13} /> Locate
                      </button>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="td-empty">
                      No appointments match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* RIGHT — Bed Map */}
        <div className="abl-right">
          <div className="abl-right-header">
            <h2 className="section-title" style={{display:'flex', alignItems:'center', gap:'10px'}}>
              Bed Map
              <button 
                onClick={() => setIsFullView(!isFullView)} 
                style={{display:'flex', alignItems:'center', gap:'6px', background:'var(--purple-primary)', color:'white', border:'none', padding:'4px 10px', borderRadius:'6px', cursor:'pointer', fontSize:'12px'}}
              >
                {isFullView ? <><Shrink size={14} /> Split View</> : <><Expand size={14} /> Full Ward View</>}
              </button>
            </h2>
            <div className="bed-legend">
              <span className="legend-item">
                <span className="legend-dot available" /> Available
              </span>
              <span className="legend-item">
                <span className="legend-dot occupied" /> Occupied
              </span>
              <span className="legend-item">
                <span className="legend-dot highlighted" /> Located
              </span>
            </div>
          </div>

          <div className="bed-map-container">
            {visibleWards.map((ward) => {
              const wardBeds = beds.filter((b) => b.ward === ward);
              return (
                <div className="ward-section" key={ward}>
                  <div className="ward-label">{ward}</div>
                  <div className="bed-grid">
                    {wardBeds.map((bed) => {
                      const isHighlighted = highlightedBed === bed.id;
                      const isHovered = hoveredBed === bed.id;

                      let bedClass = 'bed-cell';
                      if (isHighlighted) bedClass += ' highlighted';
                      else if (bed.occupied) bedClass += ' occupied';
                      else bedClass += ' available';

                      return (
                        <div
                          key={bed.id}
                          className={bedClass}
                          style={isFullView ? { height: '80px', width: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } : {}}
                          onMouseEnter={() => setHoveredBed(bed.id)}
                          onMouseLeave={() => setHoveredBed(null)}
                          onClick={() => setHighlightedBed(bed.id === highlightedBed ? null : bed.id)}
                        >
                          <span className="bed-room" style={isFullView ? {fontSize: '14px', fontWeight: 'bold', marginBottom: '4px'} : {}}>{bed.label}</span>
                          
                          {/* Hover Tooltip when not in full view */}
                          {!isFullView && bed.occupied && isHovered && (
                            <div className="bed-tooltip">{bed.patientName}</div>
                          )}

                          {/* Persistent text when IN full view */}
                          {isFullView && bed.occupied && (
                            <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.9)', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px', maxWidth: '90%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                              {bed.patientName}
                            </div>
                          )}

                          {isHighlighted && bed.patientName && !isFullView && (
                            <span className="bed-patient-tag">{bed.patientName}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      <AppointmentSummaryModal appointment={selectedAppt} onClose={() => setSelectedAppt(null)} />
    </div>
  );
}
