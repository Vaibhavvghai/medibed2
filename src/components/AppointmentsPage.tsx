import { useState } from 'react';
import DailySchedule from './DailySchedule';
import AvailabilityCalendar from './AvailabilityCalendar';
import InteractivePlanner from './InteractivePlanner';
import AppointmentsBedLocator from './AppointmentsBedLocator';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'availability' | 'visual' | 'locator'>('daily');

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
          <button
            className={`appt-tab ${activeTab === 'visual' ? 'active' : ''}`}
            onClick={() => setActiveTab('visual')}
          >
            Visual Planner
          </button>
          <button
            className={`appt-tab ${activeTab === 'locator' ? 'active' : ''}`}
            onClick={() => setActiveTab('locator')}
          >
            Bed Locator
          </button>
        </div>
      </div>

      {activeTab === 'daily' && <DailySchedule />}
      {activeTab === 'availability' && <AvailabilityCalendar />}
      {activeTab === 'visual' && <InteractivePlanner />}
      {activeTab === 'locator' && <AppointmentsBedLocator />}
    </div>
  );
}
