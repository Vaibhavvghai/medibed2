import { useState } from 'react';
import DailySchedule from './DailySchedule';
import AvailabilityCalendar from './AvailabilityCalendar';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'availability'>('daily');

  return (
    <div className="appt-page">
      {/* Tab Toggle */}
      <div className="appt-tab-bar">
        <h1 className="appt-page-title">
          {activeTab === 'daily' ? 'Daily Schedule' : 'Doctor Availability'}
        </h1>
        <div className="appt-tabs">
          <button
            className={`appt-tab ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily View
          </button>
          <button
            className={`appt-tab ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => setActiveTab('availability')}
          >
            Availability
          </button>
        </div>
      </div>

      {activeTab === 'daily' && <DailySchedule />}
      {activeTab === 'availability' && <AvailabilityCalendar />}
    </div>
  );
}
