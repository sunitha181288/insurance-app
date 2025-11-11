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
  IonButton,
  IonAlert,
  IonToast,
  IonLoading
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
  checkmarkCircle,
  closeCircle
} from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const history = useHistory(); 
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [showPaymentToast, setShowPaymentToast] = useState(false);
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [policies, setPolicies] = useState([
    { 
      id: 1, 
      type: 'Auto Insurance', 
      icon: car, 
      premium: '$120', 
      status: 'Active', 
      dueDate: '2024-01-15',
      coverage: 'Full Coverage',
      isDue: true,
      dueAmount: '$120'
    },
    { 
      id: 2, 
      type: 'Home Insurance', 
      icon: home, 
      premium: '$85', 
      status: 'Active', 
      dueDate: '2024-01-20',
      coverage: 'Property Damage',
      isDue: true,
      dueAmount: '$85'
    },
    { 
      id: 3, 
      type: 'Health Insurance', 
      icon: medical, 
      premium: '$200', 
      status: 'Pending', 
      dueDate: '2024-01-10',
      coverage: 'Family Plan',
      isDue: false,
      dueAmount: '$200'
    }
  ]);

  const quickActions = [
    { 
      icon: documentText, 
      label: 'File Claim', 
      color: 'primary', 
      action: () => handleFileClaim() 
    },
    { 
      icon: cash, 
      label: 'Make Payment', 
      color: 'success', 
      action: () => handleMakePayment() 
    },
    { 
      icon: shieldCheckmark, 
      label: 'New Policy', 
      color: 'warning', 
      action: () => handleNewPolicy() 
    },
    { 
      icon: alertCircle, 
      label: 'Emergency', 
      color: 'danger', 
      action: () => handleEmergency() 
    }
  ];

  const activePolicies = policies.filter(policy => policy.status === 'Active').length;
  const dueBills = policies.filter(policy => policy.isDue);
  const totalDue = dueBills.reduce((sum, policy) => sum + parseInt(policy.dueAmount.replace('$', '')), 0);

  const handleFileClaim = () => {
    history.push('/claims');
  };

  // Payment Handler Functions
  const handleMakePayment = () => {
    if (dueBills.length === 0) {
      setToastMessage('No due bills found! All payments are up to date.');
      setToastColor('success');
      setShowPaymentToast(true);
      return;
    }
    
    setShowPaymentAlert(true);
  };

  const handleQuickPayment = (policyId: number) => {
    const policy = policies.find(p => p.id === policyId);
    if (policy && policy.isDue) {
      processPayment([policy]);
    }
  };

  const handlePayAll = () => {
    if (dueBills.length === 0) {
      setToastMessage('No due bills to pay! All payments are up to date.');
      setToastColor('success');
      setShowPaymentToast(true);
      return;
    }
    processPayment(dueBills);
  };

  const processPayment = async (billsToPay: any[]) => {
    setShowPaymentAlert(false);
    setShowPaymentProcessing(true);

    try {
      console.log('Initiating payment to gateway...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const updatedPolicies = policies.map(policy => {
          if (billsToPay.find(bill => bill.id === policy.id)) {
            return {
              ...policy,
              isDue: false,
              dueDate: getNextDueDate(policy.dueDate)
            };
          }
          return policy;
        });
        
        setPolicies(updatedPolicies);
        
        const totalPaid = billsToPay.reduce((sum, policy) => sum + parseInt(policy.dueAmount.replace('$', '')), 0);
        setToastMessage(`Payment of $${totalPaid} processed successfully! All due bills cleared.`);
        setToastColor('success');
      } else {
        setToastMessage('Payment failed. Please try again or use a different payment method.');
        setToastColor('danger');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setToastMessage('Payment processing error. Please try again.');
      setToastColor('danger');
    } finally {
      setShowPaymentProcessing(false);
      setShowPaymentToast(true);
    }
  };

  const getNextDueDate = (currentDueDate: string) => {
    const date = new Date(currentDueDate);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleNewPolicy = () => {
    setToastMessage('Opening new policy application...');
    setToastColor('warning');
    setShowPaymentToast(true);
  };

  const handleEmergency = () => {
    setToastMessage('Connecting to emergency services...');
    setToastColor('danger');
    setShowPaymentToast(true);
  };

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
                  <div className="stat-number">${policies.reduce((sum, policy) => sum + parseInt(policy.premium.replace('$', '')), 0)}</div>
                  <div className="stat-label">Monthly</div>
                </div>
                <div className="stat">
                  <div className="stat-number">{dueBills.length}</div>
                  <div className="stat-label">Due Bills</div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Due Bills Alert - Only shows when there are due bills */}
          {dueBills.length > 0 ? (
            <IonCard className="due-bills-card">
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={alertCircle} className="due-icon" />
                  Due Bills
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="due-bills-content">
                  <div className="due-amount">
                    <span className="amount">${totalDue}</span>
                    <span className="due-text">Total Due</span>
                  </div>
                  <IonButton 
                    className="pay-all-btn" 
                    fill="solid" 
                    color="success"
                    onClick={handlePayAll}
                  >
                    <IonIcon icon={cash} slot="start" />
                    Pay All
                  </IonButton>
                </div>
                <div className="due-bills-list">
                  {dueBills.map((bill) => (
                    <div key={bill.id} className="due-bill-item">
                      <IonIcon icon={bill.icon} className="bill-icon" />
                      <div className="bill-info">
                        <span className="bill-type">{bill.type}</span>
                        <span className="bill-due">Due {bill.dueDate}</span>
                      </div>
                      <div className="bill-actions">
                        <span className="bill-amount">{bill.dueAmount}</span>
                        <IonButton 
                          size="small" 
                          fill="solid" 
                          color="primary"
                          onClick={() => handleQuickPayment(bill.id)}
                        >
                          Pay Now
                        </IonButton>
                      </div>
                    </div>
                  ))}
                </div>
              </IonCardContent>
            </IonCard>
          ) : (
            /* No Due Bills Message - Shows when all bills are paid */
            <IonCard className="no-due-bills-card">
              <IonCardContent>
                <div className="no-due-content">
                  <IonIcon icon={checkmarkCircle} className="no-due-icon" />
                  <div className="no-due-text">
                    <h3>No Due Bills!</h3>
                    <p>All your payments are up to date. Great job!</p>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          )}

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
                        onClick={action.action}
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
                      <span className={`due-date ${policy.isDue ? 'due' : 'paid'}`}>
                        {policy.isDue ? `Due ${policy.dueDate}` : `Paid until ${policy.dueDate}`}
                      </span>
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

        {/* Payment Confirmation Alert */}
        <IonAlert
          isOpen={showPaymentAlert}
          onDidDismiss={() => setShowPaymentAlert(false)}
          header={'Process Payment'}
          message={`You are about to pay $${totalDue} for ${dueBills.length} due bill(s). This will redirect to our secure payment gateway.`}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Proceed to Payment',
              handler: () => handlePayAll()
            }
          ]}
        />

        {/* Payment Processing Loader */}
        <IonLoading
          isOpen={showPaymentProcessing}
          message={'Processing payment with gateway...'}
          duration={0}
        />

        {/* Payment Result Toast */}
        <IonToast
          isOpen={showPaymentToast}
          onDidDismiss={() => setShowPaymentToast(false)}
          message={toastMessage}
          duration={4000}
          position="bottom"
          color={toastColor}
          buttons={[
            {
              icon: closeCircle,
              role: 'cancel'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;