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
  IonLabel,
  IonBadge,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonChip
} from '@ionic/react';
import { 
  add, 
  car, 
  home, 
  medical, 
  business,
  documentText,
  calendar,
  cash,
  shieldCheckmark,
  alertCircle
} from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {
  const policies = [
    {
      id: 1,
      type: 'Auto Insurance',
      icon: car,
      policyNumber: 'AUTO-2024-001',
      premium: '$120',
      status: 'Active',
      dueDate: '2024-01-15',
      coverage: 'Full Coverage',
      deductible: '$500',
      startDate: '2023-01-15',
      endDate: '2024-01-15',
      vehicle: 'Toyota Camry 2022'
    },
    {
      id: 2,
      type: 'Home Insurance',
      icon: home,
      policyNumber: 'HOME-2023-156',
      premium: '$85',
      status: 'Active',
      dueDate: '2024-01-20',
      coverage: 'Property Damage',
      deductible: '$1,000',
      startDate: '2023-01-20',
      endDate: '2024-01-20',
      property: '123 Main St, City, State'
    },
    {
      id: 3,
      type: 'Health Insurance',
      icon: medical,
      policyNumber: 'HLTH-2024-003',
      premium: '$200',
      status: 'Pending',
      dueDate: '2024-01-10',
      coverage: 'Family Plan',
      deductible: '$2,500',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      members: 'John, Sarah, Mike (3 members)'
    },
    {
      id: 4,
      type: 'Business Insurance',
      icon: business,
      policyNumber: 'BIZ-2023-089',
      premium: '$150',
      status: 'Expired',
      dueDate: '2023-12-01',
      coverage: 'Liability',
      deductible: '$2,500',
      startDate: '2022-12-01',
      endDate: '2023-12-01',
      business: 'Sunitha Tech Solutions'
    }
  ];

  const policyTypes = [
    { type: 'All', count: 4, active: true },
    { type: 'Active', count: 2, active: false },
    { type: 'Pending', count: 1, active: false },
    { type: 'Expired', count: 1, active: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Pending': return 'warning';
      case 'Expired': return 'danger';
      default: return 'medium';
    }
  };

  const getPolicyDetails = (policy: any) => {
    switch (policy.type) {
      case 'Auto Insurance':
        return `Vehicle: ${policy.vehicle}`;
      case 'Home Insurance':
        return `Property: ${policy.property}`;
      case 'Health Insurance':
        return `Covered: ${policy.members}`;
      case 'Business Insurance':
        return `Business: ${policy.business}`;
      default:
        return 'No additional details';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Policies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="policies-container">
          {/* Header Stats */}
          <IonCard className="stats-card">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">{policies.length}</div>
                      <div className="stat-label">Total Policies</div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">${policies.reduce((sum, p) => sum + parseInt(p.premium.replace('$', '')), 0)}</div>
                      <div className="stat-label">Monthly Premium</div>
                    </div>
                  </IonCol>
                  <IonCol size="4">
                    <div className="stat-item">
                      <div className="stat-number">{policies.filter(p => p.status === 'Active').length}</div>
                      <div className="stat-label">Active</div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Add Policy Button */}
          <IonButton className="add-policy-btn" expand="block" fill="solid">
            <IonIcon icon={add} slot="start" />
            Add New Policy
          </IonButton>

          {/* Policy Type Filter */}
          <div className="filter-section">
            {policyTypes.map((filter, index) => (
              <IonChip 
                key={index} 
                className={`filter-chip ${filter.active ? 'active' : ''}`}
                outline={!filter.active}
              >
                <IonLabel>{filter.type}</IonLabel>
                <IonBadge color="light">{filter.count}</IonBadge>
              </IonChip>
            ))}
          </div>

          {/* Policies List */}
          <div className="policies-list">
            {policies.map((policy) => (
              <IonCard key={policy.id} className="policy-card">
                <IonCardHeader className="policy-header">
                  <div className="policy-title">
                    <IonIcon icon={policy.icon} className="policy-type-icon" />
                    <div>
                      <IonCardTitle>{policy.type}</IonCardTitle>
                      <p className="policy-number">{policy.policyNumber}</p>
                    </div>
                  </div>
                  <IonBadge color={getStatusColor(policy.status)} className="status-badge">
                    {policy.status}
                  </IonBadge>
                </IonCardHeader>
                
                <IonCardContent>
                  <div className="policy-details">
                    <div className="detail-row">
                      <IonIcon icon={cash} />
                      <span className="detail-label">Premium:</span>
                      <span className="detail-value premium">{policy.premium}/month</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={calendar} />
                      <span className="detail-label">Due Date:</span>
                      <span className="detail-value due-date">{policy.dueDate}</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={shieldCheckmark} />
                      <span className="detail-label">Coverage:</span>
                      <span className="detail-value">{policy.coverage}</span>
                    </div>
                    
                    <div className="detail-row">
                      <IonIcon icon={alertCircle} />
                      <span className="detail-label">Deductible:</span>
                      <span className="detail-value">{policy.deductible}</span>
                    </div>

                    <div className="policy-additional">
                      {getPolicyDetails(policy)}
                    </div>
                  </div>

                  <div className="policy-actions">
                    <IonButton fill="clear" size="small">
                      <IonIcon icon={documentText} slot="start" />
                      View Details
                    </IonButton>
                    <IonButton fill="clear" size="small" color="success">
                      Make Payment
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;