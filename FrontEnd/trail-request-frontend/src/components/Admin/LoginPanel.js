import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPanel.module.css';

const LoginPanel = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handlemain = () =>{
    navigate('/');
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'secure123')
    {
       navigate('/Admin-Dash');
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.glassPanel}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <svg viewBox="0 0 24 24" className={styles.logoSvg}>
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9v6l-8 4-8-4V9l8-4.2zM12 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
          </div>
          <h1 className={styles.title}>Admin Portal</h1>
          <p className={styles.subtitle}>Automated Driving Trail Testing System</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.inputLabel}>Username</label>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              <span className={styles.inputIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/>
                </svg>
              </span>
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              <span className={styles.inputIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/>
                </svg>
              </span>
              <button 
                type="button" 
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M12 9a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3m0-4.5c5 0 9.27 3.11 11 7.5-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0017.64 0 9.821 9.821 0 00-17.64 0z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M11.83 9L15 12.16V12a3 3 0 00-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 003 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 01-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 015 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className={styles.optionsContainer}>
            {/* <label className={styles.rememberMe}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkmark}></span>
              Remember me
            </label> */}
            {/* <a href="#forgot" className={styles.forgotPassword}>Forgot password?</a> */}
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
            
          >
            {isLoading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        
        <div className={styles.footer}>
          {/* <p className={styles.footerText}>Need help? <a href="#contact" className={styles.footerLink}>Contact support</a></p> */}
        </div>
        <button 
              type="button" 
              className="login-main-btn" 
              onClick={handlemain}>
              MAIN 3 LOG-IN
            </button>
      </div>
    </div>
  );
};

export default LoginPanel;