import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonButton,
  IonPicker,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/react";
import { getStoreListApi } from "../../api/storeList";
import { TokenContext } from "../../pages/Home";
import SellingChart from "./SelingChart";
import GraphForSelling from "./graphCard";
import Ap from "./Ap";

const StoresPicker = () => {
  const tokenContext = React.useContext(TokenContext);
  const token = tokenContext.token;
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // Fetch the list of stores when the component mounts
  useEffect(() => {
    async function fetchStores() {
      try {
        const storeList = await getStoreListApi(token, (store: any) => store.has_carts);
        setStores(storeList);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    }

    fetchStores();
  }, [token]);

  const handlePickerSelect = (value: any) => {
    setSelectedStore(value);
  };

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleDismissPicker = () => {
    setShowPicker(false);
  };

  return (
    <IonContent>
      <IonGrid className="ion-text-center">
        <IonRow className="ion-align-items-center">
          <IonCol size="12">
            <IonButton expand="full" onClick={handleShowPicker}>
              Select a Store
            </IonButton>
          </IonCol>
          <IonCol size="12">
            <IonPicker
              isOpen={showPicker}
              columns={[
                {
                  name: "storeName",
                  options: stores.map((store: any) => ({
                    text: store.name,
                    value: store.id,
                  })),
                },
              ]}
              buttons={[
                {
                  text: "Cancel",
                  handler: handleDismissPicker,
                },
                {
                  text: "Confirm",
                  handler: (selectedValues) => {
                    handlePickerSelect(selectedValues.storeName.value);
                    handleDismissPicker();
                  },
                },
              ]}
            ></IonPicker>
          </IonCol>
          <IonCol size="12">
            <div>
            <p>Selected Store: {selectedStore}</p>
            <GraphForSelling />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default StoresPicker;
