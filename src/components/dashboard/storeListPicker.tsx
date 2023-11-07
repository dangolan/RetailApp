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
import { getDataApi } from "../../api/getData";
import GraphForSelling from "./CardForDateChart";

const StoresPicker = () => {
  const tokenContext = React.useContext(TokenContext);
  const token = tokenContext.token;
  const [stores, setStores] = useState<any[]>([]); // Fix for Problem 1
  const [selectedStoreValue, setSelectedStoreValue] = useState<number | null>(
    null
  );
  const [selectedStoreName, setSelectedStoreName] = useState<string | null>(
    null
  );
  const [showPicker, setShowPicker] = useState(false);

  // Fetch the list of stores when the component mounts
  useEffect(() => {
    async function fetchStores() {
      try {
        const storeList = await getStoreListApi(
          token,
          (store: any) => store.has_carts
        );
        setStores(storeList);
      } catch (error: any) {
        console.error("Failed to fetch stores:", error);
        console.log("token expired");

        if(error.message === "Request failed with status 401"){
          console.log("token expired");
          tokenContext.setToken(null);

        }
      }
    }

    fetchStores();
  }, [token]);


  const handlePickerSelect = (value: any, name: any) => {
    setSelectedStoreValue(value);
    setSelectedStoreName(name);
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
            <IonButton expand="full" onClick={handleShowPicker}>בחר סניף            </IonButton>
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
                  text: "ביטול",
                  handler: handleDismissPicker,
                },
                {
                  text: "אישור",
                  handler: (selectedValues) => {
                    handlePickerSelect(
                      selectedValues.storeName.value,
                      selectedValues.storeName.text
                    );
                    handleDismissPicker();
                  },
                },
              ]}
            ></IonPicker>
          </IonCol>
          <IonCol size="12">
            <div>
                <p>סניף : {selectedStoreName}</p>
                {selectedStoreValue && <GraphForSelling storeID={selectedStoreValue} />}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default StoresPicker;
