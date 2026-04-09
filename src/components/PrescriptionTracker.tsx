import { useState } from 'react';
import { Pill, Search, CheckCircle, XCircle, FileText, AlertTriangle, Activity } from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  status: 'Active' | 'Low Stock' | 'Expiring Soon';
  prescribedBy: string;
}

interface RefillRequest {
  id: string;
  patientName: string;
  medication: string;
  requestedDate: string;
  reason: string;
}

const mockPrescriptions: Prescription[] = [
  { id: 'RX-1049', patientName: 'Julian S. Vance', medication: 'Amoxicillin', dosage: '500mg', frequency: 'Twice Daily', status: 'Active', prescribedBy: 'Dr. Aris Thorne' },
  { id: 'RX-2291', patientName: 'Elias Vancamp', medication: 'Albuterol Sulfate', dosage: '90mcg', frequency: 'Every 4-6 hours', status: 'Low Stock', prescribedBy: 'Dr. Sarah Jenkins' },
  { id: 'RX-3104', patientName: 'Sarah Jenkins', medication: 'Ibuprofen', dosage: '800mg', frequency: 'As needed', status: 'Expiring Soon', prescribedBy: 'Dr. Aris Thorne' },
  { id: 'RX-0982', patientName: 'Michael Chen', medication: 'Lisinopril', dosage: '20mg', frequency: 'Once Daily', status: 'Active', prescribedBy: 'Dr. Alan Grant' },
  { id: 'RX-4421', patientName: 'Elena Gilbert', medication: 'Vancomycin', dosage: '1g', frequency: 'Every 12 hours (IV)', status: 'Active', prescribedBy: 'Dr. Aris Thorne' },
];

export default function PrescriptionTracker() {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'REFILLS'>('ACTIVE');
  const [search, setSearch] = useState('');
  
  const [refills, setRefills] = useState<RefillRequest[]>([
    { id: 'REF-001', patientName: 'Alexander Maxwell', medication: 'Metoprolol', requestedDate: 'Today, 09:30 AM', reason: 'Running out of 30-day supply. Blood pressure slightly elevated.' },
    { id: 'REF-002', patientName: 'Clara Mendez', medication: 'Sertraline', requestedDate: 'Yesterday, 04:15 PM', reason: 'Routine refill request.' },
    { id: 'REF-003', patientName: 'Julian S. Vance', medication: 'Amoxicillin', requestedDate: 'Today, 11:20 AM', reason: 'Symptoms persisting, requesting second course.' },
    { id: 'REF-004', patientName: 'Marcus Chen', medication: 'Insulin Glargine', requestedDate: 'Today, 01:05 PM', reason: 'Regular monthly refill for Type 1 Diabetes management.' },
    { id: 'REF-005', patientName: 'Lena Fischer', medication: 'Simvastatin', requestedDate: 'Yesterday, 10:45 AM', reason: 'Pharmacy requested authorization for 90-day supply.' }
  ]);

  const handleApproveRefill = (id: string) => {
    setRefills(refills.filter(r => r.id !== id));
  };

  const handleDenyRefill = (id: string) => {
    setRefills(refills.filter(r => r.id !== id));
  };

  return (
    <div className="pd-container relative">
      <div className="pd-header-area">
        <div className="pd-title-group">
          <h1 className="pd-heading">Pharmacy Tracker</h1>
          <p className="pd-subtitle">Monitor clinical prescriptions, track inventory warnings, and authorize refills.</p>
        </div>
      </div>

      <div className="stats-strip" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Active Issued</span>
            <div className="stat-card-icon purple"><FileText size={20} /></div>
          </div>
          <div className="stat-card-number purple-text">1,248</div>
          <div className="stat-card-footer">
            <span className="stat-badge info">Normal</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Pending Refills</span>
            <div className="stat-card-icon amber"><Activity size={20} /></div>
          </div>
          <div className="stat-card-number amber-text">{refills.length}</div>
          <div className="stat-card-footer">
            <span className="stat-badge warning">Action Required</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-label">Stock Warnings</span>
            <div className="stat-card-icon" style={{background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444'}}><AlertTriangle size={20} /></div>
          </div>
          <div className="stat-card-number" style={{color: '#ef4444'}}>14</div>
          <div className="stat-card-footer">
            <span className="stat-badge critical">Critical Level</span>
          </div>
        </div>
      </div>

      <div className="pd-controls">
        <div className="pd-search-box">
          <Search size={16} className="pd-search-icon" />
          <input 
            type="text" 
            placeholder="Search medication or patient..." 
            className="pd-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="pd-tabs">
          <button className={`pd-tab-btn ${activeTab === 'ACTIVE' ? 'active' : ''}`} onClick={() => setActiveTab('ACTIVE')}>ALL ACTIVE</button>
          <button className={`pd-tab-btn ${activeTab === 'REFILLS' ? 'active' : ''}`} onClick={() => setActiveTab('REFILLS')}>REFILL INBOX <span style={{background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '10px', marginLeft: '6px'}}>{refills.length}</span></button>
        </div>
      </div>

      {activeTab === 'ACTIVE' ? (
        <div className="pd-table-card">
          <table className="pd-table">
            <thead>
              <tr>
                <th>MEDICATION</th>
                <th>PATIENT</th>
                <th>DOSAGE & FREQUENCY</th>
                <th>STATUS</th>
                <th>PRESCRIBER</th>
              </tr>
            </thead>
            <tbody>
              {mockPrescriptions.filter(rx => rx.medication.toLowerCase().includes(search.toLowerCase()) || rx.patientName.toLowerCase().includes(search.toLowerCase())).map(rx => (
                <tr key={rx.id} className="pd-row">
                  <td>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <Pill size={16} className={rx.status === 'Low Stock' ? 'text-red-400' : 'text-purple-400'} />
                      <span className="pd-name" style={{fontSize: '14px'}}>{rx.medication}</span>
                    </div>
                  </td>
                  <td>{rx.patientName}</td>
                  <td>
                    <div className="pd-cell-adm">
                      <span className="pd-adm-date" style={{color: 'white'}}>{rx.dosage}</span>
                      <span className="pd-adm-loc">{rx.frequency}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`pd-status-pill ${rx.status === 'Active' ? 'inpatient' : rx.status === 'Low Stock' ? 'critical' : 'observation'}`}>
                      {rx.status}
                    </span>
                  </td>
                  <td>{rx.prescribedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="pd-requests-container">
          {refills.length === 0 ? (
            <div className="pd-empty-state">
              <CheckCircle size={48} style={{margin: '0 auto 16px', opacity: 0.3}} />
              <h3>Inbox Cleared</h3>
              <p>No pending refill authorization requests.</p>
            </div>
          ) : (
            refills.map(req => (
              <div key={req.id} className="pd-request-card">
                <div className="pd-req-info">
                  <div className="pd-req-header">
                    <span className="pd-req-name">{req.patientName}</span>
                    <span className="dot">•</span>
                    <span className="pd-req-meta" style={{color: '#c084fc', fontWeight: 'bold'}}>{req.medication}</span>
                  </div>
                  <div className="pd-req-date">{req.requestedDate}</div>
                  <div className="pd-req-cond">{req.reason}</div>
                </div>
                <div className="pd-req-actions">
                  <button className="pd-req-btn decline" onClick={() => handleDenyRefill(req.id)}>
                    <XCircle size={16} /> Deny
                  </button>
                  <button className="pd-req-btn approve" onClick={() => handleApproveRefill(req.id)}>
                    <CheckCircle size={16} /> Authorize Refill
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}