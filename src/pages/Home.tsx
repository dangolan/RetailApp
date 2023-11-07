import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useState } from "react";
import "./Home.css";
import Login from "./loginForm";
import Dashboard from "./MainDashboard";
import CustomIonAlert from "../components/dashboard/Alart";

export const TokenContext = React.createContext<any>(null);

const Home: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [showAlert, setShowAlert] = useState(false);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  // Define a new function to update the token
  const updateToken = (newToken: string | null) => {
    // Update the state with the new token
    setToken(newToken);

    // Store the new token in localStorage
    if (newToken) {
      localStorage.setItem("token", newToken);
      setShowAlert(false);
    } else {
      // If newToken is null, remove it from localStorage
      localStorage.removeItem("token");
      setShowAlert(true);
    }
  };


  return (
    <TokenContext.Provider
      value={{
        token: token,
        setToken: (value: string | null) => {
          updateToken(value);
        },
      }}
    >
      <IonPage>
        <IonContent fullscreen>
          {showAlert && (
            <CustomIonAlert isOpen={true} onDidDismiss={handleDismiss} />
          )}
          {token ? (
            // If token is present, render the Dashboard component
            <Dashboard />
          ) : (
            // If token is not present, render the Login component with the callback prop
            <Login />
          )}
        </IonContent>
      </IonPage>
    </TokenContext.Provider>
  );
};

export default Home;
