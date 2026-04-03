import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CalendarOff,
  Clock,
  ToggleLeft,
  ToggleRight,
  X,
} from 'lucide-react';

/* ───── Types ───── */

type DayStatus = 'working' | 'off' | 'holiday' | null;

interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface Holiday {
  date: string;
  name: string;
  status: 'Approved' | 'Pending';
}

/* ───── Helpers ───── */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // convert to Mon=0
}

/* ───── Component ───── */

export default function AvailabilityCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [isAvailable, setIsAvailable] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);

  // Leave form
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveType, setLeaveType] = useState<'leave' | 'holiday'>('leave');

  // Working hours form
  const [workStart, setWorkStart] = useState('08:00');
  const [workEnd, setWorkEnd] = useState('17:00');
  const [workDays, setWorkDays] = useState([true, true, true, true, true, false, false]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'l1', startDate: '2026-04-10', endDate: '2026-04-12', reason: 'Family event', status: 'Pending' },
    { id: 'l2', startDate: '2026-03-15', endDate: '2026-03-15', reason: 'Medical appointment', status: 'Approved' },
  ]);

  const holidays: Holiday[] = [
    { date: 'Dec 25', name: 'Christmas', status: 'Approved' },
    { date: 'Dec 26', name: 'Boxing Day', status: 'Pending' },
    { date: 'Jan 1', name: 'New Year', status: 'Approved' },
  ];

  /* ── Calendar grid ── */
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: { day: number | null; status: DayStatus }[] = [];

    // leading blanks
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: null, status: null });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dow = date.getDay();

      // Check if day falls in a leave request
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isOnLeave = leaveRequests.some(
        (lr) => lr.status !== 'Rejected' && dateStr >= lr.startDate && dateStr <= lr.endDate
      );

      if (isOnLeave) {
        cells.push({ day: d, status: 'holiday' });
      } else if (dow === 0 || dow === 6) {
        cells.push({ day: d, status: 'off' });
      } else {
        cells.push({ day: d, status: 'working' });
      }
    }

    return cells;
  }, [year, month, leaveRequests]);

  /* ── Nav ── */
  function prevMonth() {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  }

  function nextMonth() {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  }

  /* ── Submit leave ── */
  function submitLeave() {
    if (!leaveStart || !leaveEnd || !leaveReason) return;
    setLeaveRequests((prev) => [
      {
        id: `l${Date.now()}`,
        startDate: leaveStart,
        endDate: leaveEnd,
        reason: leaveReason,
        status: 'Pending',
      },
      ...prev,
    ]);
    setLeaveStart('');
    setLeaveEnd('');
    setLeaveReason('');
    setShowLeaveModal(false);
  }

  /* ── Stats ── */
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;

  function toggleWorkDay(i: number) {
    setWorkDays((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="av-layout">
      {/* ── LEFT: Calendar ── */}
      <div className="av-left">
        {/* Month nav */}
        <div className="av-month-nav">
          <button className="av-arrow" onClick={prevMonth} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <span className="av-month-label">{MONTHS[month]} {year}</span>
          <button className="av-arrow" onClick={nextMonth} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="av-weekdays">
          {WEEKDAYS.map((d) => (
            <span key={d} className="av-weekday">{d}</span>
          ))}
        </div>

        {/* Day grid */}
        <div className="av-grid">
          {calendarDays.map((cell, i) => (
            <div
              key={i}
              className={`av-day ${cell.status || 'empty'} ${cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? 'today' : ''}`}
            >
              {cell.day !== null && (
                <>
                  <span className="av-day-num">{cell.day}</span>
                  <span className="av-day-status">
                    {cell.status === 'working' ? 'WORKING' : cell.status === 'off' ? 'OFF' : cell.status === 'holiday' ? 'HOLIDAY' : ''}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Actions & info ── */}
      <div className="av-right">
        {/* Quick Actions */}
        <div className="av-section">
          <div className="av-section-title">Quick Actions</div>
          <button className="av-action-btn" onClick={() => { setLeaveType('leave'); setShowLeaveModal(true); }}>
            <CalendarOff size={14} /> Apply for Leave/Holiday
          </button>
          <button className="av-action-btn" onClick={() => setShowHoursModal(true)}>
            <Clock size={14} /> Set Recurring Working Hours
          </button>
          <button
            className={`av-action-btn toggle-btn ${isAvailable ? 'on' : 'off-toggle'}`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            {isAvailable ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
            Toggle Availability Status
            <span className={`toggle-status ${isAvailable ? 'on' : 'off-toggle'}`}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </button>
        </div>

        {/* Upcoming Holidays */}
        <div className="av-section">
          <div className="av-section-title">Upcoming Holidays</div>
          {holidays.map((h, i) => (
            <div key={i} className="av-holiday-row">
              <span className={`av-holiday-dot ${h.status === 'Approved' ? 'approved' : 'pending'}`} />
              <div className="av-holiday-info">
                <span className="av-holiday-name">{h.date}: {h.name}</span>
                <span className={`av-holiday-status ${h.status.toLowerCase()}`}>
                  [{h.status}]
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Requests */}
        <div className="av-section">
          <div className="av-section-title">My Leave Requests</div>
          {leaveRequests.map((lr) => (
            <div key={lr.id} className="av-leave-row">
              <div className="av-leave-dates">
                {lr.startDate === lr.endDate ? lr.startDate : `${lr.startDate} → ${lr.endDate}`}
              </div>
              <div className="av-leave-reason">{lr.reason}</div>
              <span className={`av-leave-status ${lr.status.toLowerCase()}`}>
                {lr.status}
              </span>
            </div>
          ))}
        </div>

        {/* Availability Statistics */}
        <div className="av-section">
          <div className="av-section-title">Availability Statistics</div>
          <div className="av-stats-row">
            <div className="av-stat-box">
              <span className="av-stat-label">Approved Leave</span>
              <span className="av-stat-value">{approvedLeaves} Days</span>
            </div>
            <div className="av-stat-box">
              <span className="av-stat-label">Pending</span>
              <span className="av-stat-value">{pendingLeaves} Days</span>
            </div>
            <div className="av-stat-box">
              <span className="av-stat-label">Holiday Balance</span>
              <span className="av-stat-value">5 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Leave Modal ── */}
      {showLeaveModal && (
        <div className="modal-overlay" onClick={() => setShowLeaveModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Apply for {leaveType === 'leave' ? 'Leave' : 'Holiday'}</h3>
              <button className="modal-close" onClick={() => setShowLeaveModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Type</label>
                <select value={leaveType} onChange={(e) => setLeaveType(e.target.value as 'leave' | 'holiday')}>
                  <option value="leave">Personal Leave</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>
              <div className="modal-field">
                <label>Start Date</label>
                <input type="date" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} />
              </div>
              <div className="modal-field">
                <label>End Date</label>
                <input type="date" value={leaveEnd} onChange={(e) => setLeaveEnd(e.target.value)} />
              </div>
              <div className="modal-field">
                <label>Reason</label>
                <textarea
                  rows={3}
                  placeholder="Enter reason for leave…"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setShowLeaveModal(false)}>Cancel</button>
              <button className="modal-submit" onClick={submitLeave}>Submit Request</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Working Hours Modal ── */}
      {showHoursModal && (
        <div className="modal-overlay" onClick={() => setShowHoursModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Set Recurring Working Hours</h3>
              <button className="modal-close" onClick={() => setShowHoursModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-row">
                <div className="modal-field half">
                  <label>Start Time</label>
                  <input type="time" value={workStart} onChange={(e) => setWorkStart(e.target.value)} />
                </div>
                <div className="modal-field half">
                  <label>End Time</label>
                  <input type="time" value={workEnd} onChange={(e) => setWorkEnd(e.target.value)} />
                </div>
              </div>
              <div className="modal-field">
                <label>Working Days</label>
                <div className="modal-days">
                  {WEEKDAYS.map((d, i) => (
                    <button
                      key={d}
                      className={`modal-day-btn ${workDays[i] ? 'active' : ''}`}
                      onClick={() => toggleWorkDay(i)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={() => setShowHoursModal(false)}>Cancel</button>
              <button className="modal-submit" onClick={() => setShowHoursModal(false)}>Save Hours</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
