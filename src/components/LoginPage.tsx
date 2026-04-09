import { useState } from 'react';
import { Cross, Lock, User, ArrowRight, Activity } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    
    // Simulate network authentication routing
    setTimeout(() => {
      if (username === 'doctor' && password === 'password123') {
        onLogin();
      } else {
        setIsLoading(false);
        setError('Invalid clinical credentials.');
      }
    }, 800);
  };

  return (
    <div className="login-page">
      <div className="login-backdrop">
        <div className="login-brand-bg">
           <Activity size={400} className="bg-icon" />
        </div>
      </div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo-icon">
              <Cross size={24} />
            </div>
            <h1>MediBed Authentication</h1>
            <p>Clinical Intelligence Platform</p>
          </div>
          
          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                placeholder="Staff ID or Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <div className="login-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember this device
              </label>
              <a href="#" className="forgot-pwd">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className={`login-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="auth-spinner"></div>
              ) : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Secure connection established. Unauthorized access is strictly prohibited under HIPAA guidelines.</p>
            <p style={{marginTop: '10px', color: '#c084fc'}}><strong>Demo use:</strong> doctor / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
