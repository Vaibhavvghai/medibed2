import { useState } from 'react';
import { Search, ArrowUpDown, Activity, MoreHorizontal, ChevronRight, Plus, X, ClipboardList, CheckCircle, XCircle } from 'lucide-react';

interface AppointmentRequest {
  id: string;
  name: string;
  age: number;
  gender: string;
  date: string;
  condition: string;
  bloodType: string;
}

interface Patient {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  age: number;
  gender: string;
  status: string;
  spo2: number;
  bpm: number;
  admission: string;
  location: string;
  bloodType: string;
  condition: string;
}

const initialMockPatients: Patient[] = [
  {
    id: '#PX-1049',
    name: 'Julian S. Vance',
    initials: 'JV',
    avatarColor: '#8b5cf6',
    age: 45,
    gender: 'Male',
    status: 'INPATIENT',
    spo2: 98,
    bpm: 72,
    admission: 'Oct 24',
    location: 'Ward 4C • Bed 202',
    bloodType: 'O+',
    condition: 'Post-operative recovery following appendectomy. Tracking pain levels and wound healing.'
  },
  {
    id: '#PX-2291',
    name: 'Elias Vancamp',
    initials: 'EV',
    avatarColor: '#ef4444',
    age: 62,
    gender: 'Male',
    status: 'INPATIENT',
    spo2: 91,
    bpm: 95,
    admission: 'Oct 25',
    location: 'Ward 3A • Bed 104',
    bloodType: 'A-',
    condition: 'Acute respiratory distress. Displaying low oxygen saturation. Requires frequent monitoring and supplemental oxygen.'
  },
  {
    id: '#PX-3104',
    name: 'Sarah Jenkins',
    initials: 'SJ',
    avatarColor: '#14b8a6',
    age: 28,
    gender: 'Female',
    status: 'OBSERVATION',
    spo2: 99,
    bpm: 68,
    admission: 'Oct 26',
    location: 'ER • Bed 4',
    bloodType: 'B+',
    condition: 'Mild concussion from minor fall. Observing for 12 hours. Neurological signs are currently stable.'
  },
  {
    id: '#PX-0982',
    name: 'Michael Chen',
    initials: 'MC',
    avatarColor: '#3b82f6',
    age: 35,
    gender: 'Male',
    status: 'OUTPATIENT',
    spo2: 98,
    bpm: 75,
    admission: 'Oct 26',
    location: 'Clinic • Room 2',
    bloodType: 'AB+',
    condition: 'Routine follow-up for chronic hypertension medication adjustment.'
  },
  {
    id: '#PX-4421',
    name: 'Elena Gilbert',
    initials: 'EG',
    avatarColor: '#ec4899',
    age: 51,
    gender: 'Female',
    status: 'INPATIENT',
    spo2: 97,
    bpm: 82,
    admission: 'Oct 22',
    location: 'Ward 4C • Bed 205',
    bloodType: 'O-',
    condition: 'Intravenous antibiotics for severe localized infection.'
  }
];

export default function PatientDirectory() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [patients, setPatients] = useState<Patient[]>(initialMockPatients);
  
  // Modal States
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPatientTreatment, setSelectedPatientTreatment] = useState<Patient | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', bloodType: 'O+', status: 'OBSERVATION', condition: ''
  });

  const tabs = ['ALL', 'INPATIENT', 'OUTPATIENT', 'OBSERVATION', 'REQUESTS'];
  const [requests, setRequests] = useState<AppointmentRequest[]>([
    {
      id: 'REQ-101',
      name: 'Oliver Queen',
      age: 39,
      gender: 'Male',
      date: 'Pending: Tomorrow Morning',
      condition: 'Experiencing severe migraines and blurred vision for the past 48 hours.',
      bloodType: 'B-'
    },
    {
      id: 'REQ-102',
      name: 'Diana Prince',
      age: 32,
      gender: 'Female',
      date: 'Pending: Next Week',
      condition: 'Routine sports physical and joint assessment requested.',
      bloodType: 'O+'
    }
  ]);

  const handleApproveRequest = (req: AppointmentRequest) => {
    const initials = req.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2) || 'XX';
    const colors = ['#8b5cf6', '#ef4444', '#14b8a6', '#3b82f6', '#ec4899', '#f59e0b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newPatient: Patient = {
      id: `#PX-${Math.floor(1000 + Math.random() * 9000)}`,
      name: req.name,
      initials,
      avatarColor: randomColor,
      age: req.age,
      gender: req.gender,
      status: 'OUTPATIENT',
      spo2: 98,
      bpm: 72,
      admission: 'Upcoming',
      location: 'Clinic • Scheduled',
      bloodType: req.bloodType,
      condition: req.condition
    };
    setPatients([newPatient, ...patients]);
    setRequests(requests.filter(r => r.id !== req.id));
  };

  const handleDeclineRequest = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate Initials and Color
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2) || 'XX';
    const colors = ['#8b5cf6', '#ef4444', '#14b8a6', '#3b82f6', '#ec4899', '#f59e0b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomId = `#PX-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPatient: Patient = {
      id: randomId,
      name: formData.name,
      initials,
      avatarColor: randomColor,
      age: parseInt(formData.age) || 0,
      gender: formData.gender,
      status: formData.status,
      spo2: 98,
      bpm: 75,
      admission: 'Today',
      location: 'Triage • Unassigned',
      bloodType: formData.bloodType,
      condition: formData.condition || 'No condition details provided.'
    };

    setPatients([newPatient, ...patients]);
    setIsRegisterOpen(false);
    setFormData({ name: '', age: '', gender: 'Male', bloodType: 'O+', status: 'OBSERVATION', condition: '' });
  };

  return (
    <div className="pd-container relative">
      {/* Header */}
      <div className="pd-header-area">
        <div className="pd-title-group">
          <h1 className="pd-heading">Patient Directory</h1>
          <p className="pd-subtitle">Manage and monitor all registered patients in the facility.</p>
        </div>
        <button className="pd-register-btn" onClick={() => setIsRegisterOpen(true)}>
          <Plus size={16} /> REGISTER PATIENT
        </button>
      </div>

      {/* Controls */}
      <div className="pd-controls">
        <div className="pd-search-box">
          <Search size={16} className="pd-search-icon" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or condition..." 
            className="pd-search-input"
          />
        </div>
        
        <div className="pd-tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`pd-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

            {/* Content Area */}
      {activeTab === 'REQUESTS' ? (
        <div className="pd-requests-container">
          {requests.length === 0 ? (
            <div className="pd-empty-state">
              <ClipboardList size={48} style={{margin: '0 auto 16px', opacity: 0.3}} />
              <h3>No Pending Requests</h3>
              <p>You have reviewed all incoming patient appointments.</p>
            </div>
          ) : (
            requests.map(req => (
              <div key={req.id} className="pd-request-card">
                <div className="pd-req-info">
                  <div className="pd-req-header">
                    <span className="pd-req-name">{req.name}</span>
                    <span className="dot">•</span>
                    <span className="pd-req-meta">{req.id} <span className="dot">•</span> {req.age} yrs {req.gender} <span className="dot">•</span> Blood: {req.bloodType}</span>
                  </div>
                  <div className="pd-req-date">{req.date}</div>
                  <div className="pd-req-cond">{req.condition}</div>
                </div>
                <div className="pd-req-actions">
                  <button className="pd-req-btn decline" onClick={() => handleDeclineRequest(req.id)}>
                    <XCircle size={16} /> Decline
                  </button>
                  <button className="pd-req-btn approve" onClick={() => handleApproveRequest(req)}>
                    <CheckCircle size={16} /> Approve & Register
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <>
      {/* Patient Table */}
      <div className="pd-table-card">
        <table className="pd-table">
          <thead>
            <tr>
              <th>
                <div className="th-flex sortable">
                  PATIENT <ArrowUpDown size={12} />
                </div>
              </th>
              <th>STATUS</th>
              <th>VITALS</th>
              <th>ADMISSION</th>
              <th>BLOOD TYPE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients
              .filter(patient => activeTab === 'ALL' || patient.status.toUpperCase() === activeTab)
              .map((patient) => {
              const isCritical = patient.spo2 <= 92;
              
              return (
                <tr key={patient.id} className="pd-row">
                  {/* Patient Info */}
                  <td>
                    <div className="pd-cell-patient">
                      <div className="pd-avatar" style={{ backgroundColor: `${patient.avatarColor}20`, color: patient.avatarColor }}>
                        {patient.initials}
                      </div>
                      <div className="pd-patient-details">
                        <span className="pd-name">{patient.name}</span>
                        <div className="pd-patient-meta">
                          {patient.id} <span className="dot">•</span> {patient.age} yrs {patient.gender}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`pd-status-pill ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>

                  {/* Vitals */}
                  <td>
                    <div className="pd-cell-vitals">
                      <div className={`pd-vital-block ${isCritical ? 'critical' : ''}`}>
                        <span className="pd-v-val">{patient.spo2}%</span>
                        <span className="pd-v-lbl">SPO2</span>
                      </div>
                      <div className="pd-vital-block">
                        <span className="pd-v-val">{patient.bpm}</span>
                        <span className="pd-v-lbl">BPM</span>
                      </div>
                    </div>
                  </td>

                  {/* Admission */}
                  <td>
                    <div className="pd-cell-adm">
                      <span className="pd-adm-date">{patient.admission}</span>
                      <span className="pd-adm-loc">{patient.location}</span>
                    </div>
                  </td>

                  {/* Blood Type */}
                  <td>
                    <span className="pd-blood-type">{patient.bloodType}</span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="pd-actions">
                      <button className="pd-action-btn"><Activity size={16} /></button>
                      <button className="pd-action-btn" onClick={() => setSelectedPatient(patient)}><MoreHorizontal size={16} /></button>
                      <button className="pd-action-btn" onClick={() => setSelectedPatientTreatment(patient)}><ChevronRight size={16} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

              </>
      )}

      {/* --- MODALS --- */}

      {/* Register Patient Modal */}
      {isRegisterOpen && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">
            <div className="pd-modal-header">
              <h2>Register New Patient</h2>
              <button className="pd-modal-close" onClick={() => setIsRegisterOpen(false)}><X size={20} /></button>
            </div>
            <form className="pd-modal-form" onSubmit={handleRegister}>
              <div className="pd-form-row">
                <label>Full Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="pd-form-grid">
                <div className="pd-form-field">
                  <label>Age</label>
                  <input required type="number" min="0" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder="Years" />
                </div>
                <div className="pd-form-field">
                  <label>Gender</label>
                  <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="pd-form-grid">
                <div className="pd-form-field">
                  <label>Blood Type</label>
                  <select value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value})}>
                    <option>O+</option><option>O-</option><option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                  </select>
                </div>
                <div className="pd-form-field">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option>INPATIENT</option>
                    <option>OUTPATIENT</option>
                    <option>OBSERVATION</option>
                  </select>
                </div>
              </div>
              <div className="pd-form-row">
                <label>Underlying Condition / Chief Complaint</label>
                <textarea required rows={3} value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} placeholder="Describe symptoms and reason for admission..."></textarea>
              </div>
              <button type="submit" className="pd-modal-submit">Register Patient</button>
            </form>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="pd-modal-overlay">
          <div className="pd-modal-details">
            <div className="pd-modal-header">
              <h2>Patient Summary</h2>
              <button className="pd-modal-close" onClick={() => setSelectedPatient(null)}><X size={20} /></button>
            </div>
            
            <div className="pd-modal-content">
              <div className="pd-cell-patient mb-4">
                <div className="pd-avatar" style={{ backgroundColor: `${selectedPatient.avatarColor}20`, color: selectedPatient.avatarColor, width: 48, height: 48, fontSize: 16 }}>
                  {selectedPatient.initials}
                </div>
                <div className="pd-patient-details">
                  <span className="pd-name" style={{ fontSize: 20 }}>{selectedPatient.name}</span>
                  <div className="pd-patient-meta">
                    {selectedPatient.id} <span className="dot">•</span> {selectedPatient.age} yrs {selectedPatient.gender} <span className="dot">•</span> Blood: {selectedPatient.bloodType}
                  </div>
                </div>
              </div>

              <div className="pd-details-box">
                <h4>What's the problem?</h4>
                <p>{selectedPatient.condition}</p>
              </div>

              <div className="pd-details-grid">
                <div className="pd-d-card">
                  <span>Current Status</span>
                  <strong className={`pd-status-pill ${selectedPatient.status.toLowerCase()}`}>{selectedPatient.status}</strong>
                </div>
                <div className="pd-d-card">
                  <span>SPO2 Level</span>
                  <strong className={selectedPatient.spo2 <= 92 ? 'text-red-500' : ''}>{selectedPatient.spo2}%</strong>
                </div>
                <div className="pd-d-card">
                  <span>Location</span>
                  <strong>{selectedPatient.location}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Doctor's Treatment Log Modal */}
      {selectedPatientTreatment && (
        <div className="pd-modal-overlay">
          <div className="pd-modal-details">
            <div className="pd-modal-header">
              <h2>My Treatment Log</h2>
              <button className="pd-modal-close" onClick={() => setSelectedPatientTreatment(null)}><X size={20} /></button>
            </div>
            
            <div className="pd-modal-content">
              <div className="pd-cell-patient mb-4">
                <div className="pd-avatar" style={{ backgroundColor: `${selectedPatientTreatment.avatarColor}20`, color: selectedPatientTreatment.avatarColor, width: 48, height: 48, fontSize: 16 }}>
                  {selectedPatientTreatment.initials}
                </div>
                <div className="pd-patient-details">
                  <span className="pd-name" style={{ fontSize: 20 }}>{selectedPatientTreatment.name}</span>
                  <div className="pd-patient-meta">
                    {selectedPatientTreatment.id} <span className="dot">•</span> {selectedPatientTreatment.age} yrs {selectedPatientTreatment.gender}
                  </div>
                </div>
              </div>

              <div className="pd-details-box" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', borderColor: 'rgba(20, 184, 166, 0.3)' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#14b8a6' }}>
                  <ClipboardList size={16} /> Treatment provided by Dr. Aris Thorne
                </h4>
                <ul style={{ paddingLeft: '20px', marginTop: '10px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
                  <li>Administered initial triage and reviewed vitals.</li>
                  <li>Prescribed 500mg Amoxicillin for underlying infection.</li>
                  <li>Ordered comprehensive metabolic panel and complete blood count.</li>
                  <li>Scheduled follow-up physical exam for next week.</li>
                </ul>
              </div>

              <button className="pd-modal-submit mt-4" style={{ width: '100%' }} onClick={() => setSelectedPatientTreatment(null)}>
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
