import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Activity, Users, TrendingUp } from 'lucide-react';

const intakeData = [
  { name: 'Mon', patients: 45, emergency: 12 },
  { name: 'Tue', patients: 52, emergency: 15 },
  { name: 'Wed', patients: 38, emergency: 8 },
  { name: 'Thu', patients: 65, emergency: 22 },
  { name: 'Fri', patients: 48, emergency: 14 },
  { name: 'Sat', patients: 70, emergency: 28 },
  { name: 'Sun', patients: 61, emergency: 19 },
];

const occupancyData = [
  { name: 'Intensive Care (ICU)', value: 85 },
  { name: 'General Wards', value: 240 },
  { name: 'Maternity', value: 45 },
  { name: 'Pediatrics', value: 30 },
];
const COLORS = ['#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

const surgeryData = [
  { name: 'Week 1', scheduled: 24, completed: 22 },
  { name: 'Week 2', scheduled: 30, completed: 28 },
  { name: 'Week 3', scheduled: 18, completed: 18 },
  { name: 'Week 4', scheduled: 35, completed: 32 },
];

// Custom Tooltip for dark theme
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1e1136', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '13px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#c084fc' }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }}></span>
            <span style={{ color: 'var(--text-muted)' }}>{entry.name}:</span>
            <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts() {
  return (
    <div className="analytics-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
      
      {/* Top Row: Main Trend & Doughnut */}
      <div className="charts-row" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Left Chart: Weekly Intake Trend */}
        <div className="chart-card glass-panel" style={{ background: 'rgba(23, 13, 43, 0.4)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} className="text-purple-400" /> Patient Intake Trends
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>General Admissions vs Emergency 7-Day Matrix</p>
            </div>
            <div className="chart-actions">
              <select style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', outline: 'none' }}>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
          
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intakeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEmergency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="patients" name="General Admissions" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="emergency" name="Emergency Cases" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorEmergency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Occupancy Doughnut */}
        <div className="chart-card glass-panel" style={{ background: 'rgba(23, 13, 43, 0.4)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
          <div className="chart-header" style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} className="text-teal-400" /> Live Bed Occupancy
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Current distribution by Ward</p>
          </div>
          
          <div style={{ height: '240px', width: '100%', position: 'relative', marginTop:'auto', marginBottom:'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label for Doughnut */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>88%</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Capacity</span>
            </div>
          </div>

          <div className="doughnut-legend" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {occupancyData.map((entry, index) => (
              <div key={entry.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }}></span>
                  {entry.name}
                </div>
                <span style={{ color: 'white', fontWeight: 'bold' }}>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* Bottom Chart: Operational Load or Surgery Data */}
      <div className="chart-card glass-panel" style={{ background: 'rgba(23, 13, 43, 0.4)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
         <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} className="text-blue-400" /> Surgical Operations Load
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Scheduled procedures vs Successful Completions</p>
            </div>
          </div>
          
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={surgeryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="scheduled" name="Scheduled" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>

    </div>
  );
}