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
  IonBadge,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonText,
  IonAlert,
  IonToast,
  IonModal,
  IonList,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetimeButton,
  IonDatetime
} from '@ionic/react';
import { 
  add, 
  documentText, 
  time, 
  checkmarkCircle,
  closeCircle,
  car,
  home,
  medical,
  business,
  person,
  camera,
  attach,
  calendar,
  cash,
  warning,
  close
} from 'ionicons/icons';
import { useState } from 'react';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // New claim form state
  const [newClaim, setNewClaim] = useState({
    policyType: '',
    incidentDate: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    contactPerson: '',
    phoneNumber: '',
    images: [] as string[]
  });

  const claims = [
    {
      id: 'CL-2024-001',
      type: 'Auto Insurance',
      icon: car,
      incidentDate: '2024-01-05',
      filedDate: '2024-01-06',
      status: 'In Review',
      amount: '$2,500',
      description: 'Rear-end collision on highway',
      assignedAdjuster: 'John Smith',
      lastUpdate: '2024-01-08',
      documents: ['Police Report', 'Damage Photos']
    },
    {
      id: 'CL-2023-156',
      type: 'Home Insurance',
      icon: home,
      incidentDate: '2023-12-20',
      filedDate: '2023-12-21',
      status: 'Approved',
      amount: '$5,000',
      description: 'Water damage from burst pipes',
      assignedAdjuster: 'Sarah Johnson',
      lastUpdate: '2024-01-02',
      documents: ['Plumber Report', 'Damage Assessment']
    },
    {
      id: 'CL-2023-142',
      type: 'Health Insurance',
      icon: medical,
      incidentDate: '2023-11-15',
      filedDate: '2023-11-16',
      status: 'Paid',
      amount: '$1,200',
      description: 'Emergency room visit',
      assignedAdjuster: 'Mike Davis',
      lastUpdate: '2023-12-01',
      documents: ['Medical Bills', 'Doctor Report']
    },
    {
      id: 'CL-2023-135',
      type: 'Business Insurance',
      icon: business,
      incidentDate: '2023-10-10',
      filedDate: '2023-10-11',
      status: 'Rejected',
      amount: '$3,000',
      description: 'Equipment theft',
      assignedAdjuster: 'Lisa Brown',
      lastUpdate: '2023-10-25',
      documents: ['Police Report', 'Inventory List']
    }
  ];

  const policies = [
    { type: 'Auto Insurance', icon: car },
    { type: 'Home Insurance', icon: home },
    { type: 'Health Insurance', icon: medical },
    { type: 'Business Insurance', icon: business }
  ];

  const claimFilters = [
    { type: 'All', count: claims.length },
    { type: 'In Review', count: claims.filter(c => c.status === 'In Review').length },
    { type: 'Approved', count: claims.filter(c => c.status === 'Approved').length },
    { type: 'Paid', count: claims.filter(c => c.status === 'Paid').length },
    { type: 'Rejected', count: claims.filter(c => c.status === 'Rejected').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Review': return 'warning';
      case 'Approved': return 'success';
      case 'Paid': return 'primary';
      case 'Rejected': return 'danger';
      default: return 'medium';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Review': return time;
      case 'Approved': return checkmarkCircle;
      case 'Paid': return checkmarkCircle;
      case 'Rejected': return closeCircle;
      default: return time;
    }
  };

  const filteredClaims = activeFilter === 'All' 
    ? claims 
    : claims.filter(claim => claim.status === activeFilter);

  const handleNewClaim = () => {
    setShowNewClaimModal(true);
  };

  const handleSubmitClaim = () => {
    if (!newClaim.policyType || !newClaim.incidentDate || !newClaim.description) {
      setToastMessage('Please fill in all required fields');
      setShowSuccessToast(true);
      return;
    }
    console.log('Submitting claim:', newClaim);
        setToastMessage('Claim submitted successfully! Our team will review it within 24 hours.');
    setShowSuccessToast(true);
        setNewClaim({
      policyType: '',
      incidentDate: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      contactPerson: '',
      phoneNumber: '',
      images: []
    });
    setShowNewClaimModal(false);
  };

  const handleFileUpload = () => {
    setToastMessage('File upload functionality would be implemented here');
    setShowSuccessToast(true);
  };

  const handleTakePhoto = () => {
    // camera functionality
    setToastMessage('Camera functionality would be implemented here');
    setShowSuccessToast(true);
  };

  const resetForm = () => {
    setNewClaim({
      policyType: '',
      incidentDate: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      contactPerson: '',
      phoneNumber: '',
      images: []
    });
    setShowNewClaimModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Claims Center</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="claims-container">
          {/* Header */}
          <IonCard className="stats-card">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">{claims.length}</div>
                      <div className="stat-label">Total Claims</div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">{claims.filter(c => c.status === 'In Review').length}</div>
                      <div className="stat-label">In Review</div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">${claims.reduce((sum, claim) => sum + parseInt(claim.amount.replace('$', '').replace(',', '')), 0)}</div>
                      <div className="stat-label">Total Amount</div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* New Claim Button */}
          <IonButton className="new-claim-btn" expand="block" fill="solid" onClick={handleNewClaim}>
            <IonIcon icon={add} slot="start" />
            File New Claim
          </IonButton>

          {/* Claim Filters */}
          <div className="filter-section">
            {claimFilters.map((filter, index) => (
              <IonChip 
                key={index} 
                className={`filter-chip ${activeFilter === filter.type ? 'active' : ''}`}
                outline={activeFilter !== filter.type}
                onClick={() => setActiveFilter(filter.type)}
              >
                <IonLabel>{filter.type}</IonLabel>
                <IonBadge color="light">{filter.count}</IonBadge>
              </IonChip>
            ))}
          </div>

          {/* Claims List */}
          <div className="claims-list">
            {filteredClaims.map((claim) => (
              <IonCard key={claim.id} className="claim-card">
                <IonCardHeader className="claim-header">
                  <div className="claim-title">
                    <IonIcon icon={claim.icon} className="claim-type-icon" />
                    <div>
                      <IonCardTitle>{claim.type}</IonCardTitle>
                      <p className="claim-number">{claim.id}</p>
                    </div>
                  </div>
                  <IonBadge color={getStatusColor(claim.status)} className="status-badge">
                    <IonIcon icon={getStatusIcon(claim.status)} className="status-icon" />
                    {claim.status}
                  </IonBadge>
                </IonCardHeader>
                
                <IonCardContent>
                  <div className="claim-details">
                    <div className="detail-row">
                      <IonIcon icon={calendar} />
                      <span className="detail-label">Incident Date:</span>
                      <span className="detail-value">{claim.incidentDate}</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={documentText} />
                      <span className="detail-label">Description:</span>
                      <span className="detail-value description">{claim.description}</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={cash} />
                      <span className="detail-label">Claim Amount:</span>
                      <span className="detail-value amount">{claim.amount}</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={person} />
                      <span className="detail-label">Adjuster:</span>
                      <span className="detail-value">{claim.assignedAdjuster}</span>
                    </div>

                    {claim.documents && claim.documents.length > 0 && (
                      <div className="documents-section">
                        <IonText color="medium">
                          <small>Documents: {claim.documents.join(', ')}</small>
                        </IonText>
                      </div>
                    )}

                    <div className="last-update">
                      <IonText color="medium">
                        <small>Last updated: {claim.lastUpdate}</small>
                      </IonText>
                    </div>
                  </div>

                  <div className="claim-actions">
                    <IonButton fill="clear" size="small">
                      <IonIcon icon={documentText} slot="start" />
                      View Details
                    </IonButton>
                    <IonButton fill="clear" size="small" color="primary">
                      Track Status
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>

          {/* Empty State */}
          {filteredClaims.length === 0 && (
            <IonCard className="empty-state-card">
              <IonCardContent>
                <div className="empty-state">
                  <IonIcon icon={documentText} className="empty-icon" />
                  <h3>No Claims Found</h3>
                  <p>No {activeFilter.toLowerCase()} claims match your criteria.</p>
                  <IonButton fill="solid" onClick={() => setActiveFilter('All')}>
                    View All Claims
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        {/* New Claim Modal */}
        <IonModal isOpen={showNewClaimModal} onDidDismiss={resetForm}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>File New Claim</IonTitle>
              <IonButton slot="end" fill="clear" onClick={resetForm}>
                <IonIcon icon={close} />
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="claim-form-content">
            <div className="claim-form">
              <IonList>
                {/* Policy Type Select */}
                <IonItem>
                  <IonLabel position="stacked">Policy Type *</IonLabel>
                  <IonSelect 
                    value={newClaim.policyType}
                    placeholder="Select policy type"
                    onIonChange={(e) => setNewClaim({...newClaim, policyType: e.detail.value})}
                  >
                    {policies.map((policy, index) => (
                      <IonSelectOption key={index} value={policy.type}>
                        {policy.type}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>

                {/* Incident Date */}
                <IonItem>
                  <IonLabel position="stacked">Incident Date *</IonLabel>
                  <IonInput 
                    type="date" 
                    value={newClaim.incidentDate}
                    onIonInput={(e) => setNewClaim({...newClaim, incidentDate: e.detail.value!})}
                  />
                </IonItem>

                {/* Description */}
                <IonItem>
                  <IonLabel position="stacked">Incident Description *</IonLabel>
                  <IonTextarea
                    placeholder="Describe what happened in detail..."
                    value={newClaim.description}
                    rows={4}
                    onIonInput={(e) => setNewClaim({...newClaim, description: e.detail.value!})}
                  />
                </IonItem>

                {/* Claim Amount */}
                <IonItem>
                  <IonLabel position="stacked">Estimated Claim Amount ($)</IonLabel>
                  <IonInput
                    type="number"
                    placeholder="Enter amount"
                    value={newClaim.amount}
                    onIonInput={(e) => setNewClaim({...newClaim, amount: e.detail.value!})}
                  />
                </IonItem>

                {/* Contact Person */}
                <IonItem>
                  <IonLabel position="stacked">Contact Person</IonLabel>
                  <IonInput
                    placeholder="Full name"
                    value={newClaim.contactPerson}
                    onIonInput={(e) => setNewClaim({...newClaim, contactPerson: e.detail.value!})}
                  />
                </IonItem>

                {/* Phone Number */}
                <IonItem>
                  <IonLabel position="stacked">Phone Number</IonLabel>
                  <IonInput
                    type="tel"
                    placeholder="Phone number"
                    value={newClaim.phoneNumber}
                    onIonInput={(e) => setNewClaim({...newClaim, phoneNumber: e.detail.value!})}
                  />
                </IonItem>
              </IonList>

              {/* File Upload Section */}
              <div className="file-upload-section">
                <h4>Attach Documents (Optional)</h4>
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <IonButton 
                        expand="block" 
                        fill="outline" 
                        className="file-upload-btn"
                        onClick={handleFileUpload}
                      >
                        <IonIcon icon={attach} slot="start" />
                        Upload Files
                      </IonButton>
                    </IonCol>
                    <IonCol size="6">
                      <IonButton 
                        expand="block" 
                        fill="outline" 
                        className="camera-btn"
                        onClick={handleTakePhoto}
                      >
                        <IonIcon icon={camera} slot="start" />
                        Take Photo
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <IonButton 
                  expand="block" 
                  fill="solid" 
                  color="primary"
                  onClick={handleSubmitClaim}
                  disabled={!newClaim.policyType || !newClaim.incidentDate || !newClaim.description}
                >
                  Submit Claim
                </IonButton>
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  color="medium"
                  onClick={resetForm}
                >
                  Cancel
                </IonButton>
              </div>
            </div>
          </IonContent>
        </IonModal>

        {/* Success Toast */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={toastMessage}
          duration={4000}
          position="bottom"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;