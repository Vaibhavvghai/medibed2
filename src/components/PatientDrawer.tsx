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
  Plus,
  ClipboardList,
  Dna,
  Microscope,
  Image as ImageIcon
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

interface MedicalRecord {
  id: string;
  category: 'blood' | 'imaging' | 'general';
  date: string;
  title: string;
  lab: string;
  status: 'Normal' | 'Abnormal' | 'Pending';
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
  const [activeTab, setActiveTab] = useState<'history' | 'prescriptions' | 'vitals' | 'appointments' | 'records'>('history');
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

  const [patientRecords, setPatientRecords] = useState<MedicalRecord[]>([
    { id: 'r1', category: 'blood', date: 'Oct 25, 2026', title: 'Complete Blood Count (CBC)', lab: 'MediBed Central Lab', status: 'Abnormal' },
    { id: 'r2', category: 'blood', date: 'Oct 25, 2026', title: 'Lipid Panel', lab: 'MediBed Central Lab', status: 'Normal' },
    { id: 'r3', category: 'imaging', date: 'Oct 24, 2026', title: 'Chest X-Ray (AP/PA)', lab: 'Radiology Dept', status: 'Normal' },
    { id: 'r4', category: 'general', date: 'Aug 12, 2026', title: 'Cardiology Assessment Form', lab: 'Cardiology Unit', status: 'Normal' },
  ]);
  
  const [recordFilter, setRecordFilter] = useState<'all' | 'blood' | 'imaging' | 'general'>('all');

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
          <button className={`p-tab ${activeTab === 'records' ? 'active' : ''}`} onClick={() => setActiveTab('records')}>
            <ClipboardList size={14} /> Lab & Reports
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
              <div className="p-rx-header-row mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 className="p-sub-title mb-0">Medication Management</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Active and finalized prescription scripts.</p>
                </div>
                <button 
                  className="pd-register-btn" 
                  onClick={() => setIsNewRxModalOpen(true)}
                  style={{ padding: '8px 16px', background: 'var(--purple-primary)', color: 'white', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  <Plus size={14} /> Issue Script
                </button>
              </div>
              
              <div className="p-rx-filters" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', marginBottom: '20px', display: 'flex', gap: '8px' }}>
                <button className={`p-rx-tag ${rxFilter === 'all' ? 'active' : ''}`} onClick={() => setRxFilter('all')} style={{ background: rxFilter === 'all' ? 'var(--purple-primary)' : 'rgba(255,255,255,0.05)', color: rxFilter === 'all' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>All Scripts</button>
                <button className={`p-rx-tag ${rxFilter === 'hospital' ? 'active' : ''}`} onClick={() => setRxFilter('hospital')} style={{ background: rxFilter === 'hospital' ? 'var(--purple-primary)' : 'rgba(255,255,255,0.05)', color: rxFilter === 'hospital' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Internal</button>
                <button className={`p-rx-tag ${rxFilter === 'external' ? 'active' : ''}`} onClick={() => setRxFilter('external')} style={{ background: rxFilter === 'external' ? 'var(--purple-primary)' : 'rgba(255,255,255,0.05)', color: rxFilter === 'external' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>External Files</button>
              </div>

              <div className="p-rx-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {prescriptionDocs
                  .filter(doc => rxFilter === 'all' || doc.type === (rxFilter === 'external' ? 'external' : 'internal'))
                  .map(doc => (
                  <div key={doc.id} className={`p-rxt-grid-card ${doc.type}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: doc.type === 'external' ? 'teal' : 'var(--purple-primary)' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: doc.type === 'external' ? 'rgba(20, 184, 166, 0.1)' : 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FileText size={20} color={doc.type === 'external' ? '#14b8a6' : '#8b5cf6'} />
                        </div>
                        <div>
                          <h5 style={{ fontSize: '14px', fontWeight: 600, color: 'white', margin: 0, marginBottom: '2px' }}>{doc.name}</h5>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.date}</span>
                        </div>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                        {doc.type}
                      </span>
                    </div>
                    
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <span style={{ width: '60px', color: 'var(--text-muted)' }}>Doctor:</span>
                        <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{doc.doctor}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <span style={{ width: '60px', color: 'var(--text-muted)' }}>Location:</span>
                        <span style={{ fontWeight: 500, color: '#e2e8f0' }}>{doc.hospital}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', gap: '8px' }}>
                      <button style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'white', borderRadius: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}>
                        <Download size={14} /> Download PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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



          {activeTab === 'records' && (
            <div className="p-tab-records">
              <div className="p-rx-header-row mb-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 className="p-sub-title mb-0">Lab & Clinical Reports</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Review blood work, imaging results, and summaries.</p>
                </div>
                <div className="p-rx-filters" style={{ display: 'flex', gap: '8px' }}>
                  <button className={`p-rx-tag ${recordFilter === 'all' ? 'active' : ''}`} onClick={() => setRecordFilter('all')} style={{ background: recordFilter === 'all' ? 'var(--purple-primary)' : 'rgba(255,255,255,0.05)', color: recordFilter === 'all' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>All</button>
                  <button className={`p-rx-tag ${recordFilter === 'blood' ? 'active' : ''}`} onClick={() => setRecordFilter('blood')} style={{ background: recordFilter === 'blood' ? '#ef4444' : 'rgba(255,255,255,0.05)', color: recordFilter === 'blood' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Blood</button>
                  <button className={`p-rx-tag ${recordFilter === 'imaging' ? 'active' : ''}`} onClick={() => setRecordFilter('imaging')} style={{ background: recordFilter === 'imaging' ? '#14b8a6' : 'rgba(255,255,255,0.05)', color: recordFilter === 'imaging' ? 'white' : 'var(--text-muted)', padding: '6px 12px', borderRadius: '6px', border: 'none', fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>Imaging</button>
                </div>
              </div>

              <div className="records-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {patientRecords
                  .filter(rec => recordFilter === 'all' || rec.category === recordFilter)
                  .map(rec => (
                  <div key={rec.id} className="record-card hover-glow" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s', cursor: 'pointer' }}>
                    <div style={{ width: '48px', height: '48px', flexShrink: 0, borderRadius: '12px', background: rec.category === 'blood' ? 'rgba(239, 68, 68, 0.1)' : rec.category === 'imaging' ? 'rgba(20, 184, 166, 0.1)' : 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {rec.category === 'blood' ? <Dna size={24} color="#ef4444" /> : rec.category === 'imaging' ? <ImageIcon size={24} color="#14b8a6" /> : <Microscope size={24} color="#8b5cf6" />}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: '15px', fontWeight: 600, color: 'white', margin: 0, marginBottom: '4px' }}>{rec.title}</h5>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{rec.date}</span>
                        <span style={{ fontSize: '10px' }}>•</span>
                        <span>{rec.lab}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ 
                        fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px', 
                        background: rec.status === 'Abnormal' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.1)', 
                        color: rec.status === 'Abnormal' ? '#fca5a5' : '#34d399' 
                      }}>
                        {rec.status}
                      </span>
                      <button style={{ background: 'none', border: 'none', color: 'var(--purple-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'appointments' && (
            <div className="p-tab-appt">
              <div className="p-appt-list">
                <div className="p-rxt-item">
                  <div className="p-rxt-date">Oct 12, 2026</div>
                  <div className="p-rxt-card internal">
                    <div className="p-rxt-thumb">
                      <Calendar size={20} className="text-purple-400" />
                    </div>
                    <div className="p-rxt-details">
                      <h5>Follow-up Consultation</h5>
                      <div className="p-rxt-meta">
                        <span className="doc-name">Dr. Aris Thorne</span>
                        <span className="dot">•</span>
                        <span className="hosp-name">MediBed</span>
                      </div>
                    </div>
                    <span className="p-status-pill completed" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#34d399'}}>Completed</span>
                  </div>
                </div>

                <div className="p-rxt-item">
                  <div className="p-rxt-date">Aug 05, 2026</div>
                  <div className="p-rxt-card external">
                    <div className="p-rxt-thumb">
                      <Calendar size={20} className="text-teal-400" />
                    </div>
                    <div className="p-rxt-details">
                      <h5>Cardiology Screening</h5>
                      <div className="p-rxt-meta">
                        <span className="doc-name">Dr. Sarah Jenkins</span>
                        <span className="dot">•</span>
                        <span className="hosp-name text-teal-400">City Hospital <span className="p-badge-ext">External</span></span>
                      </div>
                    </div>
                    <span className="p-status-pill completed" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#34d399'}}>Completed</span>
                  </div>
                </div>

                <div className="p-rxt-item">
                  <div className="p-rxt-date">Jan 18, 2025</div>
                  <div className="p-rxt-card internal">
                    <div className="p-rxt-thumb">
                      <Calendar size={20} className="text-purple-400" />
                    </div>
                    <div className="p-rxt-details">
                      <h5>Initial Assessment</h5>
                      <div className="p-rxt-meta">
                        <span className="doc-name">Dr. Aris Thorne</span>
                        <span className="dot">•</span>
                        <span className="hosp-name">MediBed</span>
                      </div>
                    </div>
                    <span className="p-status-pill completed" style={{background: 'rgba(16, 185, 129, 0.2)', color: '#34d399'}}>Completed</span>
                  </div>
                </div>
              </div>
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
