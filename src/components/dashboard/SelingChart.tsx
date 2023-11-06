import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import {
  IonTitle,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";

const Graph: React.FC = () => {
  useIonViewWillEnter(() => {
    ChartJS.register(CategoryScale);
  }, []);

  useIonViewWillLeave(() => {
    ChartJS.unregister(CategoryScale);
  }, []);

  const data = {
    labels: ["Billable", "Non Billable","ffff"],
    datasets: [
      {
        label: "",
        backgroundColor: ["#36a2eb", "rgba(255,99,132,0.2)" , "rgba(66,99,2,0.2)"],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 130],
      },
    ],
  };

  return (
    <>
      <IonTitle>גרף מכירות</IonTitle>
      <Bar data={data} />
    </>
  );
};

export default Graph;