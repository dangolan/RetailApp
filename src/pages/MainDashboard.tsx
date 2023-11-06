import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { TokenContext } from "./Home";
import { getDataApi } from "../api/getData";
import { getStoreListApi } from "../api/storeList";
import ChooseAbranch from "../components/dashboard/ChooseAbranch";
import Ap from "../components/dashboard/content";
import StoresPicker from '../components/dashboard/storeListPicker';


const Dashboard: React.FC = () => {
  const tokenContext = React.useContext(TokenContext);
  const token = tokenContext.token;
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
