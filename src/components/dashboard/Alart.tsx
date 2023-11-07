import React from 'react';
import { IonAlert } from '@ionic/react';

interface CustomIonAlertProps {
    isOpen: boolean;
    onDidDismiss: () => void;
    }

const CustomIonAlert: React.FC<CustomIonAlertProps> = ({ isOpen, onDidDismiss }) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            header="שגיאה"
            subHeader="התנתקת מהמערכת"
            message="עליך להתחבר שוב"
            buttons={['OK']}
        />
    );
};

export default CustomIonAlert;
