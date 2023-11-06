// AppRouter.tsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import Login from './pages/loginForm';
import Dashboard from './pages/MainDashboard';

const AppRouter: React.FC = () => (
  <IonRouterOutlet>
    <Route path="/login" component={Login} exact />
    <Route path="/dashboard" component={Dashboard} exact />
    <Redirect exact from="/" to="/login" />
  </IonRouterOutlet>
);

export default AppRouter;
