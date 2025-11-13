import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
  IonLoading,
  IonText,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { 
  shieldCheckmark, 
  lockClosed, 
  eye, 
  eyeOff,
  logoGoogle,
  logoFacebook,
  person
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { User } from '../data/usersData';
import { 
  authenticateUser, 
  registerUser, 
  saveUserSession, 
  getDemoUsers
} from './utils/authUtils';
import { 
  validateLoginForm, 
  validateSignupForm,
  ValidationErrors 
} from './utils/validationUtils';
import './Login.css';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const demoUsers = getDemoUsers();

  const handleLogin = async () => {
    const errors = validateLoginForm(username, password);
    setValidationErrors(errors);
    
    if (Object.values(errors).some(error => error !== undefined)) {
      setAlertMessage('Please fix the form errors before submitting');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticateUser(username, password);
      
      if (result.success && result.user) {
        saveUserSession(result.user);
        setAlertMessage(`Welcome back, ${result.user.name}!`);
        setShowAlert(true);
        onLogin();
        
        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);
      } else {
        setAlertMessage(result.message || 'Invalid username or password. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Login failed. Please try again.');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    const errors = validateSignupForm(username, password, password);
    setValidationErrors(errors);
    
    if (Object.values(errors).some(error => error !== undefined)) {
      setAlertMessage('Please fix the form errors before submitting');
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const result = await registerUser(username, password);
      
      if (result.success && result.user) {
        saveUserSession(result.user);
        setAlertMessage(`Account created successfully! Welcome, ${result.user.name}!`);
        setShowAlert(true);
        onLogin();
        
        setTimeout(() => {
          history.push('/dashboard');
        }, 1000);
      } else {
        setAlertMessage(result.message || 'Signup failed. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Signup failed. Please try again.');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setAlertMessage(`${provider} login would be implemented here`);
    setShowAlert(true);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setValidationErrors({});
  };

  const handleDemoLogin = (demoUser: User) => {
    setUsername(demoUser.username);
    setPassword(demoUser.password);
    setValidationErrors({});
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    
    setValidationErrors({
      ...validationErrors,
      [field]: undefined
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Insurance Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="login-content">
        <div className="login-container">
          <div className="login-header">
            <IonIcon icon={shieldCheckmark} className="app-logo" />
            <h1 className="app-title">VInsure</h1>
            <p className="app-subtitle">
              {isLogin ? 'Welcome back to your V insurance portal' : 'Create your insurance account'}
            </p>
          </div>

          <IonCard className="auth-card">
            <IonCardHeader>
              <IonCardTitle className="auth-title">
                {isLogin ? 'Sign In to Your Account' : 'Create New Account'}
              </IonCardTitle>
            </IonCardHeader>
            
            <IonCardContent>
              {isLogin && (
                <div className="demo-accounts-section">
                  <IonText color="medium">
                    <small>Quick demo access:</small>
                  </IonText>
                  <div className="demo-buttons">
                    {demoUsers.map((user, index) => (
                      <IonButton 
                        key={index}
                        size="small"
                        fill="outline"
                        className="demo-btn"
                        onClick={() => handleDemoLogin(user)}
                      >
                        {user.name}
                      </IonButton>
                    ))}
                  </div>
                </div>
              )}

              <div className="social-login-section">
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  className="social-btn google-btn"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <IonIcon icon={logoGoogle} slot="start" />
                  Continue with Google
                </IonButton>
                
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  className="social-btn facebook-btn"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <IonIcon icon={logoFacebook} slot="start" />
                  Continue with Facebook
                </IonButton>
              </div>

              <div className="divider">
                <span>or continue with {isLogin ? 'username' : 'email'}</span>
              </div>

              <IonItem className={`auth-input ${validationErrors.username ? 'invalid' : ''}`} lines="none">
                <IonIcon icon={person} slot="start" className="input-icon" />
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  placeholder="Enter your username"
                  onIonInput={(e) => handleInputChange('username', e.detail.value!)}
                  className={validationErrors.username ? 'input-invalid' : ''}
                />
                {validationErrors.username && (
                  <IonText color="danger" className="error-message">
                    {validationErrors.username}
                  </IonText>
                )}
              </IonItem>

              <IonItem className={`auth-input ${validationErrors.password ? 'invalid' : ''}`} lines="none">
                <IonIcon icon={lockClosed} slot="start" className="input-icon" />
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  onIonInput={(e) => handleInputChange('password', e.detail.value!)}
                  className={validationErrors.password ? 'input-invalid' : ''}
                />
                <IonButton 
                  fill="clear" 
                  slot="end" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  <IonIcon icon={showPassword ? eyeOff : eye} />
                </IonButton>
                {validationErrors.password && (
                  <IonText color="danger" className="error-message">
                    {validationErrors.password}
                  </IonText>
                )}
              </IonItem>

              {isLogin && (
                <div className="forgot-password">
                  <IonButton fill="clear" size="small">
                    Forgot your password?
                  </IonButton>
                </div>
              )}

              <IonButton 
                expand="block" 
                className="auth-submit-btn"
                onClick={isLogin ? handleLogin : handleSignup}
                disabled={isLoading}
              >
                <IonIcon icon={isLogin ? lockClosed : person} slot="start" />
                {isLoading ? 'Please Wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </IonButton>

              <div className="auth-toggle">
                <IonText color="medium">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </IonText>
                <IonButton fill="clear" size="small" onClick={toggleAuthMode}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </IonButton>
              </div>

              {isLogin && (
                <div className="demo-credentials">
                  <IonText color="medium">
                    <small>
                      <strong>Available demo accounts:</strong><br />
                      {demoUsers.map((user, index) => (
                        <span key={index}>
                          <strong>{user.name}</strong> - {user.username} / {user.password}
                          {index < demoUsers.length - 1 ? <br /> : ''}
                        </span>
                      ))}
                    </small>
                  </IonText>
                </div>
              )}
            </IonCardContent>
          </IonCard>

          <IonGrid className="features-grid">
            <IonRow>
              <IonCol size="12" size-md="4">
                <div className="feature-item">
                  <IonIcon icon={shieldCheckmark} className="feature-icon" />
                  <h3>Secure</h3>
                  <p>Bank-level security for your data</p>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div className="feature-item">
                  <IonIcon icon={lockClosed} className="feature-icon" />
                  <h3>Instant</h3>
                  <p>Real-time policy management</p>
                </div>
              </IonCol>
              <IonCol size="12" size-md="4">
                <div className="feature-item">
                  <IonIcon icon={shieldCheckmark} className="feature-icon" />
                  <h3>Protected</h3>
                  <p>Your information is safe with us</p>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <IonLoading
          isOpen={isLoading}
          message={isLogin ? 'Signing in...' : 'Creating account...'}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={isLogin ? 'Login Status' : 'Signup Status'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;