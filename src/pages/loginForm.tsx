import React, { FormEvent, FormEventHandler, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol, // Import IonCol for column layout
  IonImg, // Import IonImg for the image
} from "@ionic/react";
import "./loginForm.css";
import { loginApi } from "../api/login";
import { TokenContext } from "./Home";


const Login: React.FC = () => {

  const tokenContext = React.useContext(TokenContext);
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newToken = await loginApi(email, password);
      if (typeof newToken === "string") {
        // Call the parent component's callback function to pass the token
        tokenContext.setToken(newToken);
      } else {
        // Handle login failure or null value
        console.error("Login failed. Access Token is null or not a string.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="6" offset-md="3">
              {/* Image */}
              <div className="logo-img">
                <IonImg
                  src="/retailLogo.png" // Replace with the path to your image
                  alt="Logo"
                  style={{ width: "50%", height: "50%" }}
                />
              </div>
              {/* Use size and offset properties for centering */}
              <form onSubmit={handleLogin}>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    required
                    aria-label="Email"
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    required
                    aria-label="Password"
                  ></IonInput>
                </IonItem>

                <IonButton expand="full" type="submit">
                  Login
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
