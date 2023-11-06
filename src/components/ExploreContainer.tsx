import { IonButton } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const func = () => {
    console.log("hey");
  }
  return (
    <div id="container">
      <strong>Ready to</strong>
      <p>Start <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      <IonButton onClick={func}>g </IonButton>
    </div>
  );
};

export default ExploreContainer;
