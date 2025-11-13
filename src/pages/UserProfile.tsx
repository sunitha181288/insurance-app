import React, { useState, useEffect } from 'react';
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
  IonAvatar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonToast,
  IonList,
  IonSelect,
  IonSelectOption,
  IonBadge,
  IonDatetime,
  IonDatetimeButton,
  IonModal
} from '@ionic/react';
import { 
  person, 
  mail, 
  call, 
  home, 
  calendar,
  shieldCheckmark,
  camera,
  save,
  logOut,
  documentText,
  business,
  close,
  warning
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

// Import utility functions
import { User } from '../data/usersData';
import { 
  formatDateToDDMMYYYY, 
  formatDateToYYYYMMDD, 
  getCurrentDate 
} from './utils/dateUtils';
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateDateOfBirth, 
  validateAddress,
  ValidationErrors 
} from './utils/validationUtils';
import { 
  generateUserData, 
  getUserStats 
} from './utils/userDataUtils';

import './UserProfile.css';

const UserProfile: React.FC = () => {
  const history = useHistory();
  
  const [user, setUser] = useState<User>({
    username: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    insuranceType: 'Comprehensive',
    memberSince: '',
    role: 'user'
  });

  const [originalUser, setOriginalUser] = useState<User>({
    username: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    insuranceType: 'Comprehensive',
    memberSince: '',
    role: 'user'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const currentUsername = localStorage.getItem('username');
    const currentName = localStorage.getItem('userName');
    const currentRole = localStorage.getItem('userRole') || 'user';
    
    const userData = generateUserData(currentUsername, currentName, currentRole);
    
    const formattedUserData = {
      ...userData,
      dateOfBirth: formatDateToDDMMYYYY(userData.dateOfBirth || ''),
      memberSince: formatDateToDDMMYYYY(userData.memberSince || '')
    };
    
    setUser(formattedUserData);
    setOriginalUser(formattedUserData);
    
    localStorage.setItem('userProfile', JSON.stringify(formattedUserData));
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {
      name: validateName(user.name),
      email: validateEmail(user.email || ''),
      phone: validatePhone(user.phone || ''),
      dateOfBirth: validateDateOfBirth(user.dateOfBirth || ''),
      address: validateAddress(user.address || '')
    };

    setValidationErrors(errors);
    
    const isValid = !Object.values(errors).some(error => error !== undefined);
    setIsFormValid(isValid);
    
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setToastMessage('Please fix the errors before saving');
      setShowToast(true);
      return;
    }

    localStorage.setItem('userProfile', JSON.stringify(user));
    setOriginalUser(user);
    setIsEditing(false);
    setToastMessage('Profile updated successfully!');
    setShowToast(true);
    setValidationErrors({});
  };

  const handleCancel = () => {
    setUser(originalUser);
    setIsEditing(false);
    setToastMessage('Changes discarded');
    setShowToast(true);
    setValidationErrors({});
    setIsFormValid(true);
  };

  const handleLogout = () => {
    setShowAlert(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userProfile');
    history.push('/login');
  };

  const handleInputChange = (key: string, value: string) => {
    const updatedUser = {
      ...user,
      [key]: value
    };
    
    setUser(updatedUser);
    
    if (isEditing) {
      const errors = { ...validationErrors };
      
      switch (key) {
        case 'name':
          errors.name = validateName(value);
          break;
        case 'email':
          errors.email = validateEmail(value);
          break;
        case 'phone':
          errors.phone = validatePhone(value);
          break;
        case 'dateOfBirth':
          errors.dateOfBirth = validateDateOfBirth(value);
          break;
        case 'address':
          errors.address = validateAddress(value);
          break;
      }
      
      setValidationErrors(errors);
      setIsFormValid(!Object.values(errors).some(error => error !== undefined));
    }
  };

  const handleDateChange = (event: CustomEvent) => {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      const date = new Date(selectedDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      
      handleInputChange('dateOfBirth', formattedDate);
    }
  };

  const getDateForDatetime = (dateString: string): string => {
    return formatDateToYYYYMMDD(dateString);
  };

  const userStats = getUserStats(user.username);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Profile</IonTitle>
          {user.role === 'admin' && (
            <IonBadge slot="end" color="danger" style={{ marginRight: '10px' }}>
              ADMIN
            </IonBadge>
          )}
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <div className="profile-container">
          <IonCard className="profile-header-card">
            <IonCardContent>
              <div className="profile-header">
                <div className="avatar-section">
                  <IonAvatar className="profile-avatar">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=667eea&color=fff&size=150`} 
                      alt="Profile" 
                    />
                  </IonAvatar>
                  <IonButton fill="clear" className="camera-btn">
                    <IonIcon icon={camera} />
                  </IonButton>
                </div>
                
                <div className="profile-info">
                  <h1 className="user-name">{user.name}</h1>
                  <p className="user-email">{user.email}</p>
                  <p className="user-username">@{user.username}</p>
                  
                  <div className="badges-container">
                    <IonBadge color="primary" className="member-badge">
                      <IonIcon icon={shieldCheckmark} /> 
                      Member since {user.memberSince}
                    </IonBadge>
                    
                    {user.role === 'admin' && (
                      <IonBadge color="danger" className="role-badge">
                        <IonIcon icon={business} />
                        Administrator
                      </IonBadge>
                    )}
                    
                    {user.insuranceType === 'Premium' && (
                      <IonBadge color="warning" className="plan-badge">
                        {user.insuranceType} Plan
                      </IonBadge>
                    )}
                    
                    {user.insuranceType === 'Enterprise' && (
                      <IonBadge color="success" className="plan-badge">
                        {user.insuranceType} Plan
                      </IonBadge>
                    )}
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <div className="action-buttons">
            <IonButton 
              fill={isEditing ? "outline" : "solid"}
              onClick={() => setIsEditing(!isEditing)}
            >
              <IonIcon icon={isEditing ? close : "create"} slot="start" />
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </IonButton>
            
            {isEditing && (
              <IonButton 
                fill="solid" 
                color="success"
                onClick={handleSave}
                disabled={!isFormValid}
              >
                <IonIcon icon={save} slot="start" />
                Save Changes
              </IonButton>
            )}
            
            {!isEditing && (
              <IonButton 
                fill="outline" 
                color="danger"
                onClick={handleLogout}
              >
                <IonIcon icon={logOut} slot="start" />
                Logout
              </IonButton>
            )}
          </div>

          {isEditing && !isFormValid && (
            <IonCard className="validation-card">
              <IonCardContent>
                <div className="validation-header">
                  <IonIcon icon={warning} color="warning" />
                  <span>Please fix the following errors:</span>
                </div>
                <ul className="validation-errors">
                  {Object.values(validationErrors).map((error, index) => 
                    error ? <li key={index}>{error}</li> : null
                  )}
                </ul>
              </IonCardContent>
            </IonCard>
          )}

          <IonCard className="info-card">
            <IonCardHeader>
              <IonCardTitle>Personal Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem className="info-item">
                  <IonIcon icon={person} slot="start" className="item-icon" />
                  <IonLabel position="fixed">Username</IonLabel>
                  <IonText color="medium">@{user.username}</IonText>
                </IonItem>

                <IonItem className={`info-item ${validationErrors.name ? 'invalid' : ''}`}>
                  <IonIcon icon={person} slot="start" className="item-icon" />
                  <IonLabel position={isEditing ? "stacked" : "fixed"}>
                    Full Name {isEditing && <span className="required">*</span>}
                  </IonLabel>
                  {isEditing ? (
                    <>
                      <IonInput
                        value={user.name}
                        onIonInput={(e) => handleInputChange('name', e.detail.value!)}
                        placeholder="Enter your full name"
                        className={validationErrors.name ? 'input-invalid' : ''}
                      />
                      {validationErrors.name && (
                        <IonText color="danger" className="error-message">
                          {validationErrors.name}
                        </IonText>
                      )}
                    </>
                  ) : (
                    <IonText>{user.name}</IonText>
                  )}
                </IonItem>

                <IonItem className={`info-item ${validationErrors.email ? 'invalid' : ''}`}>
                  <IonIcon icon={mail} slot="start" className="item-icon" />
                  <IonLabel position={isEditing ? "stacked" : "fixed"}>
                    Email {isEditing && <span className="required">*</span>}
                  </IonLabel>
                  {isEditing ? (
                    <>
                      <IonInput
                        type="email"
                        value={user.email}
                        onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                        placeholder="Enter your email"
                        className={validationErrors.email ? 'input-invalid' : ''}
                      />
                      {validationErrors.email && (
                        <IonText color="danger" className="error-message">
                          {validationErrors.email}
                        </IonText>
                      )}
                    </>
                  ) : (
                    <IonText>{user.email}</IonText>
                  )}
                </IonItem>

                <IonItem className={`info-item ${validationErrors.phone ? 'invalid' : ''}`}>
                  <IonIcon icon={call} slot="start" className="item-icon" />
                  <IonLabel position={isEditing ? "stacked" : "fixed"}>
                    Phone {isEditing && <span className="required">*</span>}
                  </IonLabel>
                  {isEditing ? (
                    <>
                      <IonInput
                        type="tel"
                        value={user.phone}
                        onIonInput={(e) => handleInputChange('phone', e.detail.value!)}
                        placeholder="Enter your phone number"
                        className={validationErrors.phone ? 'input-invalid' : ''}
                      />
                      {validationErrors.phone && (
                        <IonText color="danger" className="error-message">
                          {validationErrors.phone}
                        </IonText>
                      )}
                    </>
                  ) : (
                    <IonText>{user.phone}</IonText>
                  )}
                </IonItem>

                <IonItem className={`info-item ${validationErrors.dateOfBirth ? 'invalid' : ''}`}>
                  <IonIcon icon={calendar} slot="start" className="item-icon" />
                  <IonLabel position={isEditing ? "stacked" : "fixed"}>
                    Date of Birth {isEditing && <span className="required">*</span>}
                  </IonLabel>
                  {isEditing ? (
                    <>
                      <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                      <IonModal keepContentsMounted={true}>
                        <IonDatetime 
                          id="datetime"
                          value={getDateForDatetime(user.dateOfBirth || '')}
                          onIonChange={handleDateChange}
                          presentation="date"
                          max={getCurrentDate()}
                        ></IonDatetime>
                      </IonModal>
                      <IonText className="selected-date">
                        Selected: {user.dateOfBirth || 'No date selected'}
                      </IonText>
                      <IonText className="date-format-hint">
                        Format: DD-MM-YYYY
                      </IonText>
                      {validationErrors.dateOfBirth && (
                        <IonText color="danger" className="error-message">
                          {validationErrors.dateOfBirth}
                        </IonText>
                      )}
                    </>
                  ) : (
                    <IonText>{user.dateOfBirth}</IonText>
                  )}
                </IonItem>

                <IonItem className={`info-item ${validationErrors.address ? 'invalid' : ''}`}>
                  <IonIcon icon={home} slot="start" className="item-icon" />
                  <IonLabel position={isEditing ? "stacked" : "fixed"}>
                    Address {isEditing && <span className="required">*</span>}
                  </IonLabel>
                  {isEditing ? (
                    <>
                      <IonInput
                        value={user.address}
                        onIonInput={(e) => handleInputChange('address', e.detail.value!)}
                        placeholder="Enter your address"
                        className={validationErrors.address ? 'input-invalid' : ''}
                      />
                      {validationErrors.address && (
                        <IonText color="danger" className="error-message">
                          {validationErrors.address}
                        </IonText>
                      )}
                    </>
                  ) : (
                    <IonText>{user.address}</IonText>
                  )}
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          <IonCard className="info-card">
            <IonCardHeader>
              <IonCardTitle>Insurance Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <div className="stat-card">
                      <div className="stat-number">{userStats.activePolicies}</div>
                      <div className="stat-label">Active Policies</div>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div className="stat-card">
                      <div className="stat-number">${userStats.monthlyPremium}</div>
                      <div className="stat-label">Monthly Premium</div>
                    </div>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <div className="stat-card">
                      <div className="stat-number">{userStats.claimsFiled}</div>
                      <div className="stat-label">Claims Filed</div>
                    </div>
                  </IonCol>
                  <IonCol size="6">
                    <div className="stat-card">
                      <div className="stat-number">{userStats.coverageScore}%</div>
                      <div className="stat-label">Coverage Score</div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>

              <IonItem className="info-item">
                <IonIcon icon={shieldCheckmark} slot="start" className="item-icon" />
                <IonLabel position={isEditing ? "stacked" : "fixed"}>
                  Insurance Plan
                </IonLabel>
                {isEditing ? (
                  <IonSelect
                    value={user.insuranceType}
                    onIonChange={(e) => handleInputChange('insuranceType', e.detail.value)}
                  >
                    <IonSelectOption value="Basic">Basic</IonSelectOption>
                    <IonSelectOption value="Standard">Standard</IonSelectOption>
                    <IonSelectOption value="Comprehensive">Comprehensive</IonSelectOption>
                    <IonSelectOption value="Premium">Premium</IonSelectOption>
                    <IonSelectOption value="Enterprise">Enterprise</IonSelectOption>
                  </IonSelect>
                ) : (
                  <IonText color={
                    user.insuranceType === 'Premium' ? 'warning' :
                    user.insuranceType === 'Enterprise' ? 'success' : 'primary'
                  }>
                    {user.insuranceType} Plan
                  </IonText>
                )}
              </IonItem>
            </IonCardContent>
          </IonCard>

          {user.role === 'admin' && (
            <IonCard className="admin-card">
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={business} />
                  Administrator Tools
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <IonButton expand="block" fill="outline" className="admin-btn">
                        <div className="btn-content">
                          <IonIcon icon={person} />
                          <span>Manage Users</span>
                        </div>
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton expand="block" fill="outline" className="admin-btn">
                        <div className="btn-content">
                          <IonIcon icon={documentText} />
                          <span>View Reports</span>
                        </div>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="6">
                      <IonButton expand="block" fill="outline" className="admin-btn">
                        <div className="btn-content">
                          <IonIcon icon={shieldCheckmark} />
                          <span>System Settings</span>
                        </div>
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton expand="block" fill="outline" className="admin-btn">
                        <div className="btn-content">
                          <IonIcon icon={business} />
                          <span>Audit Log</span>
                        </div>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          )}

          <IonCard className="actions-card">
            <IonCardHeader>
              <IonCardTitle>Quick Actions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" fill="outline" className="action-btn">
                      <div className="btn-content">
                        <IonIcon icon={documentText} />
                        <span>My Documents</span>
                      </div>
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" fill="outline" className="action-btn">
                      <div className="btn-content">
                        <IonIcon icon={shieldCheckmark} />
                        <span>Policy Details</span>
                      </div>
                    </IonButton>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <IonButton expand="block" fill="outline" className="action-btn">
                      <div className="btn-content">
                        <IonIcon icon={call} />
                        <span>Contact Support</span>
                      </div>
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" fill="outline" className="action-btn">
                      <div className="btn-content">
                        <IonIcon icon={mail} />
                        <span>Message Center</span>
                      </div>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirm Logout'}
          message={'Are you sure you want to logout?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Logout',
              handler: confirmLogout
            }
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;