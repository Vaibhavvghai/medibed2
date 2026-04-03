import { useState, useEffect } from 'react';
import {
  X,
  History,
  FileText,
  Activity,
  Calendar,
  UploadCloud,
  HeartPulse,
  Thermometer,
  Wind,
  Download,
  Pill,
  Plus
} from 'lucide-react';

interface PatientDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: 'Active' | 'Completed';
  color: 'teal' | 'gray';
}

interface PrescriptionDoc {
  id: string;
  date: string;
  name: string;
  doctor: string;
  hospital: string;
  type: 'internal' | 'external';
}

export default function PatientDrawer({ isOpen, onClose }: PatientDrawerProps) {
  useEffect(() => {
    // Used to handle transitions
    if(isOpen) { /* Do nothing */ }
  }, [isOpen]);
  const [activeTab, setActiveTab] = useState<'history' | 'prescriptions' | 'vitals' | 'appointments'>('history');
  const [rxFilter, setRxFilter] = useState<'all' | 'hospital' | 'external'>('all');

  // Virtual Prescription States
  const [isNewRxModalOpen, setIsNewRxModalOpen] = useState(false);
  const [rxMode, setRxMode] = useState<'write' | 'upload'>('write');
  const [formData, setFormData] = useState({ medName: '', dosage: '', frequency: '', duration: '', notes: '' });

  // Mock Data States
  const [activeMeds, setActiveMeds] = useState<Medication[]>([
    { id: 'm1', name: 'Metoprolol', dosage: '50mg', frequency: 'Twice Daily', duration: 'Aug 12 — Oct 24', status: 'Active', color: 'teal' },
    { id: 'm2', name: 'Aspirin', dosage: '81mg', frequency: 'Once Daily', duration: 'Jan 05 — Dec 05', status: 'Active', color: 'teal' },
    { id: 'm3', name: 'Amoxicillin', dosage: '500mg', frequency: 'Every 8 hours', duration: 'Oct 10 — Oct 17', status: 'Completed', color: 'gray' }
  ]);

  const [prescriptionDocs, setPrescriptionDocs] = useState<PrescriptionDoc[]>([
    { id: 'd1', date: 'Aug 12, 2026', name: 'Cardiology Scripts.pdf', doctor: 'Dr. Sarah Jenkins', hospital: 'City Hospital', type: 'external' },
    { id: 'd2', date: 'Jan 05, 2025', name: 'General Checkup Meds.pdf', doctor: 'Dr. Aris Thorne', hospital: 'MediBed', type: 'internal' }
  ]);

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (rxMode === 'write') {
      const newMed: Medication = {
        id: `m${Date.now()}`,
        name: formData.medName,
        dosage: formData.dosage,
        frequency: formData.frequency,
        duration: formData.duration || 'Currently Active',
        status: 'Active',
        color: 'teal'
      };
      
      const newDoc: PrescriptionDoc = {
        id: `d${Date.now()}`,
        date: 'Today',
        name: `Script_${formData.medName}.pdf`,
        doctor: 'Dr. Aris Thorne',
        hospital: 'MediBed',
        type: 'internal'
      };

      setActiveMeds([newMed, ...activeMeds]);
      setPrescriptionDocs([newDoc, ...prescriptionDocs]);
    } else {
      // Upload simulation
      const newDoc: PrescriptionDoc = {
        id: `d${Date.now()}`,
        date: 'Today',
        name: 'Uploaded_Document.pdf',
        doctor: 'Unknown/External',
        hospital: 'External Upload',
        type: 'external'
      };
      setPrescriptionDocs([newDoc, ...prescriptionDocs]);
    }

    setIsNewRxModalOpen(false);
    setFormData({ medName: '', dosage: '', frequency: '', duration: '', notes: '' });
  };

  return (
    <div className="p-full-profile">
      {/* Header */}
        <div className="p-drawer-header">
          <div className="p-drawer-title">
            <h2>Patient Profile</h2>
            <button className="p-drawer-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          
          <div className="p-profile-card">
            <div className="p-profile-avatar">AM</div>
            <div className="p-profile-info">
              <h3 className="p-profile-name">Alexander Maxwell</h3>
              <div className="p-profile-meta">
                <span>45 yrs</span>
                <span className="dot">•</span>
                <span>O+ Blood</span>
                <span className="dot">•</span>
                <span>Bed 402-A</span>
              </div>
              <div className="p-profile-adm">Admitted: Oct 24, 2026</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="p-drawer-tabs">
          <button className={`p-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <History size={14} /> Visit History
          </button>
          <button className={`p-tab ${activeTab === 'prescriptions' ? 'active' : ''}`} onClick={() => setActiveTab('prescriptions')}>
            <FileText size={14} /> Prescriptions
          </button>
          <button className={`p-tab ${activeTab === 'vitals' ? 'active' : ''}`} onClick={() => setActiveTab('vitals')}>
            <Activity size={14} /> Active Meds & Vitals
          </button>
          <button className={`p-tab ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
            <Calendar size={14} /> Past Appointments
          </button>
        </div>

        {/* Content Area */}
        <div className="p-drawer-content">
          {activeTab === 'history' && (
            <div className="p-tab-history">
              <div className="p-timeline">
                <div className="p-timeline-item">
                  <div className="p-timeline-dot"></div>
                  <div className="p-timeline-content">
                    <h4>Oct 24, 2026 - Emergency Admission</h4>
                    <p>Patient presented with acute chest pain and shortness of breath. Admitted to Ward 4B.</p>
                  </div>
                </div>
                <div className="p-timeline-item">
                  <div className="p-timeline-dot"></div>
                  <div className="p-timeline-content">
                    <h4>Aug 12, 2026 - Cardiology Consult</h4>
                    <p>Routine follow up. EKG showed minor irregularities. Prescribed Beta Blockers.</p>
                  </div>
                </div>
                <div className="p-timeline-item">
                  <div className="p-timeline-dot"></div>
                  <div className="p-timeline-content">
                    <h4>Jan 05, 2025 - Initial Onboarding</h4>
                    <p>Patient registered in MediBed system. Baseline vitals recorded.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

              {activeTab === 'prescriptions' && (
            <div className="p-tab-rx">
              <div className="p-rx-header-row mb-4">
                <h4 className="p-sub-title mb-0">Prescription Management</h4>
                <button 
                  className="pd-register-btn" 
                  onClick={() => setIsNewRxModalOpen(true)}
                  style={{ padding: '8px 16px' }}
                >
                  <Plus size={14} /> New Prescription
                </button>
              </div>
              
              <div className="p-rx-header-row">
                <h4 className="p-sub-title mb-0" style={{fontSize: '13px', color: 'var(--text-muted)'}}>Record Timeline</h4>
                <div className="p-rx-filters">
                  <button className={`p-rx-tag ${rxFilter === 'all' ? 'active' : ''}`} onClick={() => setRxFilter('all')}>All</button>
                  <button className={`p-rx-tag ${rxFilter === 'hospital' ? 'active' : ''}`} onClick={() => setRxFilter('hospital')}>This Hospital</button>
                  <button className={`p-rx-tag ${rxFilter === 'external' ? 'active' : ''}`} onClick={() => setRxFilter('external')}>External</button>
                </div>
              </div>

              <div className="p-rx-timeline">
                {prescriptionDocs
                  .filter(doc => rxFilter === 'all' || doc.type === (rxFilter === 'external' ? 'external' : 'internal'))
                  .map(doc => (
                  <div key={doc.id} className="p-rxt-item">
                    <div className="p-rxt-date">{doc.date}</div>
                    <div className={`p-rxt-card ${doc.type}`}>
                      <div className="p-rxt-thumb">
                        <FileText size={20} className={doc.type === 'external' ? 'text-teal-400' : 'text-purple-400'} />
                      </div>
                      <div className="p-rxt-details">
                        <h5>{doc.name}</h5>
                        <div className="p-rxt-meta">
                          <span className="doc-name">{doc.doctor}</span>
                          <span className="dot">•</span>
                          <span className={`hosp-name ${doc.type === 'external' ? 'text-teal-400' : ''}`}>
                            {doc.hospital} {doc.type === 'external' && <span className="p-badge-ext">External</span>}
                          </span>
                        </div>
                      </div>
                      <button className="p-rxt-dl"><Download size={16} /> View</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-rx-divider"></div>

              <h4 className="p-sub-title">Active Medicines</h4>
              <table className="p-meds-table">
                <thead>
                  <tr>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeMeds.map(med => (
                    <tr key={med.id}>
                      <td>
                        <div className="p-med-cell">
                          <Pill size={14} className={med.color === 'teal' ? 'text-teal-400' : 'text-gray-400'} />
                          <span>{med.name}</span>
                        </div>
                      </td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>{med.duration}</td>
                      <td>
                        <span className={`p-status-pill ${med.status.toLowerCase()}`}>{med.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="p-tab-vitals">
              {/* Using CSS grid for 2x2 vitals squares */}
              <div className="p-vitals-grid">
                <div className="p-vital-box">
                  <div className="p-vital-icon"><HeartPulse size={20} className="text-purple-400" /></div>
                  <div className="p-vital-data">
                    <span className="p-vd-val">72 <span className="p-vd-unit">BPM</span></span>
                    <span className="p-vd-lbl">Heart Rate</span>
                  </div>
                  <div className="p-vital-trend positive">Stable</div>
                </div>
                
                <div className="p-vital-box">
                  <div className="p-vital-icon"><Activity size={20} className="text-teal-400" /></div>
                  <div className="p-vital-data">
                    <span className="p-vd-val">120/80 <span className="p-vd-unit">mmHg</span></span>
                    <span className="p-vd-lbl">Blood Pressure</span>
                  </div>
                  <div className="p-vital-trend positive">Normal</div>
                </div>

                <div className="p-vital-box">
                  <div className="p-vital-icon"><Wind size={20} className="text-blue-400" /></div>
                  <div className="p-vital-data">
                    <span className="p-vd-val">98<span className="p-vd-unit">%</span></span>
                    <span className="p-vd-lbl">SpO2 Level</span>
                  </div>
                  <div className="p-vital-trend positive">Healthy</div>
                </div>

                <div className="p-vital-box">
                  <div className="p-vital-icon"><Thermometer size={20} className="text-red-400" /></div>
                  <div className="p-vital-data">
                    <span className="p-vd-val">37.2<span className="p-vd-unit">°C</span></span>
                    <span className="p-vd-lbl">Temperature</span>
                  </div>
                  <div className="p-vital-trend warning">Borderline</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="p-tab-appt">
              <p className="p-placeholder-text">Past appointment history will appear here.</p>
            </div>
          )}
        </div>

        {/* --- NEW VIRTUAL PRESCRIPTION MODAL --- */}
        {isNewRxModalOpen && (
          <div className="pd-modal-overlay">
            <div className="pd-modal">
              <div className="pd-modal-header">
                <h2>New Prescription</h2>
                <button className="pd-modal-close" onClick={() => setIsNewRxModalOpen(false)}><X size={20} /></button>
              </div>
              
              {/* Modal Toggle Header */}
              <div className="rx-modal-toggle-row mt-4">
                <button 
                  className={`rx-tg-btn ${rxMode === 'write' ? 'active' : ''}`}
                  onClick={() => setRxMode('write')}
                >
                  Write Virtual Rx
                </button>
                <button 
                  className={`rx-tg-btn ${rxMode === 'upload' ? 'active' : ''}`}
                  onClick={() => setRxMode('upload')}
                >
                  Upload Document
                </button>
              </div>

              <form className="pd-modal-form" onSubmit={handleCreatePrescription} style={{ paddingTop: 10 }}>
                {rxMode === 'write' ? (
                  <>
                    <div className="pd-form-row">
                      <label>Medication Name</label>
                      <input required type="text" value={formData.medName} onChange={e => setFormData({...formData, medName: e.target.value})} placeholder="e.g. Amoxicillin" />
                    </div>
                    <div className="pd-form-grid">
                      <div className="pd-form-field">
                        <label>Dosage</label>
                        <input required type="text" value={formData.dosage} onChange={e => setFormData({...formData, dosage: e.target.value})} placeholder="e.g. 500mg" />
                      </div>
                      <div className="pd-form-field">
                        <label>Frequency</label>
                        <input required type="text" value={formData.frequency} onChange={e => setFormData({...formData, frequency: e.target.value})} placeholder="e.g. Twice Daily" />
                      </div>
                    </div>
                    <div className="pd-form-row">
                      <label>Duration</label>
                      <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 7 Days (Optional)" />
                    </div>
                    <div className="pd-form-row">
                      <label>Doctor's Instructions</label>
                      <textarea rows={2} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Take with food..."></textarea>
                    </div>
                  </>
                ) : (
                  <div className="rx-upload-zone">
                    <UploadCloud size={40} className="text-purple-400 mb-2" />
                    <h4>Drag and drop file here</h4>
                    <p>Accepts PDF, JPG, PNG (Max 10MB)</p>
                    <button type="button" className="prof-ghost-btn mt-4" style={{ width: 'auto', padding: '8px 24px' }}>
                      Browse Files
                    </button>
                  </div>
                )}

                <button type="submit" className="pd-modal-submit" style={{ marginTop: 'auto' }}>
                  {rxMode === 'write' ? 'Sign & Issue Prescription' : 'Upload File'}
                </button>
              </form>
            </div>
          </div>
        )}

    </div>
  );
}
