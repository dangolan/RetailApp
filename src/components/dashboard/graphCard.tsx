import React from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import SelingChart from './SelingChart';

const GraphForSelling: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <SelingChart />
            </IonCardHeader>
            <IonButton fill="clear">Days</IonButton>
            <IonButton fill="clear">Weeks</IonButton>
            <IonButton fill="clear">Month</IonButton>
        </IonCard>
    );
}
export default GraphForSelling;