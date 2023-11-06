import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import AppRouter from '../AppRouter';

import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Login from './loginForm';
import Dashboard from './MainDashboard';

export const TokenContext = React.createContext<any>(null);


const Home: React.FC = () => {

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));


   // Define a new function to update the token
  const updateToken = (newToken: string | null) => {
    // Update the state with the new token
    setToken(newToken);

    // Store the new token in localStorage
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      // If newToken is null, remove it from localStorage
      localStorage.removeItem('token');
    }
  };

  

  return (
    <TokenContext.Provider value={{token: token, setToken: (value: string | null) => {updateToken(value)}}}>
    <IonPage>
      <IonContent fullscreen>
   
        {/* Conditionally render the Login or Dashboard component based on the token */}
        {token ? (
          // If token is present, render the Dashboard component
          <Dashboard/>
        ) : (
          // If token is not present, render the Login component with the callback prop
          <Login/>
        )}
      </IonContent>
    </IonPage>
    </TokenContext.Provider>
  );
};

export default Home;
