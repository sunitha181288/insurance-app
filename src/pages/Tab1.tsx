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
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/react';
import { 
  shieldCheckmark, 
  car, 
  home, 
  medical, 
  documentText,
  cash,
  alertCircle,
  trendingUp,
  personCircle
} from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  const quickActions = [
    { icon: documentText, label: 'File Claim', color: 'primary', path: '/claims' },
    { icon: cash, label: 'Make Payment', color: 'success', path: '/payments' },
    { icon: shieldCheckmark, label: 'New Policy', color: 'warning', path: '/policies' },
    { icon: alertCircle, label: 'Emergency', color: 'danger', path: '/emergency' }
  ];

  const policies = [
    { 
      id: 1, 
      type: 'Auto Insurance', 
      icon: car, 
      premium: '$120', 
      status: 'Active', 
      dueDate: '2024-01-15',
      coverage: 'Full Coverage'
    },
    { 
      id: 2, 
      type: 'Home Insurance', 
      icon: home, 
      premium: '$85', 
      status: 'Active', 
      dueDate: '2024-01-20',
      coverage: 'Property Damage'
    },
    { 
      id: 3, 
      type: 'Health Insurance', 
      icon: medical, 
      premium: '$200', 
      status: 'Pending', 
      dueDate: '2024-01-10',
      coverage: 'Family Plan'
    }
  ];

  const stats = [
    { value: '3', label: 'Total Policies', color: '#3880ff' },
    { value: '$405', label: 'Monthly Premium', color: '#2dd36f' },
    { value: '1', label: 'Pending Claims', color: '#ffc409' }
  ];

  const activePolicies = policies.filter(policy => policy.status === 'Active').length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Insurance Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="dashboard-container">
          {/* Welcome Section */}
          <IonCard className="welcome-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={shieldCheckmark} className="welcome-icon" />
                <div className="welcome-text">
                  <div className="greeting">Welcome back, John!</div>
                  <div className="subtitle">Your insurance coverage is active</div>
                </div>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="welcome-stats">
                <div className="stat">
                  <div className="stat-number">{activePolicies}</div>
                  <div className="stat-label">Active Policies</div>
                </div>
                <div className="stat">
                  <div className="stat-number">${405}</div>
                  <div className="stat-label">Monthly</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Covered</div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Quick Actions */}
          <IonCard className="actions-card">
            <IonCardHeader>
              <IonCardTitle>Quick Actions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="actions-grid">
                <IonRow>
                  {quickActions.map((action, index) => (
                    <IonCol size="6" key={index}>
                      <IonButton 
                        className={`action-button ${action.color}`} 
                        fill="clear"
                        expand="block"
                      >
                        <div className="action-content">
                          <IonIcon icon={action.icon} className="action-icon" />
                          <span className="action-label">{action.label}</span>
                        </div>
                      </IonButton>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          {/* Policies Overview */}
          <IonCard className="policies-card">
            <IonCardHeader>
              <IonCardTitle>My Policies</IonCardTitle>
              <IonButton fill="clear" size="small">View All</IonButton>
            </IonCardHeader>
            <IonCardContent>
              {policies.map((policy) => (
                <IonItem key={policy.id} className="policy-item" lines="none">
                  <IonIcon icon={policy.icon} slot="start" className="policy-icon" />
                  <IonLabel className="policy-content">
                    <h3>{policy.type}</h3>
                    <p>{policy.coverage}</p>
                    <div className="policy-details">
                      <span className="premium">{policy.premium}/month</span>
                      <span className="due-date">Due {policy.dueDate}</span>
                    </div>
                  </IonLabel>
                  <IonBadge 
                    color={policy.status === 'Active' ? 'success' : 'warning'}
                    className="status-badge"
                  >
                    {policy.status}
                  </IonBadge>
                </IonItem>
              ))}
            </IonCardContent>
          </IonCard>

          {/* Insurance Tips */}
          <IonCard className="tips-card">
            <IonCardHeader>
              <IonCardTitle>
                <IonIcon icon={trendingUp} />
                Insurance Tips
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="tip-item">
                <div className="tip-bullet">💡</div>
                <div className="tip-text">Review your coverage annually to ensure adequate protection</div>
              </div>
              <div className="tip-item">
                <div className="tip-bullet">📝</div>
                <div className="tip-text">Keep digital copies of all insurance documents</div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;