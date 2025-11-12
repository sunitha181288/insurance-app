import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, logOut } from 'ionicons/icons';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Login from './pages/Login';
import { useEffect, useState } from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };

    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  if (isAuthenticated === null) {
    return (
      <IonApp>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <div style={{ 
            textAlign: 'center', 
            color: 'white',
            padding: '20px'
          }}>
            <h2>VInsure</h2>
            <p>Loading...</p>
          </div>
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        {!isAuthenticated ? (
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login onLogin={() => setIsAuthenticated(true)} />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route>
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/policies">
                <Policies />
              </Route>
              <Route exact path="/claims">
                <Claims />
              </Route>
              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/login">
                <Redirect to="/dashboard" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="dashboard" href="/dashboard">
                <IonIcon icon={triangle} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="policies" href="/policies">
                <IonIcon icon={ellipse} />
                <IonLabel>Policies</IonLabel>
              </IonTabButton>
              <IonTabButton tab="claims" href="/claims">
                <IonIcon icon={square} />
                <IonLabel>Claims</IonLabel>
              </IonTabButton>
              <IonTabButton tab="logout" onClick={handleLogout}>
                <IonIcon icon={logOut} />
                <IonLabel>Logout</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;