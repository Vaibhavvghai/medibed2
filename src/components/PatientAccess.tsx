import { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { ShieldCheck } from 'lucide-react';
import PatientDrawer from './PatientDrawer';

export default function PatientAccess() {
  const [code, setCode] = useState(['', '', '']);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState(false);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const hardcodedPass = '123';

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);

    // Auto focus next
    if (value && index < 2) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto submit on last digit
    if (index === 2 && value !== '') {
      const fullCode = newCode.join('');
      if (fullCode === hardcodedPass) {
        setIsDrawerOpen(true);
      } else {
        setError(true);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="access-container" style={{ height: isDrawerOpen ? '100%' : 'calc(100vh - 120px)' }}>
      {!isDrawerOpen ? (
        <div className="access-card">
          <div className="access-header">
            <ShieldCheck size={36} className="access-icon" />
            <h2>MediBed Secure Access</h2>
            <p>Ask your patient for their 3-digit security code <br /> to access their medical records securely.</p>
          </div>

          <div className="access-otp-group">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`access-otp-input ${error ? 'error' : ''}`}
                placeholder="-"
              />
            ))}
          </div>
          
          {error && <div className="access-error">Invalid code. Please try again.</div>}

          <button 
            className="access-submit-btn"
            onClick={() => {
              if (code.join('') === hardcodedPass) {
                setIsDrawerOpen(true);
              } else {
                setError(true);
              }
            }}
          >
            Verify Access Code
          </button>
        </div>
      ) : (
        <PatientDrawer isOpen={isDrawerOpen} onClose={() => {
          setIsDrawerOpen(false);
          setCode(['', '', '']);
        }} />
      )}
    </div>
  );
}
