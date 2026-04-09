import { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Move } from 'lucide-react';

interface PlannerBlock {
  id: string;
  patientName: string;
  type: string;
  timeSlot: string;
  durationMins: number; // 1 min = 1px
  topOffset: number;    // Absolute positioning top
  color: string;
}

const initialBlocks: PlannerBlock[] = [
  { id: 'b1', patientName: 'Julian S. Vance', type: 'Post-op Follow-up', timeSlot: '08:00 AM - 08:45 AM', durationMins: 45, topOffset: 0, color: 'purple' },
  { id: 'b2', patientName: 'Elias Vancamp', type: 'Respiratory Dist.', timeSlot: '09:00 AM - 09:30 AM', durationMins: 30, topOffset: 60, color: 'amber' },
  { id: 'b3', patientName: 'Sarah Jenkins', type: 'Neurology Consult', timeSlot: '11:15 AM - 12:15 PM', durationMins: 60, topOffset: 195, color: 'teal' },
  { id: 'b4', patientName: 'Elena Gilbert', type: 'IV Administration', timeSlot: '02:00 PM - 03:00 PM', durationMins: 60, topOffset: 360, color: 'pink' },
];

export default function InteractivePlanner() {
  const [blocks, setBlocks] = useState<PlannerBlock[]>(initialBlocks);
  const [dragInfo, setDragInfo] = useState<{ id: string; startY: number; originalTop: number } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const timeMarkers = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  // Helper to convert pixels back into a formatted time string
  const offsetToTimeSlot = (topOffset: number, durationMins: number) => {
    const formatTime = (totalMins: number) => {
      let hours = 8 + Math.floor(totalMins / 60);
      let mins = totalMins % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      if (hours > 12) hours -= 12;
      const hStr = hours < 10 ? `0${hours}` : hours;
      const mStr = mins < 10 ? `0${mins}` : mins;
      return `${hStr}:${mStr} ${period}`;
    };

    return `${formatTime(topOffset)} - ${formatTime(topOffset + durationMins)}`;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragInfo) return;
    
    // Calculate delta and apply snapping to 15-minute intervals (15px)
    const deltaY = e.clientY - dragInfo.startY;
    let newTop = dragInfo.originalTop + deltaY;
    newTop = Math.round(newTop / 15) * 15;
    
    // Bounds check
    if (newTop < 0) newTop = 0;
    // 8 hr canvas * 60 = 480px total height, minus block duration
    
    setBlocks(prev => prev.map(b => {
      if (b.id !== dragInfo.id) return b;
      
      const maxTop = 480 - b.durationMins; // 480px = 4:00 PM
      if (newTop > maxTop) newTop = maxTop;
      
      return {
        ...b,
        topOffset: newTop,
        timeSlot: offsetToTimeSlot(newTop, b.durationMins)
      };
    }));
  };

  const handlePointerUp = () => {
    setDragInfo(null);
  };

  useEffect(() => {
    if (dragInfo) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    } else {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragInfo]);

  return (
    <div className="planner-container">
      <div className="planner-toolbar">
        <h2 style={{fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)'}}>
          <CalendarIcon size={18} className="text-purple-400" /> Daily Canvas
        </h2>
        <div style={{color: 'var(--text-muted)', fontSize: '13px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '6px'}}>
          🖱️ Click and drag blocks to reschedule
        </div>
      </div>

      <div 
        ref={containerRef}
        className="planner-canvas-wrapper" 
        style={{
          position: 'relative', 
          height: '600px', 
          overflowY: 'auto', 
          background: 'var(--bg-card)', 
          borderRadius: '12px', 
          border: '1px solid var(--border-color)',
          userSelect: dragInfo ? 'none' : 'auto'
        }}
      >
        
        {/* Background Grid */}
        <div className="planner-grid" style={{position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none'}}>
          {timeMarkers.map((time, index) => (
            <div key={index} style={{display: 'flex', height: '60px', borderBottom: '1px dotted rgba(255,255,255,0.1)'}}>
              <div style={{width: '90px', padding: '8px 12px', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'right', borderRight: '1px solid var(--border-color)'}}>
                {time}
              </div>
              <div style={{flex: 1}}></div>
            </div>
          ))}
        </div>

        {/* Appointment Blocks Layer */}
        <div className="planner-blocks-layer" style={{position: 'absolute', top: 0, left: '91px', width: 'calc(100% - 91px)', height: '480px'}}>
          {blocks.map(block => {
            const isDragging = dragInfo?.id === block.id;
            return (
              <div 
                key={block.id}
                className={`planner-block color-${block.color} ${isDragging ? 'dragging' : ''}`}
                style={{
                  position: 'absolute',
                  top: `${block.topOffset}px`,
                  height: `${block.durationMins - 4}px`, // slight padding for aesthetic gaps
                  left: '10px',
                  right: '25px',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  background: `var(--${block.color}-bg, rgba(139, 92, 246, 0.15))`,
                  border: `1px solid rgba(255,255,255,0.1)`,
                  borderLeft: `4px solid var(--${block.color}-solid, #8b5cf6)`,
                  borderRadius: '6px',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: isDragging ? 'none' : 'box-shadow 0.2s, top 0.2s ease-out',
                  boxShadow: isDragging ? '0 15px 30px rgba(0,0,0,0.5)' : '0 2px 5px rgba(0,0,0,0.2)',
                  opacity: isDragging ? 0.9 : 1,
                  zIndex: isDragging ? 100 : 10,
                  backdropFilter: 'blur(10px)'
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  (e.target as HTMLElement).setPointerCapture(e.pointerId);
                  setDragInfo({ id: block.id, startY: e.clientY, originalTop: block.topOffset });
                }}
              >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                  <strong style={{fontSize: '13.5px', color: 'var(--text-primary)', letterSpacing: '-0.3px'}}>{block.patientName}</strong>
                  <Move size={14} style={{color: 'var(--text-muted)', opacity: isDragging ? 1 : 0.4, transition: 'opacity 0.2s'}} />
                </div>
                <div style={{fontSize: '11px', color: 'var(--text-secondary)'}}>{block.type}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)', marginTop: 'auto', fontWeight: 600}}>
                  <Clock size={10} /> {block.timeSlot}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}