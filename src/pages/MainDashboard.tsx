import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { TokenContext } from "./Home";
import StoresPicker from '../components/dashboard/storeListPicker';

const Dashboard: React.FC = () => {
  const tokenContext = React.useContext(TokenContext);
  // You can use the 'token' prop to display user-specific content or perform authenticated actions.

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <StoresPicker />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
